<script setup>
import { ref } from 'vue'

import AppHeader from '../components/layout/AppHeader.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'

const emit = defineEmits(['go-home', 'open-sendnext'])

const activeTab = ref('send')

const goBack = () => {
  emit('go-home')
}
</script>

<template>
  <div class="ad-page">
    <AppHeader
      v-model="activeTab"
      @open-sendnext="$emit('open-sendnext')"
    />

    <main class="ad-main">
      <section class="ad-hero">
        <button
          type="button"
          class="back-button"
          @click="goBack"
        >
          ← Back
        </button>

        <h1>Ad placement</h1>

        <p>
          Sendnest gives brands, creators, and creative tools access to clean visual placements across high-traffic areas of the platform.
        </p>
      </section>

      <section class="ad-grid">
        <div class="ad-card">
          <h2>Main page visibility</h2>

          <p>
            Place your brand in front of users while they send, receive, and manage temporary file transfers.
          </p>
        </div>

        <div class="ad-card">
          <h2>Creative audience</h2>

          <p>
            Reach designers, artists, students, freelancers, and everyday users who work across devices.
          </p>
        </div>

        <div class="ad-card">
          <h2>Large visual canvas</h2>

          <p>
            Use wide-format image spaces that feel natural inside the product instead of forced or cluttered.
          </p>
        </div>
      </section>

      <section class="ad-contact">
        <h2>Interested in advertising?</h2>

        <a href="mailto:cquencecomics@gmail.com">
          Contact us
        </a>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>

<style scoped>
.ad-page {
  min-height: 100svh;
  background: var(--bg-color);
}

.ad-main {
  padding: clamp(42px, 7vw, 90px) clamp(22px, 6vw, 90px);
}

.ad-hero {
  max-width: 820px;
  margin: 0 auto 48px;
  text-align: center;
}

.back-button {
  margin-bottom: 24px;
  background: transparent;
  border: none;
  color: var(--primary-dark);
  font-weight: 900;
  cursor: pointer;
}

.ad-hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  font-weight: 900;
}

.ad-hero p {
  max-width: 680px;
  margin: 22px auto 0;
  color: var(--text-light);
  font-size: 1.05rem;
  line-height: 1.65;
}

.ad-grid {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.ad-card {
  padding: 26px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 26px;
  box-shadow: var(--shadow-sm);
}

.ad-card h2 {
  font-size: 1.25rem;
  font-weight: 900;
}

.ad-card p {
  margin-top: 12px;
  color: var(--text-light);
  line-height: 1.55;
}

.ad-contact {
  max-width: 760px;
  margin: 70px auto 0;
  padding: 34px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  text-align: center;
}

.ad-contact h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
  font-weight: 900;
}

.ad-contact a {
  margin-top: 20px;
  display: inline-flex;
  padding: 14px 24px;
  background: var(--primary-dark);
  color: var(--card-color);
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
}

@media (max-width: 760px) {
  .ad-grid {
    grid-template-columns: 1fr;
  }
}
</style>