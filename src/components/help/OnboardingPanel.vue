<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

const emit = defineEmits(['go-send', 'go-receive', 'finish'])

const currentSlide = ref(0)

const slides = [
  {
    image: '/images/onboarding_1.png',
    alt: 'Bird standing between sender and receiver mailboxes',
    title: 'Quick sending',
    body: 'Upload files, generate a code, and receive them on another device.'
  },
  {
    image: '/images/onboarding_2.png',
    alt: 'Bird holding a signup form with an X mark',
    title: 'No accounts',
    body: 'No accounts or complicated setup. Just upload and share.'
  },
  {
    image: '/images/onboarding_3.png',
    alt: 'Bird holding a four letter transfer code',
    title: 'Easy codes',
    body: 'Use a simple 4-letter code to collect your files from another device.'
  }
]

const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value += 1
    return
  }

  emit('finish')
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value -= 1
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].screenX
}

const handleTouchEnd = (event) => {
  touchEndX.value = event.changedTouches[0].screenX

  handleSwipe()
}

const handleSwipe = () => {
  const swipeDistance = touchStartX.value - touchEndX.value

  if (swipeDistance > 50) {
    nextSlide()
  }

  if (swipeDistance < -50) {
    previousSlide()
  }
}

const handlePcSkip = () => {
  if (window.innerWidth >= 641) {
    emit('finish')
  }
}

onMounted(() => {
  handlePcSkip()

  window.addEventListener('resize', handlePcSkip)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handlePcSkip)
})
</script>

<template>
  <section class="onboarding">
    <div class="onboarding-copy">
      <h1>{{ slides[currentSlide].title }}</h1>

      <p>{{ slides[currentSlide].body }}</p>
    </div>

    <div class="onboarding-image-wrap"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >  
      <button
        type="button"
        class="image-arrow left-arrow"
        :disabled="currentSlide === 0"
        @click="previousSlide"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>

      <img
        class="onboarding-image"
        :src="slides[currentSlide].image"
        :alt="slides[currentSlide].alt"
      />

      <button
        type="button"
        class="image-arrow right-arrow"
        @click="nextSlide"
      >
        <font-awesome-icon
          :icon="currentSlide === slides.length - 1 ? 'check' : 'chevron-right'"
        />
      </button>
    </div>

    <div class="onboarding-bottom-row">
      <button
        type="button"
        class="square-button receive-button"
        @click="emit('go-receive')"
      >
        Receive
      </button>

      <div class="slide-dots">
        <button
          v-for="(slide, index) in slides"
          :key="slide.image"
          type="button"
          class="dot"
          :class="{ active: currentSlide === index }"
          :aria-label="`Go to slide ${index + 1}`"
          @click="goToSlide(index)"
        ></button>
      </div>

      <button
        type="button"
        class="square-button send-button"
        @click="emit('go-send')"
      >
        Send
      </button>
    </div>
  </section>
</template>

<style scoped>
.onboarding {
  width: 100%;
  min-height: 95svh;
  padding: 76px 22px calc(26px + env(safe-area-inset-bottom));
  background: var(--bg-color);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 24px;
  overflow: hidden;
}

.onboarding-copy {
  max-width: 420px;
}

.onboarding-copy h1 {
  color: var(--text-color);
  font-size: 3.15rem;
  line-height: 1.08;
  font-weight: 900;
  text-align: left;
}

.onboarding-copy p {
  margin-top: 12px;
  color: var(--text-light);
  font-size: 0.98rem;
  line-height: 1.55;
  text-align: left;
}

.onboarding-image-wrap {
  position: relative;
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.onboarding-image {
  width: 100%;
  max-width: 360px;
  max-height: 44svh;
  object-fit: contain;
}

.image-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background: rgb(from var(--card-color) r g b / 0.92);
  backdrop-filter: blur(10px);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: var(--shadow-sm);
}

.image-arrow:disabled {
  opacity: 0.3;
}

.left-arrow {
  left: 2px;
}

.right-arrow {
  right: 2px;
}

.onboarding-bottom-row {
  width: 100%;
  display: grid;
  grid-template-columns: 82px 1fr 82px;
  align-items: center;
  gap: 12px;
}

.square-button {
  width: 82px;
  height: 58px;
  border: 1.5px solid var(--border-color);
  border-radius: 18px;
  font-size: 0.82rem;
  font-weight: 900;
  background: var(--card-color);
  color: var(--text-color);
  box-shadow: var(--shadow-sm);
}

.send-button {
  background: var(--primary-dark);
  color: var(--card-color);
}

.slide-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.dot {
  width: 9px;
  height: 9px;
  background: var(--text-light);
  border: none;
  border-radius: 999px;
  opacity: 0.35;
}

.dot.active {
  width: 24px;
  background: var(--primary-dark);
  opacity: 1;
}

@media (min-width: 641px) {
  .onboarding {
    display: none;
  }
}

@media (max-height: 740px) {
  .onboarding {
    padding-top: 34px;
    gap: 14px;
  }

  .onboarding-copy h1 {
    font-size: 2.35rem;
  }

  .onboarding-copy p {
    font-size: 0.9rem;
  }

  .onboarding-image {
    max-height: 38svh;
  }

  .square-button {
    height: 50px;
  }
}
</style>