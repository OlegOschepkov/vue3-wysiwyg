import { createApp } from 'vue';
import components from '@/components';
import App from './App.vue';
import Vue3Sanitize from "vue-3-sanitize";

const app = createApp(App);
app.use(Vue3Sanitize);

components.forEach(component => {
  app.component(component.__name, component)
})

import '@/assets/scss/style.scss';

app.mount('#app');
