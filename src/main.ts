import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./components/routes";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";
import BadgeDirective from "primevue/badgedirective";
import ToastService from "primevue/toastservice";
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.directive("badge", BadgeDirective);
app.mount("#app");
