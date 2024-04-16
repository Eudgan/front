import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import YmapPlugin from 'vue-yandex-maps'
import vClickOutside from "click-outside-vue3"
import Vue3Lottie from 'vue3-lottie'

import './assets/style/reset.css'
import './assets/style/main.css'
import './assets/fonts/evolventa/woff/evolventa.css'
import './assets/fonts/futurespore/otf/futurespore.css'

const settings = {
    apiKey: '934926f0-17d8-4f25-bef8-f02d1d33f110',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

createApp(App).use(store).use(router).use(YmapPlugin, settings).use(vClickOutside).use(Vue3Lottie).mount('#app')
