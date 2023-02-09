import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import Toaster from "@meforma/vue-toaster";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import { 
  Button, message, List, Menu 
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

library.add(faUserSecret)
createApp(App)
  .use(router)
  .use(store)
  .use(Button)
  .use(Menu)
  .use(List)
  .use(Toaster)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")

 .config.globalProperties.$message = message;