<script setup>
import { ref } from 'vue'
import JSZip from 'jszip'

import { Capacitor } from '@capacitor/core'
import { Filesystem, Directory } from '@capacitor/filesystem'


import { supabase } from '../../services/supabase'
import BaseButton from '../ui/BaseButton.vue'

const transferCode = ref('')
const foundFiles = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showDeletePrompt = ref(false)

const cleanCode = () => {
  transferCode.value = transferCode.value
    .toUpperCase()
    .replace(/\s/g, '')
    .slice(0, 4)
}

const shortenFileName = (fileName) => {
  return fileName.length > 14
    ? `${fileName.slice(0, 14)}...`
    : fileName
}

const fetchFiles = async () => {
  cleanCode()

  if (transferCode.value.length !== 4) {
    errorMessage.value = 'Please enter a valid 4-character code.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  foundFiles.value = []
  showDeletePrompt.value = false

  try {
    const { data, error } = await supabase.storage
      .from('sendflow-files')
      .list(transferCode.value)

    if (error) throw error

    if (!data || !data.length) {
      errorMessage.value = 'No files found for this code.'
      return
    }

    foundFiles.value = data.map((file) => {
      const filePath = `${transferCode.value}/${file.name}`

      const { data: publicUrlData } = supabase.storage
        .from('sendflow-files')
        .getPublicUrl(filePath)

      return {
        name: file.name,
        size: file.metadata?.size || 0,
        path: filePath,
        url: publicUrlData.publicUrl
      }
    })
  } catch (error) {
    errorMessage.value = error.message || 'Could not fetch files.'
  } finally {
    loading.value = false
  }
}

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = reject

    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }

    reader.readAsDataURL(blob)
  })
}

const downloadBlobWeb = (blob, fileName) => {
  const blobUrl = window.URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = blobUrl
  link.download = fileName

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  window.URL.revokeObjectURL(blobUrl)
}

const saveFileNative = async (blob, fileName) => {
  const base64Data = await blobToBase64(blob)

  await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Documents
  })

  successMessage.value = 'File downloaded successfully.'
}

const downloadFile = async (file) => {
  try {
    const response = await fetch(file.url)

    if (!response.ok) {
      throw new Error('Download failed.')
    }

    const blob = await response.blob()

    if (Capacitor.isNativePlatform()) {
      await saveFileNative(blob, file.name)
    } else {
      downloadBlobWeb(blob, file.name)
    }

    showDeletePrompt.value = true
  } catch (error) {
    errorMessage.value = 'Download failed.'
  }
}

const downloadAllFiles = async () => {
  if (!foundFiles.value.length) return

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const zip = new JSZip()

    for (const file of foundFiles.value) {
      const response = await fetch(file.url)

      if (!response.ok) {
        throw new Error(`Could not download ${file.name}`)
      }

      const blob = await response.blob()

      zip.file(file.name, blob)
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob'
    })

    const zipName = `${transferCode.value}-sendnext-files.zip`

    if (Capacitor.isNativePlatform()) {
      await saveFileNative(zipBlob, zipName)
    } else {
      downloadBlobWeb(zipBlob, zipName)
    }

    showDeletePrompt.value = true
  } catch (error) {
    errorMessage.value = error.message || 'Could not create ZIP file.'
  } finally {
    loading.value = false
  }
}

const deleteFiles = async () => {
  if (!foundFiles.value.length) return

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const filePaths = foundFiles.value.map((file) => file.path)

    const { error } = await supabase.storage
      .from('sendflow-files')
      .remove(filePaths)

    if (error) throw error

    foundFiles.value = []
    transferCode.value = ''
    showDeletePrompt.value = false

    successMessage.value = 'Files deleted successfully.'
  } catch (error) {
    errorMessage.value = error.message || 'Could not delete files.'
  } finally {
    loading.value = false
  }
}

const keepFiles = () => {
  showDeletePrompt.value = false
}
</script>

<template>
  <section class="card receive-panel">
    <div class="receive-panel-content">
      <div class="panel-header">
        <div class="panel-icon">
          <font-awesome-icon icon="download" />
        </div>

        <div>
          <h2 class="title">Receive files</h2>

          <p class="subtitle">
            Enter the transfer code to fetch files.
          </p>
        </div>
      </div>

      <div>
        <input
          v-model="transferCode"
          type="text"
          class="input-field code-input"
          placeholder="ABCD"
          maxlength="4"
          @input="cleanCode"
        />
      </div>

      <div>
        <BaseButton
          type="button"
          :disabled="loading"
          @click="fetchFiles"
        >
          <font-awesome-icon icon="download" />

          <span>
            {{ loading ? 'Checking...' : 'Fetch Files' }}
          </span>
        </BaseButton>
      </div>

      <p
        v-if="errorMessage"
        class="error-text"
      >
        {{ errorMessage }}
      </p>

      <p
        v-if="successMessage"
        class="success-text"
      >
        {{ successMessage }}
      </p>

      <div class="file-area">
        <div
          v-if="foundFiles.length"
          class="file-list"
        >
          <div
            v-for="file in foundFiles"
            :key="file.path"
            class="file-item"
          >
            <div class="file-info">
              <div class="file-icon">
                <font-awesome-icon icon="file" />
              </div>

              <div class="file-text">
                <strong :title="file.name">
                  {{ shortenFileName(file.name) }}
                </strong>

                <p>{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
              </div>
            </div>

            <button
              type="button"
              class="download-button"
              @click="downloadFile(file)"
            >
              <font-awesome-icon icon="download" />
            </button>
          </div>

          <button
            type="button"
            class="download-all-button"
            :disabled="loading"
            @click="downloadAllFiles"
          >
            <font-awesome-icon icon="file-zipper" />

            <span>{{ loading ? 'Creating ZIP...' : 'Download as ZIP' }}</span>
          </button>
        </div>

        <p
          v-else
          class="empty-text"
        >
          No files fetched yet.
        </p>
      </div>

      <div
        v-if="showDeletePrompt"
        class="delete-prompt"
      >
        <div class="prompt-header">
          <div class="prompt-icon">
            <font-awesome-icon icon="trash" />
          </div>

          <div>
            <h3>Delete files now?</h3>

            <p>
              Download complete. Remove files from Sendnext?
            </p>
          </div>
        </div>

        <div class="delete-actions">
          <button
            type="button"
            class="delete-button"
            @click="deleteFiles"
          >
            <font-awesome-icon icon="trash" />

            <span>Delete</span>
          </button>

          <button
            type="button"
            class="keep-button"
            @click="keepFiles"
          >
            <font-awesome-icon icon="check" />

            <span>Keep</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.receive-panel {
  height: min(480px, calc(100svh - 180px));
  max-height: 680px;
  overflow: hidden;
  margin: 0 auto;
}

.receive-panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.panel-icon {
  width: 54px;
  height: 54px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.code-input {
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 6px;
  text-align: center;
  color: var(--text-color2);
}

.file-area {
  flex: 1;
  min-height: 80px;
  overflow-y: auto;
  padding-right: 4px;
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
  gap: 12px;
  padding: 12px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--card-color);
  min-width: 0;
  overflow: hidden;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.file-icon {
  width: 42px;
  height: 42px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
  flex-shrink: 0;
}

.file-text {
  min-width: 0;
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

.download-button {
  width: 38px;
  height: 38px;
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  flex-shrink: 0;
}

.download-all-button {
  width: 100%;
  padding: 12px 16px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--border-color);
}

.empty-text {
  color: var(--text-light);
  font-weight: 600;
  font-size: 0.85rem;
}

.delete-prompt {
  padding: 14px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.prompt-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.prompt-icon {
  width: 42px;
  height: 42px;
  background: #ffe4e6;
  border: 1.5px solid var(--border-color);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--error-color);
  flex-shrink: 0;
}

.delete-prompt h3 {
  font-size: 0.95rem;
  font-weight: 800;
}

.delete-prompt p {
  margin-top: 4px;
  font-size: 0.78rem;
  color: var(--text-light);
  line-height: 1.45;
}

.delete-actions {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.delete-button,
.keep-button {
  padding: 10px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.delete-button {
  background: var(--error-color);
  color: white;
}

.keep-button {
  background: var(--card-color);
  color: var(--text-color);
}

.error-text {
  color: var(--error-color);
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.success-text {
  color: var(--success-color);
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .receive-panel {
    height: auto;
    max-height: none;
  }

  .file-area {
    max-height: 220px;
  }
}

@media (max-width: 640px) {
  .file-area {
    max-height: 180px;
  }

  .delete-actions {
    grid-template-columns: 1fr;
  }
}
</style>