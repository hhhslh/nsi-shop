import {get, post } from '@/api/http'

// 首页banner
export const getHomeBanner = p => get('/manager/official/list.do', p)

// 滚动新闻
export const getScrollNews = p => post('/article/list.do', p)

// 课堂列表
export const getCourseList = p => post('/courseList/get_course_list.do', p)

// 课堂详情
export const getCourseDetail = p => get('/category/list.do', p)

// 书籍列表
export const getBookList = p => post('/goods/goods_list.do', p)

// 地址创建
export const createAddress = p => get('/ShopAddress/add.do', p)

// 地址更换
export const editAddress = p => get('/ShopAddress/update.do', p)

// 获取地址
export const getAddress = p => get('/ShopAddress/getList.do', p)