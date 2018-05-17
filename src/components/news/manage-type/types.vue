<!--分类管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    分类管理
                </div>
                <div @click="addCommClick">
                    新增分类
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div class="checkBoxCl">
                                <div>
                                    <!--<el-checkbox v-model="checked" @change="numChange"></el-checkbox>-->
                                </div>
                                <div>
                                    <span>序号</span>
                                </div>
                            </div>
                            <div>
                                分类
                            </div>
                            <div>
                                创建时间
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div class="nodataBox" v-show="dataLists.length == 0">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                        <li class="dataLi" v-for="(item,index) in dataLists">
                            <div>
                                {{index + 1}}
                            </div>
                            <div>
                                {{item.name}}
                            </div>
                            <div>
                                {{item.createDate | UnFormatDates}}
                            </div>
                            <div>
                                <div v-show="index == 0 || item.sort == 1 || item.sort == 2 || item.sort == 3" style="margin-right: 10px;">
                                    <img src="/static/img/grayup.png">
                                </div>
                                <div v-show="index != 0 && item.sort != 1 && item.sort != 2 && item.sort != 3" style="margin-right: 10px;cursor: pointer;">
                                    <img @click="changeArr(index,'up')" src="/static/img/up.png">
                                </div>
                                <div v-show="item.sort == 1 || item.sort == 2 || index+1 == dataLists.length " style="margin-left: 10px;">
                                    <img src="/static/img/graydown.png">

                                </div>
                                <div v-show="item.sort != 1 && item.sort != 2 && index+1 != dataLists.length" style="margin-left: 10px;cursor:pointer;">
                                    <img @click="changeArr(index,'down')" src="/static/img/down.png">
                                </div>
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png">
                                </div>
                                <div v-show="item.sort != 2 && item.sort != 1 && item.state == 0">
                                    <img @click="recycleClick(index)" src="/static/img/删除.png">
                                </div>
                                <div v-show="item.sort == 2 || item.sort == 1 || item.state == 1 ">
                                    <img src="/static/img/删除灰.png">
                                </div>
                            </div>
                        </li>
                        <li class="lastLi" v-show="dataLists.length != 0">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--删除弹出框-->
        <div :class="{delPopup:isdelPopup,showdel:isShowdel}">
            <transition name="slide-fade">
                <div class="delContent" v-show="delShow">
                    <v-hosdel @ok="okClick" @canle="canleClick" :name="titlename"></v-hosdel>
                </div>
            </transition>
        </div>
        <!--新增分类/修改分类弹出框-->
        <div class="ModalsBox" v-show="isModalsBox">
            <div class="Modals" style="height: 265px;">
                <div class="modalTitle">{{hottitle}}</div>
                <div class="modalContent">
                    <span>分类名称：</span>
                    <input style="text-align: center;margin:0 10px;" :class="{colorRed:iscolorRed,redBorder:isredBorder}" type="text" v-model="hotWord">
                    <span :class="{colorRed:iscolorRed}">{{changeval}}</span>/
                    <span>4</span>
                    <span :class="{colorRed:iscolorRed}" v-show="isexist">(该名称已存在)</span>
                    <span :class="{colorRed:iscolorRed}" v-show="isoverstep">(超出字符限制)</span>
                </div>
                <div class="btnBox">
                    <input type="button" value="确定" @click="addHot" v-show="isaddBtn">
                    <input type="button" value="确定" @click="editHot" v-show="iseditBtn">
                    <input type="button" value="取消" @click="calcleBtn">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapActions, mapState } from 'vuex'
    import hosdel from '../../cModule/newdel'
    export default {
        components: {
            'v-hosdel': hosdel
        },
        data() {
            return {
                checked1: true,
                checked2: false,
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                checked: false,
                checkList: [],
                dataLists: [],
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 10,
                delIndex: '',
                iscolorRed: false,
                isredBorder: false,
                isoverstep: false,
                isexist: false,
                hottitle: '新增分类',
                iseditBtn: false,
                isaddBtn: false,
                isModalsBox: false,
                changeval: 0,
                hotWord: '',
                ids: [],
                flag: true,
                flag_1: true,
                flag_2: true,
            }
        },
        // 过滤
        filters: {
            ctimeFun: function (val) {
                var now = new Date(val)
                var year = now.getYear() - 100;
                var month = now.getMonth() + 1;
                month = month > 9 ? month : "0 " + month
                var date = now.getDate();
                date = date > 9 ? date : "0 " + date
                var hour = now.getHours();
                hour = hour > 9 ? hour : "0 " + hour
                var minute = now.getMinutes();
                minute = minute > 9 ? minute : "0 " + minute
                return "20 " + year + "- " + month + "- " + date + " " + hour + ": " + minute;
            },
            // 返回日期格式化
            UnFormatDates(date) {
                var y, m, d, h, i, s
                var t = new Date(date)
                y = t.getFullYear()
                m = t.getMonth() + 1
                d = t.getDate()
                return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
            },
        },
        // 模块新建时
        created: function () {
            // 权限限制
            var roleIdStr = sessionStorage.getItem("roleId");
            var TOKEN = sessionStorage.getItem("token");
            var userRoleOBj = sessionStorage.getItem("userRole");
            if (userRoleOBj) {
                userRoleOBj = JSON.parse(userRoleOBj);
                var arrs = [];
                userRoleOBj.forEach(function (ele, ind) {
                    if (ele.name == "新闻管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path);
                        });
                    }
                });
                if (arrs.indexOf("types") == -1) {
                    this.intercept = true;
                    var warningStr = "您暂时没有权限访问这个页面";
                    self.$alert(warningStr, "提示", {
                        confirmButtonText: "确定",
                        type: "info"
                    }).then(() => {
                        self.$router.push({
                            path: "/login"
                        });
                    }).catch(() => {
                        self.$router.push({
                            path: "/login"
                        });
                    });
                } else {
                    this.flList()
                }
            } else {
                this.intercept = true;
                var warningStr = "没有登录不允许访问,点击确定跳转登录页面";
                this.$alert(warningStr, "提示", {
                    confirmButtonText: "确定",
                    type: "info"
                }).then(() => {
                    this.$router.push({
                        path: "/login"
                    });
                }).catch(() => {
                    this.$router.push({
                        path: "/login"
                    });
                });
            }
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            typeChange(index) {
                var self = this
                if (index == 2) {
                    self.checked1 = true
                    self.checked2 = false
                } else if (index == 1) {
                    self.checked1 = false
                    self.checked2 = true
                }
            },
            changeArr(index, upOrDown) {
                if (this.dataLists[index].id != '1' && this.dataLists[index].id != '2' && this.dataLists[index].id != '3') {
                    var self = this
                    if (self.flag == false) {
                        return
                    } else {
                        self.flag = false
                        var clickEle = self.dataLists[index];
                        if (upOrDown == 'up') {
                            if (index <= 0) {
                                self.flag = true
                                return
                            } else {
                                var self = this
                                self.getsortclassify({
                                    id: self.dataLists[index].id,
                                    sort: 0,
                                }).then((data) => {
                                    if (data.code == 200) {
                                        self.$message({
                                            type: 'success',
                                            message: '操作成功'
                                        })
                                        self.flag = true
                                        self.flList()
                                    } else {
                                        self.flag = true
                                        self.$message({
                                            type: 'info',
                                            message: data.message
                                        });
                                    }
                                }).catch(msg => {
                                    self.flag = true
                                    self.$message({
                                        type: 'info',
                                        message: '服务器异常!'
                                    });
                                })
                            }
                        } else if (upOrDown == 'down') {
                            if (index >= self.dataLists.length - 1) {
                                self.flag = true
                                return
                            } else {
                                var self = this
                                self.getsortclassify({
                                    id: self.dataLists[index].id,
                                    sort: 1,
                                }).then((data) => {
                                    if (data.code == 200) {
                                        self.$message({
                                            type: 'success',
                                            message: '操作成功'
                                        })
                                        self.flag = true
                                        self.flList()
                                    } else {
                                        self.flag = true
                                        self.$message({
                                            type: 'info',
                                            message: data.message
                                        });
                                    }
                                }).catch(msg => {
                                    self.flag = true
                                    self.$message({
                                        type: 'info',
                                        message: '服务器异常!'
                                    });
                                })
                            }
                        }
                    }
                }
            },
            // 获取分类管理列表
            flList() {
                var self = this
                self.checkList = []
                self.getflList({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum
                }).then((data) => {
                    self.dataLists = []
                    if (data.code == 200) {
                        self.totalNum = data.data.total
                        if (data.data.records) {
                            if (data.data.records.length > 0) {
                                self.dataLists = data.data.records
                                self.totalNum = data.data.total
                            }
                        }
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            ensureClick() {
                var self = this
                self.getflbatchOp({
                    batchMark: '1',
                    ids: JSON.stringify(self.ids)
                }).then((data) => {
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        self.flList()
                    } else {
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // 所有序号被选中时
            numChange(event) {
                var self = this
                self.checkList = event.target.checked ? self.dataLists : [];
                var a = self.checkList.map(function (data) {
                    return data.id
                })
                self.ids = a
            },
            handleCheckedCitiesChange(value) {
                var self = this
                let checkedCount = value.length;
                self.checked = checkedCount === self.dataLists.length;
                var a = self.checkList.map(function (data) {
                    return data.id
                })
                this.ids = a
            },
            // 点击分页
            handleSizeChange(val) {
                var self = this
                self.pageSizeNum = val
                self.flList()
            },
            handleCurrentChange(val) {
                var self = this
                this.currentPage = val
                this.flList()
            },
            // 更新分类信息
            updateClick(index) {
                var self = this
                self.hottitle = '修改分类'
                self.hotWord = this.dataLists[index].name
                self.isaddBtn = false
                self.iseditBtn = true
                self.isModalsBox = true
                self.delIndex = index
            },
            // 更新分类信息
            editHot() {
                var self = this
                if (self.flag_1 == false) {
                    return
                } else {
                    if (self.isoverstep == true || self.panduan() == false) {
                        return
                    } else {
                        self.flag_1 = false
                        self.geteditclassify({
                            id: self.dataLists[self.delIndex].id,
                            name: self.hotWord,
                        }).then((data) => {
                            if (data.code == 200) {
                                self.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                })
                                self.isModalsBox = false
                                self.flList()
                                self.flag_1 = true
                            } else {
                                self.isexist = self.isredBorder = self.iscolorRed = true
                                self.isoverstep = false
                                self.flag_1 = true
                                self.$message({
                                    type: 'info',
                                    message: data.message
                                });
                            }
                        }).catch(msg => {
                            self.$message({
                                type: 'info',
                                message: '服务器异常!'
                            });
                        })
                    }
                }
            },
            // 确认删除框
            okClick() {
                var self = this
                var TOKEN = sessionStorage.getItem('token')
                self.getdelclassify({
                    token: TOKEN,
                    id: self.dataLists[self.delIndex].id
                }).then((data) => {
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        self.isShowdel = true
                        self.delShow = false
                        self.flList()
                    } else {
                        self.isShowdel = true
                        self.delShow = false
                        self.$message({
                            type: 'info',
                            message: data.message
                        });
                    }
                }).catch(msg => {
                    self.$message({
                        type: 'info',
                        message: '服务器异常!'
                    });
                })
            },
            // 删除
            recycleClick(index) {
                if (this.dataLists[index].sort != 1 && this.dataLists[index].sort != 2 && this.dataLists[index].state == 0) {
                    var self = this
                    self.titlename = '分类'
                    self.isShowdel = false
                    self.delShow = true
                    self.delIndex = index
                }
            },
            // 取消删除框
            canleClick() {
                var self = this
                self.isShowdel = true
                self.delShow = false
            },
            // 添加商品
            addCommClick() {
                var self = this
                self.hottitle = '新增分类'
                self.hotWord = ''
                self.isaddBtn = true
                self.iseditBtn = false
                self.isModalsBox = true
            },
            panduan() {
                var self = this
                var reg_1 = /^[\s]*$/;//输入不能为空
                var reg_2 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                var reg_3 = /^[^\s]*$/; //不能包含空格
                if (reg_1.test(self.hotWord)) {
                    self.$message({
                        type: 'warning',
                        message: '输入内容不能为空'
                    })
                    return false;
                }
                if (reg_2.test(self.hotWord)) {
                    self.$message({
                        type: 'warning',
                        message: '不能输入特殊字符'
                    })
                    return false;
                }
                if (!reg_3.test(self.hotWord)) {
                    self.$message({
                        type: 'warning',
                        message: '不能输入空格'
                    })
                    return false;
                }
            },
            // 新增分类发请求
            addHot() {
                var self = this
                if (self.flag_2 == false) {
                    return
                } else {
                    // self.flag_2 = false
                    if (self.isoverstep == true || self.panduan() == false) {
                        return
                    } else {
                        self.flag_2 = false
                        if (self.checked1 == true) {
                            self.addnewsType = "news"
                        } else {
                            self.addnewsType = "medical"
                        }
                        // var timer
                        // clearTimeout(timer)
                        //如果键盘敲击速度太快，小于100毫秒的话就不会向后台发请求，但是最后总会进行一次请求的。
                        // timer = setTimeout(
                        self.getaddclassify({
                            name: self.hotWord,
                            type: self.addnewsType
                        }).then((data) => {
                            if (data.code == 200) {
                                self.isModalsBox = false
                                self.$message({
                                    type: 'success',
                                    message: '添加成功！'
                                })

                                self.flList()
                                self.flag_2 = true
                            } else {
                                self.isexist = self.isredBorder = self.iscolorRed = true
                                self.isoverstep = false
                                self.flag_2 = true
                                self.$message({
                                    type: 'info',
                                    message: data.message
                                });
                            }
                        }).catch(msg => {
                            self.$message({
                                type: 'info',
                                message: '服务器异常!'
                            });
                        })

                    }
                }
            },
            // 取消删除框
            calcleBtn() {
                this.isModalsBox = false
            },
            ...mapActions(['getflList', 'getdelclassify', 'geteditclassify', 'getaddclassify', 'getflbatchOp', 'getsortclassify'])
        },
        // 监视
        watch: {
            hotWord: function (val) {
                var self = this
                self.changeval = val.length
                if (self.changeval > 4) {
                    self.isoverstep = self.iscolorRed = self.isredBorder = true
                    self.isexist = false
                } else {
                    self.isoverstep = self.iscolorRed = self.isredBorder = false
                    self.isexist = false
                }
            }
        }
    }

</script>
<style scoped>
    .option {
        display: flex;
    }

    .option small {
        margin-left: 8px!important;
        font-size: 14px!important;
    }

    /*弹出框*/

    .modalTitle {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-weight: bold;
    }

    .modalContent {
        margin-left: 96px;
        margin-top: 30px;
        height: 32px;
        line-height: 30px;
    }

    input[type=text] {
        width: 160px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .btnBox {
        margin-top: 30px;
        text-align: center;
    }

    .btnBox input {
        color: #fff;
        border: none;
        width: 68px;
        height: 30px;
        border-radius: 4px;
    }

    .btnBox input:nth-child(1) {
        background: #f84848;
        margin-right: 24px;
    }

    .btnBox input:nth-child(2) {
        background: #f84848;
        margin-right: 24px;
    }

    .btnBox input:nth-child(3) {
        background: #aeaeae;
        margin-left: 24px;
    }

    .colorRed {
        color: #FD5851;
    }

    .redBorder {
        border: 1px solid #FD5851!important;
    }

    /*删除弹出框*/

    .delContent {
        width: 525px;
        height: 280px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 2px 10px #eaeaea;
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

    .slide-fade-enter-active {
        transition: all 0.7s ease;
    }

    .slide-fade-enter,
    .slide-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }

    /*主页*/

    .sale {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;
    }

    .sale>div:nth-child(1) {
        overflow: hidden;
        width: calc(100% - 72px);
        margin-left: 36px;
    }

    .recycle {
        height: 100px;
        width: 100%;
        overflow: hidden;
        display: flex;
    }

    .recycle>div:nth-child(1) {
        min-width: 60px;
        height: 35px;
        color: #353535;
        font-size: 16px;
        line-height: 35px;
    }

    .recycle>div:nth-child(2) {
        margin-top: 3px;
        margin-left: 10px;
        width: 70px;
        height: 30px;
        background-color: #fe4848;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
    }

    #lastLiRight {
        min-width: 300px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        width: 80%;
        justify-content: flex-end;
    }

    .lastLi {
        height: 78px;
        display: flex;
        justify-content: space-between;
    }

    .dataLi .operate {
        display: flex;
        align-items: center;
    }

    .dataLi .operate>div {
        width: 24px;
        height: 24px;
        margin: 0 10px;
    }

    .operate img {
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .listCont li {
        display: flex;
        min-height: 50px;
    }

    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }

    .checkBoxCl {
        display: flex;
        align-items: center;
    }

    .checkBoxCl>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 51px;
    }

    .checkBoxCl>div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
    }

    .firstLi>div {
        border-right: 1px solid #e5e7eb;
        text-align: center;
        color: #303030;
        font-size: 17px;
        font-weight: bold;
    }

    .firstLi>div:nth-child(5) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(6) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(7) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(8) {
        min-width: 35px;
    }

    .firstLi>div:nth-child(9) {
        min-width: 70px;
    }

    .firstLi>div:nth-child(10) {
        min-width: 70px;
    }

    .firstLi>div:nth-child(1) {
        border-left: 1px solid #e5e7eb;
    }

    .dataLi {
        border-bottom: 1px solid #ececec;
        background-color: #fff;
    }

    .dataLi>div {
        border-right: 1px solid #ececec;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #515151;
    }

    .dataLi>div:nth-child(2) {
        font-size: 14px;
    }

    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
    }

    .listCont li>div:nth-child(1) {
        overflow: hidden;
        display: flex;
        min-height: 49px;
        width: 160px;
    }

    .listCont .dataLi>div:nth-child(2) {
        width: 30%;
        overflow: hidden;
        padding: 7px;
        min-width: 280px;
    }

    .listCont .firstLi>div:nth-child(2) {
        width: 30%;
        padding: 7px;
        padding-top: 0;
        min-width: 280px;
    }

    .listCont li>div:nth-child(3) {
        width: 20%;
        min-width: 100px;
    }

    .listCont li>div:nth-child(4) {
        width: 15%;
        min-width: 100px;
    }

    .listCont li>div:nth-child(5) {
        width: 25%;
        min-width: 120px;
    }

    .list {
        margin-top: 28px;
        min-height: 540px;
    }

    .listTitle {
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
    }

    .listTitle>div:nth-child(1) {
        float: left;
        color: #303030;
        font-size: 16px;
        font-weight: 600;
    }

    .listTitle>div:nth-child(2) {
        float: right;
        width: 80px;
        height: 26px;
        border: 1px solid #fe5371;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #fe5371;
        cursor: pointer;
    }

    .menu {
        height: 80px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menuLeft {
        display: flex;
    }

    .menuLeft>div {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 23px;
    }

    .menuLeft>div:nth-child(1) {
        margin-left: 0;
    }

    .menuLeft>div>div:nth-child(1) {
        color: #303030;
        font-size: 14px;
        margin-right: 5px;
        min-width: 50px;
    }

    .menu>div:nth-child(2) {
        width: 95px;
        height: 35px;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-align: center;
        line-height: 35px;
        color: #000;
        font-size: 16px;
        margin-right: 15px;
        margin-top: 9px;
        cursor: pointer;
    }

    /*.delImg>div {
        width: 46px;
        height: 46px;
        overflow: hidden;
        margin-top:20px;
    }*/
</style>