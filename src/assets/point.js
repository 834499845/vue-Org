// 积分模块
import Vue from 'vue'
const point = {
    // 积分设置
    // 查看基础设置-签到规则查看
    pointIntegralSignGetSignRule: function pointIntegralSignGetSignRule(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
      })
    },
    // 设置积分基础签到规则
    pointIntegralSignSetSignRule: function pointIntegralSignSetSignRule(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
      })
    },
    // 停用积分系统    
    pointIntegralSignDisableSystem: function pointIntegralSignDisableSystem(ip, postdata) {
      return Vue.http.post(ip, postdata).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.body)
        } else {
            return Promise.reject(response.data.message)
        }
     })
    },
    // 积分获取
    // 获取各个积分配置项
    pointIntegralSignGetAttrList: function pointIntegralSignGetAttrList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 编辑积分配置项
    pointIntegralConfigAttrUpdateConfigAttr: function pointIntegralConfigAttrUpdateConfigAttr(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 修改配置项状态
    pointIntegralConfigAttrChangeAttrStatus: function pointIntegralConfigAttrChangeAttrStatus(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 积分统计
    // 按条件分页查询用户积分列表接口
    pointIntegralUserGetUserIntegralListByCondition: function pointIntegralUserGetUserIntegralListByCondition(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 分页获取用户积分明细列表接口(查看详情接口)
    pointIntegralUserDetailGetDetailList: function pointIntegralUserDetailGetDetailList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 编辑用户积分接口
    pointIntegralUserUpdateUserIntegral: function pointIntegralUserUpdateUserIntegral(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 勋章管理
    // 新增勋章接口
    pointIntegralMedalInsert: function pointIntegralMedalInsert(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 编辑勋章接口
    pointIntegralMedalUpdate: function pointIntegralMedalUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
    // 分页获取勋章列表接口
    pointIntegralMedalGetMedalByPage: function pointIntegralMedalGetMedalByPage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
          if (response.status === 200) {
              return Promise.resolve(response.body)
          } else {
              return Promise.reject(response.data.message)
          }
       })
    },
}
export default point