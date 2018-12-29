import Vue from 'vue'
import Router from 'vue-router'
import searchPage from '@/pages/searchPage'
import detailPage from '@/pages/detailPage'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: searchPage
    }, {
        path: '/detailPage/:id',
        name: 'detail',
        component: detailPage
    }]
})