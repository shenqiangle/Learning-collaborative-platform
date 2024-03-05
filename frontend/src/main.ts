
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// custom element css
import "@/styles/element.scss";
// svg icons
// import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue';

import router from './routers';


const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// register the element Icons component
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });



  
app.use(ElementPlus)

app.use(router)

app.use(pinia)

app.mount('#app')
