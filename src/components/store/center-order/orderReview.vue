<!--订单中心-订单查询-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="backClick">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <div class="list" v-loading="loading">
                <div class="list-page">
                    <div>前一个订单</div>
                    <div>后一个订单</div>
                    <div>打印订单</div>
                </div>
                <div class="list-time">
                    <div>
                        <div>订单号：</div>
                        <div>
                            20164578487545
                        </div>
                    </div>
                    <div>
                        <div>下单时间：</div>
                        <div>
                            2015.05.15 13:00:00
                        </div>
                    </div>
                    <div>
                        <div>付款时间：</div>
                        <div>
                            2015.05.15 13:00:00
                        </div>
                    </div>
                    <div>
                        <div>发货时间：</div>
                        <div>
                            2015.05.15 13:00:00
                        </div>
                    </div>
                </div>
                <div class="list-state">
                    <div>
                        <div>订单状态：</div>
                        <div>
                            已发货
                        </div>
                    </div>
                    <div>
                        <div>配送方式：</div>
                        <div>
                            申通快递
                        </div>
                    </div>
                    <div>
                        <div>支付方式：</div>
                        <div>
                            支付宝
                        </div>
                    </div>
                </div>
                <div class="list-shop">
                    <div>
                        <div>购货人：</div>
                        <div>
                            一个土豆
                        </div>
                    </div>
                    <div>
                        <div>订单来源：</div>
                        <div>
                            Android
                        </div>
                    </div>
                </div>
                <div class="list-deliver">
                    <div>
                        <div>发货单号：</div>
                        <div>
                            2015684567
                        </div>
                    </div>
                    <div>
                        <div>自动收获时间：</div>
                        <div>
                            15天
                        </div>
                    </div>
                </div>
                <div class="list-text">
                    <div>
                        <div>操作备注：</div>
                        <div>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
                <div class="list-noDeliver">
                    <div>
                        未发货
                    </div>
                </div>
                <div class="list-cont">
                    <ul>
                        <li class="firstLi">
                            <div>操作人</div>
                            <div>操作时间</div>
                            <div>订单状态</div>
                            <div>付款状态</div>
                            <div>发货状态</div>
                            <div>备注</div>
                        </li>
                        <li class="dataLi" v-show="lists.length > 0" v-for="item in lists">
                            <div>{{item.a}}</div>
                            <div>{{item.a}}</div>
                            <div>{{item.a}}</div>
                            <div>{{item.a}}</div>
                            <div>{{item.a}}</div>
                            <div>{{item.a}}</div>
                        </li>
                        <li class="nullList" v-show="lists.length == 0">
                            <div>
                                <img src="/static/img/w.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                title: "查看订单",
                loading: false,
                lists: []
            }
        },
        // 过滤
        filters: {
            timeFun: function (val) {
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
            }
        },
        // 模块新建时
        created: function () {
            var self = this
            self.loading = true
            self.getstoregoodsOrderfindGoodsByOrderId({
                orderId: self.$route.query.id
            }).then((data) => {
                self.loading = false
                console.log("订单详情", JSON.parse(JSON.stringify(data)))
                if (data.code == 200) {
                    if (data.data) {

                    } else {
                        self.lists = []
                    }
                } else {
                    self.lists = []
                    self.$message({
                        type: 'info',
                        message: '获取失败!'
                    });
                }
            }).catch(msg => {
                self.lists = []
                console.log(msg)
                self.loading = false
                self.$message({
                    type: 'info',
                    message: '获取失败!'
                });
            })
        },
        // 计算属性
        mounted() {

        },
        // 事件处理
        methods: {
            // 返回订单列表
            backClick() {
                this.$router.push({
                    path: '/store/order/list'
                })
            },
            ...mapActions(['getstoregoodsOrderfindGoodsByOrderId'])
        },
        // 监视
        watch: {
        }
    }

</script>
<style scoped>
    .list-cont .nullList {
        height: 400px;
    }
    
    .list-cont .nullList>div:nth-child(1) {
        width: 607px;
        height: 400px;
        margin: 0 auto;
        border: 0;
        overflow: hidden;
    }
    
    .firstLi {
        height: 58px;
        text-align: center;
        line-height: 58px;
        background-color: #f2f4f8;
    }
    
    .firstLi>div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .dataLi>div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .dataLi {
        height: 50px;
    }
    
    .list-cont li>div:nth-child(1) {
        width: 20%;
    }
    
    .list-cont li>div:nth-child(2) {
        width: 20%;
    }
    
    .list-cont li>div:nth-child(3) {
        width: 15%;
    }
    
    .list-cont li>div:nth-child(4) {
        width: 10%;
    }
    
    .list-cont li>div:nth-child(5) {
        width: 10%;
    }
    
    .list-cont li>div:nth-child(6) {
        width: 25%;
    }
    
    .list-cont li>div {
        border-left: 1px solid #e5e5e5;
    }
    
    .list-cont li>div:last-of-type {
        border-right: 1px solid #e5e5e5;
    }
    
    .list-cont li {
        display: flex;
        min-height: 50px;
        border-top: 1px solid #e5e5e5;
    }
    
    .list-cont li:last-of-type {
        border-bottom: 1px solid #e5e5e5;
    }
    
    .list-cont {
        margin-top: 36px;
        min-height: 150px;
        /*border: 1px solid red;*/
        overflow: hidden;
    }
    
    .list-noDeliver>div {
        width: 90px;
        height: 32px;
        margin-left: 79px;
        background-color: #fe5371;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
    }
    
    .list-noDeliver {
        margin-top: 24px;
        width: 100%;
    }
    
    .list-text {
        margin-top: 24px;
        min-height: 20px;
        display: flex;
        align-items: center;
        margin-top: 24px;
    }
    
    textarea {
        border-radius: 4px;
        font-size: 14px;
        width: 600px;
        color: #97969b;
        border: 1px solid #aeaeae;
        resize: none;
        height: 56px;
    }
    
    .list-text>div>div:nth-child(1) {
        height: 56px;
    }
    
    .list-text>div>div:nth-child(2) {
        margin-left: 5px;
    }
    
    .list-text>div {
        display: flex;
    }
    
    .list-deliver>div {
        display: flex;
        margin-left: 184px;
    }
    
    .list-deliver>div:nth-child(1) {
        margin-left: 0;
    }
    
    .list-deliver {
        margin-top: 24px;
        height: 20px;
        display: flex;
        align-items: center;
        margin-top: 24px;
    }
    
    .list-shop>div {
        display: flex;
        margin-left: 184px;
    }
    
    .list-shop>div:nth-child(1) {
        margin-left: 0;
    }
    
    .list-shop {
        margin-top: 24px;
        height: 20px;
        display: flex;
        align-items: center;
        margin-top: 24px;
    }
    
    .list-state>div {
        display: flex;
        margin-right: 184px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .list-state>div:nth-child(1) {
        margin-left: 0;
    }
    
    .list-state {
        /* height: 20px; */
        display: flex;
        align-items: center;
        margin-top: 24px;
        flex-wrap: wrap;
    }
    
    .list-time>div {
        display: flex;
        margin-right: 72px;
        /* overflow: hidden; */
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .list-time>div:nth-child(1) {
        margin-left: 0;
    }
    
    .list-time {
        /* height: 20px; */
        display: flex;
        align-items: center;

        flex-wrap: wrap;
    }
    
    .list-page>div:nth-child(3) {
        width: 90px;
        height: 32px;
        background-color: #fe5371;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        margin-left: 24px;
    }
    
    .list-page>div:nth-child(2) {
        width: 100px;
        height: 32px;
        border: 1px solid #fe5371;
        border-radius: 4px;
        font-size: 16px;
        color: #d1d1d1;
        margin-left: 24px;
    }
    
    .list-page>div:nth-child(1) {
        width: 100px;
        height: 32px;
        background-color: #fe5371;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
    }
    
    .list-page>div {
        height: 32px;
        line-height: 32px;
        text-align: center;
    }
    
    .list-page {
        display: flex;
        overflow: hidden;
        height: 80px;
        align-items: center;
    }
    
    .list>div {
        min-height: 25px;
        font-size: 15px;
        width: 100%;
        overflow: hidden;
    }
    
    .list {
        min-height: 500px;
        width: 100%;
    }
    
    .sale {
        width: 100%;
        height: 100%;
    }
    
    .sale>div {
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
        margin-top: 7px;
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
</style>