<script setup>
import {
  ref,
  onMounted
} from 'vue'

import { Preferences } from '@capacitor/preferences'

import HomePage from './pages/HomePage.vue'
import SendNext from './pages/SendNext.vue'
import LandingPage from './pages/LandingPage.vue'
import AdPlacement from './pages/AdPlacement.vue'
import OnboardingPanel from './components/help/OnboardingPanel.vue'

import { runStorageCleanup } from './services/storageCleaner'

const currentPage = ref('home')
const startTab = ref('send')

const hasSeenOnboarding = ref(false)
const loading = ref(true)

const openSendnextPage = () => {
  currentPage.value = 'sendnext'
}

const openLandingPage = () => {
  currentPage.value = 'landing'
}

const openAdPlacementPage = () => {
  currentPage.value = 'adplacement'
}

const openHomePage = () => {
  currentPage.value = 'home'
}

const openHomeTab = (tab) => {
  startTab.value = tab
  currentPage.value = 'home'
}

const finishOnboarding = async () => {
  await Preferences.set({
    key: 'onboarding-seen',
    value: 'true'
  })

  hasSeenOnboarding.value = true
}

const goToSend = async () => {
  await finishOnboarding()

  startTab.value = 'send'
  currentPage.value = 'home'
}

const goToReceive = async () => {
  await finishOnboarding()

  startTab.value = 'receive'
  currentPage.value = 'home'
}

const reOnboardUser = async () => {
  await Preferences.remove({
    key: 'onboarding-seen'
  })

  hasSeenOnboarding.value = false
  startTab.value = 'send'
  currentPage.value = 'home'
}

onMounted(async () => {
  runStorageCleanup()

  const { value } = await Preferences.get({
    key: 'onboarding-seen'
  })

  hasSeenOnboarding.value = value === 'true'

  loading.value = false
})
</script>

<template>
  <OnboardingPanel
    v-if="!loading && !hasSeenOnboarding"
    @finish="finishOnboarding"
    @go-send="goToSend"
    @go-receive="goToReceive"
  />

  <template v-else-if="!loading">
    <HomePage
      v-if="currentPage === 'home'"
      :start-tab="startTab"
      @open-sendnext="openSendnextPage"
      @open-landing="openLandingPage"
      @re-onboard="reOnboardUser"
    />

    <SendNext
      v-else-if="currentPage === 'sendnext'"
      @go-home="openHomePage"
    />

    <LandingPage
      v-else-if="currentPage === 'landing'"
      @go-home="openHomePage"
      @open-home-tab="openHomeTab"
      @open-adplacement="openAdPlacementPage"
    />

    <AdPlacement
      v-else-if="currentPage === 'adplacement'"
      @go-home="openLandingPage"
    />
  </template>
</template>