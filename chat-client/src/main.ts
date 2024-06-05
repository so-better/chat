import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'mvi-web-plus/lib/style.css'
import mvi from 'mvi-web-plus'
import './styles/defualt.less'
createApp(App).use(store).use(router).use(mvi).mount('#app')
