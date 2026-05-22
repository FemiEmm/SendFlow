<script setup>
const creativeImages = [
  '/images/landing/creative-1.png',
  '/images/landing/creative-2.png',
  '/images/landing/creative-3.png',
  '/images/landing/creative-4.png',
  '/images/landing/creative-5.png',
  '/images/landing/creative-6.png',
  '/images/landing/creative-7.png',
  '/images/landing/creative-8.png',
  '/images/landing/creative-9.png',
  '/images/landing/creative-10.png'
]

const loopImages = [
  ...creativeImages,
  ...creativeImages
]
</script>

<template>
  <section class="creative-section">
    <div class="creative-copy">
      <h2>
        <span>Creative</span>
        <span>Support</span>
      </h2>

      <p>
        We provide visual space for artists and creators to showcase work to a wider audience across the platform.
      </p>
    </div>

    <div class="creative-carousel">
      <div class="creative-track">
        <div
          v-for="(image, index) in loopImages"
          :key="`${image}-${index}`"
          class="creative-slide"
        >
          <img
            :src="image"
            :alt="`Creative support artwork ${index + 1}`"
            class="hover-image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.creative-section {
  padding: clamp(48px, 8vw, 110px) 0;
  overflow: hidden;
}

.creative-copy {
  padding: 0 clamp(22px, 6vw, 90px);
}

.creative-copy h2 {
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  font-weight: 900;
}

.creative-copy p {
  max-width: 680px;
  margin-top: 22px;
  color: var(--text-light);
  font-size: 1.08rem;
  line-height: 1.65;
}

.creative-carousel {
  width: 100%;
  margin-top: 42px;
  overflow: hidden;
}

.creative-track {
  width: max-content;
  padding-left: clamp(22px, 6vw, 90px);
  display: flex;
  gap: 18px;
  animation: autoScroll 45s linear infinite;
}

.creative-carousel:hover .creative-track {
  animation-play-state: paused;
}

.creative-slide {
  width: min(360px, 62vw);
  overflow: hidden;
  border-radius: 28px;
  border: 1.5px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
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

@keyframes autoScroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>