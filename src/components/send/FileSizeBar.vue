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
      <div>
        <h3>Total file size</h3>

        <p>
          {{ totalSizeMb }} MB of {{ maxSizeMb }} MB
        </p>
      </div>

      <strong>
        {{ Math.round(progress) }}%
      </strong>
    </div>

    <div class="size-track">
      <div
        class="size-fill"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <p
      v-if="isOverLimit"
      class="size-warning"
    >
      File too large. Reduce file size or get the paid version.
    </p>
  </div>
</template>

<style scoped>
.size-card {
  padding: 12px;

  background: var(--primary-light);

  border: 1.5px solid var(--border-color);

  border-radius: var(--radius-md);

  flex-shrink: 0;
}

.size-card.danger {
  background: #ffe4e6;
}

.size-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
}

.size-header h3 {
  font-size: 0.85rem;

  font-weight: 800;

  color: var(--text-color);
}

.size-header p {
  margin-top: 3px;

  font-size: 0.74rem;

  color: var(--text-light);
}

.size-header strong {
  font-size: 0.82rem;

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

.size-warning {
  margin-top: 8px;

  font-size: 0.76rem;

  font-weight: 800;

  color: var(--error-color);
}
</style>