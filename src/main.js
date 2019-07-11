import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import jQuery from "jquery";
import "popper.js";
import bootstrap from "bootstrap";
import "./assets/app.scss";

// firestore---------------------------------------
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";

Vue.use(VueFirestore);

// sweetalert--------------------------------------

import Swal from 'sweetalert2';

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;


window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

// Vue.component('Navbar', require('./components/Navbar.vue').default);

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
