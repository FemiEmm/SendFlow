import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/global.css'

import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './fontawesome'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')