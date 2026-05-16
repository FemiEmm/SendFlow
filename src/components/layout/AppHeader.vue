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

  localStorage.setItem(
    'sendnext-theme',
    isDarkMode.value ? 'dark' : 'light'
  )
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
    <div class="header-left">
      <div class="brand">
        <img
          class="brand-logo"
          src="/Logo/SendNest.svg"
          alt="Sendnest logo"
        />

        <span>SendNest</span>
      </div>
    </div>

    <nav class="header-middle nav-links">
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

      <button
        class="nav-link"
        :class="{ active: modelValue === 'help' }"
        @click="setTab('help')"
      >
        Help
      </button>
    </nav>

    <div class="header-right nav-actions">
      <button
        class="about-button"
        :class="{ active: modelValue === 'about' }"
        type="button"
        @click="setTab('about')"
      >
        About us
      </button>

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
  grid-template-columns: 1fr 1fr 1fr;

  align-items: center;

  padding: 0px 70px;

  border-bottom: 1.5px solid var(--border-color);
}

.header-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header-middle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;

  gap: 12px;

  min-width: 0;

  color: var(--text-color);
}

.brand-logo {
  width: 38px;
  height: 38px;

  object-fit: contain;

  flex-shrink: 0;
}

.brand span {
  font-size: 1.45rem;
  font-weight: 800;

  line-height: 1;

  color: var(--text-color);
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

.about-button {
  padding: 10px 16px;

  border: 1.5px solid var(--border-color);

  border-radius: 999px;

  background: var(--card-color);

  color: var(--text-color);

  font-weight: 800;

  font-size: 0.85rem;
}

.about-button.active {
  background: var(--primary-light);

  color: var(--primary-dark);
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

@media (max-width: 900px) {
  .app-header {
    height: auto;

    display: flex;
    flex-direction: column;

    gap: 18px;

    padding: 20px;
  }

  .header-left,
  .header-middle,
  .header-right {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
  }

  .brand span {
    font-size: 1.25rem;
  }

  .nav-links {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 24px;
  }

  .header-right {
    display: flex;

    gap: 12px;
  }
}

@media (max-width: 520px) {
  .nav-links {
    justify-content: space-between;

    gap: 12px;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .about-button {
    padding: 9px 14px;

    font-size: 0.8rem;
  }
}
</style>