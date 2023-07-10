import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from "./router"
import { setupStore } from './store';
import i18n from './lang/index'
import CustomImg from './components/CustomImg/index.vue'
import CustomRender from './components/CustomRender/index.vue'
import 'element-plus/theme-chalk/index.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./assets/style/github.css";
import 'virtual:svg-icons-register';

const app = createApp(App)

setupStore(app);
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.component('CustomImg', CustomImg)
app.component('CustomRender', CustomRender)

app.mount("#app")
