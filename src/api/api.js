import {get, post } from '@/api/http'

// 首页banner
export const getHomeBanner = p => get('/manager/official/list.do', p)

// 滚动新闻
export const getScrollNews = p => post('/article/list.do', p)

// 课堂列表
export const getCourseList = p => post('/courseList/get_course_list.do', p)

// 课堂详情
export const getCourseDetail = p => get('/category/list.do', p)

//父课堂详情
export const getFcourseDetail = p => get('/courseList/get_course_item.do', p)

// 书籍列表
export const getBookList = p => post('/goods/goods_list.do', p)

// 首页最受欢迎、特价、推荐书籍
export const getBookPopList = p => post('/goods/Get_Home_Config.do', p)

// 地址创建
export const createAddress = p => get('/ShopAddress/add.do', p)

// 地址更换
export const editAddress = p => get('/ShopAddress/update.do', p)

// 获取地址
export const getAddress = p => get('/ShopAddress/getList.do', p)

// 判断用户注册完整
export const judgeuserInfo = p => get('/order/valid_userInfo.do', p)

// 用户信息补全
export const complementInfo = p => post('/order/mall_register.do', p)

// 创建课程订单
export const createCourseOrder = p => get('/order/create_course.do', p)

// 微信支付
export const wxPay = p => get('/Pay/WxPay_public.do', p)

// 验证课程权限
export const checkCoursePrivilege = p => get('/ClassUser/vierify_open.do', p)

// 插入课程观看权限
export const insertCoursePrivilege = p => get('/ClassUser/Course_User_Insert.do', p)