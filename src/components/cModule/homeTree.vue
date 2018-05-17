<style>
    .itemOne-two {
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    
    .twoTherr {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 260px);
    }
    
    .itemTree {
        border-bottom: 1px solid #ccc;
    }
    
    .twoTherr>div {
        border-left: 1px solid #ccc;
        height: 50px;
    }
    
    .twoTherr>div:nth-child(1) {
        width: 30%;
    }
    
    .twoTherr>div:nth-child(2) {
        width: 20%;
    }
    
    .twoTherr>div:nth-child(3) {
        width: 25%;
    }
    
    .twoTherr>div:nth-child(4) {
        width: 25%;
        min-width: 120px;
    }
    
    .twoTherrList {
        text-align: center;
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .oneTherr {
        display: flex;
        align-items: center;
        width: 260px;
    }
    
    .oneTherr>div:nth-child(2) {
        width: 13px;
    }
    
    .oneTherr>div:nth-child(3) {
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 50px;
        width: 200px;
        text-align: left;
        cursor: pointer;
    }
    
    .oneTherr img {
        width: 13px;
        height: 13px;
    }
    
    .itemOneOne {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ccc;
    }
    
    .itemOneOne:hover {
        background-color: #ececec;
    }
    
    .dateLi>div:nth-child(1) {
        border-bottom: 0;
    }
    
    .itemOneTwo {
        width: 100%;
    }
    
    .dateLi {
        display: flex;
        flex-wrap: wrap;
        /*height: 50px;*/
        width: 100%;
    }
    
    .firstLi {
        display: flex;
        height: 58px;
        border-bottom: 1px solid #ccc;
        background-color: #f2f4f8;
        font-size: 17px;
        font-weight: bold;
        color: #303030;
    }
    
    .firstLioneTherr {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 260px;
        height: 58px;
    }
    
    .firstLitwoTherr {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 260px);
    }
    
    .firstLitwoTherr>div {
        border-left: 1px solid #ccc;
        height: 58px;
        line-height: 58px;
        text-align: center;
    }
    
    .firstLitwoTherr>div:nth-child(1) {
        width: 30%;
    }
    
    .firstLitwoTherr>div:nth-child(2) {
        width: 20%;
    }
    
    .firstLitwoTherr>div:nth-child(3) {
        width: 25%;
    }
    
    .firstLitwoTherr>div:nth-child(4) {
        width: 25%;
        min-width: 120px;
    }
    
    .treeoperate {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    
    .treeoperate>div {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    
    .treeoperate>div:nth-child(1) {
        margin-right: 20px;
    }
    
    .treeoperate>div:nth-child(3) {
        margin-left: 20px;
    }
    
    .treeoperate>div img {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div>
        <ul class="tree">
            <li class="firstLi">
                <div class="firstLioneTherr">
                    <div>字典名称</div>
                </div>
                <div class="firstLitwoTherr">
                    <div>字典编码</div>
                    <div>创建时间</div>
                    <div>内容</div>
                    <div>操作</div>
                </div>
            </li>
            <ztree-item v-for="(item,i) in lists" :unfoldFun='unfold' :addFun='add' :updateFun='update' :delFun='del' :nameCallBack='nameFun'
                :trees.sync='lists' :num.sync='i' :model.sync="item" :key='i'></ztree-item>
        </ul>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                lists: []
            }
        },
        props: {
            // 树数据
            list: {
                type: Array,
                twoWay: true
            },
            // 点击节点回调
            nameFun: {
                type: Function,
                default: null
            },
            // 点击展开回调
            unfold: {
                type: Function,
                default: null
            },
            add: {
                type: Function
            },
            update: {
                type: Function
            },
            del: {
                type: Function
            }
        },
        filters: {},
        created: function () {
        },
        beforeDestroy: function () { },
        watch: {
            'list': {
                handler: function () {
                    this.initTreeData();
                },
                deep: true
            }
        },
        methods: {
            initTreeData() {
                var tempList = JSON.parse(JSON.stringify(this.list));
                // 递归操作，增加删除一些属性。比如: 展开/收起
                var recurrenceFunc = (data) => {
                    data.forEach((m) => {
                        // console.log('13123', m)
                        // console.log(JSON.parse(JSON.stringify(m)))
                        // m.children = m.hasOwnProperty("children") ? m.children : [];
                        m.children = m.children || [];
                        m.open = m.hasOwnProperty("open") ? m.open : this.isOpen;
                        // m.isExpand = m.hasOwnProperty("open") ? m.open : this.isOpen;
                        // m.loadNode = 0;
                        recurrenceFunc(m.children);
                    })
                };
                recurrenceFunc(tempList);
                this.lists = tempList;
            },
        },
        components: {
            // 组件
            ztreeItem: {
                name: 'ztreeItem',
                props: {
                    model: {
                        type: Object,
                        twoWay: true
                    },
                    num: {
                        type: Number,
                        twoWay: true
                    },
                    trees: {
                        type: Array,
                        twoWay: true,
                        default: []
                    },
                    nameCallBack: {
                        type: Function
                    },
                    unfoldFun: {
                        type: Function
                    },
                    addFun: {
                        type: Function
                    },
                    updateFun: {
                        type: Function
                    },
                    delFun: {
                        type: Function
                    }
                },
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
                            return "20" + year + "-" + month + "-" + date + "  " + hour + ":" + minute;
                        } else {
                            return "无"
                        }
                    },
                    strFun: function (val) {
                        if (val) {
                            return val
                        } else {
                            return "无"
                        }
                    },
                },
                methods: {
                    nameFun(m) {
                        // 查找点击的子节点
                        var recurFunc = (data, list) => {
                            data.forEach((i) => {
                                if (i.id == m.id) {
                                    if (!m.open) {
                                        if (typeof this.nameCallBack == "function") {
                                            this.nameCallBack.call(null, m, list, true);
                                        }
                                    } else {
                                        this.nameCallBack.call(null, m, list, false);
                                    }
                                }
                                if (i.children) {
                                    recurFunc(i.children, i);
                                }
                            })
                        }
                        recurFunc(this.trees, this.trees);
                        m.open = !m.open;
                    },
                    openClick(m) {
                        if (typeof this.unfoldFun == 'function' && !m.open) {
                            this.unfoldFun.call(null, m)
                        } else {
                        }
                        m.open = !m.open;
                    },
                    operationAddClick(m) {
                        // this.addFun.call(null, m)
                        var recurFunc = (data, list) => {
                            data.forEach((i) => {
                                if (i.id == m.id) {
                                    this.addFun.call(null, m, list, false);
                                }
                                if (i.children) {
                                    recurFunc(i.children, i);
                                }
                            })
                        }
                        recurFunc(this.trees, this.trees);
                    },
                    operationUpdateClick(m) {
                        this.updateFun.call(null, m)
                    },
                    operationDelClick(m) {
                        // this.delFun.call(null, m)
                        var recurFunc = (data, list) => {
                            data.forEach((i) => {
                                if (i.id == m.id) {
                                    this.delFun.call(null, m, list, false);
                                }
                                if (i.children) {
                                    recurFunc(i.children, i);
                                }
                            })
                        }
                        recurFunc(this.trees, this.trees);
                    }
                },
                computed: {
                    spanWidth() {
                        return (15 * this.model.level) + 'px'
                    },
                },
                template:
                `<li class="dateLi">
                   <div class="itemOneOne itemTree">
                      <div class="oneTherr twoTherrList treeHover">
                        <div :style="{width:spanWidth}">
                        </div>
                        <div @click="nameFun(model)">
                            <img v-if="model.open" src="/static/img/arrowsB.jpg" alt="展开着的" title="展开着的">
                            <img v-else src="/static/img/arrowsR.jpg" alt="收起着的" title="收起着的">
                        </div>
                        <div @click="nameFun(model)">
                            {{model.dictionaryName}}
                        </div>
                      </div>
                      <div class="twoTherr treeTwoHover">
                        <div class="twoTherrList">{{model.dictionaryCode}}</div>
                        <div class="twoTherrList">{{model.createDate | timeFun}}</div>
                        <div class="twoTherrList">{{model.content | strFun}}</div>
                        <div class="treeoperate">
                            <div><img @click="operationAddClick(model)" src="/static/img/添加.png" alt="添加" title="添加"></div>
                            <div><img @click="operationUpdateClick(model)" src="/static/img/编辑.png" alt="编辑" title="编辑"></div>
                            <div><img @click="operationDelClick(model)" src="/static/img/删除.png" alt="删除" title="删除"></div>
                        </div>
                      </div>
                   </div>
                   <div class="itemOneTwo" v-show='model.open'>
                     <ul class="treeTwo">
                        <ztree-item v-for="(item,i) in model.children" :unfoldFun='unfoldFun' :addFun='addFun' :updateFun='updateFun' :delFun='delFun' :nameCallBack='nameCallBack' :trees.sync='trees' :model.sync="item"  :num.sync='i' :key='i'></ztree-item>
                     </ul>
                   </div>
                </li>`
            }
        },
        update() {
            this.initTreeData();
        },
        mounted() {
            Vue.nextTick(() => {
                this.initTreeData();
            })
        }
    }

</script>