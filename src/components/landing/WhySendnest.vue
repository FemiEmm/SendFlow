<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

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
    class="why-sendnest-section"
  >
    <div class="why-copy">
      <span class="eyebrow">Why Sendnest</span>

      <h2>
        Temporary storage when you need it most.
      </h2>

      <p>
        Outside the house? Device storage full? Need a quick place to keep files before getting back home?
      </p>

      <p>
        Nest it with Sendnest. Upload your files, generate a transfer code, and safely retrieve everything later from another device.
      </p>

      <p>
        Save the code somewhere secure and continue where you left off.
      </p>
    </div>

    <div
      class="why-image-block reveal-block"
      :class="{ visible: isVisible }"
    >
      <div class="image-shell">
        <img
          src="/images/landing/why-sendnest-1920x1080.png"
          alt="Why use Sendnest"
          class="hover-image"
        />
      </div>

      <p class="ad-label">Ad opportunity</p>
    </div>
  </section>
</template>

<style scoped>
.why-sendnest-section {
  padding: clamp(48px, 8vw, 110px) clamp(22px, 6vw, 90px);
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
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

.why-copy h2 {
  max-width: 560px;
  margin-top: 14px;
  color: var(--text-color);
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
  font-weight: 900;
}

.why-copy p {
  max-width: 560px;
  margin-top: 18px;
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.65;
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
  .why-sendnest-section {
    grid-template-columns: 1fr;
  }
}
</style>