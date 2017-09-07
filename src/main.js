// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

var VueFire = require('vuefire')
var Firebase = require('firebase')

Vue.use(VueFire)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCJXJcBXXOn6E8IXNCzl3depFZ8xT0fl98",
  authDomain: "stack-active.firebaseapp.com",
  databaseURL: "https://stack-active.firebaseio.com",
  projectId: "stack-active",
  storageBucket: "stack-active.appspot.com",
  messagingSenderId: "106526629043"
};
var firebaseApp = Firebase.initializeApp(config);
var db = firebaseApp.database()


Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App ref="App"/>',
  data() {
    return { login: 0, token: '', btns: [] }
  },
  firebase: {
    requests: db.ref('/requests/'),
    tasks: db.ref('/tasks/'),
  },
  components: { App },
  methods: {
    openFormRequest() {
      this.$router.push({
        name: 'page-list-requests'
      })
    }
  }
})