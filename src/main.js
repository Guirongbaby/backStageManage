import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(axios);
Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
