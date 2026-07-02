import { supabase } from './supabase'

const STORAGE_BUCKET = 'sendflow-files'
const CLEANUP_LAST_RUN_KEY = 'sendnest-storage-cleanup-last-run'
const CLEANUP_INTERVAL_HOURS = 24
const MAX_FOLDER_AGE_DAYS = 7

const ONE_HOUR_MS = 60 * 60 * 1000
const ONE_DAY_MS = 24 * ONE_HOUR_MS

const getNow = () => Date.now()

const isCleanupTooSoon = () => {
  const lastRunValue = localStorage.getItem(CLEANUP_LAST_RUN_KEY)

  if (!lastRunValue) {
    return false
  }

  const lastRunTime = Number(lastRunValue)

  if (!Number.isFinite(lastRunTime)) {
    return false
  }

  const hoursSinceLastRun = (getNow() - lastRunTime) / ONE_HOUR_MS

  return hoursSinceLastRun < CLEANUP_INTERVAL_HOURS
}

const saveCleanupRunTime = () => {
  localStorage.setItem(CLEANUP_LAST_RUN_KEY, String(getNow()))
}

const isFolderEntry = (entry) => {
  return !entry.id && !entry.metadata
}

const getFileTime = (file) => {
  const dateValue =
    file.created_at ||
    file.updated_at ||
    file.last_accessed_at

  if (!dateValue) {
    return null
  }

  const time = new Date(dateValue).getTime()

  if (!Number.isFinite(time)) {
    return null
  }

  return time
}

const isOlderThanLimit = (time) => {
  const ageMs = getNow() - time

  return ageMs > MAX_FOLDER_AGE_DAYS * ONE_DAY_MS
}

const listRootFolders = async () => {
  const allFolders = []
  let offset = 0
  const limit = 100

  while (true) {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list('', {
        limit,
        offset,
        sortBy: {
          column: 'name',
          order: 'asc'
        }
      })

    if (error) {
      return []
    }

    if (!data || data.length === 0) {
      break
    }

    const foldersOnly = data.filter(isFolderEntry)

    allFolders.push(...foldersOnly)

    if (data.length < limit) {
      break
    }

    offset += limit
  }

  return allFolders
}

const listFolderFiles = async (folderPath) => {
  const allFiles = []
  let offset = 0
  const limit = 100

  while (true) {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(folderPath, {
        limit,
        offset,
        sortBy: {
          column: 'name',
          order: 'asc'
        }
      })

    if (error) {
      return []
    }

    if (!data || data.length === 0) {
      break
    }

    const filesOnly = data.filter((entry) => !isFolderEntry(entry))

    allFiles.push(...filesOnly)

    if (data.length < limit) {
      break
    }

    offset += limit
  }

  return allFiles
}

const shouldDeleteFolder = async (folderName) => {
  const files = await listFolderFiles(folderName)

  if (files.length === 0) {
    return false
  }

  const fileTimes = files
    .map(getFileTime)
    .filter((time) => Number.isFinite(time))

  if (fileTimes.length === 0) {
    return false
  }

  const newestFileTime = Math.max(...fileTimes)

  return isOlderThanLimit(newestFileTime)
}

const deleteFolderFiles = async (folderName) => {
  const files = await listFolderFiles(folderName)

  if (files.length === 0) {
    return
  }

  const pathsToDelete = files.map((file) => `${folderName}/${file.name}`)

  await supabase.storage
    .from(STORAGE_BUCKET)
    .remove(pathsToDelete)
}

export const runStorageCleanup = async () => {
  if (isCleanupTooSoon()) {
    return
  }

  saveCleanupRunTime()

  try {
    const folders = await listRootFolders()

    if (folders.length === 0) {
      return
    }

    for (const folder of folders) {
      const folderName = folder.name
      const deleteFolder = await shouldDeleteFolder(folderName)

      if (deleteFolder) {
        await deleteFolderFiles(folderName)
      }
    }
  } catch {
    // Silent fail. Cleanup should never block or disturb the app.
  }
}