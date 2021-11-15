import Vue from 'vue'
import App from './App.vue'
import Scroll from '@/directives/scroll'
import TimeAgo from '@/directives/timeAgo'
import '@/assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.directive('scroll', Scroll);

Vue.directive('time-ago', TimeAgo);

new Vue({
  render: h => h(App),
}).$mount('#app')
