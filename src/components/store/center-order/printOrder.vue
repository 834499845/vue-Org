<!--订单中心-订单日志-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="sale">
        <div>
          	    <div class="listTitle">
                <div>
                	<div id="img" @click='backIndent'></div>
                         订单打印
                </div>
                </div>
               <div class="orderLetterBox">
               	    <div class="orderLetter">订单信</div>
               </div>
               <div class="orderInformationBox">
                    <div class="firstLine">
                    	<div>购货人：小白</div>
                    	<div>下单时间：2015.12.15 13:00:00</div>
                    	<div>订单号：201624554565</div>
                    	<div>支付方式：支付宝/备注：null</div>
                    </div>
                    <div class="secordLine">
                    	<div>付款时间：2015.12.15 13:05:00</div>
                    	<div>发货时间：2015.12.15 13:58:00</div>
                    	<div>配送方式：申通快递</div>
                    	<div>发货单号：2015658798</div>
                    </div>
                    <div class="thirdLine">
                    	<div>收货地址：陕西省西安市高新区中兴产业园</div>
                    	<div>收货人：土豆</div>
                    	<div>联系方式：110</div>
                    </div>
               </div>
            <div class="operatorForm">
         	 <div class="list">
                <div class="listCont">
                    <ul>
                        <li class="firstLi">
                            <div class="checkBoxCl">

                                <div>
                                商品名称
                                </div>
                            </div>
                            <div>
                                货号
                            </div>
                            <div>
                                价格
                            </div>
                            <div>
                                数量
                            </div>
                            <div>
                                单位
                            </div>
                            <div>
                                小计
                            </div>
                        </li>
                        <li class="dataLi">
                            <div>
                               澳柯玛电风扇FS-40N6（Y）摇头扇落地扇AS五叶智能遥控定时功能家用静音
                            </div>
                            <div>
                             ESPN20140205
                            </div>
                            <div>
                               ￥188
                            </div>
                            <div>
                              1
                            </div>
                            <div>
                               把
                            </div>
                            <div>
                                ￥188           
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
         <div class="biconBox">
               <div class="bicon">必康集团</div>
               <div class="biconTime">打印时间：2017年2月4日</div>
         </div>
         <div class="inputer">操作人：</div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  // 过滤
  filters: {
    ctimeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = now.getDate();
      date = date > 9 ? date : "0" + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0" + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0" + minute;
      return (
        "20" + year + "-" + month + "-" + date + "  " + hour + ":" + minute
      );
    }
  },
  // 模块新建时
  created: function() {},
  // 计算属性
  mounted() {},
  // 事件处理
  methods: {
    backIndent() {
      this.$router.push({
        path: "list"
      });
    },
    ...mapActions([""])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.sale {
  width: 100%;
  height: 100%;
  /*border-bottom: 1px solid #ccc;*/
}

.sale > div {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
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

.listTitle > div:nth-child(1) {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 600;
}

#img {
  float: left;
  width: 24px;
  height: 21px;
  background: url(../../../../static/img/elf.png) no-repeat;
  background-position: 28% 70%;
  margin-top: 16px;
  cursor: pointer;
  margin-right: 6px;
}
.orderLetterBox {
  width: 100%;
  margin-top: 24px;
}
.orderLetter {
  color: #303030;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}
.orderInformationBox {
  width: 100%;
  margin-top: 32px;
}
.firstLine {
  width: 100%;
}
.firstLine > div:nth-child(1) {
  display: inline-block;
}
.firstLine > div:nth-child(4) {
  display: inline-block;
  margin-left: 128px;
}
.firstLine > div:nth-child(2) {
  display: inline-block;
  margin-left: 128px;
}
.firstLine > div:nth-child(3) {
  display: inline-block;
  margin-left: 128px;
}
.secordLine {
  width: 100%;
  margin-top: 24px;
}
.secordLine > div:nth-child(1) {
  display: inline-block;
}
.secordLine > div:nth-child(4) {
  display: inline-block;
  margin-left: 128px;
}
.secordLine > div:nth-child(2) {
  display: inline-block;
  margin-left: 72px;
}
.secordLine > div:nth-child(3) {
  display: inline-block;
  margin-left: 102px;
}
.thirdLine {
  width: 100%;
  margin-top: 24px;
}
.thirdLine > div:nth-child(1) {
  display: inline-block;
}
.thirdLine > div:nth-child(2) {
  display: inline-block;
  margin-left: 72px;
}
.thirdLine > div:nth-child(3) {
  display: inline-block;
  margin-left: 102px;
}
.lastLi {
  height: 60px;
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
  justify-content: space-around;
  align-items: center;
}

.dataLi .operate > div {
  width: 30px;
  height: 30px;
}

.dataLi .operate > div:nth-child(1) {
  /*margin-left: 15px;*/
}

.dataLi .operate > div:nth-child(3) {
  margin-right: 15px;
}

.operate img {
  width: 30px;
  font-size: 18px;
  cursor: pointer;
  height: 26px;
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

.checkCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
  margin-left: 20px;
}

.checkCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.checkCl > div:nth-child(3) {
  margin-left: 5px;
}

.checkCl > div:nth-child(3) span {
  height: 40px;
  margin-top: 1px;
  display: block;
  font-size: 15px;
}

.checkBoxCl {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkBoxCl > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  margin-top: 5px;
}

.checkBoxCl > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
}

.firstLi > div {
  border-right: 1px solid #e5e7eb;
  text-align: center;
  color: #303030;
  font-size: 17px;
  font-weight: bold;
}

.firstLi > div:nth-child(5) {
  min-width: 35px;
}

.firstLi > div:nth-child(6) {
  min-width: 35px;
}

.firstLi > div:nth-child(7) {
  min-width: 35px;
}

.firstLi > div:nth-child(8) {
  min-width: 35px;
}

.firstLi > div:nth-child(9) {
  min-width: 70px;
}

.firstLi > div:nth-child(10) {
  min-width: 70px;
}

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.dataLi {
  border-bottom: 1px solid #ececec;
  background-color: #fff;
}

.dataLi > div {
  border-right: 1px solid #ececec;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #515151;
}

.dataLi > div:nth-child(2) {
  font-size: 14px;
}

.dataLi > div:nth-child(1) {
  border-left: 1px solid #ececec;
}

.listCont li > div:nth-child(1) {
  width: 30%;
  overflow: hidden;
  min-width: 109px;
  display: flex;
}

.listCont .dataLi > div:nth-child(2) {
  width: 18%;
  overflow: hidden;
  padding: 7px;
  min-width: 100px;
}

.listCont .firstLi > div:nth-child(2) {
  width: 18%;
  padding: 7px;
  padding-top: 0;
  min-width: 100px;
}

.listCont li > div:nth-child(3) {
  width: 13%;
  min-width: 100px;
}

.listCont li > div:nth-child(4) {
  width: 14%;
  min-width: 109px;
}

.listCont li > div:nth-child(5) {
  width: 12%;
  min-width: 100px;
}

.listCont li > div:nth-child(6) {
  width: 13%;
  min-width: 64px;
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

.listTitle > div:nth-child(1) {
  float: left;
  color: #303030;
  font-size: 16px;
  font-weight: 600;
}

.listTitle > div:nth-child(2) {
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
.operatorForm {
  width: 100%;
  margin-top: 36px;
}
.biconBox {
  width: 100%;
  margin-top: 36px;
}
.bicon {
  float: left;
}
.biconTime {
  float: right;
}
.inputer {
  float: left;
  width: 100%;
  margin-top: 24px;
}
</style>