<script setup>
import { ref } from 'vue'

import HomePage from './pages/HomePage.vue'
import SendNext from './pages/SendNext.vue'

const currentPage = ref('home')

const openSendnextPage = () => {
  currentPage.value = 'sendnext'
}

const openHomePage = () => {
  currentPage.value = 'home'
}
</script>

<template>
  <HomePage
    v-if="currentPage === 'home'"
    @open-sendnext="openSendnextPage"
  />

  <SendNext
    v-if="currentPage === 'sendnext'"
    @go-home="openHomePage"
  />
</template>