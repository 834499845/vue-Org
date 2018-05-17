<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="drugstoreAdd">
        <div>
            <!-- 详情头部 -->
            <div class="drugstoreAddTop">
                <div>
                    <div @click="returnClick">
                        <img src="/static/img/返回蓝.jpg" alt="">
                    </div>
                    <div>
                        新增药店
                    </div>
                </div>
            </div>
            <!-- 审核列表展示 -->
            <div class="drugstoreAddList">
                <ul>
                    <li class="drugname">
                        <div>
                            药店名称：
                        </div>
                        <div class="cssFlex">
                            <input class="cssFlexone" :class="{redborder:isredname}" type="text" maxlength="25" v-model="name">
                            <span class="cssFlextwo" :class="{redfont:isredname}">最多输入25个字符（不支持非法字符）</span>
                        </div>
                    </li>
                    <li class="drugrelation">
                        <div>
                            联系方式：
                        </div>
                        <div class="cssFlex">
                            <input class="cssFlexone" :class="{redborder:isreddrugrelation}" type="text" maxlength="11" v-model="relation">
                            <span class="cssFlextwo" :class="{redfont:isreddrugrelation}">请输入11位手机号</span>
                        </div>
                    </li>
                    <li class="druglongitude">
                        <div>
                            药店经度：
                        </div>
                        <div class="cssFlex">
                            <input class="cssFlexone" :class="{redborder:isborderlongitude}" maxlength="11" drugrelation type="text" v-model="longitude">
                            <span class="cssFlextwo" :class="{redfont:isborderlongitude}">-180 ~ 180（小数点后6位）</span>
                        </div>
                    </li>
                    <li class="druglatitude">
                        <div>
                            药店纬度：
                        </div>
                        <div class="cssFlex">
                            <input class="cssFlexone" :class="{redborder:isborderlatitude}" maxlength="10" type="text" v-model="latitude">
                            <span class="cssFlextwo" :class="{redfont:isborderlatitude}">-90 ~ 90（小数点后6位）</span>
                        </div>
                    </li>
                    <li class="drugsite">
                        <div>
                            药店地址：
                        </div>
                        <div class="cssFlex">
                            <textarea class="cssFlexone" :class="{redborder:isredsite}" cols="30" rows="10" v-model="site" maxlength="100"></textarea>
                            <span class="cssFlextwo" :class="{redfont:isredsite}">最多输入100个字符</span>
                        </div>
                    </li>
                    <li class="drugremark">
                        <div>
                            备注：
                        </div>
                        <div class="cssFlex">
                            <textarea class="cssFlexone" :class="{redborder:isredremark}" cols="30" rows="10" v-model="remark" maxlength="100"></textarea>
                            <span class="cssFlextwo" :class="{redfont:isredremark}">最多输入100个字符</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div></div>
            <div class="drugstorebut">
                <div @click="okClick">
                    确定
                </div>
                <div @click="returnClick">
                    取消
                </div>
            </div>
        </div>
        <!--取消弹出框-->
        <div :class="{showdel:isShowdel}" class="delPopup">
            <transition name="slide-fade">
                <div class="delContent">
                    <v-hosdel @ok="confirmClick" @canle="cancelClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import hosdel from '../../cModule/cancelBox'
    export default {
        components: {
            'v-hosdel': hosdel
        },
        data() {
            return {
                okClickTrueOrFalse: true,
                isShowdel: true,
                titleText: '',
                name: '',
                relation: '',
                longitude: '',
                latitude: '',
                site: '',
                remark: '',
                intercept: false,
                titlename: '劳动成果还未保存，是否退出？',
                isredname: false,
                isreddrugrelation: false,
                isborderlongitude: false,
                isborderlatitude: false,
                isredsite: false,
                isredremark: false,
            }
        },
        // 过滤
        filters: {
        },
        // 模块新建时
        created: function () {
             var self = this;
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "医疗管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                //console.log("arrs", arrs)
                if (arrs.indexOf("drugstore") == -1) {
                    this.intercept = true
                    var warningStr = "您暂时没有权限访问这个页面";
                    self
                        .$alert(warningStr, "提示", {
                            confirmButtonText: "确定",
                            type: "info"
                        })
                        .then(() => {
                            self.$router.push({
                                path: "/login"
                            });
                        })
                        .catch(() => {
                            self.$router.push({
                                path: "/login"
                            });
                        });
                } else {
                }
            } else {
                this.intercept = true
                var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
                this.$alert(warningStr, "提示", {
                    confirmButtonText: "确定",
                    type: "info"
                })
                    .then(() => {

                        this.$router.push({
                            path: "/login"
                        });
                    })
                    .catch(() => {
                        this.$router.push({
                            path: "/login"
                        });
                    });
            }
        },
        // 计算属性
        mounted() {

        },
        //跳转拦截
        beforeRouteLeave(to, from, next) {
            this.toPath = to.path
            if (this.intercept == false) {
                this.isShowdel = false
            } else if (this.intercept == true) {
                this.isShowdel = true
                next()
            }
        },
        // 事件处理
        methods: {
            //取消按钮/返回按钮
            returnClick() {
                this.$emit('appchildsay', "drugstore")
                this.$router.push({
                    path: '/medical/drugstore'
                })
            },
            //确定取消
            confirmClick() {
                this.intercept = true
                var url = this.toPath
                this.$router.push({
                    path: url
                })
            },
            //取消未保存弹出框
            cancelClick() {
                this.isShowdel = true
            },
            //正则验证
            panduan() {
                var self = this
                var regOne = /^[\s]*$/;//输入不能为空
                var regTwo = new RegExp("[`！。，.,!-%?？《》：:+~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]")
                var regThree = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
                var ifLongitude = /^[\-\+]?(((\d|[0-9]\d|1[0-7]\d|0{1,3})\.\d{1,6})|(\d|[0-9]\d|1[0-7]\d|0{1,3})|180\.0{1,6}|180)$/ //经度
                var ifLatitude = /^[\-\+]?([0-8]?\d{1}\.\d{1,6}|[0-8]?\d{1}|90\.0{1,6}|90)$/  //纬度
                if (regOne.test(self.name) || regTwo.test(self.name)) {
                    self.isredname = true
                }
                if (regOne.test(self.relation) || !regThree.test(self.relation) ){
                    self.isreddrugrelation = true
                }
                if (regOne.test(self.longitude) || !ifLongitude.test(this.longitude)) {
                    self.isborderlongitude = true
                }
                if (regOne.test(self.latitude) || !ifLatitude.test(this.latitude)) {
                    self.isborderlatitude = true
                }
                if (regOne.test(self.site)) {
                    self.isredsite = true
                }
                if (regOne.test(self.remark)) {
                    self.isredremark = true
                }
                if (
                    self.isredname == true ||
                    self.isreddrugrelation == true ||
                    self.isborderlongitude == true ||
                    self.isborderlatitude == true ||
                    self.isredsite == true ||
                    self.isredremark == true 
                ) {
                    return false
                }
            },
            //确定按钮
            okClick() {
                var self = this
                if (self.panduan() == false) {
                    return false
                } else {
                    if (self.okClickTrueOrFalse == true) {
                        self.okClickTrueOrFalse = false
                        self.getaddDrugstore({
                            drugstoreName: self.name,          //药店名称
                            contact: self.relation,            //联系方式
                            drugLongitude: self.longitude,     //经度
                            drugLatitude: self.latitude,       //纬度
                            site: self.site,                   //地址
                            remark: self.remark,               //备注
                        }).then((data) => {
                            self.okClickTrueOrFalse = true
                            //console.log("药店新增", data)
                            if (data.code == 200) {
                                this.$emit('appchildsay', "drugstore")
                                self.intercept = true
                                self.$router.push({
                                    path: '/medical/drugstore'
                                })
                            } else {
                                self.$message({
                                    type: 'info',
                                    message: data.message
                                })
                            }
                        }).catch(msg => {
                            self.okClickTrueOrFalse = true
                            //console.log(msg)
                            self.$message({
                                type: 'info',
                                message: '服务器异常'
                            })
                        })
                    }
                    
                }
            },
            ...mapActions(['getaddDrugstore'])
        },
        // 监视
        watch: {
            //药店名称
            name: function (val) {
                this.isredname = false
            },
            //联系方式
            relation: function (val) {
                this.isreddrugrelation = false
            },
            //药店经度
            longitude: function (val) {
                var a = this.longitude
                var b = a.replace(/[^-\d\.]/g,'')
                this.longitude = b
                this.isborderlongitude = false
            },
            //药店纬度
            latitude: function (val) {
                var a = this.latitude
                var b = a.replace(/[^-\d\.]/g,'')
                this.latitude = b
                this.isborderlatitude = false
            },
            //药店地址
            site: function (val) {
                this.isredsite = false
            },
            //备注
            remark: function (val) {
                this.isredremark = false
            }
        }
    }

</script>
<style scoped>
    .drugstoreAdd {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
        margin-bottom: 150px;
    }

    .drugstoreAdd>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .drugstoreAddTop {
        height: 50px;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .drugstoreAddTop>div {
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .drugstoreAddTop>div>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }

    .drugstoreAddTop>div>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }

    .drugstoreAddTop>div>div:nth-child(2) {
        float: left;
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 10px;
    }

    .drugstoreAddList {
        margin: 24px 0px;
    }

    .drugstoreAddList li {
        overflow: hidden;
        margin-bottom: 24px;
    }

    .drugstoreAddList li div {
        float: left;
    }

    .drugstoreAddList li div:nth-child(1) {
        width: 16%;
        max-width: 200px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        margin-right: 16px;
    }

    .drugstoreAddList li div:nth-child(2) {
        text-align: left;
        width: 80%;
        display: flex;
    }


    .drugstoreAddList input {
        width: 360px;
        height: 32px;
        padding-left: 4px;
        border-radius: 4px;
        border: 1px solid #aeaeae;
    }

    .drugstoreAddList span {
        margin-left: 18px;
        color: #8f8e94;
    }

    .drugstoreAddList textarea {
        resize: none;
        width: 80%;
        min-width: 560px;
        max-width: 740px;
        height: 68px;
        border-radius: 4px;
        padding-left: 4px;
    }

    .drugstorebut {
        width: 180px;
        height: 32px;
        display: flex;
        margin-left: 30%;
        margin-top: 36px;
    }

    .drugstorebut div {
        width: 70px;
        height: 32px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
    }

    .drugstorebut div:nth-child(1) {
        background: #5acdfa;
        margin-right: 40px;
    }

    .drugstorebut div:nth-child(2) {
        background: #aeaeae;
    }

    .redfont {
        color: #fe5371!important;
    }

    .redborder {
        border-color: #fe5371!important;
    }
    /*取消弹出框*/

    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 10px 10px #eaeaea;
        border-radius: 7px;
        margin: calc((100vh - 280px) / 2) auto;
        z-index: 100000;
    }

    .delPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000000;
    }

    .showdel {
        display: none;
    }

    .cssFlex {
        display: flex;
        flex-wrap: wrap;
    }

    .cssFlextwo {
        margin-top: 8px;
    }

</style>