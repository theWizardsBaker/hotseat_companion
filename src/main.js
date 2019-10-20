import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/main.scss'

Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.mixin({
  methods: {
	delay(time, v){
       return new Promise((resolve) => {
           setTimeout(resolve.bind(null, v), time)
       });
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
