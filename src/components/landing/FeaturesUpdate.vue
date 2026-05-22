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
      threshold: 0.4
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
    class="future-section"
  >
    <div class="future-copy">
      <h2>
        <span>Mobile</span>
        <span>Experience</span>
      </h2>

      <p>
        The Sendnest mobile experience is currently in development, bringing faster file transfers, smoother access across devices, and a more seamless way to send, store, and retrieve files on the go. Designed for flexibility and convenience, the mobile app will make file sharing feel even more effortless wherever you are.
      </p>
    </div>

    <div
      class="future-image-wrap reveal-block"
      :class="{ visible: isVisible }"
    >
      <img
        src="/images/landing/mobile-experience-1920x1080.png"
        alt="Future Sendnest expansion"
        class="hover-image"
      />
    </div>
  </section>
</template>

<style scoped>
.future-section {
  padding: clamp(48px, 8vw, 110px) 0;
}

.future-copy {
  padding: 0 clamp(22px, 6vw, 90px);
  margin-bottom: 44px;
}

.future-copy h2 {
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  font-weight: 900;
}

.future-copy p {
  max-width: 760px;
  margin-top: 22px;
  color: var(--text-light);
  font-size: 1.08rem;
  line-height: 1.65;
}

.future-image-wrap {
  width: 100%;
  height: min(72vw, 720px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.45s ease;
}

.hover-image:hover {
  transform: scale(1.04);
}

.reveal-block {
  opacity: 0;
  transform: translateY(90px);
  transition: opacity 1s ease, transform 1s ease;
}

.reveal-block.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>