import Vue from 'vue'
import Vuetify, {
  VApp,
  VAppBar,
  VToolbar,
  VToolbarTitle,
  VSpacer,
  VContainer,
  VContent,
  VRow,
  VCol,
  VCard,
  VSimpleTable,
  VFooter,
  VBtn
} from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp,
    VAppBar,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VContainer,
    VContent,
    VRow,
    VCol,
    VCard,
    VSimpleTable,
    VFooter,
    VBtn
  }
})

export default new Vuetify({})
