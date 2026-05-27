<script setup>
import { computed, nextTick, ref } from 'vue'
import lottie from 'lottie-web'

import { supabase } from '../../services/supabase'
import BaseButton from '../ui/BaseButton.vue'
import FileSizeBar from './FileSizeBar.vue'

import checkmarkAnimation from '../../assets/styles/animations/checkmark.json'
import planeAnimation from '../../assets/styles/animations/paper-plane.json'

const MAX_TOTAL_SIZE = 50 * 1024 * 1024

const selectedFiles = ref([])
const transferCode = ref('')
const uploadLoading = ref(false)
const uploadSuccess = ref(false)
const errorMessage = ref('')
const copied = ref(false)

const checkmarkContainer = ref(null)
const planeContainer = ref(null)

let planeInstance = null

const totalFileSize = computed(() => {
  return selectedFiles.value.reduce((sum, file) => sum + file.size, 0)
})

const isOverSizeLimit = computed(() => {
  return totalFileSize.value > MAX_TOTAL_SIZE
})

const generateCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''

  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return code
}

const incrementDeliveryCount = async () => {
  const { error } = await supabase.rpc('increment_delivery_count')

  if (error) {
    throw error
  }
}

const playPlaneAnimation = async () => {
  await nextTick()

  if (!planeContainer.value) return

  planeContainer.value.innerHTML = ''

  planeInstance = lottie.loadAnimation({
    container: planeContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: planeAnimation
  })
}

const stopPlaneAnimation = () => {
  if (planeInstance) {
    planeInstance.destroy()
    planeInstance = null
  }
}

const playCheckmarkAnimation = async () => {
  await nextTick()

  if (!checkmarkContainer.value) return

  checkmarkContainer.value.innerHTML = ''

  lottie.loadAnimation({
    container: checkmarkContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: checkmarkAnimation
  })
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files || [])

  selectedFiles.value = [...selectedFiles.value, ...files]

  transferCode.value = ''
  uploadSuccess.value = false
  errorMessage.value = ''
  copied.value = false

  event.target.value = ''
}

const removeFile = (index) => {
  selectedFiles.value = selectedFiles.value.filter(
    (_, fileIndex) => fileIndex !== index
  )

  transferCode.value = ''
  uploadSuccess.value = false
  errorMessage.value = ''
}

const uploadFiles = async () => {
  if (!selectedFiles.value.length) {
    errorMessage.value = 'Please choose at least one file.'
    return
  }

  if (isOverSizeLimit.value) {
    errorMessage.value = 'File too large. Reduce file size or get the paid version.'
    return
  }

  uploadLoading.value = true
  uploadSuccess.value = false
  errorMessage.value = ''
  copied.value = false

  await playPlaneAnimation()

  const code = generateCode()

  try {
    for (const file of selectedFiles.value) {
      const filePath = `${code}/${file.name}`

      const { error } = await supabase.storage
        .from('sendflow-files')
        .upload(filePath, file)

      if (error) {
        throw error
      }
    }

    await incrementDeliveryCount()

    stopPlaneAnimation()

    transferCode.value = code
    uploadSuccess.value = true
    selectedFiles.value = []

    playCheckmarkAnimation()
  } catch (error) {
    stopPlaneAnimation()

    errorMessage.value = error.message || 'Upload failed. Please try again.'
  } finally {
    uploadLoading.value = false
  }
}

const copyCode = async () => {
  if (!transferCode.value) return

  await navigator.clipboard.writeText(transferCode.value)

  copied.value = true
}
</script>

<template>
  <div class="send-layout">
    <section class="card send-panel">
      <div class="send-panel-content">
        <div class="send-top-row">
          <div class="send-panel-header">
            <h2 class="title">Send files</h2>

            <p class="subtitle">
              Upload files and generate a transfer code.
            </p>
          </div>

          <label class="upload-button">
            <font-awesome-icon icon="upload" />

            <span>Choose files</span>

            <input
              type="file"
              multiple
              hidden
              @change="handleFileSelect"
            />
          </label>
        </div>

        <div
          v-if="uploadLoading"
          class="sending-card"
        >
          <div
            ref="planeContainer"
            class="plane-animation"
          ></div>

          <div>
            <h3>Sending files</h3>

            <p>Please wait. Your files are being transferred.</p>
          </div>
        </div>

        <div
          v-if="uploadSuccess"
          class="success-card"
        >
          <div
            ref="checkmarkContainer"
            class="checkmark-animation"
          ></div>

          <div>
            <h3>Upload complete</h3>

            <p>Your files are ready to receive.</p>
          </div>
        </div>

        <FileSizeBar
          :files="selectedFiles"
          :max-size="MAX_TOTAL_SIZE"
        />

        <div class="file-area">
          <div
            v-if="selectedFiles.length"
            class="file-list"
          >
            <div
              v-for="(file, index) in selectedFiles"
              :key="`${file.name}-${file.size}-${index}`"
              class="file-item"
            >
              <div class="file-text">
                <strong :title="file.name">
                  {{
                    file.name.length > 20
                      ? `${file.name.slice(0, 20)}...`
                      : file.name
                  }}
                </strong>

                <p>
                  {{ (file.size / 1024 / 1024).toFixed(2) }} MB
                </p>
              </div>

              <button
                type="button"
                class="remove-button"
                :disabled="uploadLoading"
                @click="removeFile(index)"
              >
                <font-awesome-icon icon="xmark" />
              </button>
            </div>
          </div>

          <p
            v-else-if="!uploadSuccess"
            class="empty-text"
          >
            No files selected yet.
          </p>

          <p
            v-else
            class="empty-text"
          >
            Choose more files to create another transfer.
          </p>
        </div>

        <p
          v-if="errorMessage"
          class="error-text"
        >
          {{ errorMessage }}
        </p>
      </div>
    </section>

    <section class="card code-panel">
      <div class="code-panel-left">
        <div class="code-icon">
          <font-awesome-icon icon="copy" />
        </div>

        <div>
          <h3>Transfer code</h3>

          <p>
            Generate a code after selecting files.
          </p>
        </div>
      </div>

      <div
        v-if="uploadSuccess"
        class="code-display"
      >
        <strong>{{ transferCode }}</strong>

        <button
          type="button"
          class="copy-button"
          @click="copyCode"
        >
          <font-awesome-icon icon="copy" />

          <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>

      <div
        v-else
        class="code-actions"
      >
        <BaseButton
          type="button"
          :disabled="uploadLoading || isOverSizeLimit"
          @click="uploadFiles"
        >
          {{ uploadLoading ? 'Sending...' : 'Generate Code' }}
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.send-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.send-panel {
  height: min(500px, calc(100svh - 300px));
  min-height: 390px;
  overflow: hidden;
}

.send-panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.send-top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.send-panel-header {
  flex: 1;
  min-width: 0;
}

.upload-button {
  height: 52px;
  padding: 0 20px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 800;
  color: var(--text-color);
  cursor: pointer;
  flex-shrink: 0;
  transition: var(--transition);
}

.upload-button:hover {
  transform: translateY(-1px);
}

.upload-button svg {
  font-size: 1rem;
  color: var(--primary-dark);
}

.sending-card,
.success-card {
  padding: 12px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.plane-animation {
  width: 156px;
  height: 156px;
  flex-shrink: 0;
}

.checkmark-animation {
  width: 54px;
  height: 54px;
  flex-shrink: 0;
}

.sending-card h3,
.success-card h3 {
  font-size: 0.95rem;
  font-weight: 800;
}

.sending-card p,
.success-card p {
  margin-top: 3px;
  color: var(--text-light);
  font-size: 0.76rem;
  font-weight: 600;
}

.file-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--card-color);
  min-width: 0;
  overflow: hidden;
}

.file-text {
  min-width: 0;
  max-width: 100%;
  flex: 1;
}

.file-text strong {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.88rem;
}

.file-item p {
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--text-light);
}

.remove-button {
  width: 32px;
  height: 32px;
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  background: var(--card-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.remove-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-text {
  color: var(--text-light);
  font-weight: 600;
  font-size: 0.85rem;
}

.error-text {
  color: var(--error-color);
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.code-panel {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 18px;
}

.code-panel-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.code-icon {
  width: 44px;
  height: 44px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 14px;
  color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.code-panel-left h3 {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-color);
}

.code-panel-left p {
  margin-top: 3px;
  font-size: 0.76rem;
  color: var(--text-light);
  line-height: 1.35;
}

.code-actions {
  min-width: 190px;
}

.code-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.code-display strong {
  padding: 10px 14px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 1.5rem;
  letter-spacing: 6px;
}

.copy-button {
  padding: 11px 15px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
}

@media (max-width: 1024px) {
  .send-panel {
    height: auto;
    max-height: none;
  }

  .file-area {
    max-height: 220px;
  }
}

@media (max-width: 640px) {
  .send-panel {
    min-height: auto;
  }

  .send-top-row {
    flex-direction: column;
    align-items: stretch;
  }

  .upload-button {
    width: 100%;
  }

  .sending-card {
    align-items: center;
  }

  .plane-animation {
    width: 100px;
    height: 100px;
  }

  .file-area {
    max-height: 180px;
  }

  .code-panel {
    grid-template-columns: 1fr;
  }

  .code-actions {
    min-width: 0;
  }

  .code-display {
    flex-direction: column;
    align-items: stretch;
  }

  .code-display strong {
    text-align: center;
  }

  .copy-button {
    justify-content: center;
  }
}
</style>