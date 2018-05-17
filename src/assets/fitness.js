// 健身模块
import Vue from 'vue'
const fitness = {
    // 添加标签
    fitnessLabellControllersave: function fitnessLabellControllersave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改标签
    fitnessLabellControllerupdateLabel: function fitnessLabellControllerupdateLabel(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除标签
    fitnessLabellControllerdeleteById: function fitnessLabellControllerdeleteById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 标签列表
    fitnessLabellControllerselectLabellPage: function fitnessLabellControllerselectLabellPage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增部位
    fitnessSiteControllersave: function fitnessSiteControllersave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改部位
    fitnessSiteControllerupdate: function fitnessSiteControllerupdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除部位
    fitnessSiteControllerdeleteById: function fitnessSiteControllerdeleteById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 部位列表
    fitnessSiteControllerselectSitePage: function fitnessSiteControllerselectSitePage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加动作
    fitnessActionControllersave: function fitnessActionControllersave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改动作
    fitnessActionControllerupdateById: function fitnessActionControllerupdateById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 动作删除
    fitnessTrainActionControllerdeleteById: function fitnessTrainActionControllerdeleteById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 动作搜索
    fitnessTrainActionControllerfindAction: function fitnessTrainActionControllerfindAction(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 搜索动作
    fitnessActionControllerfindById: function fitnessActionControllerfindById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 动作分页
    fitnessActionControllerselectTrainActionDTOPage: function fitnessActionControllerselectTrainActionDTOPage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加训练
    fitnessTrainControllersave: function fitnessTrainControllersave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改训练
    fitnessTrainControllerupdateById: function fitnessTrainControllerupdateById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 训练删除
    fitnessTrainControllerdeleteByIds: function fitnessTrainControllerdeleteByIds(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 搜索训练
    fitnessTrainControllerfindTrainActionById: function fitnessTrainControllerfindTrainActionById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加标签
    // fitnessLabellControllersave: function fitnessLabellControllersave(ip, postdata) {
    //     return Vue.http.post(ip, postdata).then(response => {
    //         if (response.status === 200) {
    //             return Promise.resolve(response.body)
    //         } else {
    //             return Promise.reject(response.data.message)
    //         }
    //     })
    // },
    // 训练分页
    fitnessTrainControllerselectTrainPage: function fitnessTrainControllerselectTrainPage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加课程
    fitnessCourseControllersave: function fitnessCourseControllersave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改课程
    fitnessCourseControllerupdateById: function fitnessCourseControllerupdateById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 课程删除
    fitnessCourseControllerdeleteById: function fitnessCourseControllerdeleteById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 搜索课程
    fitnessCourseControllerselectCourseParticulars: function fitnessCourseControllerselectCourseParticulars(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 课程详情
    fitnessCourseControllerfindById: function fitnessCourseControllerfindById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 条件搜索训练
    fitnessCourseControllerselectSiteLabelLevel: function fitnessCourseControllerselectSiteLabelLevel(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 课程分页
    fitnessCourseControllerselectCoursePage: function fitnessCourseControllerselectCoursePage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加首页文案
    fitnesssloganaddHomeSlogan: function fitnesssloganaddHomeSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改首页文案
    fitnesssloganupdateHomeSlogan: function fitnesssloganupdateHomeSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页文案删除
    fitnessslogandeleteAllHomeSlogan: function fitnessslogandeleteAllHomeSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页文案查询分页
    fitnesssloganselectHomeSlogan: function fitnesssloganselectHomeSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加分享文案
    fitnesssloganaaddShareSlogan: function fitnesssloganaaddShareSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改分享文案
    fitnesssloganupdateShareSlogan: function fitnesssloganupdateShareSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分享文案删除
    fitnessslogandeleteAllShareSlogan: function fitnessslogandeleteAllShareSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分享文案分页
    fitnesssloganselectShareSlogan: function fitnesssloganselectShareSlogan(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    }
}
export default fitness