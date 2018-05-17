<!--订单中心-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="user">
        <router-view class="view" keep-alive></router-view>
    </div>
</template>
<script>
    import {
        mapActions,
        mapState
    } from 'vuex'
    export default {
        data() {
            return {}
        },
        // 过滤
        filters: {},
        // 模块新建时
        created: function () {
            var self = this
            self.fetchData()
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            fetchData() {
                var self = this
                var paths = this.$route.path.split('/')
                var oneStr = paths[2]
                var twoStr = paths[3]
                var roleIdStr = sessionStorage.getItem('roleId')
                var TOKEN = sessionStorage.getItem('token')
                var userRoleOBj = sessionStorage.getItem('userRole')
                if (userRoleOBj) {
                    userRoleOBj = JSON.parse(userRoleOBj)
                    var arrs = []
                    var comms = []
                    userRoleOBj.forEach(function (ele, ind) {
                        if (ele.name == "商城管理") {
                            ele.children.forEach(function (one, oneIndex) {
                                arrs.push(one.path)
                                if (one.name == "订单中心") {
                                    one.children.forEach(function (two, twoIndex) {
                                        comms.push(two.path)
                                    })
                                }
                            })

                        }
                    })
                    if (arrs.indexOf("order") == -1) {
                        var warningStr = "您暂时没有权限访问这个页面"
                        self.$alert(warningStr, '提示', {
                            confirmButtonText: '确定',
                            type: 'info'
                        }).then(() => {
                            self.$router.push({
                                path: '/login'
                            })
                        }).catch(() => {
                            self.$router.push({
                                path: '/login'
                            })
                        });
                    } else {
                        if (twoStr == undefined || twoStr == "") {
                            self.$router.push({
                                path: '/store/order/' + comms[0],
                                query: self.$route.query
                            })
                        } else {
                            if (comms.indexOf(twoStr) == -1) { } else if (twoStr != comms[0]) {
                                self.$router.push({
                                    path: '/store/order/' + twoStr,
                                    query: self.$route.query
                                })
                            } else {
                                self.$router.push({
                                    path: '/store/order/' + comms[0],
                                    query: self.$route.query
                                })
                            }
                        }
                    }
                } else {
                    var warningStr = "没有登录不允许访问,点击确定跳转登录页面"
                    this.$alert(warningStr, '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    }).then(() => {
                        this.$router.push({
                            path: '/login'
                        })
                    }).catch(() => {
                        this.$router.push({
                            path: '/login'
                        })
                    });
                }
            },
            ...mapActions(['getListResRole'])
        },
        // 监视
        watch: {
            '$route': 'fetchData'
        }
    }

</script>
<style scoped>

</style>