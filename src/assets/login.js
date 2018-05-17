import Vue from 'vue'
export default function getLogin(ip, postdata) {
    return Vue.http.post(ip, postdata).then(response => {
        if (response.status === 200) {
            return Promise.resolve(response.body)
        } else {
            return Promise.reject(response.body)
        }
    })
}