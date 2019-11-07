import Vue from 'vue'
import App from './App'
import vuetify from '../plugins/vuetify'
import { remote } from 'electron'
import Datastore from 'nedb'
import path from 'path'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$electron = remote

// db 설정
Vue.prototype.$db = new Datastore({ filename: path.join(remote.app.getPath('appData'), 'Electron', 'timer.db'), autoload: true })

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
