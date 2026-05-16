<script setup>
defineEmits(['go-home'])
</script>

<template>
  <main class="sendnext-page">
    <header class="sendnext-header">
      <button
        class="brand-back"
        type="button"
        @click="$emit('go-home')"
      >
        <img
          src="/Logo/SendNest.svg"
          alt="Sendnest logo"
        />

        <span>Back to Sendnest</span>
      </button>
    </header>

    <section class="sendnext-content">
      <div class="info-row">
        <div class="info-card">
          <h1>About me</h1>

          <p>
            My name is Olufemi Olaniyi. I designed Sendnest as a simple way to move files between devices without needing accounts, flash drives, or complicated setup.
          </p>
        </div>

        <div class="info-card">
          <h2>Why I designed this app</h2>

          <p>
            I wanted a tool that solves a common problem: needing to move a file quickly from one device to another. Sendnest keeps the process simple. Upload the file, keep the code, and download it when needed.
          </p>
        </div>
      </div>

      <div class="info-card large-card">
        <h2>What Sendnest is about</h2>

        <p>
          Sendnest is a temporary file transfer app built for everyday use. It helps people send files between phones, tablets, laptops, and desktops using short transfer codes.
        </p>

        <p>
          It is meant for students, creators, workers, and anyone who needs a fast way to move files without signing in or connecting devices with cables. The app is useful when storage is low, when a file is needed on another device, or when someone wants to save a file briefly and collect it later.
        </p>

        <p>
          Sendnest solves the small but frustrating problem of file movement. Instead of searching for a cable, emailing files to yourself, or using a flash drive, you can upload, copy the code, and download the file from another device.
        </p>

        <p>
          The goal is simple: make temporary file sharing feel quick, clean, and easy to understand.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sendnext-page {
  min-height: 100svh;
  background: var(--bg-color);
  padding: 32px clamp(18px, 5vw, 72px);
}

.sendnext-header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 36px;
}

.brand-back {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  padding: 10px 18px;
  color: var(--text-color);
  font-weight: 800;
  cursor: pointer;
}

.brand-back img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.sendnext-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-card {
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}

.info-card h1,
.info-card h2 {
  color: var(--text-color);
  font-weight: 900;
  line-height: 1.1;
}

.info-card h1 {
  font-size: 2.2rem;
}

.info-card h2 {
  font-size: 1.6rem;
}

.info-card p {
  margin-top: 14px;
  color: var(--text-light);
  font-size: 0.98rem;
  line-height: 1.7;
}

.large-card p + p {
  margin-top: 12px;
}

@media (max-width: 820px) {
  .info-row {
    grid-template-columns: 1fr;
  }

  .sendnext-page {
    padding: 24px 18px;
  }

  .info-card {
    padding: 22px;
  }

  .info-card h1 {
    font-size: 1.85rem;
  }

  .info-card h2 {
    font-size: 1.35rem;
  }
}
</style>