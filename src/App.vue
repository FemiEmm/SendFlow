<script setup>
import {
  ref,
  onMounted
} from 'vue'

import { Preferences } from '@capacitor/preferences'

import HomePage from './pages/HomePage.vue'
import SendNext from './pages/SendNext.vue'
import OnboardingPanel from './components/help/OnboardingPanel.vue'

const currentPage = ref('home')
const startTab = ref('send')

const hasSeenOnboarding = ref(false)
const loading = ref(true)

const openSendnextPage = () => {
  currentPage.value = 'sendnext'
}

const openHomePage = () => {
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
      @re-onboard="reOnboardUser"
    />

    <SendNext
      v-if="currentPage === 'sendnext'"
      @go-home="openHomePage"
    />
  </template>
</template>