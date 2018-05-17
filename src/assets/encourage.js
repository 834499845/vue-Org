// 激励模块
import Vue from 'vue'
const encourage = {
    // 获取活动管理列表
    activityList: function activityList(ip, postdata) {
        // console.log(postdata)
        var ipstr = ip +'?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取健康指标所有数据
    indicatorList: function indicatorList(ip, postdata) {
        // console.log(postdata)
        var ipstr = ip +'?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加活动
    addactivity: function addactivity(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
// 根据id查询活动管理信息
    editactivity: function editactivity(ip, postdata) {
        // console.log(postdata)
        var ipstr = ip + postdata.id +'?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑保存活动信息
    editpreserveactivity: function editpreserveactivity(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
// 删除活动管理
    delactivity: function delactivity(ip, postdata) {
        // console.log(postdata)
        var ipstr = ip + postdata.id +'?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
// 活动管理开始或停止活动
    startorstop: function startorstop(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // banner设置列表
    bannerList: function bannerList(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 激励新增banner
    addbannerList: function addbannerList(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 激励删除banner
    delbanner: function delbanner(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
// banner排序
    sortbanner: function sortbanner(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
// 修改banner
    editbannerList: function editbannerList(ip, postdata) {
        // console.log(postdata)
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    
}
export default encourage