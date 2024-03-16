import { createApp } from 'vue'

import App from './App.vue'
import ExampleRenderer from "./ExampleRenderer.vue";

const app = createApp(App);
app.component('ExampleRenderer', ExampleRenderer)
app.mount('#app')
