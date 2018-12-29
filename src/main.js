// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './Layout'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.axios = axios

// 李岩
axios.defaults.baseURL = "http://192.168.0.26:8080/nsi-1.0"

// 生产
// axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0"

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { Layout },
    template: '<Layout/>'
})