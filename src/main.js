import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { router } from "./routes/routes.js"

import '@quasar/extras/material-icons/material-icons.css'


import 'quasar/src/css/index.sass'


import App from './App.vue'

const myApp = createApp(App)

myApp.use(router)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})


myApp.mount('#app')

