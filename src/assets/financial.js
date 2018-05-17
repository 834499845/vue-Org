// 金融模块
import Vue from 'vue'
const financial = {
    // 交易记录列表
    financialDealList: function financialDealList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    }
}
export default financial