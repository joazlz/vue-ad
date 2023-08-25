/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import Emitter from 'tiny-emitter';
// import * as msal from "@azure/msal-browser";



const app = createApp(App)

app.config.globalProperties.$emitter = new Emitter();
registerPlugins(app)
app.mount('#app')
