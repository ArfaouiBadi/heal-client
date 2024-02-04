import { createApp } from "vue";

import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./components/routes";
import PrimeVue from "primevue/config";
import BadgeDirective from "primevue/badgedirective";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(pinia);
app.directive("badge", BadgeDirective);
app.mount("#app");
