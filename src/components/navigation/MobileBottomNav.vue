<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'toggle-theme'
])

const setTab = (tab) => {
  emit('update:modelValue', tab)
}
</script>

<template>
  <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
    <button
      type="button"
      class="mobile-nav-button"
      :class="{ active: modelValue === 'help' }"
      aria-label="Help"
      @click="setTab('help')"
    >
      <font-awesome-icon icon="circle-question" />
    </button>

    <button
      type="button"
      class="mobile-nav-button"
      :class="{ active: modelValue === 'receive' }"
      aria-label="Receive files"
      @click="setTab('receive')"
    >
      <font-awesome-icon icon="download" />
    </button>

    <button
      type="button"
      class="mobile-nav-button"
      :class="{ active: modelValue === 'send' }"
      aria-label="Send files"
      @click="setTab('send')"
    >
      <font-awesome-icon icon="upload" />
    </button>

    <button
      type="button"
      class="mobile-nav-button"
      :class="{ active: modelValue === 'about' }"
      aria-label="About"
      @click="setTab('about')"
    >
      <font-awesome-icon icon="circle-info" />
    </button>

    <button
      type="button"
      class="mobile-nav-button"
      aria-label="Toggle theme"
      @click="emit('toggle-theme')"
    >
      <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
    </button>
  </nav>
</template>

<style scoped>
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 640px) {
  .mobile-bottom-nav {
    position: fixed;
    transform: translateZ(0);
    will-change: transform;
    left: 28px;
    right: 28px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    z-index: 50;
    height: 64px;
    background: rgb(from var(--primary-dark) r g b / 1);
    border-radius: 20px 20px 20px 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    box-shadow: var(--shadow-md);
  }

  .mobile-nav-button {
    height: 100%;
    background: transparent;
    border: none;
    color: var(--card-color);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-button.active {
    color: var(--text-color);
  }
}
</style>