// 后台管理模块
import Vue from 'vue'
import { posix } from 'path';
const health = {
    // 账户管理*******************************************************
    // 新增账户
    adminAddAcount: function adminAddAcount(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取账户列表
    adminListAcount: function adminListAcount(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 账户和角色关联
    adminAcountAndRole: function adminAcountAndRole(ip, postdata) {
        var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 账户下角色列表
    adminAcountAndRoleList: function adminAcountAndRoleList(ip, postdata) {
        // var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token + '&type=' + postdata.type
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除账户下角色
    adminDelAcountAndRole: function adminDelAcountAndRole(ip, postdata) {
        // var ipstr = ip + '/' + postdata.accountId + '?token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除角色下资源
    adminDelResRole: function adminDelResRole(ip, postdata) {
        // var ipstr = ip + '/' + postdata.roleId + '?token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 账户下角色列表
    adminListResRole: function adminListResRole(ip, postdata) {
        var ipstr = ip + '/' + postdata.roleId + '?token=' + postdata.token + '&type=' + postdata.type
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改账户状态
    adminStateAcount: function adminStateAcount(ip, postdata) {
        var ipstr = ip + '?id=' + postdata.id + '&enable=' + postdata.enable + '&token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除账户
    adminDelAcount: function adminDelAcount(ip, postdata) {
        var ipstr = ip + '?id=' + postdata.id + '&token=' + postdata.token + '&type=' + postdata.type
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改账户信息
    adminUpAcount: function adminUpAcount(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增角色
    adminAddRole: function adminAddRole(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取角色列表
    adminListRole: function adminListRole(ip, postdata) {
        var ipstr = ip + '?pageNo=' + postdata.pageNo + '&pageSize=' + postdata.pageSize + '&token=' + postdata.token + '&type=' + postdata.type
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 更新角色
    adminUpRole: function adminUpRole(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除角色
    adminDelRole: function adminDelRole(ip, postdata) {
        // var ipstr = ip + '?id=' + postdata.id + '&token=' + postdata.token +'&type=0'
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 角色关联资源
    adminRoleRes: function adminRoleRes(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增资源
    adminAddRes: function adminAddRes(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取资源列表
    adminListRes: function adminListRes(ip, postdata) {
        var ipstr = ip + '?token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 更新资源
    adminUpRes: function adminUpRes(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除资源
    adminDelRes: function adminDelRes(ip, postdata) {
        // var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    

}

export default health