<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

const emit = defineEmits(['open-adplacement'])

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    {
      threshold: 0.45
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="advertising-section"
  >
    <div
      class="advertising-image-block reveal-block"
      :class="{ visible: isVisible }"
    >
      <div class="image-shell">
        <img
          src="/images/landing/advertising-1920x1080.png"
          alt="Sendnest advertising placement"
          class="hover-image"
        />
      </div>

      <p class="ad-label">Ad opportunity</p>
    </div>

    <div class="advertising-copy">
      <span class="eyebrow">Advertising</span>

      <h2>Visibility that fits the experience.</h2>

      <p>
        Sendnest offers a large visual canvas for ad placements on the main page, giving brands more visibility without crowding the user experience.
      </p>

      <p>
        It is designed for creators, tools, services, and brands that want to reach people while they are actively sharing and managing files.
      </p>

      <button
        type="button"
        class="text-link"
        @click="emit('open-adplacement')"
      >
        → Find out more
      </button>
    </div>
  </section>
</template>

<style scoped>
.advertising-section {
  padding: clamp(48px, 8vw, 110px) clamp(22px, 6vw, 90px);
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(34px, 6vw, 80px);
  align-items: center;
}

.eyebrow {
  color: var(--primary-dark);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.advertising-copy h2 {
  max-width: 560px;
  margin-top: 14px;
  color: var(--text-color);
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
  font-weight: 900;
}

.advertising-copy p {
  max-width: 560px;
  margin-top: 18px;
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.65;
}

.text-link {
  margin-top: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--primary-dark);
  color: var(--primary-dark);
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
}

.reveal-block {
  opacity: 0;
  transform: translateY(90px);
  transition: opacity 1s ease, transform 1s ease;
  will-change: opacity, transform;
}

.reveal-block.visible {
  opacity: 1;
  transform: translateY(0);
}

.image-shell {
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

.ad-label {
  margin-top: 12px;
  color: var(--text-light);
  font-size: 0.82rem;
  font-weight: 800;
}

@media (max-width: 900px) {
  .advertising-section {
    grid-template-columns: 1fr;
  }

  .advertising-image-block {
    order: 2;
  }

  .advertising-copy {
    order: 1;
  }
}
</style>