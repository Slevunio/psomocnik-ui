import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue' //główny szablon
import router from './router'
import './assets/style.css'
//import store from './store'

Vue.config.productionTip = false;   //nie wyswietlaj podpowiedzi

// Bootstrap
Vue.use(BootstrapVue);  //instlauje bootstrapvue
//Vue.use(Bootstrap);

new Vue({
    router,
    //store,
    render: h => h(App)     //h -> hyperscript -> skrypt generujacy hmtla (takie createElement w tym wypadku)

}).$mount('#app');

