import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./components/routes";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-green/theme.css";
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(PrimeVue);

app.mount("#app");
