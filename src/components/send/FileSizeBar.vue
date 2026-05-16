<script setup>
import { computed } from 'vue'

const props = defineProps({
  files: {
    type: Array,
    default: () => []
  },
  maxSize: {
    type: Number,
    default: 50 * 1024 * 1024
  }
})

const totalSize = computed(() => {
  return props.files.reduce((sum, file) => sum + file.size, 0)
})

const totalSizeMb = computed(() => {
  return (totalSize.value / 1024 / 1024).toFixed(2)
})

const maxSizeMb = computed(() => {
  return (props.maxSize / 1024 / 1024).toFixed(0)
})

const progress = computed(() => {
  return Math.min((totalSize.value / props.maxSize) * 100, 100)
})

const progressPercent = computed(() => {
  return Math.round(progress.value)
})

const fileCount = computed(() => {
  return props.files.length
})

const isOverLimit = computed(() => {
  return totalSize.value > props.maxSize
})
</script>

<template>
  <div
    v-if="files.length"
    class="size-card"
    :class="{ danger: isOverLimit }"
  >
    <div class="size-header">
      <div class="size-main">
        <h3>Total file size</h3>

        <p>{{ totalSizeMb }} MB of {{ maxSizeMb }} MB</p>
      </div>

      <div class="size-count">
        <h3>Files</h3>

        <p>{{ fileCount }}</p>
      </div>
    </div>

    <div class="size-track">
      <div
        class="size-fill"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div class="size-bottom">
      <p
        v-if="isOverLimit"
        class="size-warning"
      >
        File too large. Reduce file size or get the paid version.
      </p>

      <strong>{{ progressPercent }}%</strong>
    </div>
  </div>
</template>

<style scoped>
.size-card {
  padding: 12px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  flex-shrink: 0;
  overflow: hidden;
}

.size-card.danger {
  background: #ffe4e6;
}

.size-header {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 10px;
  align-items: start;
}

.size-main,
.size-count {
  min-width: 0;
}

.size-main h3 {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-color);
}

.size-main p {
  margin-top: 3px;
  font-size: 0.74rem;
  color: var(--text-light);
}

.size-count {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.size-count h3 {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-light);
}

.size-count p {
  margin-top: 2px;
  font-size: 1.45rem;
  line-height: 1;
  font-weight: 900;
  color: var(--text-color);
}

.size-track {
  width: 100%;
  height: 9px;
  margin-top: 10px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  overflow: hidden;
}

.size-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width var(--transition);
}

.size-card.danger .size-fill {
  background: var(--error-color);
}

.size-bottom {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.size-bottom strong {
  font-size: 0.78rem;
  color: var(--text-color);
  flex-shrink: 0;
}

.size-warning {
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--error-color);
}

@media (max-width: 640px) {
  .size-card {
    padding: 11px;
  }

  .size-header {
    grid-template-columns: 7fr 3fr;
    gap: 8px;
  }

  .size-main h3 {
    font-size: 0.8rem;
  }

  .size-main p {
    font-size: 0.72rem;
  }

  .size-count h3 {
    font-size: 0.68rem;
  }

  .size-count p {
    font-size: 1.25rem;
  }

  .size-warning,
  .size-bottom strong {
    font-size: 0.72rem;
  }
}
</style>