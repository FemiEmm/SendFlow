<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

const futureCards = [
  {
    title: 'Permanent cloud storage',
    description:
      'Future updates will introduce long-term storage options for users who want to keep important files available beyond temporary transfers.',
    image: '/images/landing/Fut-expansions-1.png'
  },
  {
    title: 'Larger upload sizes',
    description:
      'Sendnest plans to support bigger files for creators, designers, video editors, and teams working with heavier project assets.',
    image: '/images/landing/Fut-expansions-2.png'
  },
  {
    title: 'Mobile-first experience',
    description:
      'A dedicated mobile experience is in development to make sending, storing, and retrieving files easier while on the go.',
    image: '/images/landing/Fut-expansions-3.png'
  },
  {
    title: 'Creative and business tools',
    description:
      'Future features may include branded transfer spaces, improved sharing controls, and better workflows for creators and businesses.',
    image: '/images/landing/Fut-expansions-4.png'
  }
]

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    {
      threshold: 0.25
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
        Sendnest grows with the way you share files
      </h2>
    </div>

    <div class="future-grid">
      <div
        v-for="(card, index) in futureCards"
        :key="card.title"
        class="future-card"
        :class="{ visible: isVisible }"
        :style="{ transitionDelay: `${index * 0.16}s` }"
      >
        <div class="future-image-wrap">
          <img
            :src="card.image"
            :alt="card.title"
            class="future-image"
          />
        </div>

        <h3>{{ card.title }}</h3>

        <p>
          {{ card.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.future-section {
  padding: clamp(48px, 8vw, 110px) clamp(22px, 6vw, 90px);
}

.future-copy {
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.future-copy h2 {
  color: var(--text-color);
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 1.05;
  font-weight: 500;
}

.future-grid {
  margin-top: clamp(54px, 8vw, 96px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 4vw, 42px);
}

.future-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(70px);
  transition: opacity 0.9s ease, transform 0.9s ease;
  will-change: opacity, transform;
}

.future-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.future-image-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 28px;
  overflow: visible;
  border-radius: 28px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.future-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.45s ease;
}

.future-image:hover {
  transform: scale(1.04);
}

.future-card h3 {
  max-width: 260px;
  color: var(--text-color);
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  line-height: 1.12;
  font-weight: 900;
}

.future-card p {
  max-width: 300px;
  margin-top: 18px;
  color: var(--text-light);
  font-size: clamp(0.98rem, 1.4vw, 1.12rem);
  line-height: 1.55;
}

@media (max-width: 1024px) {
  .future-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .future-copy {
    text-align: left;
  }

  .future-grid {
    grid-template-columns: 1fr;
  }
}
</style>