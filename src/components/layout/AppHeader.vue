<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: 'send'
  }
})

const emit = defineEmits(['update:modelValue'])

const isDarkMode = ref(false)

const setTab = (tab) => {
  emit('update:modelValue', tab)
}

const applyTheme = () => {
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('sendnext-theme', isDarkMode.value ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  applyTheme()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('sendnext-theme')

  isDarkMode.value = savedTheme === 'dark'

  applyTheme()
})
</script>

<template>
  <header class="app-header">
    <div class="brand">
      <div class="brand-icon">
        <font-awesome-icon icon="paper-plane" />
      </div>

      <span>Sendnest</span>
    </div>

    <nav class="nav-links">
      <button
        class="nav-link"
        :class="{ active: modelValue === 'send' }"
        @click="setTab('send')"
      >
        Send File
      </button>

      <button
        class="nav-link"
        :class="{ active: modelValue === 'receive' }"
        @click="setTab('receive')"
      >
        Receive File
      </button>

      <button class="nav-link">
        History
      </button>
    </nav>

    <div class="nav-actions">
      <button
        class="utility-button"
        type="button"
        @click="toggleTheme"
      >
        <font-awesome-icon icon="power-off" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  height: 74px;

  background: var(--card-color);

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 0 38px;

  border-bottom: 1.5px solid var(--border-color);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 1.45rem;
  font-weight: 800;

  color: var(--text-color);
}

.brand-icon {
  color: var(--primary-dark);

  font-size: 1.7rem;
}

.nav-links {
  height: 100%;

  display: flex;
  align-items: center;
  gap: 44px;
}

.nav-link {
  height: 100%;

  position: relative;

  font-weight: 700;

  color: var(--text-color);

  padding: 0 4px;
}

.nav-link.active {
  color: var(--primary-dark);
}

.nav-link.active::after {
  content: '';

  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 3px;

  background: var(--primary-color);

  border-radius: 999px;
}

.nav-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.utility-button {
  width: 40px;
  height: 40px;

  border: 1.5px solid var(--border-color);

  border-radius: 50%;

  background: var(--primary-light);

  color: var(--text-color);

  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 760px) {
  .app-header {
    height: auto;

    grid-template-columns: 1fr;
    gap: 18px;

    padding: 20px;
  }

  .nav-links {
    width: 100%;

    justify-content: space-between;

    gap: 12px;
  }

  .nav-actions {
    display: none;
  }
}
</style>