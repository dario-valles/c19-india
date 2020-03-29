import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueTailwind from "vue-tailwind";
import "./assets/css/main.css";
import "./assets/css/tailwind.css";
// import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(VueTailwind);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
