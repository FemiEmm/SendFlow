<script setup>
defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const setTab = (tab) => {
  emit('update:modelValue', tab)
}
</script>

<template>
  <div class="toggle-wrapper section-spacing">
    <button
      class="toggle-button"
      :class="{ active: modelValue === 'send' }"
      @click="setTab('send')"
    >
      Send
    </button>

    <button
      class="toggle-button"
      :class="{ active: modelValue === 'receive' }"
      @click="setTab('receive')"
    >
      Receive
    </button>

    <button
      class="nav-link"
      :class="{ active: modelValue === 'help' }"
      @click="setTab('help')"
    >
      Help
    </button>
  </div>
</template>

<style scoped>
.toggle-wrapper {
  width: 100%;

  background: var(--primary-light);

  border: 1.5px solid var(--border-color);

  border-radius: var(--radius-md);

  padding: 6px;

  display: flex;

  gap: 8px;
}

.toggle-button {
  flex: 1;

  padding: 14px;

  border-radius: var(--radius-sm);

  font-weight: 700;

  color: var(--text-color);

  transition: var(--transition);
}

.toggle-button.active {
  background: white;

  border: 1.5px solid var(--border-color);

  color: var(--text-color);
}
</style>