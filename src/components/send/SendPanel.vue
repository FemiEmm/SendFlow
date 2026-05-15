<script setup>
import { nextTick, ref } from 'vue'
import lottie from 'lottie-web'

import { supabase } from '../../services/supabase'
import BaseButton from '../ui/BaseButton.vue'
import checkmarkAnimation from '../../assets/styles/animations/checkmark.json'

const selectedFiles = ref([])
const transferCode = ref('')
const uploadLoading = ref(false)
const uploadSuccess = ref(false)
const errorMessage = ref('')
const copied = ref(false)
const checkmarkContainer = ref(null)

const generateCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''

  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return code
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
  selectedFiles.value = selectedFiles.value.filter((_, fileIndex) => fileIndex !== index)

  transferCode.value = ''
  uploadSuccess.value = false
}

const uploadFiles = async () => {
  if (!selectedFiles.value.length) {
    errorMessage.value = 'Please choose at least one file.'
    return
  }

  uploadLoading.value = true
  uploadSuccess.value = false
  errorMessage.value = ''
  copied.value = false

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

    transferCode.value = code
    uploadSuccess.value = true
    selectedFiles.value = []

    playCheckmarkAnimation()
  } catch (error) {
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
  <section class="card">
    <h2 class="title">Send files</h2>

    <p class="subtitle">
      Upload files and generate a transfer code.
    </p>

    <div
      v-if="uploadSuccess"
      class="success-card section-spacing"
    >
      <div
        ref="checkmarkContainer"
        class="checkmark-animation"
      ></div>

      <h3>Upload complete</h3>

      <p>Your files are ready to receive.</p>
    </div>

    <label class="upload-box section-spacing">
      <font-awesome-icon icon="upload" />

      <span>Choose files</span>

      <input
        type="file"
        multiple
        hidden
        @change="handleFileSelect"
      />
    </label>

    <div class="section-spacing">
      <div
        v-if="selectedFiles.length"
        class="file-list"
      >
        <div
          v-for="(file, index) in selectedFiles"
          :key="`${file.name}-${file.size}-${index}`"
          class="file-item"
        >
          <div>
            <strong>{{ file.name }}</strong>

            <p>{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>

          <button
            type="button"
            class="remove-button"
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
    </div>

    <p
      v-if="errorMessage"
      class="error-text section-spacing"
    >
      {{ errorMessage }}
    </p>

    <div class="section-spacing">
      <BaseButton
        type="button"
        :disabled="uploadLoading"
        @click="uploadFiles"
      >
        {{ uploadLoading ? 'Uploading...' : 'Generate Code' }}
      </BaseButton>
    </div>

    <div
      v-if="uploadSuccess"
      class="code-card section-spacing"
    >
      <p>Your transfer code</p>

      <strong>{{ transferCode }}</strong>

      <button
        type="button"
        class="copy-button"
        @click="copyCode"
      >
        <font-awesome-icon icon="copy" />

        {{ copied ? 'Copied' : 'Copy code' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.upload-box {
  min-height: 150px;
  background: var(--primary-light);
  border: 1.5px dashed var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 800;
  cursor: pointer;
}

.upload-box svg {
  font-size: 2rem;
  color: var(--primary-dark);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--card-color);
}

.file-item p {
  margin-top: 4px;
  font-size: 0.85rem;
  color: var(--text-light);
}

.remove-button {
  width: 34px;
  height: 34px;
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  background: var(--card-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-text {
  color: var(--text-light);
  font-weight: 600;
}

.error-text {
  color: var(--error-color);
  font-weight: 700;
}

.success-card {
  padding: 18px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  text-align: center;
}

.checkmark-animation {
  width: 90px;
  height: 90px;
  margin: 0 auto 8px;
}

.success-card h3 {
  font-size: 1.2rem;
  font-weight: 800;
}

.success-card p {
  margin-top: 6px;
  color: var(--text-light);
  font-weight: 600;
}

.code-card {
  padding: 18px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  text-align: center;
}

.code-card p {
  color: var(--text-light);
  font-weight: 700;
}

.code-card strong {
  display: block;
  margin-top: 10px;
  font-size: 2.5rem;
  letter-spacing: 8px;
}

.copy-button {
  margin-top: 18px;
  padding: 12px 18px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>