<script setup>
const emit = defineEmits(['send-now'])
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <h1>
        <span>CooCoo, to you</span>
        <span>Fellow nester</span>
      </h1>

      <p>
        The simplest way to send large files. Built for creators, students, teams, and everyday sharing. A lightweight platform designed to move files quickly while creating room for creative support and meaningful partnerships.
      </p>

      <button
        type="button"
        class="hero-button"
        @click="emit('send-now')"
      >
        Send file now
      </button>
    </div>

    <div class="hero-image-wrap">
      <img
        src="/images/landing/hero-1920x1080.png"
        alt="Sendnest file transfer feature"
        class="hover-image"
      />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: clamp(56px, 8vw, 110px) clamp(22px, 6vw, 90px) clamp(36px, 6vw, 70px);
  
}

.hero-copy {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-copy h1 {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.2rem, 8vw, 7rem);
  line-height: 0.92;
  font-weight: 900;
  color: var(--text-color);
}

.hero-copy p {
  max-width: 760px;
  margin: 28px auto 0;
  color: var(--text-light);
  font-size: clamp(1rem, 1.7vw, 1.25rem);
  line-height: 1.65;
}

.hero-button {
  margin-top: 34px;
  padding: 16px 30px;
  background: var(--primary-dark);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  color: var(--card-color);
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hero-button:hover {
  transform: translateY(-2px) scale(1.03);
}

.hero-image-wrap {
  max-width: 1180px;
  margin: 60px auto 0;
  overflow: hidden;
  border-radius: 32px;
  border: 1.5px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.hover-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.hover-image:hover {
  transform: scale(1.04);
}
</style>