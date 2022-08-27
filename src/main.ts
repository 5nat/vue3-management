import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { initRouter } from './router'
import { initStore } from './store'
import 'default-passive-events'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
initRouter(app)
initStore(app)
app.mount('#app')
