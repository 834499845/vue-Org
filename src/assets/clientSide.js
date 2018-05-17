// 前台管理模块
import Vue from 'vue'
import { posix } from 'path';
const client = {
    // 分页查询用户管理列表   
    ClientSideAccountSelectAccountByCondition: function ClientSideAccountSelectAccountByCondition(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 按条件分页查询认证资料列表接口
    ClientSideIdentityAuditGetApplyDataListByCondition: function ClientSideIdentityAuditGetApplyDataListByCondition(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看申请资料详情接口
    ClientSideIdentityAuditGetApplyData: function ClientSideIdentityAuditGetApplyData(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 审批认证申请接口
    ClientSideIdentityAuditAudit: function ClientSideIdentityAuditAudit(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取拒绝原因列表接口
    ClientSideIdentityAuditGetRejectReasonList: function ClientSideIdentityAuditGetRejectReasonList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据条件查询待审核的申诉记录
    ClientSideAppealGetAppealList: function ClientSideAppealGetAppealList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查看指定申诉记录
    ClientAppealgetAppealById: function ClientAppealgetAppealById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 申诉审核通过
    ClientSideAppealPassAppealRequest: function ClientSideAppealPassAppealRequest(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 申诉拒绝
    ClientSideAppealRejectAppealRequest: function ClientSideAppealRejectAppealRequest(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },

}

export default client