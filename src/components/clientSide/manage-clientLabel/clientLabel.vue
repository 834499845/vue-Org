<!--标签管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    标签管理
                </div>
            </div>
            <!--列表-->
            <div class="list" v-loading="loading">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div style="width: 15%">
                                昵称
                            </div>
                            <div style="width: 10%">
                                账号
                            </div>
                            <div style="width: 15%">
                                创建时间
                            </div>
                            <div style="width: 15%">
                                更新时间
                            </div>
                            <div style="width: 5%">
                                状态
                            </div>
                            <div style="width: 10%">
                                类型
                            </div>
                            <div style="width: 15%">
                                电话
                            </div>
                            <div style="width: 15%">
                                操作
                            </div>
                        </li>
                        <li class="dataLi" v-show="dataLists.length > 0" v-for="(item,index) in dataLists">
                            <div style="width: 15%">
                                {{item.name | strFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.account}}
                            </div>
                            <div style="width: 15%">
                                {{item.createDate | timeFun}}
                            </div>
                            <div style="width: 15%">
                                {{item.updateDate | timeFun}}
                            </div>
                            <div style="width: 5%">
                                {{item.enable | enableFun}}
                            </div>
                            <div style="width: 10%">
                                {{item.type | typeFun}}
                            </div>
                            <div style="width: 15%">
                                {{item.phone | strFun}}
                            </div>
                            <div class="operate" style="width: 15%">
                                <div v-show="item.type == 2"><img @click="UpdateClick(index)" src="/static/img/编辑.png" alt="编辑" title="编辑"></div>
                                <div v-show="item.type == 2"><img @click="roleClick(index)" src="/static/img/LIJ.png" alt="角色关联" title="角色关联"></div>
                                <template v-if="item.enable == 0">
                                    <div><img @click="stateClick(index)" src="/static/img/禁用.png" title="禁用"></div>
                                </template>
                                <template v-else>
                                    <div><img @click="stateClick(index)" src="/static/img/选中-禁用.png" title="启用"></div>
                                </template>
                                <div><img @click="deleteClick(index)" src="/static/img/删除.png" alt="删除" title="删除"></div>
                            </div>
                        </li>
                        <li class="noList" v-show="dataLists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                        <li class="lastLi" v-show="dataLists.length > 0">
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
                <div class="delContent" v-show="delShow" v-loading="deling">
                    <v-accountdel @ok="delClick" @canle="cancelDelClick" :name="titlename"></v-accountdel>
                </div>
            </transition>
        </div>
        <!--添加弹出框-->
        <div :class="{addPopup:isAddPopup,showAdd:isShowAdd}">
            <transition name="slide-fade">
                <div class="addContent" v-show="addShow" v-loading="adding">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            账户：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddAcountInput,grayRoleInput:isRrayAcountInput}" maxlength="20" type="text"
                                    v-model="accountStr">
                            </div>
                            <div :class="{addRoleTest:isaddAcountInput,grayRoleTest:isRrayAcountInput}">
                                必填项，只可输入英文且字数限制为5-20
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            密码：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddpwsInput,grayRoleInput:isRraypwsInput}" type="text" maxlength="12" v-model="pwsStr">
                            </div>
                            <div :class="{addRoleTest:isaddpwsInput,grayRoleTest:isRraypwsInput}">
                                必填项，只可输入数字且字数限制为6-12
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            姓名：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddnameInput,grayRoleInput:isRraynameInput}" type="text" maxlength="10"
                                    v-model="nameStr">
                            </div>
                            <div :class="{addRoleTest:isaddnameInput,grayRoleTest:isRraynameInput}">
                                必填项，只可为汉字且字数限制2-10
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            电话：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddphoneInput,grayRoleInput:isRrayphoneInput}" type="text" maxlength="11"
                                    v-model="phoneStr">
                            </div>
                            <div :class="{addRoleTest:isaddphoneInput,grayRoleTest:isRrayphoneInput}">
                                必填项，11位数字
                            </div>
                        </div>
                    </div>
                    <div class="popupBut">
                        <div @click="butAddClick">确定</div>
                        <div @click="cancelOpClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--关联弹出框-->
        <div :class="{rolPopup:isrolPopup,showrol:isShowrol}">
            <transition name="slide-fade">
                <div class="rolContent" v-show="rolShow" v-loading="roling">
                    <div class="rolTitle">
                        账户关联角色
                    </div>
                    <div class="rolCont">
                        <div>
                            <template>
                                <el-checkbox-group v-model="checkList" :min="0" :max="200" class="ul">
                                    <el-checkbox v-for="(item,index) in states" :key="index" :label="item.name" class="li"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                         </div>                                                              
                    </div>
                    <div class="rolBut">
                        <div @click="butrolClick">确定</div>
                        <div @click="cancelrolClcik">取消</div>
                    </div>
                </div>
            </transition>
        </div>
        <!--修改弹出框-->
        <div :class="{upPopup:isupPopup,showup:isShowup}">
            <transition name="slide-fade">
                <div class="upContent" v-show="upShow" v-loading="uping">
                    <div class="addTitle">
                    </div>
                    <div class="addForm">
                        <div>
                            账户：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddAcountInput,grayRoleInput:isRrayAcountInput}" maxlength="20" type="text"
                                    v-model="upaccountStr">
                            </div>
                            <div :class="{addRoleTest:isaddAcountInput,grayRoleTest:isRrayAcountInput}">
                                只可输入英文且字数限制为5-20
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            密码：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddpwsInput,grayRoleInput:isRraypwsInput}" type="text" maxlength="12" v-model="uppwsStr">
                            </div>
                            <div :class="{addRoleTest:isaddpwsInput,grayRoleTest:isRraypwsInput}">
                                不输入为使用旧密码。可输入6-12位数字
                            </div>
                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            姓名：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddnameInput,grayRoleInput:isRraynameInput}" type="text" maxlength="10"
                                    v-model="upnameStr">
                            </div>
                            <div :class="{addRoleTest:isaddnameInput,grayRoleTest:isRraynameInput}">
                                只可为汉字且字数限制2-10
                            </div>

                        </div>
                    </div>
                    <div class="addForm">
                        <div>
                            电话：
                        </div>
                        <div>
                            <div>
                                <input id="addRoleInput" :class="{addRoleInput:isaddphoneInput,grayRoleInput:isRrayphoneInput}" type="text" maxlength="11"
                                    v-model="upphoneStr">
                            </div>
                            <div :class="{addRoleTest:isaddphoneInput,grayRoleTest:isRrayphoneInput}">
                                11位数字
                            </div>

                        </div>
                    </div>
                    <div class="popupBut">
                        <div @click="butupClick">修改</div>
                        <div @click="cancelOpClick">取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import {
        mapActions,
        mapState
    } from 'vuex'
    import accountdel from '../../cModule/healthdel'
    export default {
        components: {
            'v-accountdel': accountdel
        },
        data() {
            return {
                isRrayphoneInput: true,
                isaddphoneInput: false,
                isRraynameInput: true,
                isaddnameInput: false,
                isaddpwsInput: false,
                isRraypwsInput: true,
                isaddAcountInput: false,
                isRrayAcountInput: true,
                tfshow: 1000000,
                loading: false,
                checkedt: true,
                checkedf: false,
                states: [],
                deling: false,
                adding: false,
                uping: false,
                roling: false,
                isrolPopup: true,
                isShowrol: true,
                rolShow: false,
                accountStr: '',
                pwsStr: '',
                nameStr: '',
                phoneStr: '',
                isAddPopup: true,
                isShowAdd: true,
                addShow: false,
                upaccountStr: '',
                uppwsStr: '',
                upnameStr: '',
                upphoneStr: '',
                isupPopup: true,
                isShowup: true,
                upShow: false,
                titlename: '',
                isdelPopup: true,
                isShowdel: true,
                delShow: false,
                checked: false,
                dataLists: [],
                pageSizeNum: 10,
                currentPage: 1,
                totalNum: 0,
                delIndex: '',
                rolIndex: '',
                upIndex: '',

                checkList:[]
            }
        },
        // 过滤
        filters: {
            timeFun: function (val) {
                if (val) {
                    var now = new Date(val)
                    var year = now.getYear() - 100;
                    var month = now.getMonth() + 1;
                    month = month > 9 ? month : "0" + month
                    var date = now.getDate();
                    date = date > 9 ? date : "0" + date
                    var hour = now.getHours();
                    hour = hour > 9 ? hour : "0" + hour
                    var minute = now.getMinutes();
                    minute = minute > 9 ? minute : "0" + minute
                    return "20" + year + "-" + month + "-" + date + " " + hour + ": " + minute;
                } else {
                    return "暂无"
                }
            },
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
            },
            typeFun: function (val) {
                if (val) {
                    if (val == 0) {
                        return "账号"
                    } else if (val == 1) {
                        return "邮箱"
                    } else if (val == 2) {
                        return "手机号"
                    } else if (val == 3) {
                        return "第三方邮箱"
                    } else if (val == 4) {
                        return "后台管理"
                    }
                } else {
                    return '无'
                }
            },
            enableFun: function (val) {
                if (val) {
                    if (val == 0) {
                        return "正常"
                    } else if (val == 1) {
                        return "禁用状态"
                    }
                } else {
                    return '无'
                }
            }
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
                    if (ele.name == "前台管理") {
                        ele.children.forEach(function (one, oneIndex) {
                            arrs.push(one.path)
                        })
                    }
                })
                if (arrs.indexOf("clientSideAccount") == -1) {
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
                    // 获取账户列表
                    self.getListFun()
                    // 获取角色列表
                    self.getListRole({
                        pageNo: 1,
                        pageSize: 1000,
                        type:'0',
                        token: TOKEN
                    }).then((data) => {
                        console.log("角色列表", data)
                        if (data.code == 200) {
                            if (data.data) {
                                if (data.data.records) {
                                    if (data.data.records.length > 0) {
                                        self.states = data.data.records
                                    } else {
                                        self.states = []
                                    }
                                } else {
                                    self.states = []
                                }
                            } else {
                                self.states = []
                            }
                        } else {
                            self.$message({
                                type: 'info',
                                message: '获取角色列表失败！'
                            });
                        }
                    }).catch(msg => {
                        console.log(msg)
                        self.dataLists = []
                        self.$message({
                            type: 'info',
                            message: '获取列表失败！'
                        });
                    })
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
        mounted() { },
        // 事件处理
        methods: {
            // 刷新列表
            getListFun() {
                var self = this
                self.loading = true
                self.getListAcount({
                    pageNo: self.currentPage,
                    pageSize: self.pageSizeNum,
                    type:'2'
                }).then((data) => {
                    console.log("用户列表", data)
                    self.loading = false
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.records) {
                                if (data.data.records.length > 0) {
                                    self.dataLists = data.data.records
                                    console.log( self.dataLists)
                                    self.totalNum = data.data.total
                                } else {
                                    self.dataLists = []
                                }
                            } else {
                                self.dataLists = []
                            }
                        } else {
                            self.dataLists = []
                        }
                    } else {
                        self.dataLists = []
                        self.$message({
                            type: 'info',
                            message: '列表获取失败！'
                        });
                    }
                }).catch(msg => {
                    self.loading = false
                    console.log(msg)
                    self.dataLists = []
                    self.$message({
                        type: 'info',
                        message: '列表获取失败！'
                    });
                })
            },
            // 点击分页
            handleCurrentChange(val) {
                var self = this
                self.currentPage = val
                self.getListFun()
            },
            // 选择每页个数
            handleSizeChange(val) {
                var self = this
                self.pageSizeNum = val
                self.getListFun()
            },
            // 关联选项
            levChange() {
                this.checkedf = false
                this.checkedt = true                
            },
            levClick(e, index) {
                e.preventDefault()
                console.log(index)
                this.tfshow = index
            },
            // 添加账号角色关联
            roleClick(index) {
                var self = this
                self.roling = true
                self.tfshow = 0
                var TOKEN = sessionStorage.getItem('token')
                self.getAcountAndRoleList({
                    accountId:self.dataLists[index].id,
                    type:'0',
                    token: TOKEN
                }).then((data) => {
                    console.log("用户的角色列表", data)
                    self.roling = false
                    if (data.code == 200) {
                        if (data.data) {
                            if (data.data.length > 0) {
                                self.states.forEach(function (ele, ind) {
                                    if (ele.id == data.data[0].id) {
                                        self.tfshow = ind
                                    }
                                })
                            }
                        } else {
                            self.$message({
                                type: 'info',
                                message: '获取列表失败！'
                            });
                        }

                    } else {
                        self.$message({
                            type: 'info',
                            message: '获取列表失败！'
                        });
                    }
                }).catch(msg => {
                    self.roling = false
                    console.log(msg)
                    self.dataLists = []
                    self.$message({
                        type: 'info',
                        message: '获取列表失败！'
                    });
                })
                this.isShowrol = false
                this.rolShow = true
                this.rolIndex = index
            },
            // 确认关联按钮
            butrolClick() {
                var self = this
                self.roling = true
                var reoleIdStr = ''
                var TOKEN = sessionStorage.getItem('token')
                self.getDelAcountRole({
                    accountId: self.dataLists[self.rolIndex].id,
                    token: TOKEN,
                    type:'0'
                }).then((data) => {
                    console.log("删除角色成功", data)
                    if (data.code == 200 || data.code == 602) {
                        var TOKEN = sessionStorage.getItem('token')
                        self.getAcountAndRole({
                            accountId: self.dataLists[self.rolIndex].id,
                            roleId: self.states[self.tfshow].id,
                            token: TOKEN,
                            type:'0'
                        }).then((data) => {
                            console.log(data)
                            self.roling = false
                            if (data.code == 200) {
                                self.$message({
                                    type: 'success',
                                    message: '角色和账户关联成功'
                                });

                                self.isShowrol = true
                                self.rolShow = false
                                self.getListFun()
                            } else {
                                self.$message({
                                    type: 'info',
                                    message: '账户关联角色失败！'
                                });
                            }
                        }).catch(msg => {
                            self.roling = false
                            console.log(msg)
                            self.$message({
                                type: 'info',
                                message: '账户关联角色失败！'
                            });
                        })
                    } else {
                        self.roling = false
                        self.$message({
                            type: 'info',
                            message: '账户关联角色失败！'
                        });
                    }
                }).catch(msg => {
                    self.roling = false
                    console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '账户关联角色失败！'
                    });
                })
            },
            // 取消关联弹出框
            cancelrolClcik() {
                this.isShowrol = true
                this.rolShow = false
            },
            // 修改账户状态
            stateClick(index) {
                var self = this
                var enaSta = ''
                if (self.dataLists[index].enable == 0) {
                    enaSta = 1
                } else {
                    enaSta = 0
                }
                var TOKEN = sessionStorage.getItem('token')
                self.getStateAcount({
                    id: self.dataLists[index].id,
                    enable: enaSta,
                    token: TOKEN,
                    type:'0'
                }).then((data) => {
                    console.log('修改状态', data)
                    if (data.code == 200) {
                        self.$message({
                            type: 'success',
                            message: '修改状态成功！'
                        });
                        self.getListFun()
                    } else {
                        self.$message({
                            type: 'info',
                            message: '修改状态失败！'
                        });
                    }
                }).catch(msg => {
                    console.log(msg)
                    self.$message({
                        type: 'info',
                        message: '修改状态失败！'
                    });
                })
            },
            // 修改账户信息
            UpdateClick(index) {
                var self = this
                this.isShowup = false
                this.upShow = true
                var upObj = self.dataLists[index]
                var date = Date.parse(new Date())
                this.upaccountStr = upObj.account
                this.uppwsStr = ''
                this.upnameStr = upObj.name
                this.upphoneStr = upObj.phone
                self.upIndex = index
            },
            // 确认修改
            butupClick() {
                var self = this
                var listObj = {
                    account: self.upaccountStr,
                    password: self.uppwsStr,
                    name: self.upnameStr,
                    phone: self.upphoneStr,
                    id: self.dataLists[self.upIndex].id
                }
                var obj = {}
                for (var key in listObj) {
                    if (listObj[key]) {
                        if (listObj[key].length > 0) {
                            obj[key] = listObj[key]
                        }
                    }
                }
                if (this.isRrayphoneInput != true && this.isRraynameInput != true && this.isRrayAcountInput !=
                    true) {
                    self.uping = true
                    self.getUpAcount(listObj).then((data) => {
                        self.uping = false
                        if (data.code == 200) {
                            this.isShowup = true
                            this.upShow = false
                            self.$message({
                                type: 'success',
                                message: '修改账户信息成功！'
                            });
                            self.upaccountStr = ''
                            self.uppwsStr = ''
                            self.upnameStr = ''
                            self.upphoneStr = ''

                            self.getListFun()
                        } else {
                            self.$message({
                                type: 'info',
                                message: '修改账户信息失败！'
                            });
                        }
                    }).catch(msg => {
                        self.uping = false
                        self.$message({
                            type: 'info',
                            message: '修改账户信息失败！'
                        });
                        console.log(msg)
                    })
                } else {
                    if (this.isRrayphoneInput == true) {
                        self.$message({
                            type: 'info',
                            message: '电话格式不正确！'
                        });
                    } else if (this.isRraynameInput == true) {
                        self.$message({
                            type: 'info',
                            message: '昵称格式不正确！'
                        });
                    } else if (this.isRrayAcountInput == true) {
                        self.$message({
                            type: 'info',
                            message: '账户格式不正确！'
                        });
                    }
                }
            },
            // 添加账户弹出框
            addAccountClick() {
                this.isShowAdd = false
                this.addShow = true
                this.isRrayphoneInput = true
                this.isaddphoneInput = false
                this.isRraynameInput = true
                this.isaddnameInput = false
                this.isaddpwsInput = false
                this.isRraypwsInput = true
                this.isaddAcountInput = false
                this.isRrayAcountInput = true
            },
            // 取消添加弹出框
            cancelOpClick() {
                this.isShowAdd = true
                this.addShow = false
                this.isShowup = true
                this.upShow = false
                this.accountStr = ''
                this.pwsStr = ''
                this.nameStr = ''
                this.phoneStr = ''
                this.upaccountStr = ''
                this.uppwsStr = ''
                this.upnameStr = ''
                this.upphoneStr = ''
            },
            // 确认添加
            butAddClick() {
                var self = this
                if (this.isRrayphoneInput != true && this.isRraynameInput != true && this.isRraypwsInput != true && this.isRrayAcountInput !=
                    true) {
                    self.adding = true
                    self.getAddAcount({
                        account: self.accountStr,
                        password: self.pwsStr,
                        name: self.nameStr,
                        phone: self.phoneStr,
                        enable: "0",
                        type: "2"
                    }).then((data) => {
                        self.adding = false
                        console.log(data)
                        if (data.code == 200) {
                            this.isShowAdd = true
                            this.addShow = false
                            self.accountStr = ''
                            self.pwsStr = ''
                            self.nameStr = ''
                            self.phoneStr = ''
                            self.$message({
                                type: 'success',
                                message: '添加账户成功！'
                            });
                            self.getListFun()
                        } else {
                            self.$message({
                                type: 'info',
                                message: '添加账户信息失败！'
                            });
                        }
                    }).catch(msg => {
                        self.adding = false
                        self.$message({
                            type: 'info',
                            message: '添加账户信息失败！'
                        });
                        console.log(msg)
                    })
                } else {
                    if (this.isRrayphoneInput == true) {
                        self.$message({
                            type: 'info',
                            message: '电话格式不正确！'
                        });
                    } else if (this.isRraynameInput == true) {
                        self.$message({
                            type: 'info',
                            message: '昵称格式不正确！'
                        });
                    } else if (this.isRraypwsInput == true) {
                        self.$message({
                            type: 'info',
                            message: '密码格式不正确！'
                        });
                    } else if (this.isRrayAcountInput == true) {
                        self.$message({
                            type: 'info',
                            message: '账户格式不正确！'
                        });
                    }
                }
            },
            // 删除
            deleteClick(index) {
                this.titlename = '角色'
                this.isShowdel = false
                this.delShow = true
                this.delIndex = index
            },
            // 确认删除框
            delClick() {
                var self = this
                self.deling = true
                var currentNum = self.currentPage
                if (self.currentPage > 1 && self.delIndex == 0) {
                    self.currentPage = currentNum - 1
                }

                var TOKEN = sessionStorage.getItem('token')
                self.getDelAcount({
                    id: self.dataLists[self.delIndex].id,
                    token: TOKEN,
                    type:"0"
                }).then((data) => {
                    console.log(data)
                    self.deling = false
                    if (data.code == 200) {
                        self.isShowdel = true
                        self.delShow = false

                        self.$message({
                            type: 'success',
                            message: '删除账户成功！'
                        });
                        self.getListFun()
                    } else {
                        self.$message({
                            type: 'info',
                            message: '删除账户失败！'
                        });
                    }
                }).catch(msg => {
                    self.deling = false
                    self.$message({
                        type: 'info',
                        message: '删除账户失败！'
                    });
                    console.log(msg)
                })
            },
            // 取消删除框
            cancelDelClick() {
                this.isShowdel = true
                this.delShow = false
            },
             ...mapActions(['getAddAcount', 'getDelAcount', 'getListAcount', 'getStateAcount', 'getListRole',
            'getAcountAndRole', 'getDelAcountRole', 'getAcountAndRoleList', 'getUpAcount', 'getListResRole'])
        },
        // 监视
        watch: {
            accountStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^[A-Za-z]{5,20}$/);
                if (trimstr.length <= 0) {
                    this.isaddAcountInput = false
                    this.isRrayAcountInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddAcountInput = true
                        this.isRrayAcountInput = false
                    } else {
                        this.isaddAcountInput = false
                        this.isRrayAcountInput = true
                    }
                }
            },
            pwsStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^\d{6,12}$/);
                if (trimstr.length <= 0) {
                    this.isaddpwsInput = false
                    this.isRraypwsInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddpwsInput = true
                        this.isRraypwsInput = false
                    } else {
                        this.isaddpwsInput = false
                        this.isRraypwsInput = true
                    }
                }
            },
            nameStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
                if (trimstr.length <= 0) {
                    this.isRraynameInput = true
                    this.isaddnameInput = false
                } else {
                    if (reg.test(trimstr)) {
                        this.isRraynameInput = false
                        this.isaddnameInput = true
                    } else {
                        this.isRraynameInput = true
                        this.isaddnameInput = false
                    }
                }
            },
            phoneStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^\d{11}$/);
                if (trimstr.length <= 0) {
                    this.isaddphoneInput = false
                    this.isRrayphoneInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddphoneInput = true
                        this.isRrayphoneInput = false
                    } else {
                        this.isaddphoneInput = false
                        this.isRrayphoneInput = true
                    }
                }
            },
            upaccountStr: function (val, oldval) {
                var varstr = val.split('/')[0]
                var trimstr = varstr.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^[A-Za-z]{5,20}$/);
                if (trimstr.length <= 0) {
                    this.isaddAcountInput = false
                    this.isRrayAcountInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddAcountInput = true
                        this.isRrayAcountInput = false
                    } else {
                        this.isaddAcountInput = false
                        this.isRrayAcountInput = true
                    }
                }
            },
            uppwsStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^\d{6,12}$/);
                if (trimstr.length <= 0) {
                    this.isaddpwsInput = false
                    this.isRraypwsInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddpwsInput = true
                        this.isRraypwsInput = false
                    } else {
                        this.isaddpwsInput = false
                        this.isRraypwsInput = true
                    }
                }
            },
            upnameStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^[\u4e00-\u9fa5]{2,10}$/);
                if (trimstr.length <= 0) {
                    this.isRraynameInput = true
                    this.isaddnameInput = false
                } else {
                    if (reg.test(trimstr)) {
                        this.isRraynameInput = false
                        this.isaddnameInput = true
                    } else {
                        this.isRraynameInput = true
                        this.isaddnameInput = false
                    }
                }
            },
            upphoneStr: function (val) {
                var trimstr = val.replace(/(^\s+)|(\s+$)/g, '')
                var reg = new RegExp(/^\d{11}$/);
                if (trimstr.length <= 0) {
                    this.isaddphoneInput = false
                    this.isRrayphoneInput = true
                } else {
                    if (reg.test(trimstr)) {
                        this.isaddphoneInput = true
                        this.isRrayphoneInput = false
                    } else {
                        this.isaddphoneInput = false
                        this.isRrayphoneInput = true
                    }
                }
            },
        }
    }

</script>
<style scoped>
    /*关联弹出框*/
    
    .listCont .noList {
        height: 400px;
    }
    
    .listCont .noList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }
    
    .chcheck {
        margin-left: 25px;
        margin-bottom: 20px;
    }
    
    .rolTitle {
        height: 56px;
        margin-top: 13px;
        overflow: hidden;
        width: 100%;
        line-height: 56px;
        text-align: center;
        font-size: 17px;
        color: #303030;
    }
    
    .rolCont {
        min-height: 70px;
        height: 100%;
        width: 100%;
        
    }
    
    .rolCont>div {
        width: 80%;
        min-height: 70px;
        margin: 10px 60px;
        
    }
    .rolCont>div .ul{
        min-height: 70px;
        display: flex;
        flex-wrap:wrap; 
        align-items: center;
        justify-content: flex-start;
        
    }
    .rolCont>div .ul .li{
        margin:10px 10%;
        width:30%;   
    }
    .rolPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.27);
        z-index: 1000000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .rolContent {
        width: 440px;
        min-height: 250px;
        background-color: #fff;
        /* border: 1px solid #8492a6; */
        border-radius: 5px;
        z-index: 1;
    }
    
    .rolBut {
        width: 100%;
        height: 60px;
        display: flex;
        margin-top: 5px;
        justify-content: center;
    }
    
    .rolBut>div {
        width: 68px;
        height: 30px;
        cursor: pointer;
    }
    
    .rolBut>div:nth-child(1) {
        width: 68px;
        height: 30px;
        background-color: #5acdfa;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        color: #fff;
        margin-right: 20px;
    }
    
    .rolBut>div:nth-child(2) {
        width: 68px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        margin-left: 25px;
        background-color: #d1d1d1;
        text-align: center;
        line-height: 30px;
    }
    
    .showrol {
        display: none;
    }
    /*添加弹出框*/
    
    #inp {
        width: 270px;
        border: 1px solid #aeaeae;
        height: 32px;
        line-height: 32px;
        padding-left: 2px;
        border-radius: 3px;
    }
    
    .addRoleTest {
        color: #d1d1d1;
    }
    
    .grayRoleTest {
        color: #DC322B;
    }
    
    .addRoleInput {
        border: 1px solid #d1d1d1;
    }
    
    .grayRoleInput {
        border: 1px solid #DC322B;
    }
    
    #addRoleInput {
        width: 270px;
        height: 32px;
        line-height: 32px;
        padding-left: 2px;
        border-radius: 3px;
    }
    
    .popupBut {
        width: 100%;
        height: 35px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    
    .popupBut>div {
        width: 68px;
        height: 30px;
        cursor: pointer;
    }
    
    .popupBut>div:nth-child(1) {
        width: 68px;
        height: 30px;
        background-color: #5acdfa;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        color: #fff;
        margin-right: 20px;
    }
    
    .popupBut>div:nth-child(2) {
        width: 68px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        margin-left: 25px;
        background-color: #d1d1d1;
        text-align: center;
        line-height: 30px;
    }
    
    .addForm {
        display: flex;
        align-items: center;
        min-height: 55px;
        width: 100%;
    }
    
    .addForm>div:nth-child(2) {
        margin-left: 15px;
        /*border: 1px solid red;*/
        height: 70px;
        overflow: hidden;
    }
    
    .addForm>div:nth-child(2)>div {
        width: 280px;
        overflow: hidden;
    }
    
    .addForm>div:nth-child(2)>div:nth-child(2) {
        margin-top: 8px;
    }
    
    .addForm>div:nth-child(1) {
        width: 105px;
        height: 70px;
        text-align: right;
        font-size: 15px;
        color: #303030;
        padding-top: 5px;
    }
    
    .addTitle {
        margin-top: 15px;
    }
    
    .addPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .addContent>div:nth-child(1) {
        height: 15px;
        width: 100%;
    }
    
    .addContent {
        width: 450px;
        min-height: 330px;
        background-color: #fff;
        border: 1px solid #d1d1d1;
        border-radius: 7px;
        z-index: 1;
        padding-bottom: 25px;
    }
    
    .showAdd {
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
    /*修改弹出框*/
    
    .upPopup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .upContent>div:nth-child(1) {
        height: 15px;
        width: 100%;
    }
    
    .upContent {
        width: 450px;
        min-height: 330px;
        background-color: #fff;
        border: 1px solid #d1d1d1;
        border-radius: 7px;
        z-index: 1;
        padding-bottom: 25px;
    }
    
    .showup {
        display: none;
    }
    /*删除弹出框*/
    
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
        margin-top: 3px;
        margin-left: 25px;
        width: 70px;
        height: 30px;
        background-color: #5acdfa;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
    }
    
    #lastLiRight {
        width: 80%;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    
    .lastLi>div:nth-child(1) {
        width: 10px;
    }
    
    .lastLi>div:nth-child(2) {
        width: 80%;
        display: flex;
        justify-content: flex-end;
    }
    
    .lastLi {
        height: 60px;
        display: flex;
        border: 0;
        justify-content: space-between;
    }
    
    .list {
        margin-top: 25px;
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
        height: 50px;
    }
    
    .dataLi .opexu {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .dataLi .opexu>div {
        width: 30px;
        height: 30px;
    }
    
    .dataLi .opexu>div:nth-child(1) {
        margin-left: 5px;
    }
    
    .dataLi .opexu>div:nth-child(2) {
        margin-right: 5px;
    }
    
    .opexu img {
        width: 30px;
        font-size: 18px;
        cursor: pointer;
        height: 26px;
    }
    
    .dataLi .operate {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 58px;
    }
    
    .dataLi .operate>div {
        width: 24px;
        height: 24px;
    }
    
    .operate img {
        width: 100%;
        cursor: pointer;
        height: 100%;
    }
    
    .dataLi>div {
        border-right: 1px solid #ececec;
        font-size: 15px;
        color: #515151;
        height: 58px;
    }
    
    .dataLi>div:nth-child(2) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(1) {
        border-left: 1px solid #ececec;
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(3) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(4) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(5) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(6) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .dataLi>div:nth-child(7) {
        line-height: 58px;
        height: 58px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .list {
        /*border: 1px solid red;*/
        min-height: 540px;
    }
    
    .listTitle {
        height: 58px;
        line-height: 58px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        border: 1px solid #5acdfa;
        border-radius: 3px;
        text-align: center;
        line-height: 24px;
        color: #5acdfa;
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
</style>