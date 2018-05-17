<!--热搜管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    热搜管理
                </div>
                <div @click="addCommClick">
                    新增热词
                </div>
            </div>
            <!--筛选-->
            <div class="menu">
                <div class="menuLeft">
                    <div class="searchBox">
                        <img src="/static/img/search_1.png" alt="">
                        <input maxlength="8" v-model.trim="searchTitleVal" type="text" placeholder="请输入热词" style="border:none;height: 28px;">
                    </div>
                    <div class="searBut">
                        <div @click="searchClick">
                            确定
                        </div>
                        <div @click="resetClick">
                            重置
                        </div>
                    </div>
                </div>
            </div>
            <!--列表-->
            <div class="list">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div class="checkBoxCl">
                                <div>
                                    <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                </div>
                                <div>
                                    <span>序号</span>
                                </div>
                            </div>
                            <div>
                                热词
                            </div>
                            <div>
                                创建时间
                            </div>
                            <div>
                                显示
                            </div>
                            <div>
                                排序
                            </div>
                            <div>
                                操作
                            </div>
                        </li>
                        <div v-show="nodata" class="nodataBox">
                            <img src="/static/img/nodata.png" alt="">
                            <p>暂无数据...</p>
                        </div>
                        <li v-show="yesdata" class="dataLi" v-for="(item,index) in dataLists">
                            <div class="checkCl">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="item.id">{{index + 1}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div>
                                {{item.hotWord}}
                            </div>
                            <div>
                                {{item.createDate | UnFormatDates}}
                            </div>
                            <div>
                                <div style="cursor: pointer" @click="recommend(index)" v-show="item.isShow == '1'">
                                    <img src="/static/img/fou.png">
                                </div>
                                <div style="cursor: pointer" @click="norecommend(index)" v-show="item.isShow == '0'">
                                    <img src="/static/img/shi.png">
                                </div>
                            </div>
                            <div>
                                <div style="margin-right: 10px;cursor: pointer;">
                                    <img v-if='index!=0' @click="changeArr(index,'up')" src="/static/img/up.png">
                                    <img v-else src="/static/img/grayup.png">
                                </div>
                                <div style="margin-left: 10px;cursor: pointer;">
                                    <img v-if="index+1 != dataLists.length" @click="changeArr(index,'down')" src="/static/img/down.png">
                                    <img v-else src="/static/img/graydown.png">
                                </div>
                            </div>
                            <div class="operate">
                                <div>
                                    <img @click="updateClick(index)" src="/static/img/编辑.png">
                                </div>
                                <div>
                                    <img @click="recycleClick(index)" src="/static/img/删除.png">
                                </div>
                            </div>
                        </li>
                        <li class="lastLi" v-show="yesdata">
                            <div class="lastLiLeft">

                            </div>
                            <div id="lastLiRight">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 30, 40]"
                                    :page-size="pageSizeNum" layout="total,sizes,prev, pager, next,jumper" :total="totalNum">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recycle" v-show="yesdata">
                    <div>
                        批量操作：
                    </div>
                    <div>
                        <v-select width="100" :selects="selectOp" :list="sRecys" @select="selectRecClick"></v-select>
                    </div>
                    <div @click="ensureClick">
                        确定
                    </div>
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
        <!--新增热词/修改热词弹出框-->
        <div class="ModalsBox" v-show="isModalsBox">
            <div class="Modals" style="height: 238px;">
                <div class="modalTitle">{{hottitle}}</div>
                <div class="modalContent">
                    <span>热词名称：</span>
                    <input maxlength="8" style="text-align: center;margin:0 10px;" :class="{colorRed:iscolorRed,redBorder:isredBorder}" type="text"
                        v-model="hotWord">
                    <span :class="{colorRed:iscolorRed}">{{changeval}}</span>/
                    <span>8</span>
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
    import { mapActions, mapState } from 'vuex'
    import minput from '../../cModule/minput'
    import select from '../../cModule/select'
    import hosdel from '../../cModule/newdel'
    export default {
        components: {
            'v-minput': minput,
            'v-select': select,
            'v-hosdel': hosdel
        },
        data() {
            return {
                yesdata: false,
                nodata: false,
                changeval: 0,
                iscolorRed: false,
                isredBorder: false,
                isoverstep: false,
                isexist: false,
                hottitle: '新增热词',
                iseditBtn: false,
                isaddBtn: false,
                isModalsBox: false,
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                checked: false,
                checkedOne: false,
                checkedAll: true,
                checkList: [],
                sStates: [
                    '所有状态',
                    'A状态'
                ],
                sTypes: [
                    '所有分类',
                    'A分类'
                ],
                sRecys: [
                    '请选择',
                    '删除',
                    '显示',
                    '不显示'
                ],
                dataLists: [],
                checkt: 100000000000000000000,
                checkShow: true,
                pageSizeNum: 15,
                currentPage: 1,
                totalNum: 15,
                hotWord: '',
                delIndex: '',
                selectOp: '请选择',
                ids: [],
                searchTitleVal: '',
                isOkShow: false,
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
                if (arrs.indexOf("hots") == -1) {
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
                    self.isOkShow = false
                    self.searchTitleVal = ''
                    this.rsList()
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
            changeArr(index, upOrDown) {
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
                            self.getsorthotWord({
                                id: self.dataLists[index].id,
                                sort: index
                            }).then((data) => {
                                if (data.code == 200) {
                                    self.$message({
                                        type: 'success',
                                        message: '操作成功'
                                    })
                                    if (self.isOkShow == false) {
                                        self.searchTitleVal = ''
                                    }
                                    self.rsList()
                                    // self.dataLists.splice(index, 1, self.dataLists[index - 1])
                                    // self.dataLists.splice(index - 1, 1, clickEle)
                                    self.flag = true
                                } else {
                                    self.flag = true
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
                    } else if (upOrDown == 'down') {
                        if (index >= self.dataLists.length - 1) {
                            self.flag = true
                            return
                        } else {
                            var self = this
                            self.getsorthotWord({
                                id: self.dataLists[index].id,
                                sort: index + 2
                            }).then((data) => {
                                if (data.code == 200) {
                                    self.$message({
                                        type: 'success',
                                        message: '操作成功'
                                    })
                                    if (self.isOkShow == false) {
                                        self.searchTitleVal = ''
                                    }
                                    self.rsList()
                                    // self.dataLists.splice(index, 1, self.dataLists[index + 1])
                                    // self.dataLists.splice(index + 1, 1, clickEle)
                                    self.flag = true
                                } else {
                                    self.flag = true
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
                }
            },
            // 获取热搜列表
            rsList() {
                var self = this
                self.checked = false
                self.ids = []
                self.checkList = []
                self.gethotSearchList({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    hotWord: self.searchTitleVal
                }).then((data) => {
                    if (data.code == 200) {
                        self.dataLists = data.data.records
                        self.totalNum = data.data.total
                        if (self.dataLists.length == 0) {
                            self.nodata = true
                            self.yesdata = false
                        } else {
                            self.nodata = false
                            self.yesdata = true
                        }
                    } else {
                        self.nodata = true
                        self.yesdata = false
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
            // 按照标题检索
            searchClick() {
                if (this.searchTitleVal != '') {
                    this.isOkShow = true
                    this.rsList()
                }
            },
            //重置
            resetClick() {
                this.searchTitleVal = ''
                if (this.isOkShow) {
                    this.isOkShow = false
                    this.pageSizeNum = 15
                    this.currentPage = 1
                    this.rsList()
                }
            },
            // 回收站
            selectRecClick(sType) {
                this.selectOp = sType
            },
            // 封装批量操作方法
            batch(m) {
                var self = this
                self.getrsbatchOp({
                    batchMark: m,
                    ids: JSON.stringify(self.ids)
                }).then((data) => {
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        if (self.isOkShow == false) {
                            self.searchTitleVal = ''
                        }
                        self.rsList()
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
                if (self.selectOp == '显示') {
                    self.batch('2')
                } else if (self.selectOp == '不显示') {
                    self.batch('3')
                } else if (self.selectOp == '删除') {
                    self.batch('1')
                }
            },
            // 显示
            recommend(index) {
                var self = this
                self.delIndex = index
                self.ids = [self.dataLists[self.delIndex].id]
                self.batch('2')
            },
            // 不显示
            norecommend(index) {
                var self = this
                self.delIndex = index
                self.ids = [self.dataLists[self.delIndex].id]
                self.batch('3')
            },
            // 所有序号被选中时
            numChange(event) {
                this.checkList = event.target.checked ? this.dataLists : [];
                var a = this.checkList.map(function (data) {
                    return data.id
                })
                this.ids = a
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checked = checkedCount === this.dataLists.length;
                var a = this.checkList.map(function (data) {
                    return data.id
                })
                this.ids = a
            },
            // 点击分页
            handleSizeChange(val) {
                var self = this
                self.pageSizeNum = val
                if (self.isOkShow == false) {
                    self.searchTitleVal = ''
                }
                self.rsList()
            },
            handleCurrentChange(val) {
                var self = this
                self.currentPage = val
                if (self.isOkShow == false) {
                    self.searchTitleVal = ''
                }
                self.rsList()
            },
            // 更新商品信息
            updateClick(index) {
                var self = this
                self.hottitle = '修改热词'
                self.hotWord = this.dataLists[index].hotWord
                self.isaddBtn = false
                self.iseditBtn = true
                self.isModalsBox = true
                self.delIndex = index
            },
            // 更新商品信息
            editHot() {
                var self = this
                if (self.flag_1 == false) {
                    return
                } else {
                    if (self.isoverstep == true || self.panduan() == false) {
                        return
                    } else {
                        self.flag_1 = false
                        self.getedithotWord({
                            id: self.dataLists[self.delIndex].id,
                            hotWord: self.hotWord,
                            sort: self.delIndex + 1
                        }).then((data) => {
                            self.flag_1 = true
                            if (data.code == 200) {
                                self.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                })
                                self.isModalsBox = false
                                if (self.isOkShow == false) {
                                    self.searchTitleVal = ''
                                }
                                self.rsList()
                            } else {
                                self.isexist = self.isredBorder = self.iscolorRed = true
                                self.isoverstep = false
                                self.$message({
                                    type: 'info',
                                    message: data.message
                                });
                            }
                        }).catch(msg => {
                            self.flag_1 = true
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
                self.getdelhotWord({
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
                        if (self.isOkShow == false) {
                            self.searchTitleVal = ''
                        }
                        self.rsList()
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
            // 删除
            recycleClick(index) {
                var self = this
                self.titlename = '热词'
                self.isShowdel = false
                self.delShow = true
                self.delIndex = index
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
                self.hottitle = '新增热词'
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
            // 取消删除框
            calcleBtn() {
                var self = this
                self.isModalsBox = false
            },
            // 新增热词发请求
            addHot() {
                var self = this
                if (self.flag_2 == false) {
                    return
                } else {
                    if (self.isoverstep == true || self.panduan() == false) {
                        return
                    } else {
                        self.flag_2 = false
                        self.getaddhotWords({
                            hotWord: self.hotWord,
                            isShow: '1',
                            sort: 1
                        }).then((data) => {
                            if (data.code == 200) {
                                self.$message({
                                    type: 'success',
                                    message: '添加成功！'
                                })
                                self.isModalsBox = false
                                self.isOkShow = false
                                self.searchTitleVal = ''
                                self.rsList()
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
            ...mapActions(['gethotSearchList', 'getaddhotWords', 'getdelhotWord', 'getedithotWord', 'getrsbatchOp', 'getsorthotWord'])
        },
        // 监视
        watch: {
            hotWord: function (val) {
                var self = this
                self.changeval = val.length
                if (self.changeval > 8) {
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
        margin-left: 10px;
    }

    .recycle>div:nth-child(3) {
        margin-left: 25px;
        width: 70px;
        height: 32px;
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

    .glyphicon-ok {
        color: green;
        font-size: 17px;
    }

    .glyphicon-remove {
        color: red;
        font-size: 17px;
    }

    .dataLi .operate {
        display: flex;
        align-items: center;
    }

    .dataLi .operate>div {
        width: 24px;
        height: 24px;
    }

    .dataLi .operate>div:nth-child(1) {
        margin-right: 10px;
    }

    .dataLi .operate>div:nth-child(2) {
        margin-left: 10px;
    }

    .operate img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .listCont li {
        display: flex;
        /*border: 1px solid red;*/
        min-height: 50px;
    }

    .firstLi {
        border-top: 1px solid #d9d9d9;
        line-height: 58px;
        height: 58px;
        background-color: #f2f4f8;
        border-bottom: 1px solid #d9d9d9;
    }

    .checkCl>div:nth-child(1) {
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        margin-left: 51px;
    }

    .checkCl>div:nth-child(2) {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .checkCl>div:nth-child(3) {
        margin-left: 5px;
    }

    .checkCl>div:nth-child(3) span {
        height: 40px;
        margin-top: 1px;
        display: block;
        font-size: 14px;
    }

    .checkBoxCl {
        display: flex;
        align-items: center;
        /*justify-content: center;*/
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
        justify-content: flex-start;
    }

    .listCont li>div:nth-child(1) {
        /*width: 10%;*/
        overflow: hidden;
        /*min-width: 70px;*/
        display: flex;
        min-height: 49px;
        width: 160px;
    }

    .listCont .dataLi>div:nth-child(2) {
        width: 20%;
        overflow: hidden;
        padding: 7px;
        min-width: 200px;
    }

    .listCont .firstLi>div:nth-child(2) {
        width: 20%;
        padding: 7px;
        padding-top: 0;
        min-width: 200px;
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
        width: 15%;
        min-width: 68px;
    }

    .listCont li>div:nth-child(6) {
        width: 20%;
        min-width: 75px;
    }

    .list {
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
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    .menuLeft {
        display: flex;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .searchBox {
        height: 32px;
        line-height: 32px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding-left: 8px;
        width: 210px;
    }

    .searBut {
        display: flex;
        width: 158px;
        justify-content: space-between;
        margin-right: 0!important;
        margin-left: 16px;
    }

    .searBut div {
        height: 32px;
        width: 70px;
        line-height: 32px;
        text-align: center;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .searBut div:nth-child(1) {
        background: #fe5371;
    }

    .searBut div:nth-child(2) {
        background: #a3a3a3
    }
</style>