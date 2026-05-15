<script setup>
import { ref } from 'vue'

import AppHeader from '../components/layout/AppHeader.vue'
import SendPanel from '../components/send/SendPanel.vue'
import ReceivePanel from '../components/receive/ReceivePanel.vue'

const activeTab = ref('send')
</script>

<template>
  <div class="homepage">
    <AppHeader v-model="activeTab" />

    <main class="homepage-grid">
      <section class="function-column">
        <SendPanel v-if="activeTab === 'send'" />

        <ReceivePanel v-if="activeTab === 'receive'" />
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
            src="/images/hero-transfer.jpg"
            alt="File transfer between devices"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.homepage {
  min-height: 100vh;

  background: var(--bg-color);
}

.homepage-grid {
  width: 100%;

  min-height: calc(100vh - 74px);

  padding: 56px 72px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  align-items: center;

  gap: 56px;
}

.function-column {
  width: 100%;

  display: flex;

  justify-content: center;
}

.hero-column {
  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;
}

.hero-copy {
  width: 100%;

  max-width: 520px;

  margin-bottom: 32px;
}

.hero-copy h1 {
  font-size: 3rem;

  line-height: 1.12;

  font-weight: 800;

  color: var(--text-color);
}

.hero-copy p {
  max-width: 430px;

  margin-top: 20px;

  font-size: 1.1rem;

  line-height: 1.6;

  color: var(--text-light);
}

.hero-image {
  width: 100%;

  max-width: 520px;

  display: flex;

  justify-content: center;
}

.hero-image img {
  width: 100%;

  max-width: 360px;

  object-fit: contain;
}

@media (max-width: 900px) {
  .homepage-grid {
    min-height: auto;

    padding: 36px 24px 56px;

    grid-template-columns: 1fr;

    gap: 40px;
  }

  .function-column {
    order: 2;
  }

  .hero-column {
    order: 1;
  }

  .hero-copy {
    margin-bottom: 24px;
  }

  .hero-copy h1 {
    font-size: 2.35rem;
  }

  .hero-image img {
    max-width: 300px;
  }
}
</style>