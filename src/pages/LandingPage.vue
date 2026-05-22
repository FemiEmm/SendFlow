<script setup>
import { ref } from 'vue'

import AppHeader from '../components/layout/AppHeader.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import StatsSection from '../components/landing/StatsSection.vue'
import WhySendnest from '../components/landing/WhySendnest.vue'
import AdvertisingSection from '../components/landing/AdvertisingSection.vue'
import CreativeSupport from '../components/landing/CreativeSupport.vue'
import FutureExpansion from '../components/landing/FutureExpansion.vue'
import FeaturesUpdate from '../components/landing/FeaturesUpdate.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'

const emit = defineEmits([
  'go-home',
  'open-adplacement',
  'open-home-tab'
])

const activeTab = ref('send')

const goToSend = () => {
  emit('open-home-tab', 'send')
}

const openAdPlacement = () => {
  emit('open-adplacement')
}

const handleTabChange = (tab) => {
  activeTab.value = tab
  emit('open-home-tab', tab)
}
</script>

<template>
  <div class="landing-page">
    <AppHeader
      :model-value="activeTab"
      @update:model-value="handleTabChange"
      @open-landing="$emit('go-home')"
    />

    <main>
      <HeroSection @send-now="goToSend" />

      <WhySendnest />

      <StatsSection />

      <FeaturesUpdate />

      <AdvertisingSection @open-adplacement="openAdPlacement" />

      <CreativeSupport />

      <FutureExpansion />

      <LandingFooter />
    </main>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100svh;
  background: var(--bg-color);
  color: var(--text-color);
   font-family: 'Bricolage Grotesque', sans-serif;
}

main {
  width: 100%;
}
</style>