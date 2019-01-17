import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/home'
import searchPage from '@/pages/searchPage'
import personalPage from '@/pages/personal'
import detailPage from '@/pages/detailPage'
import orderPage from '@/pages/order'
import addressPage from '@/pages/address'
import editAddressPage from '@/components/address/editAddress'
import createAddressPage from '@/components/address/createAddress'
import orderContainerCom from '@/components/order/orderContainer'
import allOrderCom from '@/components/order/allOrder'
import waitPayCom from '@/components/order/waitPay'
import waitSendCom from '@/components/order/waitSend'
import confirmOrderCom from '@/components/order/confirmOrder'
import successOrderCom from '@/components/order/successOrder'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: HomePage
        },
        {
            path: '/mine',
            component: personalPage,
            // redirect: 'mine/all',
            // children: [{
            //     path: '/mine/all',
            //     component: allOrderCom
            // }, {
            //     path: '/mine/wait',
            //     component: waitSendCom
            // }, {
            //     path: '/mine/confirm',
            //     component: confirmOrderCom
            // }]
        },
        {
            path: '/orderState',
            component: orderContainerCom,
            redirect: "/orderState/all",
            children: [{
                path: "/orderState/all",
                component: allOrderCom
            }, {
                path: "/orderState/wait",
                component: waitPayCom
            }, {
                path: "/orderState/send",
                component: waitSendCom
            }, {
                path: "/orderState/confirm",
                component: confirmOrderCom
            }, {
                path: "/orderState/success",
                component: successOrderCom
            }]
        },
        {
            path: "/allOrder",
            component: allOrderCom
        },
        {
            path: '/waitPay',
            component: waitPayCom
        },
        {
            path: "/waitOrder",
            component: waitSendCom
        },
        {
            path: '/confirmOrder',
            component: confirmOrderCom
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
        }, {
            path: '/editAddress',
            component: editAddressPage
        }, {
            path: '/createAddress',
            component: createAddressPage
        }
    ]
})