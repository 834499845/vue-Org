<!--新增动作管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="lookdrill">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="caneleClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="look">
                    <div>训练描述：</div>
                    <div>{{describeText}}</div>
                </div>
                <div class="lookCover">
                    <div>封面图：</div>
                    <div>
                        <img :src="imageCorve" alt="">
                    </div>
                </div>
                <div class="lookBg">
                    <div>背景图：</div>
                    <div>
                        <img :src="imageBg" alt="">
                    </div>
                </div>
                <div class="look">
                    <div>
                        课程周期：
                    </div>
                    <div>
                        {{courseWeek}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        训练频率：
                    </div>
                    <div>
                        {{frequency}}
                    </div>
                </div>
                <div class="look">
                    <div>
                        单个课程：
                    </div>
                    <div>
                        {{singleDay}}
                    </div>
                </div>
                <div class="lookList">
                    <div>
                        训练列表：
                    </div>
                    <div class="lookListCont">
                        <ul>
                            <li class="firstLi">
                                <div>训练名称</div>
                                <div>标签</div>
                                <div>消耗千卡</div>
                                <div>动作数量</div>
                                <div>训练时长</div>
                                <div>操作</div>
                            </li>
                            <li class="dataLi" v-for="(item,index) in lists">
                                <div>{{item.trainName}}</div>
                                <div>{{item.labelName}}</div>
                                <div>{{item.kilocalorie}}</div>
                                <div>{{item.actionNumber}}</div>
                                <div>{{item.timeLong | timeFun}}</div>
                                <div class="option">
                                    <div @click="updateClick(index)"><img src="/static/img/编辑.png" alt=""></div>
                                    <!-- <div @click="deleteClick(index)"><img src="/static/img/删除.png" alt=""></div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-storeDel @del="delClick()" @canle="cancleClick()" :name="titlename"></v-storeDel>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import storeDel from '../../cModule/finessDel'
    export default {
        components: {
            'v-storeDel': storeDel,
        },
        data() {
            return {
                title: "课程详情",
                loading: false,
                lists: [],
                imageBg: '',
                imageCorve: '',
                describeText: '',
                courseWeek: '',
                frequency: '',
                singleDay: '',
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                delIndex: 0,
                deling: false
            }
        },
        // 过滤
        filters: {
            timeFun: function (val) {
                if (val) {
                    var h = Math.floor(val / 3600 % 24);
                    var m = Math.floor(val / 60 % 60);
                    var s = Math.floor(val / 60);
                    m = m > 9 ? m : "0" + m
                    h = h > 9 ? h : "0" + h
                    if (val < 10) {
                        return "00:00:" + "0"+val;
                    } else if(val>=10 && val<60){
                        return "00:00:" + val;
                    }else if (h < 1) {
                        return "00:" + m + ":00"
                    } else {
                        return h + ":" + m + ":00"
                    }
                } else {
                    return '无'
                }
            },
        },
        // 模块新建时
        created: function () {
            var self = this
            // 权限限制
            var roleIdStr = sessionStorage.getItem('roleId')
            var TOKEN = sessionStorage.getItem('token')
            var userRoleOBj = sessionStorage.getItem('userRole')
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj)
                var arrs = []
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "健身管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path)
                        })
                    }
                })
                if (arrs.indexOf("course") == -1) {
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
                    self.uplistFun()
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
        // 计算属性
        mounted() {
        },
        // 事件处理
        methods: {
            // 确认添加
            listFun() {
                var self = this
            },
            uplistFun() {
                var self = this
                var id = ''
                id = self.$route.query.id
                self.getfitnessCourseControllerfindById({
                    courseId: id
                }).then((data) => {
                    // console.log("详情", JSON.parse(JSON.stringify(data)))
                    if (data.code == 200) {
                        self.imageBg = data.data.backgroundMap || ''
                        self.imageCorve = data.data.coverSheet || ''
                        self.describeText = data.data.describe || ''
                        self.frequency = data.data.frequency || ''
                        self.courseWeek = data.data.courseWeek || ''
                        self.singleDay = data.data.singleDay || ''
                        self.lists = data.data.trainListDTOList
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    // console.log(msg)
                    self.loading = false
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            updateClick(index) {
                var self = this
                var id = ''
                id = self.$route.query.id
                this.$router.push({
                    path: '/fitness/updateCourse',
                    query: { op: 2, back: 1, id: self.lists[index].id, parentId: id }
                })
            },
            deleteClick(index) {
                this.isShowdel = false
                this.delShow = true
                this.delIndex = index
                this.titlename = '训练'
            },
            // affirm delete
            delClick() {
                var self = this
                self.deling = true
                self.lists.splice(self.delIndex, 1)
                var id = ''
                id = self.$route.query.id
                var ipdateObj = {}
                var ids = self.lists.map(function (ele) {
                    return ele.id
                })
                ipdateObj = {
                    id: id,
                    trainIds: JSON.stringify(ids)
                }
                self.getfitnessCourseControllerupdateById(ipdateObj).then((dataThr) => {
                    // console.log("修改成功", JSON.parse(JSON.stringify(dataThr)))
                    self.deling = false
                    self.isShowdel = true
                    self.delShow = false
                    if (dataThr.code == 200) {
                        self.$message({
                            type: 'info',
                            message: "修改成功!"
                        });
                        self.uplistFun()
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    // console.log(msg)
                    self.deling = false
                    self.isShowdel = true
                    self.delShow = false
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // cancel delete
            cancleClick() {
                this.isShowdel = true
                this.delShow = false
                this.titlename = ''
                this.isShowRecycle = true
                this.RecycleShow = false
            },
            // 箭头返回上一页/取消按钮
            caneleClick() {
                this.$router.push({
                    path: '/fitness/course'
                })
            },
            ...mapActions(['getfitnessCourseControllerfindById','getfitnessLabellControllerselectLabellPage','getfitnessSiteControllerselectSitePage','getfitnessCourseControllerupdateById'])
        },
        // 监视
        watch: {
        }
    }

</script>
<style scoped>
    .lookListCont li {
        height: 50px;
        display: flex;
        border-bottom: 1px solid #d1d1d1;
    }
    
    .firstLi {
        border-top: 1px solid #d1d1d1;
    }
    
    .firstLi>div {
        line-height: 50px;
        text-align: center;
    }
    
    .lookListCont li {
        min-width: 550px;
    }
    
    .lookListCont li>div {
        border-right: 1px solid #d1d1d1;
    }
    
    .lookListCont li>div:nth-child(1) {
        width: 30%;
        border-left: 1px solid #d1d1d1;
        text-align: center;
        line-height: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .lookListCont li>div:nth-child(2) {
        width: 10%;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .lookListCont li>div:nth-child(3) {
        width: 15%;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .lookListCont li>div:nth-child(4) {
        width: 15%;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .lookListCont li>div:nth-child(5) {
        width: 15%;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .lookListCont li>div:nth-child(6) {
        min-width: 80px;
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lookListCont li>div:nth-child(6)>div:nth-child(1) {
        margin-right: 9px;
    }
    
    .lookListCont li>div:nth-child(6)>div:nth-child(2) {
        margin-left: 9px;
    }
    
    .option {
        display: flex;
    }
    
    .option>div {
        width: 24px;
        height: 24px;
        overflow: hidden;
    }
    
    .option>div img {
        width: 100%;
        height: 100%;
    }
    
    .lookList {
        display: flex;
        margin-bottom: 40px;
    }
    
    .lookListCont {
        min-height: 30px;
        margin-left: 15px;
    }
    
    .lookList>div:nth-child(1) {
        min-width: 120px;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .look {
        display: flex;
        align-items: center;
    }
    
    .lookCover {
        display: flex;
    }
    
    .lookBg {
        display: flex;
    }
    
    .look>div:nth-child(1) {
        width: 120px;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .look>div:nth-child(2) {
        margin-left: 12px;
    }
    
    .lookCover>div:nth-child(1) {
        width: 120px;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .lookCover>div:nth-child(2) {
        width: 310px;
        height: 170px;
        border: 1px solid #d1d1d1;
        margin-left: 12px;
    }
    
    .lookCover>div:nth-child(2) img {
        width: 100%;
        height: 100%;
    }
    
    .lookBg>div:nth-child(1) {
        width: 120px;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .lookBg>div:nth-child(2) {
        width: 170px;
        height: 150px;
        border: 1px solid #d1d1d1;
        margin-left: 12px;
    }
    
    .lookBg>div:nth-child(2) img {
        width: 100%;
        height: 100%;
    }
    
    .list>div {
        margin-top: 15px;
    }
    
    .list>div:nth-child(1) {
        margin-top: 24px;
    }
    
    .list {
        min-height: 540px;
        overflow: hidden;
    }
    
    .lookdrill>div {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }
    
    .listTitle {
        height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .listTitle>div:nth-child(1) {
        width: 120px;
        height: 27px;
        margin-top: 12px;
        float: left;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(1) {
        width: 25px;
        height: 25px;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(1) img {
        margin: 0;
        padding: 0;
        width: 25px;
        height: 25px;
    }
    
    .listTitle>div:nth-child(1)>div:nth-child(2) {
        display: flex;
        color: #303030;
        font-size: 17px;
        margin-left: 0px;
        margin-left: 10px;
    }
    
    select {
        width: 120px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        color: #8f8e94;
        border-radius: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("/static/img/hjian.png") 90% 10px no-repeat transparent;
        /*padding-left: 14px;*/
        font-size: 14px;
        color: #97969b;
        border: 1px solid #d1d1d1;
        /*text-align: center;*/
        overflow: hidden;
    }
    
    select::-ms-expand {
        display: none;
    }
    /*删除弹出框*/
    
    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 10px 10px #eaeaea;
        border-radius: 4px;
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
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .showdel {
        display: none;
    }
    
    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
</style>