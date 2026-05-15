<script setup>
import { ref } from 'vue'
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

    if (error) {
      throw error
    }

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
    errorMessage.value =
      error.message || 'Could not fetch files.'
  } finally {
    loading.value = false
  }
}

const downloadFile = async (file) => {
  try {
    const response = await fetch(file.url)

    const blob = await response.blob()

    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = blobUrl
    link.download = file.name

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    window.URL.revokeObjectURL(blobUrl)

    showDeletePrompt.value = true
  } catch (error) {
    errorMessage.value = 'Download failed.'
  }
}

const downloadAllFiles = async () => {
  for (const file of foundFiles.value) {
    await downloadFile(file)
  }

  showDeletePrompt.value = true
}

const deleteFiles = async () => {
  if (!foundFiles.value.length) return

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const filePaths = foundFiles.value.map(
      (file) => file.path
    )

    const { error } = await supabase.storage
      .from('sendflow-files')
      .remove(filePaths)

    if (error) {
      throw error
    }

    foundFiles.value = []
    transferCode.value = ''
    showDeletePrompt.value = false

    successMessage.value =
      'Files deleted successfully.'
  } catch (error) {
    errorMessage.value =
      error.message || 'Could not delete files.'
  } finally {
    loading.value = false
  }
}

const keepFiles = () => {
  showDeletePrompt.value = false
}
</script>

<template>
  <section class="card">
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

    <div class="section-spacing">
      <input
        v-model="transferCode"
        type="text"
        class="input-field code-input"
        placeholder="ABCD"
        maxlength="4"
        @input="cleanCode"
      />
    </div>

    <div class="section-spacing">
      <BaseButton
        type="button"
        :disabled="loading"
        @click="fetchFiles"
      >
        <font-awesome-icon icon="download" />

        <span>
          {{
            loading
              ? 'Checking...'
              : 'Fetch Files'
          }}
        </span>
      </BaseButton>
    </div>

    <p
      v-if="errorMessage"
      class="error-text section-spacing"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="successMessage"
      class="success-text section-spacing"
    >
      {{ successMessage }}
    </p>

    <div
      v-if="foundFiles.length"
      class="file-list section-spacing"
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

          <div>
            <strong>{{ file.name }}</strong>

            <p>
              {{
                (
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)
              }}
              MB
            </p>
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
        @click="downloadAllFiles"
      >
        <font-awesome-icon icon="download" />

        <span>Download all files</span>
      </button>
    </div>

    <div
      v-if="showDeletePrompt"
      class="delete-prompt section-spacing"
    >
      <div class="prompt-header">
        <div class="prompt-icon">
          <font-awesome-icon icon="trash" />
        </div>

        <div>
          <h3>Delete files now?</h3>

          <p>
            Download complete. Remove files
            from SendFlow?
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
  </section>
</template>

<style scoped>
.panel-header {
  display: flex;
  align-items: center;
  gap: 16px;
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
}

.code-input {
  text-transform: uppercase;

  font-weight: 800;

  letter-spacing: 6px;

  text-align: center;
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

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
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
}

.file-item p {
  margin-top: 4px;

  font-size: 0.78rem;

  color: var(--text-light);
}

.download-button {
  width: 40px;
  height: 40px;

  border: 1.5px solid var(--border-color);

  border-radius: 50%;

  background: var(--primary-light);

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-color);
}

.download-all-button {
  width: 100%;

  padding: 14px 18px;

  background: var(--primary-light);

  border: 1.5px solid var(--border-color);

  border-radius: var(--radius-sm);

  font-weight: 800;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.delete-prompt {
  padding: 18px;

  background: var(--primary-light);

  border: 1.5px solid var(--border-color);

  border-radius: var(--radius-md);
}

.prompt-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.prompt-icon {
  width: 46px;
  height: 46px;

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
  font-size: 1rem;

  font-weight: 800;
}

.delete-prompt p {
  margin-top: 4px;

  font-size: 0.82rem;

  color: var(--text-light);

  line-height: 1.5;
}

.delete-actions {
  margin-top: 18px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 12px;
}

.delete-button,
.keep-button {
  padding: 12px 14px;

  border: 1.5px solid var(--border-color);

  border-radius: var(--radius-sm);

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
}

.success-text {
  color: var(--success-color);

  font-weight: 700;

  font-size: 0.85rem;
}

@media (max-width: 640px) {
  .delete-actions {
    grid-template-columns: 1fr;
  }
}
</style>