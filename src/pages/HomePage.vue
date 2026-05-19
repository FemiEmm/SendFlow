<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import AppHeader from '../components/layout/AppHeader.vue'
import SendPanel from '../components/send/SendPanel.vue'
import ReceivePanel from '../components/receive/ReceivePanel.vue'
import HelpPanel from '../components/help/HelpPanel.vue'
import AboutPanel from '../components/help/AboutPanel.vue'

const props = defineProps({
  startTab: {
    type: String,
    default: 'send'
  }
})

const emit = defineEmits([
  'open-sendnext',
  're-onboard'
])

const activeTab = ref(props.startTab)
const shareCopied = ref(false)
const isDarkMode = ref(false)
const isMobile = ref(window.innerWidth <= 640)

watch(
  () => props.startTab,
  (newTab) => {
    activeTab.value = newTab
  }
)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 640
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
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const heroImage = computed(() => {
  if (!isMobile.value) {
    return '/images/hero-transfer.png'
  }

  return activeTab.value === 'send'
    ? '/images/hero-transfer.png'
    : '/images/hero-transfer-2.png'
})

const shareApp = async () => {
  const shareData = {
    title: 'Sendnext',
    text: 'Send files between devices with a simple transfer code.',
    url: window.location.href
  }

  if (navigator.share) {
    await navigator.share(shareData)
    return
  }

  await navigator.clipboard.writeText(window.location.href)

  shareCopied.value = true
}
</script>

<template>
  <div class="homepage">
    <AppHeader
      v-model="activeTab"
      @open-sendnext="$emit('open-sendnext')"
    />

    <main class="homepage-grid">
      <section class="function-column">
        <SendPanel v-if="activeTab === 'send'" />

        <ReceivePanel v-if="activeTab === 'receive'" />

        <HelpPanel v-if="activeTab === 'help'" />

        <AboutPanel
          v-if="activeTab === 'about'"
          @re-onboard="emit('re-onboard')"
        />
      </section>

      <section class="hero-column">
        <div class="hero-copy">
          <h1>Send files between devices instantly</h1>

          <p>
            Upload a file, generate a code, and receive it on another device.
          </p>
        </div>

        <div class="hero-image">
          <img
            :src="heroImage"
            alt="File transfer between devices"
          />
        </div>
      </section>
    </main>

    <footer class="app-footer">
      <div class="footer-share">
        <div class="footer-icon">
          <font-awesome-icon icon="share" />
        </div>

        <div>
          <h3>Share with friends</h3>

          <p>
            Send this app link to someone who needs simple file transfer.
          </p>
        </div>

        <button
          type="button"
          class="footer-button"
          @click="shareApp"
        >
          <font-awesome-icon icon="share" />

          <span>{{ shareCopied ? 'Copied' : 'Share app' }}</span>
        </button>
      </div>

      <div class="footer-disclaimer">
        <div class="footer-icon">
          <font-awesome-icon icon="circle-info" />
        </div>

        <div>
          <h3>Simple transfer notice</h3>

          <p>
            Files use temporary transfer codes. Only share codes with people you trust.
          </p>
        </div>
      </div>
    </footer>

    <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
      <button
        type="button"
        class="mobile-nav-button"
        :class="{ active: activeTab === 'help' }"
        aria-label="Help"
        @click="activeTab = 'help'"
      >
        <font-awesome-icon icon="circle-question" />
      </button>

      <button
        type="button"
        class="mobile-nav-button"
        :class="{ active: activeTab === 'receive' }"
        aria-label="Receive files"
        @click="activeTab = 'receive'"
      >
        <font-awesome-icon icon="download" />
      </button>

      <button
        type="button"
        class="mobile-nav-button"
        :class="{ active: activeTab === 'send' }"
        aria-label="Send files"
        @click="activeTab = 'send'"
      >
        <font-awesome-icon icon="upload" />
      </button>

      <button
        type="button"
        class="mobile-nav-button"
        :class="{ active: activeTab === 'about' }"
        aria-label="About"
        @click="activeTab = 'about'"
      >
        <font-awesome-icon icon="circle-info" />
      </button>

      <button
        type="button"
        class="mobile-nav-button"
        aria-label="Toggle theme"
        @click="toggleTheme"
      >
        <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
      </button>
    </nav>
  </div>
</template>

<style scoped>
.homepage {
  min-height: 100svh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.homepage-grid {
  flex: 1;
  width: 100%;
  min-height: 0;
  padding: clamp(20px, 4vh, 42px) clamp(32px, 5vw, 72px);
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
  align-items: center;
  gap: clamp(28px, 4vw, 56px);
}

.function-column {
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.hero-column {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-copy {
  width: 100%;
  max-width: 520px;
  margin-bottom: clamp(16px, 3vh, 28px);
}

.hero-copy h1 {
  font-size: clamp(2.15rem, 4vw, 3rem);
  line-height: 1.08;
  font-weight: 800;
  color: var(--text-color);
}

.hero-copy p {
  max-width: 430px;
  margin-top: 14px;
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  line-height: 1.5;
  color: var(--text-light);
}

.hero-image {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
}

.hero-image img {
  width: 100%;
  max-width: clamp(240px, 26vw, 340px);
  object-fit: contain;
  transition: opacity 0.25s ease;
}

.app-footer {
  margin: 0 clamp(32px, 5vw, 72px) clamp(18px, 3vh, 28px);
  padding: 16px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  box-shadow: var(--shadow-sm);
}

.footer-share,
.footer-disclaimer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-icon {
  width: 42px;
  height: 42px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 14px;
  color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer-share h3,
.footer-disclaimer h3 {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--text-color);
}

.footer-share p,
.footer-disclaimer p {
  margin-top: 3px;
  font-size: 0.74rem;
  line-height: 1.35;
  color: var(--text-light);
}

.footer-button {
  margin-left: auto;
  padding: 10px 20px;
  background: var(--primary-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.mobile-bottom-nav {
  display: none;
}

@media (max-width: 1024px) {
  .homepage {
    min-height: 100svh;
  }

  .homepage-grid {
    padding: 32px 0 42px;
    display: flex;
    flex-direction: column;
    width: min(100% - 38px, 720px);
    margin-left: auto;
    margin-right: auto;
    gap: 34px;
  }

  .function-column {
    order: 2;
  }

  .hero-column {
    order: 1;
  }

  .hero-copy {
    text-align: center;
    margin-bottom: 22px;
  }

  .hero-copy p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-image img {
    max-width: 280px;
  }

  .app-footer {
    margin: 0 32px 28px;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .homepage {
    min-height: 100svh;
    display: block;
    padding-bottom: 94px;
  }

  .homepage-grid {
    width: min(100% - 36px, 520px);
    padding: 26px 0 24px;
    gap: 28px;
  }

  .hero-copy h1 {
    font-size: 2rem;
  }

  .hero-copy p {
    font-size: 0.92rem;
  }

  .hero-image img {
    max-width: 220px;
  }

  .app-footer {
    display: none;
  }

  .mobile-bottom-nav {
    position: fixed;
    transform: translateZ(0);
    will-change: transform;
    left: 12px;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    z-index: 50;
    height: 64px;
    background: rgb(from var(--primary-dark) r g b / 1);
    border-radius: 999px;
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