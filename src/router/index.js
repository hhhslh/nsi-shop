import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/home'
import searchPage from '@/pages/searchPage'
import personalPage from '@/pages/personal'
import detailPage from '@/pages/detailPage'
import orderPage from '@/pages/order'
import addressPage from '@/pages/address'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: HomePage
        },
        {
            path: '/mine',
            component: personalPage
        },
        {
            path: '/list',
            name: 'list',
            component: searchPage
        }, {
            path: '/detailPage/:id',
            name: 'detail',
            component: detailPage
        }, {
            path: '/order',
            component: orderPage
        }, {
            path: '/manageAddress',
            name: 'manageAddress',
            component: addressPage
        }
    ]
})