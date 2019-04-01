import axios from 'axios'
import wx from 'weixin-js-sdk'
/**
 *获取用户微信信息
 *@param {String} url [回调地址]
 */
export function getUsrInfo(url) {
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    // 存取code
    let storage = window.localStorage
    let args = getQueryStringArgs()
    let code = decodeURIComponent(args['code'])
    localStorage.setItem('wxCode', code)

    if (storage.getItem('openId')) {} else {
        if (localStorage.getItem('wxCode') == 'undefined') {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        } else {
            const sendData = new URLSearchParams()
            sendData.append('code', code)
            axios({
                method: "post",
                url: '/wxPay/get_wx_info.do',
                data: sendData
            }).then((res) => {
                localStorage.setItem('openId', res.data.data.openid)
                localStorage.setItem('headimgurl', res.data.data.headimgurl)
                localStorage.setItem('nickname', res.data.data.nickname)
                location.reload()
            })
        }
    }
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    // console.log(fn)
    // console.log(typeof fn)
    return function() {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};

/** 
 * 判断当前是否微信小程序环境
 */

export function isminiprogream() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        wx.miniProgram.getEnv((res) => {
            if (res.miniprogram) {
                return true
            } else {
                return false
            }
        })
    }
}

export function miniProPayInfo(timeStamp, nonceStr, packageNum, paySign) {
    // let jumpUrl = encodeURIComponent(window.location)
    let path = `/page/pay/pay?timeStamp=${timeStamp}&nonceStr=${nonceStr}&package=${packageNum}&paySign=${paySign}`
    wx.miniProgram.navigateTo({
        url: path
    })
}