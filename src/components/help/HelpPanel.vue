<script setup>
import { ref } from 'vue'
import { supabase } from '../../services/supabase'
import BaseButton from '../ui/BaseButton.vue'

const checkCode = ref('')
const fileName = ref('')

const foundFiles = ref([])
const foundCode = ref('')
const loading = ref(false)
const resultType = ref('')
const message = ref('')
const errorMessage = ref('')

const cleanCode = () => {
  checkCode.value = checkCode.value
    .toUpperCase()
    .replace(/\s/g, '')
    .slice(0, 4)
}

const clearResult = () => {
  foundFiles.value = []
  foundCode.value = ''
  resultType.value = ''
  message.value = ''
  errorMessage.value = ''
}

const checkFilesByCode = async () => {
  cleanCode()

  if (checkCode.value.length !== 4) {
    clearResult()
    resultType.value = 'not-found'
    errorMessage.value = 'Enter a valid 4-character code.'
    return
  }

  loading.value = true
  clearResult()

  try {
    const { data, error } = await supabase.storage
      .from('sendflow-files')
      .list(checkCode.value)

    if (error) throw error

    if (!data || !data.length) {
      resultType.value = 'not-found'
      errorMessage.value = 'No file found.'
      return
    }

    foundFiles.value = data.map((file) => ({
      name: file.name,
      size: file.metadata?.size || 0,
      path: `${checkCode.value}/${file.name}`
    }))

    resultType.value = 'files-found'
    message.value = 'File found.'
  } catch (error) {
    resultType.value = 'not-found'
    errorMessage.value = error.message || 'Could not check files.'
  } finally {
    loading.value = false
  }
}

const deleteCheckedFiles = async () => {
  if (!foundFiles.value.length) return

  loading.value = true
  message.value = ''
  errorMessage.value = ''

  try {
    const filePaths = foundFiles.value.map((file) => file.path)

    const { error } = await supabase.storage
      .from('sendflow-files')
      .remove(filePaths)

    if (error) throw error

    foundFiles.value = []
    checkCode.value = ''
    resultType.value = 'deleted'
    message.value = 'Files deleted.'
  } catch (error) {
    errorMessage.value = error.message || 'Could not delete files.'
  } finally {
    loading.value = false
  }
}

const keepFiles = () => {
  resultType.value = 'kept'
  message.value = 'Files kept.'
}

const findCode = async () => {
  if (!fileName.value.trim()) {
    clearResult()
    resultType.value = 'not-found'
    errorMessage.value = 'Enter one file name.'
    return
  }

  loading.value = true
  clearResult()

  try {
    const { data: folders, error: folderError } = await supabase.storage
      .from('sendflow-files')
      .list('', {
        limit: 1000
      })

    if (folderError) throw folderError

    for (const folder of folders) {
      const code = folder.name

      const { data: files, error: fileError } = await supabase.storage
        .from('sendflow-files')
        .list(code)

      if (fileError) continue

      const match = files.find((file) => {
        return file.name
          .toLowerCase()
          .includes(fileName.value.toLowerCase())
      })

      if (match) {
        foundCode.value = code
        resultType.value = 'code-found'
        message.value = 'Code found.'
        return
      }
    }

    resultType.value = 'not-found'
    errorMessage.value = 'No matching file found.'
  } catch (error) {
    resultType.value = 'not-found'
    errorMessage.value = error.message || 'Could not search for code.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="help-layout">
    <section class="card help-panel">
      <div class="help-panel-content">
        <div class="panel-header">
          <div class="panel-icon">
            <font-awesome-icon icon="circle-question" />
          </div>

          <div>
            <h2 class="title">Help</h2>

            <p class="subtitle">
              Check if files still exist or recover a transfer code.
            </p>
          </div>
        </div>

        <div class="help-section">
          <h3>
            <font-awesome-icon icon="magnifying-glass" />
            Check files by code
          </h3>

          <div class="inline-form">
            <input
              v-model="checkCode"
              type="text"
              class="input-field code-input"
              placeholder="ABCD"
              maxlength="4"
              @input="cleanCode"
            />

            <BaseButton
              type="button"
              :disabled="loading"
              @click="checkFilesByCode"
            >
              {{ loading ? 'Checking...' : 'Check' }}
            </BaseButton>
          </div>
        </div>

        <div class="help-section">
          <h3>
            <font-awesome-icon icon="folder-open" />
            Find my code
          </h3>

          <div class="inline-form">
            <input
              v-model="fileName"
              type="text"
              class="input-field"
              placeholder="File name"
            />

            <BaseButton
              type="button"
              :disabled="loading"
              @click="findCode"
            >
              {{ loading ? 'Searching...' : 'Find' }}
            </BaseButton>
          </div>
        </div>

        <div
          v-if="resultType"
          class="simple-result"
          :class="{
            danger: resultType === 'not-found',
            success: resultType !== 'not-found'
          }"
        >
          <div class="result-icon">
            <font-awesome-icon
              :icon="resultType === 'not-found' ? 'xmark' : 'check'"
            />
          </div>

          <div class="result-text">
            <h3>
              <span v-if="resultType === 'files-found'">File found</span>
              <span v-else-if="resultType === 'code-found'">Code found</span>
              <span v-else-if="resultType === 'deleted'">Files deleted</span>
              <span v-else-if="resultType === 'kept'">Files kept</span>
              <span v-else>No file found</span>
            </h3>

            <p v-if="message">{{ message }}</p>

            <p v-if="errorMessage">{{ errorMessage }}</p>

            <strong
              v-if="foundCode"
              class="found-code"
            >
              {{ foundCode }}
            </strong>
          </div>

          <div
            v-if="resultType === 'files-found'"
            class="result-actions"
          >
            <button
              type="button"
              class="delete-button"
              :disabled="loading"
              @click="deleteCheckedFiles"
            >
              <font-awesome-icon icon="trash" />

              <span>Delete</span>
            </button>

            <button
              type="button"
              class="keep-button"
              :disabled="loading"
              @click="keepFiles"
            >
              <font-awesome-icon icon="check" />

              <span>Keep</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.help-layout {
  width: 100%;
}

.help-panel {
  height: min(500px, calc(100svh - 300px));
  min-height: 360px;
  overflow: hidden;
}

.help-panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding-right: 4px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.panel-icon,
.result-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.help-section {
  padding: 12px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.help-section h3 {
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}

.inline-form {
  display: grid;
  grid-template-columns: 1fr 130px;
  gap: 10px;
  color: var(--text-color2);
}

.input-field {
  color: var(--text-color2);
}

.code-input {
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 6px;
  text-align: center;
  color: var(--text-color2);
}

.simple-result {
  padding: 12px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
}

.simple-result.success {
  background: var(--primary-light);
}

.simple-result.danger {
  background: #ffe4e6;
}

.result-text h3 {
  font-size: 0.95rem;
  font-weight: 800;
}

.result-text p {
  margin-top: 3px;
  font-size: 0.78rem;
  color: var(--text-light);
}

.found-code {
  display: inline-block;
  margin-top: 6px;
  font-size: 1.35rem;
  letter-spacing: 6px;
  color: var(--text-color);
}

.result-actions {
  display: flex;
  gap: 10px;
}

.delete-button,
.keep-button {
  padding: 10px 13px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.delete-button {
  background: var(--error-color);
  color: white;
}

.keep-button {
  background: var(--card-color);
  color: var(--text-color);
}

@media (max-width: 1024px) {
  .help-panel {
    height: auto;
    max-height: none;
  }
}

@media (max-width: 640px) {
  .inline-form {
    grid-template-columns: 1fr;
  }

  .simple-result {
    grid-template-columns: 1fr;
  }

  .result-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>