<!--商品中心-添加商品-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="addCommodity">
        <div>
            <div class="listTitle">
                <div>
                    <div @click="gobackClick" style="cursor: pointer;">
                        <img src="/static/img/fan.png" alt="">
                    </div>
                    <div>
                        {{title}}
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="mainNav">
                    <ul>
                        <li v-for="(item,index) in lists" @click="navClick(index)" :class="{afLi:isAfLi == index}">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="mainCont">
                    <!--添加商品-通用信息-->
                    <div class="user" v-show="pitch == 0">
                        <div class="comone">
                            <div>
                                请选择商品类型：
                            </div>
                            <div>
                                <el-checkbox v-model="checked1" @change="typeChange(2)"></el-checkbox>
                                <small>普通商品</small>
                            </div>
                            <div>
                                <el-checkbox v-model="checked2" @change="typeChange(1)"></el-checkbox>
                                <small>定制商品</small>
                            </div>
                        </div>
                        <div class="calsshead">
                            <div>请选择类目：</div>
                            <div class="selectBox">
                                <div>
                                    <select :disabled="noClick" :class="{redInput:isRedselectedFirstType}" @change="selectedFirstTypeClick" style="width:100px;"
                                        v-model="selectedFirstType">
                                        <option v-for="(type,index) in FirstType" :value="type.id">{{type.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select :disabled="noClick" :class="{redInput:isRedselectedSecondType}" @change="selectedSecondTypeClick" style="width:100px;"
                                        v-model="selectedSecondType">
                                        <option v-for="(type,index) in SecondTypes" :value="type.id">{{type.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <select :disabled="noClick" :class="{redInput:isRedselectedThirdType}" @change="selectedThirdTypeClick" style="width:100px;"
                                        v-model="selectedThirdType">
                                        <option v-for="(type,index) in ThirdTypes" :value="type.id">{{type.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                最近使用类目：
                            </div>
                            <div :title="recentType" class="recenttypes" @click="recenttypesClick">
                                {{recentType}}
                                <!--<input type="text" v-model="recentType">-->
                            </div>
                        </div>
                        <div class="abrand">
                            <div>商家品牌：</div>
                            <div :class="{redInput:isRedselectedBrand}">
                                <el-select v-model="selectedBrand" filterable placeholder="请选择">
                                    <el-option v-for="(item,index) in brands" :key="index" :label="item.chinaName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div>
                            <div>选择供货商：</div>
                            <div>
                                <v-select width="170" :selects="selectedSupport" :list="supplys" @select="selecSuppsClick"></v-select>
                            </div>
                        </div>
                        <div>
                            <div>进货价：</div>
                            <div>
                                <input maxlength="8" :class="{redInput:isRedbuyingPrice}" type="text" v-model="buyingPrice">
                            </div>
                            <div class="grayfont" style="margin-left:12px;">元
                                <span :class="{redFont:isRedfontbuyingPrice}">(只能输入数字)</span>
                            </div>
                        </div>
                        <div class="cname">
                            <div>商品名称：</div>
                            <div>
                                <input maxlength="60" :class="{redInput:isRedproductName}" type="text" style="width: 437px;" v-model="productName">
                            </div>
                            <small :class="{redFont:isRedfontproductName}">最多60字(不支持非法字符)</small>
                        </div>
                        <!--<div class="cdetails">
                        <div>商品描述：</div>
                        <div>
                            <textarea maxlength="100" name="" id="" v-model="description">

                                            </textarea>
                        </div>
                        <small>最多100字，仅显示</small>
                        </div>-->
                        <div>
                            <div>商品标签：</div>
                            <div>
                                <input maxlength="50" :class="{redInput:isRedlable}" type="text" style="width: 437px;" v-model="lable">
                            </div>
                        </div>
                        <div class="cLabel">
                            <div></div>
                            <div :class="{redFont:isRedfontlable}">
                                标签用于搜索，用“，”隔开，单个标签不能超过7个字符，总长度不能超过50个字符
                            </div>
                        </div>
                        <div class="but">
                            <div>
                                <div @click="ensureCommenClick">下一步</div>
                                <!--<div @click="resetCommenClick">重置</div>-->
                            </div>
                        </div>
                    </div>
                    <!--添加商品-详细描述-->
                    <div class="dscribe" v-show="pitch == 1">
                        <div>
                            <div class="details">
                                <div>详细描述：</div>
                                <div>
                                    <div id="editor" tabindex="-1" v-html="inputContent" style="height: 500px;">

                                    </div>
                                </div>
                                <div :class="{grayfont:true,redFont:isRedinputContent}" style="margin-left: 5px;">
                                    1000个字符，可添加图片、超链接
                                </div>
                            </div>
                            <div class="but" style="margin-top: 35px;">
                                <div>
                                    <div @click="ensuredscribeClick">下一步</div>
                                    <div @click="backdscribeClick">上一步</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加商品-商品属性-->
                    <div class="property" v-show="pitch == 2">
                        <div class="pClass">
                            <div>商品分类：</div>
                            <div>
                                <input :title="goodsType" style="background:#fff;" :disabled="true" type="text" width="96" v-model="goodsType">
                            </div>
                        </div>
                        <div class="pSKU">
                            <div>SKU选择：
                                <span style="font-size:12px;" v-show="noSku">(此商品没有SKU信息，请前去
                                    <a @click="toStandard">商品规格</a>设置！)</span>
                            </div>
                            <div>
                                <div class="skucolor">
                                    <div>
                                        {{color}}：
                                    </div>
                                    <ul class="list-ch">
                                        <li v-for="(item,index) in colors">
                                            <!--<el-checkbox-group v-model="colorCheckList" @change="colorCheckCheckedCitiesChange">
                                                <el-checkbox :label="item" :key="index">{{item.attributeValue}}</el-checkbox>
                                            </el-checkbox-group>-->
                                            <div @click="colorCheckCheckedCitiesChange(index)" v-show="!item.show">
                                                <img src="/static/img/show.png" alt="" style="cursor:pointer;width: 18px;height: 18px;">
                                            </div>
                                            <div @click="colorCheckCheckedCitiesChange(index)" v-show="item.show">

                                            </div>
                                            <div :title="item.attributeValue">{{item.attributeValue}}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="skuchi">
                                    <div>
                                        {{size}}：
                                    </div>
                                    <ul class="list-ch">
                                        <li v-for="(item,index) in sizes">
                                            <!--<el-checkbox-group v-model="sozeCheckList" @change="sozeCheckCheckedCitiesChange">
                                                <el-checkbox :label="item" :key="index">{{item.attributeValue}}</el-checkbox>
                                            </el-checkbox-group>-->
                                            <div @click="sozeCheckCheckedCitiesChange(index)" v-show="!item.show">
                                                <img src="/static/img/show.png" alt="" style="cursor:pointer;width: 18px;height: 18px;">
                                            </div>
                                            <div @click="sozeCheckCheckedCitiesChange(index)" v-show="item.show">

                                            </div>
                                            <div :title="item.attributeValue">{{item.attributeValue}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="pDetails">
                            <div>详细设置：</div>
                            <p class="grayfont">（图片上传只支持360*360，200k以内）</p>
                            <div class="pDetaLs">
                                <ul>
                                    <li class="firstLi">
                                        <div>{{color}}</div>
                                        <div>{{size}}</div>
                                        <div>库存</div>
                                        <div>价格</div>
                                        <div>图片<small>360*360</small></div>
                                        <div>操作</div>
                                    </li>
                                    <li class="dataLi" v-for="(item,index) in detas">
                                        <div>{{item.color}}</div>
                                        <div>{{item.size}}</div>
                                        <!--<div class="editDiv" @keypress="editDivRule" contentEditable="true" v-model="detas_1[index].productNum" @input="detas_1[index].productNum = $event.target.innerText">{{item.productNum}}</div>
                                        <div class="editDiv" @keypress="editDivRule" contentEditable="true" v-model="detas_1[index].price" @input="detas_1[index].price = $event.target.innerText">{{item.price}}</div>-->
                                        <div class="editDiv" @keypress="editDivRule">{{item.productNum}}</div>
                                        <div class="editDiv" @keypress="editDivRule">{{item.price}}</div>
                                        <div class="dataLibut">
                                            <label for="upload_1" @click="labelClick(index)">
                                                <div class="uoBut" v-show="item.picture.length == 0"></div>
                                                <div v-show="item.picture.length !== 0">
                                                    <img :src="item.picture" alt="">
                                                </div>
                                            </label>
                                            <input id="upload_1" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange_1(selectIndex,$event)">
                                        </div>
                                        <div class="dataLibut">
                                            <div style="margin-right:5px;" class="delimg" @click="delgoodstype(index)"></div>
                                            <div style="margin-left:5px;" class="editimg" @click="editgoodstype(index)"></div>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="but" style="margin-top:20px;">
                            <div>
                                <div @click='ensurepropertyClick'>下一步</div>
                                <div @click="backpropertyClick">上一步</div>
                            </div>
                        </div>
                        <!--修改商品价格、库存弹出框-->
                        <div class="ModalsBox" v-show="isModalsBox_1">
                            <div class="Modals" style="height:280px;">
                                <div class="modalTitle">修改库存和价格</div>
                                <div class="modalContent">
                                    <span>库存：</span>
                                    <!--:class="{redInput:isRedinventory}"-->
                                    <input :class="{redInput:isRedinventory}" maxlength="5" type="text" v-model="inventory" @keyup="inventory = inventory.replace(/[^\d.]/g,'')">
                                    <span :class="{grayfont:true,redFont:isRedfontinventory}">请输入非负整数</span>
                                </div>
                                <div class="modalContent">
                                    <span>价格：</span>
                                    <input :class="{redInput:isRedmoney}" maxlength="5" type="text" v-model="money" @keyup="money = money.replace(/[^\d.]/g,'')">
                                    <span :class="{grayfont:true,redFont:isRedfontmoney}">请输入正确的价格</span>
                                </div>
                                <div class="footerbut" style="margin-left:160px;margin-top:16px;">
                                    <div style="margin-left:0;">
                                        <div v-show="false">确定</div>
                                        <div @click="editgoodsClick">确定</div>
                                        <div @click="canclegoods">取消</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加商品-商品相册-->
                    <div class="photo" v-show="pitch ==3">
                        <div>
                            <div class="imgD">
                                <ul>
                                    <li class="dataLi" v-for="(item,index) in photos">
                                        <div>
                                            <img :src="item.productUrl" alt="">
                                        </div>
                                        <div @click="deluploadImg(index)">
                                            X
                                            <!--<img src="" alt="">-->
                                        </div>
                                    </li>
                                    <li class="addLi" style="width:333px;" v-show="photos.length < 5">
                                        <label for="upfile">
                                            <div>
                                                <div class="addUploadicon"></div>
                                            </div>
                                        </label>
                                        <input id="upfile" type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                                        <span class="grayfont" style="margin-left:24px;">图片尺寸600*600,200KB以内</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="but" style="margin-top:20px;">
                                <div>
                                    <div @click="ensurephotoClick">下一步</div>
                                    <div @click="backphotoClick">上一步</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加商品-其他信息-->
                    <div class="rest" v-show="pitch == 4">
                        <div class="main">
                            <div>
                                <div>商品重量：</div>
                                <div>
                                    <input :class="{redInput:isgoosWeight}" type="text" style="width:104px;" v-model="goosWeight">
                                    <!--<select @change="selectedUnitClick" style="width:100px;margin-left:33px;" v-model="selectedUnit">
                                        <option v-for="(type,index) in Units" :value="type.id">{{type.name}}</option>
                                    </select>-->
                                    克
                                </div>
                                <div class="redFont" v-show="isRedfontgoosWeight" style="margin-left: 12px;">只能输入数字</div>
                            </div>
                            <div>
                                <div>库存警告数量：</div>
                                <div>
                                    <input :class="{redInput:isstockwarnNum}" type="text" style="width:104px;" v-model="stockwarnNum">
                                </div>
                                <div class="redFont" v-show="isRedfontstockwarnNum" style="margin-left: 12px;">只能输入数字</div>
                            </div>
                            <div>
                                <div>商品货号：</div>
                                <div>
                                    <input maxlength="10" :class="{redInput:isRedgoodsNo}" type="text" style="width:104px;" v-model="goodsNo">
                                </div>
                            </div>
                            <div>
                                <div>上架：</div>
                                <div class="checkBoxmt">
                                    <el-checkbox v-model="ground"></el-checkbox>
                                    <span class="grayfont" style="margin-left:8px;">打勾表示立即上架</span>
                                </div>
                            </div>
                            <div>
                                <div>作为商品销售：</div>
                                <div class="checkBoxmt">
                                    <el-checkbox v-model="goodssell"></el-checkbox>
                                    <span class="grayfont" style="margin-left:8px;">打勾表示能作为商品销售，否则只能作为配件或赠品销售</span>
                                </div>
                            </div>
                            <div>
                                <div>是否为免运费商品：</div>
                                <div class="checkBoxmt">
                                    <el-checkbox v-model="freegoods"></el-checkbox>
                                    <span class="grayfont" style="margin-left:8px;">打勾表示该商品为包邮商品，否则需选择运费模板</span>
                                </div>
                            </div>
                            <div v-show="freegoods == false">
                                <div></div>
                                <div>
                                    <select :class="{redInput:isRedselectedlogistics}" @change="selectedlogisticsClick" style="width:240px;" v-model="selectedlogistics">
                                        <option v-for="(type,index) in logistics" :value="type.id">{{type.expressDelivery}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="but" style="margin-top:20px;">
                                <div style="margin-left:163px;">
                                    <div @click='ensurerestClick'>下一步</div>
                                    <div @click="backrestClick">上一步</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加商品-关联地区-->
                    <div class="relecomm" v-show="pitch == 5">
                        <div class="main">
                            <div>
                                <!--<div>
                                    <select @change="selectedAreaClick" style="width:100px;" v-model="selectedArea">
                                            <option v-for="(type,index) in Areas" :value="type.id">{{type.name}}</option>
                                    </select>
                                </div>
                                <div class="ensurearea" style="margin-left:33px;">确定</div>-->
                            </div>
                            <div>
                                <div>
                                    <p>可选地区</p>
                                    <div class="areaBox">
                                        <ul>
                                            <li @click="optionliClick(index)" v-for="(item,index) in optionareas" :class="{optionli:isoptionli,bgcolor:item.checked}">
                                                {{item.value}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div style="margin:0 40px;margin-top:154px;">
                                    <div class="rightarrow" @click="rightarrowClick"></div>
                                    <div class="leftarrow" @click="leftarrowClick"></div>
                                </div>
                                <div>
                                    <p>该商品的地区</p>
                                    <div class="areaBox">
                                        <ul>
                                            <li @click="goodsliClick(index)" v-for="(item,index) in goodsareas" :class="{optionli:isoptionli,bgcolor:!item.checked}">
                                                {{item.value}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-show="lists.length == 7" class="but" style="margin-top:20px;">
                                <div style="margin-left:311px;">
                                    <div @click='ensurerelecommClick'>下一步</div>
                                    <div @click="backrelecommAskClick">上一步</div>
                                </div>
                            </div>
                            <!--如果没有启用定制,点击提交-->
                            <div v-show="lists.length == 6" class="but" style="margin-top:20px;">
                                <div style="margin-left:311px;">
                                    <div @click='ensurerelecommAskClick'>确定</div>
                                    <div @click="backrelecommAskClick">上一步</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加商品启用定制-->
                    <div class="customization" v-show="pitch == 6">
                        <div>
                            <div class="onecharacter onech">
                                <div>
                                    <div>
                                        前身文字自定义：
                                    </div>
                                    <div>
                                        <el-checkbox v-model="prechecked1" @change="pretypeChange(1)"></el-checkbox>
                                        <small>启用</small>
                                    </div>
                                    <div>
                                        <el-checkbox v-model="prechecked2" @change="pretypeChange(2)"></el-checkbox>
                                        <small>不启用</small>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        字数限制：
                                    </div>
                                    <div>
                                        <small>可输入</small>
                                        <input maxlength="3" type="text" style="width:37px;" v-model="preentry" @keyup="preentry = preentry.replace(/[^0-9]+/,'')">
                                        <small>个字符</small>
                                    </div>
                                </div>
                            </div>
                            <div class="onecharacter twoch">
                                <div class="">
                                    <div>
                                        后身文字自定义：
                                    </div>
                                    <div>
                                        <el-checkbox v-model="backchecked1" @change="backtypeChange(1)"></el-checkbox>
                                        <small>启用</small>
                                    </div>
                                    <div>
                                        <el-checkbox v-model="backchecked2" @change="backtypeChange(2)"></el-checkbox>
                                        <small>不启用</small>
                                    </div>
                                </div>
                                <div class="twochs">
                                    <div>
                                        字数限制：
                                    </div>
                                    <div>
                                        <small>可输入</small>
                                        <input maxlength="3" type="text" style="width:37px;" v-model="backentry" @keyup="backentry = backentry.replace(/[^0-9]+/,'')">
                                        <small>个字符</small>
                                    </div>
                                </div>
                            </div>
                            <div class="chemical">
                                <div class="chemone">
                                    <div>
                                        微量元素自定义：
                                    </div>
                                    <div>
                                        <el-checkbox v-model="elechecked1" @change="eletypeChange(1)"></el-checkbox>
                                        <small>启用</small>
                                    </div>
                                    <div>
                                        <el-checkbox v-model="elechecked2" @change="eletypeChange(2)"></el-checkbox>
                                        <small>不启用</small>
                                    </div>
                                </div>
                                <div class="listCont" v-show="elechecked1 == true">
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
                                                元素名称
                                            </div>
                                            <div>
                                                最小值
                                            </div>
                                            <div>
                                                最大值
                                            </div>
                                            <div>
                                                单位
                                            </div>
                                            <div>
                                                步长
                                            </div>
                                            <div>
                                                排序
                                            </div>
                                            <div>
                                                操作
                                            </div>
                                        </li>
                                        <li class="dataLi" v-for="(item,index) in dataLists">
                                            <!--<div class="checkCl">
                                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                                    <el-checkbox :label="item" :key="index">{{index + 1}}</el-checkbox>
                                                </el-checkbox-group>
                                                <div>
                                                    
                                                </div>
                                            </div>-->
                                            <div>
                                                {{index + 1}}
                                            </div>
                                            <div>
                                                {{item.elementName}}
                                            </div>
                                            <div>{{item.minValue}}</div>
                                            <div>{{item.maxValue}}</div>
                                            <div>{{item.unit}}</div>
                                            <div>{{item.growNum}}</div>
                                            <div>
                                                <div class="upicon" @click="upiconClick(index)"></div>
                                                <div class="downicon" @click="downiconClick(index)"></div>
                                            </div>
                                            <div>
                                                <div style="margin-right:5px;" class="delimg" @click="deleleClick(index)"></div>
                                                <div style="margin-left:5px;" class="editimg" @click="editimgClick(index)"></div>
                                            </div>
                                        </li>
                                        <li class="addli">
                                            <div class="addicon" @click="addele"></div>
                                            <div @click="addele" style="cursor:pointer;">新增元素</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="but">
                                <div>
                                    <div @click="ensureRequest">确定</div>
                                    <div @click="backRequest">上一步</div>
                                </div>
                            </div>
                        </div>

                        <!--新增元素弹出框-->
                        <div class="ModalsBox" v-show="isModalsBox">
                            <div class="Modals" style="height:460px;">
                                <div class="modalTitle">{{addeleTitle}}</div>
                                <div class="modalContent">
                                    <span style="margin-left:0;">元素名称：</span>
                                    <input :class="{redInput:isRedelename}" maxlength="5" type="text" v-model="elename">
                                    <span :class="{grayfont:true,redFont:isRedfontelename}">不支持非法字符</span>
                                </div>
                                <div class="modalContent">
                                    <span>最小值：</span>
                                    <input :class="{redInput:isRedminvalue}" maxlength="5" type="text" v-model="minvalue" @keyup="minvalue = minvalue.replace(/[^\d.]/g,'')">
                                </div>
                                <div class="modalContent">
                                    <span>最大值：</span>
                                    <input :class="{redInput:isRedmaxvalue}" maxlength="5" type="text" v-model="maxvalue" @keyup="maxvalue = maxvalue.replace(/[^\d.]/g,'')">
                                </div>
                                <div class="modalContent">
                                    <span style="margin-left: 28px;">单位：</span>
                                    <input :class="{redInput:isRedunit}" maxlength="5" type="text" v-model="unit">
                                </div>
                                <div class="modalContent">
                                    <span style="margin-left:28px;">步长：</span>
                                    <input :class="{redInput:isRedstep}" maxlength="5" type="text" v-model="step" @keyup="step = step.replace(/[^\d.]/g,'')">
                                </div>
                                <div class="footerbut" style="margin-left:160px;margin-top:16px;">
                                    <div style="margin-left:0;">
                                        <div @click="addeleClick" v-show="addeleTitle == '新增微量元素'">确定</div>
                                        <div @click="editeleClick" v-show="addeleTitle == '编辑微量元素'">确定</div>
                                        <div @click="cancleele">取消</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import WangEditor from "wangeditor";
import { mapActions, mapState } from "vuex";
import minput from "../../cModule/minput";
import select from "../../cModule/newsselect";
import selec from "../../cModule/select";
export default {
  components: {
    "v-minput": minput,
    "v-select": select,
    "v-selec": selec
  },
  data() {
    return {
      deleleClickTrue: false,
      ensureRequestTrue: false,
      onFileChangeTrue: false,
      onFileChangeOneTrue: false,
      productNum: 0,
      title: "添加商品",
      lists: [
        {
          name: "通用信息",
          path: "common"
        },
        {
          name: "详细描述",
          path: "describe"
        },
        {
          name: "商品属性",
          path: "property"
        },
        {
          name: "商品相册",
          path: "photo"
        },
        {
          name: "其他信息",
          path: "rest"
        },
        // { name: '关联商品', path: 'relevance' },
        {
          name: "关联地区",
          path: "relecomm"
        }
        // { name: '配 件', path: 'parts' },
        // { name: '启用定制', path: 'customization' }
      ],
      isAfLi: 0,
      pitch: 0,
      //详细描述
      // edito: '',
      inputContent: "",
      content: "",
      inputText: "",
      isRedinputContent: false,
      // 通用信息
      recentTypeId: "",
      noClick: false,
      threeTypes: "",
      searchTitle: "",
      isOneBgColor: 0,
      selectedBrands: "",
      buyingPrice: "",
      productName: "",
      // description: '',
      lable: "",
      productType: "",
      selectedBrand: "",
      FirstType: [
        {
          id: "",
          name: "请选择"
        }
      ],
      SecondTypes: [
        {
          id: "",
          name: "请选择"
        }
      ],
      ThirdTypes: [
        {
          id: "",
          name: "请选择"
        }
      ],
      selectedFirstType: "",
      selectedSecondType: "",
      SecondType: [],
      selectedThirdType: "",
      ThirdType: [],
      checked1: true,
      checked2: false,
      supplys: [
        {
          name: "不选择即为平台自产",
          id: ""
        }
      ],
      ones: ["1", "11"],
      brands: [
        // { chinaName: '请选择', id: '' }
      ],
      selectedSupport: "",
      recentType: "",
      selectedpath: "",
      isselectedFirstType: false,
      isselectedSecondType: false,
      isselectedThirdType: false,
      isselectedBrand: false,
      isbuyingPrice: true,
      isproductName: false,
      islable: false,

      isRedselectedFirstType: false,
      isRedselectedSecondType: false,
      isRedselectedThirdType: false,
      isRedselectedBrand: false,
      isRedbuyingPrice: false,
      isRedfontbuyingPrice: false,
      isRedproductName: false,
      isRedfontproductName: false,
      isRedlable: false,
      isRedfontlable: false,
      // 商品属性
      isRedinventory: false,
      isRedmoney: false,
      isRedfontinventory: false,
      isRedfontmoney: false,
      delIndex: "",
      isModalsBox_1: false,
      inventory: "",
      money: "",
      repertorylists: [],
      editdata: {},
      color: "颜色",
      size: "尺码",
      goodsType: "",
      colors: [],
      sizes: [],
      colorCheckList: [],
      sozeCheckList: [],
      detas: [],
      detas_1: [],
      // uploadicon:true,
      // issmallimg:false,
      // smallimg:'',
      selectIndex:'', //sku列表，点击的列表index值
      // 商品相册
      photos: [],
      goodsphoto: false,
      // 其他信息
      selectedUnit: "0",
      Units: [
        {
          name: "毫克",
          id: "0"
        },
        {
          name: "克",
          id: "1"
        },
        {
          name: "千克",
          id: "2"
        }
      ],
      stockwarnNum: "",
      goosWeight: "",
      goodsNo: "",
      ground: true,
      goodssell: true,
      freegoods: true,
      selectedlogistics: "",
      logistics: [
        {
          expressDelivery: "请选择",
          id: ""
        },
        {
          expressDelivery: "顺丰速运",
          id: "1"
        },
        {
          expressDelivery: "韵达",
          id: "2"
        },
        {
          expressDelivery: "圆通",
          id: "3"
        }
      ],
      upShelves: "",
      isProduct: "",
      isFreeFreight: "",

      isstockwarnNum: false,
      isRedfontstockwarnNum: false,
      isRedgoodsNo: false,
      isRedselectedlogistics: false,
      isgoosWeight: false,
      isRedfontgoosWeight: false,
      // 关联地区
      // selectedArea: '0',
      // Areas: [
      // ],
      optionareas: [],
      selectoptionareas: [],
      goodsareas: [],
      isbgcolor: false,
      isoptionli: true,
      toDeleteIndexes: [],
      toDeleteIndexes_1: [],
      selectgoodsareas: [],
      flag_1: false,
      flag_2: false,
      // 启用定制
      dataLists: [
        // {name:this.elename,minvalue:this.minvalue,maxvalue:this.maxvalue},
      ],
      prechecked1: true,
      prechecked2: false,
      backchecked1: true,
      backchecked2: false,
      elechecked1: true,
      elechecked2: false,
      preentry: 10,
      backentry: 10,
      isModalsBox: false,
      elename: "",
      maxvalue: "",
      minvalue: "",
      isOnBefore: "",
      isOnAfter: "",
      istraceElement: "",
      addeleTitle: "新增微量元素",
      // dataLists_1:[],
      editIndex: "",
      isRedelename: false,
      isRedfontelename: false,
      isRedminvalue: false,
      isRedmaxvalue: false,
      isRedunit: false,
      isRedstep: false,
      unit: "",
      step: "",
      noSku: false
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var comms = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "商城管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
            if (one.name == "商品中心") {
              one.children.forEach(function(two, twoIndex) {
                comms.push(two.path);
              });
            }
          });
        }
      });
      if (arrs.indexOf("commodity") == -1) {
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
        if (comms.indexOf("sale") == -1) {
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
          self.getlogistics();
          // self.inqueryPro()
          self.queryBrands();
          self.recentTypes();
        }
      }
    } else {
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
    this.createEditor();
  },
  // 事件处理
  methods: {
    // 跳转到商品规格页面
    toStandard() {
      this.$router.push({
        path: "/store/commodity/standard"
      });
    },
    // 获取地区信息
    inqueryPro() {
      var self = this;
      self
        .getfindAreaFromRedisList({
          code: "PROVINCE",
          parentId: 1
        })
        .then(data => {
          //   console.log(data, "所有省份");
          if (data.code == 200) {
            if (data.data) {
              data.data.unshift({
                value: "全国",
                key: "1"
              });
              for (var i = 0; i < data.data.length; i++) {
                data.data[i].checked = false;
              }
              self.optionareas = data.data;
              self.queryType(1);
            } else {
              self.queryType(1);
              this.$message("获取省市区失败！");
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    backdscribeClick() {
      this.pitch = this.isAfLi = 0;
    },
    backpropertyClick() {
      this.pitch = this.isAfLi = 1;
    },
    backphotoClick() {
      this.pitch = this.isAfLi = 2;
    },
    backrestClick() {
      this.pitch = this.isAfLi = 3;
    },
    backrelecommAskClick() {
      this.pitch = this.isAfLi = 4;
    },
    backRequest() {
      this.pitch = this.isAfLi = 5;
    },
    goodsDetail() {
      var self = this;
      var operation = self.$route.query.operation;
      if (operation == 2) {
        self.noClick = true;
        self.title = "修改商品";
        self
          .getstoreProductInfo({
            productId: self.$route.query.id
          })
          .then(data => {
            // console.log(data, "要编辑的商品信息");
            if (data.code == 200) {
              self.editdata = data.data;
              self.typeChange(data.data.product.productType);
              var categoryId = data.data.product.categoryId.split("#");
              //   console.log(categoryId, "categoryIdcategoryId");
              self.selectedFirstType = categoryId[1];
              self.selectedFirstTypeClick();
              self.selectedSecondType = categoryId[2];
              self.selectedSecondTypeClick();
              self.threeTypes = self.selectedThirdType = categoryId[3];
              self.selectedThirdTypeClick();
              self.selectedBrand = data.data.product.brandId;
              self.buyingPrice =
                data.data.product.buyingPrice == 0
                  ? ""
                  : data.data.product.buyingPrice;
              self.productName = data.data.product.productName;
              // self.description = data.data.product.description
              self.lable = data.data.product.lable;
              // 详细描述
              self.content = self.inputContent = data.data.product.details;
              // alert(self.content)
              self.inputText = "1";
              // 商品属性（相关信息放在查询sku信息下面）
              // 商品相册
              // self.photos =
              for (var i = 0; i < data.data.pictrueList.length; i++) {
                self.photos.push({
                  productUrl: data.data.pictrueList[i].productUrl
                });
              }
              // 其他信息
              self.goosWeight = data.data.product.weight;
              // self.selectedUnit = data.data.product.   单位
              self.stockwarnNum = data.data.product.noticeNum;
              self.goodsNo = data.data.product.productCode;
              if (data.data.product.upShelves == "0") {
                self.ground = true;
              } else {
                self.ground = false;
              }
              if (data.data.product.isProduct == "1") {
                self.goodssell = true;
              } else {
                self.goodssell = false;
              }
              if (data.data.product.isFreeFreight == "1") {
                self.freegoods = true;
              } else {
                self.freegoods = false;
              }
              self.selectedlogistics = data.data.product.logisticsType;
              // 关联地区
              var arr_2Str = data.data.product.productRegion;
              var arr_2 = arr_2Str.split(",");
              //   console.log(arr_2);
              for (var i = 0; i < arr_2.length; i++) {
                for (var j = 0; j < self.optionareas.length; j++) {
                  if (self.optionareas[j].key == arr_2[i]) {
                    self.goodsareas.push({
                      key: self.optionareas[j].key,
                      value: self.optionareas[j].value,
                      checked: true
                    });
                    self.optionareas.splice(j, 1);
                  }
                }
              }
              // 启用定制
              if (data.data.product.productType == "1") {
                if (data.data.product.isOnBefore == "1") {
                  self.prechecked1 = true;
                  self.prechecked2 = false;
                } else {
                  self.prechecked1 = false;
                  self.prechecked2 = true;
                }
                if (data.data.product.isOnAfter == "1") {
                  self.backchecked1 = true;
                  self.backchecked2 = false;
                } else {
                  self.backchecked1 = false;
                  self.backchecked2 = true;
                }
                if (data.data.product.traceElement == "1") {
                  self.elechecked1 = true;
                  self.elechecked2 = false;
                } else {
                  self.elechecked1 = false;
                  self.elechecked2 = true;
                }
                self.preentry = data.data.product.beforeText;
                self.backentry = data.data.product.afterText;
                for (var i = 0; i < data.data.TraceElement.length; i++) {
                  self.dataLists.push({
                    elementName: data.data.TraceElement[i].elementName,
                    minValue: data.data.TraceElement[i].minValue,
                    maxValue: data.data.TraceElement[i].maxValue,
                    id: data.data.TraceElement[i].id,
                    unit: data.data.TraceElement[i].unit,
                    growNum: data.data.TraceElement[i].growNum
                  });
                }
              }
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self.title = "添加商品";
      }
    },
    gobackClick() {
      this.$router.push({
        path: "/store/commodity/sale"
      });
    },
    // 点击确定发请求
    ensureRequest() {
      var self = this;
      if (this.elechecked1 == true && this.dataLists.length == 0) {
        this.$message("请添加微量元素");
        return;
      }
      if (self.checked1 == true) {
        self.productType = "2";
      } else {
        self.productType = "1";
      }
      if (self.ground == true) {
        self.upShelves = "0";
      } else {
        self.upShelves = "1";
      }
      if (self.goodssell == true) {
        self.isProduct = "1";
      } else {
        self.isProduct = "2";
      }
      if (self.freegoods == true) {
        self.isFreeFreight = "1";
        self.selectedlogistics = "";
      } else {
        self.isFreeFreight = "2";
      }
      // 是否启用前身自定义文字 1 启用 2 不启用
      if (self.prechecked1 == true) {
        self.isOnBefore = "1";
      } else {
        self.isOnBefore = "2";
      }
      // 是否启用后身自定义文字 1 启用 2 不启用
      if (self.backchecked1 == true) {
        self.isOnAfter = "1";
      } else {
        self.isOnAfter = "2";
      }
      // 是否启用微量元素自定义 1 启用 2 不启用
      if (self.elechecked1 == true) {
        self.istraceElement = "1";
      } else {
        self.istraceElement = "2";
      }
      var arr_1 = [];
      for (var i = 0; i < this.goodsareas.length; i++) {
        arr_1.push(this.goodsareas[i].key);
      }
      if (self.ensureRequestTrue == false) {
        self.ensureRequestTrue = true;
        self
          .getaddproduct({
            productType: self.productType,
            classfily: self.selectedpath,
            brandId: self.selectedBrand,
            // 进货价
            buyingPrice: self.buyingPrice == "" ? 0 : self.buyingPrice,
            productName: self.productName,
            // description: self.description,
            lable: self.lable,
            details: self.content,
            weight: self.goosWeight == "" ? 0 : Number(self.goosWeight),
            noticeNum: self.stockwarnNum == "" ? 0 : Number(self.stockwarnNum),
            upShelves: self.upShelves,
            isProduct: self.isProduct,
            isFreeFreight: self.isFreeFreight,
            // 物流id
            logisticsType: self.selectedlogistics,
            productAttr: JSON.stringify(this.detas_1),
            isOnBefore: self.isOnBefore,
            isOnAfter: self.isOnAfter,
            beforeText: Number(self.preentry),
            afterText: Number(self.backentry),
            traceElement: self.istraceElement,
            element: JSON.stringify(self.dataLists),
            pictureStr: JSON.stringify(self.photos),
            saveOrUpdate: self.$route.query.operation
              ? self.$route.query.operation.toString()
              : "1",
            productCode: self.goodsNo,
            productRegion: arr_1.join(","),
            productId: self.$route.query.id ? self.$route.query.id : ""
          })
          .then(data => {
            self.ensureRequestTrue = false;
            if (data.code == 200) {
              if (this.$route.query.operation) {
                this.$message({
                  type: "success",
                  message: "修改商品成功"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "添加商品成功"
                });
              }
              this.$router.push({
                path: "/store/commodity/sale"
              });
            } else if (data.code == 601) {
              this.$message("商品货号不能重复，请查证后重新输入！");
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.ensureRequestTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 导航切换
    navClick(index) {
      // this.pitch = index
      // this.isAfLi = index
    },
    // +++++++++++++++++++++++通用信息+++++++++++++++++++
    // 查询类目
    queryType(m) {
      var self = this;
      self
        .getqueryTypeList({
          level: m
        })
        .then(data => {
          //   console.log("类目查询", data);
          if (data.code == 200) {
            if (m == 1) {
              self.FirstType = data.data;
              self.FirstType.unshift({
                id: "",
                name: "请选择"
              });
              //   console.log(self.FirstType)
              self.queryType(2);
            } else if (m == 2) {
              self.SecondType = data.data;
              self.queryType(3);
            } else if (m == 3) {
              self.ThirdType = data.data;
              if (self.$route.query.operation) {
                this.goodsDetail();
              }
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    queryBrands() {
      // 查询所有的商家品牌
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getAllBrandList({
          token: TOKEN
        })
        .then(data => {
          //   console.log("查询的商家品牌", data);
          if (data.code == 200) {
            self.brands = data.data;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    recentTypes() {
      // 查询最近分类
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getRecentTypeList({
          token: TOKEN
        })
        .then(data => {
          //   console.log("查询的最近使用类目", data);
          if (data.code == 200) {
            var aa = data.data.classesName;
            self.recentType = aa.substring(0, aa.length - 1);
            self.recentTypeId = data.data.classesId;
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 查询物流信息
    getlogistics() {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getStoreLogistics({
          token: TOKEN
        })
        .then(data => {
          //   console.log("查询的物流信息", data);
          if (data.code == 200) {
            // self.selectedlogistics =
            self.logistics = data.data;
            self.logistics.unshift({
              id: "",
              expressDelivery: "请选择"
            });
            self.inqueryPro();
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    recenttypesClick() {
      var self = this;
      if (self.$route.query.operation) {
        return;
      } else {
        let categoryId = self.recentTypeId.split("#");
        // console.log(categoryId, "categoryIdcategoryId");
        self.selectedFirstType = categoryId[1];
        self.selectedFirstTypeClick();
        self.selectedSecondType = categoryId[2];
        self.selectedSecondTypeClick();
        self.selectedThirdType = categoryId[3];
        self.selectedThirdTypeClick();
      }
    },
    commenpanduan() {
      if (this.isselectedFirstType == false) {
        this.isRedselectedFirstType = true;
      } else {
        this.isRedselectedFirstType = false;
      }
      if (this.isselectedSecondType == false) {
        this.isRedselectedSecondType = true;
      } else {
        this.isRedselectedSecondType = false;
      }
      if (this.isselectedThirdType == false) {
        this.isRedselectedThirdType = true;
      } else {
        this.isRedselectedThirdType = false;
      }
      if (this.isselectedBrand == false) {
        this.isRedselectedBrand = true;
      } else {
        this.isRedselectedBrand = false;
      }
      if (this.isbuyingPrice == false) {
        this.isRedbuyingPrice = true;
        this.isRedfontbuyingPrice = true;
      } else {
        this.isRedbuyingPrice = false;
        this.isRedfontbuyingPrice = false;
      }
      if (this.isproductName == false) {
        this.isRedproductName = true;
        this.isRedfontproductName = true;
      } else {
        this.isRedproductName = false;
        this.isRedfontproductName = false;
      }
      // 商品标签
      if (this.islable == false) {
        this.isRedlable = true;
        this.isRedfontlable = true;
      } else {
        this.isRedlable = false;
        this.isRedfontlable = false;
      }
    },
    ensureCommenClick() {
      if (
        this.isselectedFirstType == true &&
        this.isselectedSecondType == true &&
        this.isselectedThirdType == true &&
        this.isselectedBrand == true &&
        this.isbuyingPrice == true &&
        this.isproductName == true &&
        this.islable == true
      ) {
        this.commenpanduan();
        this.pitch = this.isAfLi = 1;
      } else {
        this.commenpanduan();
      }
    },
    resetCommenClick() {},
    typeChange(index) {
      if (index == 2) {
        this.checked1 = true;
        this.checked2 = false;
        this.lists.splice(6, 1);
      } else if (index == 1) {
        this.checked1 = false;
        this.checked2 = true;
        if (this.lists.length == 6) {
          this.lists.push({
            name: "启用定制",
            path: "customization"
          });
        }
      }
    },
    // 选择供应商
    selecSuppsClick() {},
    // 选择品牌
    selecBradnsClick(index) {},
    // 选择类目
    selectedFirstTypeClick() {
      //   console.log(this.selectedFirstType);
      this.SecondTypes = [
        {
          id: "",
          name: "请选择"
        }
      ];
      this.selectedSecondType = this.selectedThirdType = "";
      for (var i = 0; i < this.SecondType.length; i++) {
        if (this.SecondType[i].parentId == this.selectedFirstType) {
          this.SecondTypes.push(this.SecondType[i]);
        }
      }
    },
    selectedSecondTypeClick() {
      //   console.log(this.selectedSecondType);
      this.ThirdTypes = [
        {
          id: "",
          name: "请选择"
        }
      ];
      this.selectedThirdType = "";
      for (var i = 0; i < this.ThirdType.length; i++) {
        if (this.ThirdType[i].parentId == this.selectedSecondType) {
          this.ThirdTypes.push(this.ThirdType[i]);
        }
      }
    },
    selectedThirdTypeClick() {
      this.color = "颜色";
      this.size = "尺码";
      this.colors = this.sizes = [];
      this.detas = [];
      this.colorCheckList = [];
      this.sozeCheckList = [];
      //   console.log(this.selectedThirdType);
      // this.brands = [{ id: '', chinaName: '请选择' }]
      // this.selectedBrand = ''
      for (var i = 0; i < this.ThirdTypes.length; i++) {
        if (this.ThirdTypes[i].id == this.selectedThirdType) {
          this.selectedpath = this.ThirdTypes[i].path;
        }
      }
      var oneType, twoType, thirdType;
      for (var i = 0; i < this.FirstType.length; i++) {
        if (this.selectedFirstType == this.FirstType[i].id) {
          oneType = this.FirstType[i].name;
        }
      }
      for (var i = 0; i < this.SecondTypes.length; i++) {
        if (this.selectedSecondType == this.SecondTypes[i].id) {
          twoType = this.SecondTypes[i].name;
        }
      }
      for (var i = 0; i < this.ThirdTypes.length; i++) {
        if (this.selectedThirdType == this.ThirdTypes[i].id) {
          thirdType = this.ThirdTypes[i].name;
        }
      }
      this.goodsType = oneType + "-" + twoType + "-" + thirdType;
      var self = this;
      // 根据末级分类id查询商品规格及规格项
      self
        .getmerchantSKUList({
          id: self.selectedThirdType
        })
        .then(data => {
          //   console.log("查询的商品sku信息", data);
          if (data.code == 200) {
            if (data.data.length == 0) {
              self.noSku = true;
              return;
            } else {
              self.noSku = false;
              self.colors = data.data[0].classAttributeItems;
              self.sizes = data.data[1].classAttributeItems;
              for (var i = 0; i < self.colors.length; i++) {
                self.colors[i].show = true;
              }
              for (var i = 0; i < self.sizes.length; i++) {
                self.sizes[i].show = true;
              }
              if (data.data[0].classAttributeItems[0].attributeMark == "1") {
                self.color = data.data[0].classAttribute.firstAttribute;
                self.size = data.data[0].classAttribute.secondAttribute;
              } else if (
                data.data[0].classAttributeItems[0].attributeMark == "2"
              ) {
                self.color = data.data[0].classAttribute.secondAttribute;
                self.size = data.data[0].classAttribute.firstAttribute;
              }
              if (self.$route.query.operation) {
                if (this.selectedThirdType != this.threeTypes) {
                  return;
                } else {
                  for (var i = 0; i < self.editdata.attr.length; i++) {
                    for (var j = 0; j < self.colors.length; j++) {
                      if (
                        self.editdata.attr[i].attributeValue ==
                        self.colors[j].attributeValue
                      ) {
                        self.colors[j].show = false;
                      }
                    }
                  }
                  for (var i = 0; i < self.editdata.attr1.length; i++) {
                    for (var j = 0; j < self.sizes.length; j++) {
                      if (
                        self.editdata.attr1[i].attributeValue ==
                        self.sizes[j].attributeValue
                      ) {
                        self.sizes[j].show = false;
                      }
                    }
                  }
                  if (self.editdata.attr[0].attributeMark == "1") {
                    self.colorCheckList = self.editdata.attr;
                    self.sozeCheckList = self.editdata.attr1;
                  } else if (self.editdata.attr[0].attributeMark == "2") {
                    self.colorCheckList = self.editdata.attr1;
                    self.sozeCheckList = self.editdata.attr;
                  }

                  //   console.log(self.detas);
                  self.repertorylists = self.editdata.repertoryList;

                  self.assemnleList(2);
                }
              }
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 详细描述===========================================================
    createEditor() {
      const self = this;
      const editor = new WangEditor("editor");
      editor.config.menus = [
        "source",
        "bold",
        "underline",
        "italic",
        "strikethrough",
        "eraser",
        "forecolor",
        "bgcolor",
        "quote",
        "fontfamily",
        "fontsize",
        "head",
        "unorderlist",
        "orderlist",
        "alignleft",
        "aligncenter",
        "alignright",
        "link",
        "unlink",
        "img",
        "video",
        "insertcode",
        "undo",
        "redo",
        "fullscreen"
      ];
      // 上传图片（举例）
      // /zuul/file-service-file-upload/V1.0.0/api/file/uploadWebEditor
      editor.config.uploadImgUrl =
        "/zuul/file-service-file-upload/V1.0.0/api/file/uploadWebEditor";
      editor.config.menuFixed = false;
      var TOKEN = sessionStorage.getItem("token");
      editor.config.uploadParams = {
        appName: "BOTU",
        appId: "BOTU",
        module: "mall",
        business: "productImage",
        token: TOKEN
      };
      // 设置 headers（举例）
      editor.config.uploadHeaders = {
        Accept: "*"
      };
      // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
      //  editor.config.hideLinkImg = true;
      editor.onchange = function() {
        self.content = this.$txt.html();
        self.inputText = this.$txt.text();
        var a = document.getElementsByTagName("p");
      };
      editor.create();
    },
    ensuredscribeClick() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      if (this.content.indexOf('<img src="http://') > 0) {
        this.pitch = this.isAfLi = 2;
        var obj = document.getElementsByClassName("wangEditor-container");
        obj[0].style.border = "1px solid #d1d1d1";
        this.isRedinputContent = false;
        return;
      } else if (reg_1.test(this.inputText) || this.inputText.length > 1000) {
        var obj = document.getElementsByClassName("wangEditor-container");
        obj[0].style.border = "1px solid #fe5371";
        this.isRedinputContent = true;
      } else {
        this.pitch = this.isAfLi = 2;
        var obj = document.getElementsByClassName("wangEditor-container");
        obj[0].style.border = "1px solid #d1d1d1";
        this.isRedinputContent = false;
      }
    },
    // ==============================商品属性==================
    editgoodstype(index) {
      this.isRedinventory = this.isRedfontinventory = false;
      this.isRedmoney = this.isRedfontmoney = false;
      this.delIndex = index;
      this.isModalsBox_1 = true;
      this.inventory = this.detas[index].productNum;
      this.money = this.detas[index].price;
    },

    editgoodsClick() {
      var reg_1 = /^\d+$/; //输入非负整数
      var reg_2 = /^[\s]*$/; //输入不能为空
      var reg_3 = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/; //价格正则
      if (reg_2.test(this.inventory) || !reg_1.test(this.inventory)) {
        this.isRedinventory = this.isRedfontinventory = true;
        return;
      } else {
        this.isRedinventory = this.isRedfontinventory = false;
      }
      if (reg_2.test(this.money) || !reg_3.test(this.money)) {
        this.isRedmoney = this.isRedfontmoney = true;
        return;
      } else {
        this.isRedmoney = this.isRedfontmoney = false;
      }
      // console.log(this.inventory)
      // console.log(this.detas)
      // console.log(this.detas_1)
      this.detas[this.delIndex].productNum = this.detas_1[
        this.delIndex
      ].productNum = this.inventory;
      this.detas[this.delIndex].price = this.detas_1[
        this.delIndex
      ].price = this.money;
      this.isModalsBox_1 = false;
    },
    canclegoods() {
      this.isModalsBox_1 = false;
    },
    colorCheckCheckedCitiesChange(index) {
      var self = this;
      if (self.colors[index].show == true) {
        self.colorCheckList.push(self.colors[index]);
      } else {
        for (var i = 0; i < self.colorCheckList.length; i++) {
          if (
            self.colorCheckList[i].attributeValue ==
            self.colors[index].attributeValue
          ) {
            self.colorCheckList.splice(i, 1);
            break;
          }
        }
      }
      self.colors[index].show = !self.colors[index].show;
      this.assemnleList(1);
    },
    // 根据选中的规格进行组合列表
    assemnleList(m) {
      var self = this;
      //   console.log(this.productNum)
      this.detas = [];
      this.detas_1 = [];
      var arr_3 = [],
        arr_4 = [],
        arr_5 = [],
        arr_6 = [],
        arr_7 = [],
        arr_8 = [],
        arr_9 = [],
        arr_10 = [];
      for (var i = 0; i < this.colorCheckList.length; i++) {
        for (var j = 0; j < this.sozeCheckList.length; j++) {
          var obj = {
            color: "",
            size: "",
            productNum: "0",
            price: "0",
            picture: ""
          };
          var obj_1 = {
            productNum: "0",
            price: "0",
            picture: ""
          };
          obj.color = this.colorCheckList[i].attributeValue;
          obj.size = this.sozeCheckList[j].attributeValue;
          obj.productArrId1 = obj_1.productArrId1 = this.colorCheckList[i].id;
          obj.productArrId2 = obj_1.productArrId2 = this.sozeCheckList[j].id;
          obj.skuName = obj_1.skuName =
            self.color + ":" + obj.color + "," + self.size + ":" + obj.size;

          arr_3.push(obj);
          // arr_4.push(obj_1)
          // this.detas.push(obj)
          arr_8.push(obj_1);
        }
      }
      var self = this;
      // 比较返回的数组和arr_8,把arr_8里面相同的放在arr_10中，不同的放在arr_9中
      for (var i = 0; i < arr_8.length; i++) {
        var flag = true;
        for (var j = 0; j < self.repertorylists.length; j++) {
          if (self.repertorylists[j].skuName == arr_8[i].skuName) flag = false;
        }
        if (flag) {
          arr_9.push(arr_8[i]);
        } else {
          arr_10.push(arr_8[i]);
        }
      }
      for (var i = 0; i < arr_10.length; i++) {
        for (var j = 0; j < self.repertorylists.length; j++) {
          if (arr_10[i].skuName == self.repertorylists[j].skuName) {
            arr_10[i].productNum = self.repertorylists[j].productNum;
            arr_10[i].price = self.repertorylists[j].price;
            arr_10[i].picture = self.repertorylists[j].picture;
            arr_10[i].id = self.repertorylists[j].id;
          }
        }
      }
      this.detas_1 = arr_10.concat(arr_9);
      // 比较返回的数组和arr_3,把arr_3里面相同的放在arr_5中，不同的放在arr4中
      var arr4 = new Array();
      for (var i = 0; i < arr_3.length; i++) {
        var flag = true;
        for (var j = 0; j < self.repertorylists.length; j++) {
          if (self.repertorylists[j].skuName == arr_3[i].skuName) flag = false;
        }
        if (flag) {
          arr4.push(arr_3[i]);
        } else {
          arr_5.push(arr_3[i]);
        }
      }
      for (var i = 0; i < arr_5.length; i++) {
        for (var j = 0; j < self.repertorylists.length; j++) {
          if (arr_5[i].skuName == self.repertorylists[j].skuName) {
            arr_5[i].productNum = self.repertorylists[j].productNum;
            arr_5[i].price = self.repertorylists[j].price;
            arr_5[i].picture = self.repertorylists[j].picture;
            arr_5[i].id = self.repertorylists[j].id;
          }
        }
      }
      this.detas = arr_5.concat(arr4);
      if (m == 2) {
        var result = [];
        for (var i = 0; i < self.detas.length; i++) {
          var flag = true;
          for (var j = 0; j < self.repertorylists.length; j++) {
            if (self.repertorylists[j].skuName == self.detas[i].skuName)
              flag = false;
          }
          if (flag) {
            arr_6.push(self.detas[i]);
          } else {
            result.push(self.detas[i]);
          }
        }
        self.detas = result;
        // 同样也要改变detas_1
        var result1 = [];
        for (var i = 0; i < self.detas_1.length; i++) {
          var flag = true;
          for (var j = 0; j < self.repertorylists.length; j++) {
            if (self.repertorylists[j].skuName == self.detas_1[i].skuName)
              flag = false;
          }
          if (flag) {
            arr_7.push(self.detas_1[i]);
          } else {
            result1.push(self.detas_1[i]);
          }
        }
        self.detas_1 = result1;
      }
    },
    sozeCheckCheckedCitiesChange(index) {
      var self = this;
      if (self.sizes[index].show == true) {
        self.sozeCheckList.push(self.sizes[index]);
      } else {
        for (var i = 0; i < self.sozeCheckList.length; i++) {
          if (
            self.sozeCheckList[i].attributeValue ==
            self.sizes[index].attributeValue
          ) {
            self.sozeCheckList.splice(i, 1);
            break;
          }
        }
      }
      self.sizes[index].show = !self.sizes[index].show;
      this.assemnleList(1);
    },
    // 如果有id从服务器删除，没有id则在本地删除
    delgoodstype(index) {
      var self = this;
      if (self.detas[index].hasOwnProperty("id")) {
        // alert('1')
        self
          .getskuDelList({
            id: self.detas[index].id,
            productId: self.$route.query.id
          })
          .then(data => {
            if (data.code == 200) {
              self.repertorylists = data.data;
              // this.assemnleList(1)
              this.detas.splice(index, 1);
              this.detas_1.splice(index, 1);
            } else {
              this.$message(data.message);
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        this.detas.splice(index, 1);
        this.detas_1.splice(index, 1);
      }
    },
    labelClick(index){
      this.selectIndex = index
    },
    onFileChange_1(index,$event) {
      var self = this;
      if (self.onFileChangeOneTrue == false) {
        self.onFileChangeOneTrue = true;
        self.goodsphoto = false;
        var files = $event.target.files || $event.dataTransfer.files;
        var fileData = files[0];
        //   console.log(fileData);
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            // self.uploadImage(files[0], index)
            if (image.width !== 360) {
              self.$message({
                type: "warning",
                message: "图片格式应为360*360，请重新上传"
              });
              self.onFileChangeOneTrue = false;
              return;
            } else if (image.height !== 360) {
              self.$message({
                type: "warning",
                message: "图片格式应为360*360，请重新上传"
              });
              self.onFileChangeOneTrue = false;
              return;
            } else if (fileData.size > 102400 * 2) {
              self.$message({
                type: "warning",
                message: "图片应该小于50M，请重新上传"
              });
              self.onFileChangeOneTrue = false;
              return;
            } else {
              self.uploadImage(files[0], index);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    ensurepropertyClick() {
      if (this.colorCheckList.length == 0 || this.sozeCheckList.length == 0) {
        this.$message("请选择SKU信息");
      } else {
        this.pitch = this.isAfLi = 3;
      }
    },
    // =========================商品相册======================
    deluploadImg(index) {
      this.photos.splice(index, 1);
    },
    ensurephotoClick() {
      if (this.photos.length < 1) {
        this.$message("请至少上传一张图片");
      } else {
        this.pitch = this.isAfLi = 4;
      }
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      if (self.onFileChangeTrue == false) {
        self.onFileChangeTrue = true;
        self.goodsphoto = true;
        var files = e.target.files || e.dataTransfer.files;
        var fileData = files[0];
        // 读取图片数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // 加载图片的真实宽度和高度
          var image = new Image();
          image.onload = function() {
            if (image.width !== 600) {
              self.$message({
                type: "warning",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              self.onFileChangeTrue = false
              return;
            } else if (image.height !== 600) {
              self.$message({
                type: "warning",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              self.onFileChangeTrue = false
              return;
            } else if (fileData.size > 102400 * 2) {
              self.$message({
                type: "warning",
                message: "您上传图片的格式或大小不正确，请重新上传"
              });
              self.onFileChangeTrue = false
              return;
            } else if (self.photos.length >= 5) {
              self.$message("最多只能上传5张图片");
              self.onFileChangeTrue = false
              return;
            } else {
              self.uploadImage(files[0]);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(fileData);
      }
    },
    // 上传图片
    uploadImage(file, index) {
      var self = this;
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "mall");
      formdata.append("business", "productImage");
      formdata.append("token", TOKEN);
      self.onFileChangeTrue = true;
      self
        .uploadFile(formdata)
        .then(data => {
          self.onFileChangeTrue = false;
          self.onFileChangeOneTrue = false;
          if (data.code == 200) {
            this.$message({
              message: "上传图片成功",
              type: "success"
            });
            if (this.goodsphoto == true) {
              this.photos.push({
                productUrl: data.data[0].path
              });
              document.getElementById("upfile").value = "";
            } else {
              console.log(this.detas)
              this.detas[index].picture = data.data[0].path;
              this.detas_1[index].picture = data.data[0].path;
              document.getElementById("upload_1").value = "";
            }
          } else {
            this.$message(data.message);
          }
        })
        .catch(msg => {
          self.onFileChangeTrue = false;
          self.onFileChangeOneTrue = false;
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // ==========================其他信息======================
    selectedUnitClick() {},
    selectedlogisticsClick() {},
    ensurerestClick() {
      var reg_1 = /^\d+$/; //输入非负整数
      var reg_2 = /^[\s]*$/; //输入不能为空
      var reg_3 = /^\d+(\.\d+)?$/; //输入非负浮点数
      if (this.goosWeight != "") {
        if (reg_3.test(this.goosWeight)) {
          this.isgoosWeight = this.isRedfontgoosWeight = false;
        } else {
          this.isgoosWeight = this.isRedfontgoosWeight = true;
        }
      } else {
        this.isgoosWeight = this.isRedfontgoosWeight = false;
      }
      if (this.stockwarnNum != "") {
        if (reg_1.test(this.stockwarnNum)) {
          this.isstockwarnNum = this.isRedfontstockwarnNum = false;
        } else {
          this.isstockwarnNum = this.isRedfontstockwarnNum = true;
        }
      } else {
        this.isstockwarnNum = this.isRedfontstockwarnNum = false;
      }
      if (reg_2.test(this.goodsNo)) {
        this.isRedgoodsNo = true;
      } else {
        this.isRedgoodsNo = false;
      }
      if (this.freegoods == false) {
        if (this.selectedlogistics == "") {
          this.isRedselectedlogistics = true;
        } else {
          this.isRedselectedlogistics = false;
        }
      } else {
        this.isRedselectedlogistics = false;
      }

      if (
        this.isgoosWeight == true ||
        this.isstockwarnNum == true ||
        this.isRedgoodsNo == true ||
        this.isRedselectedlogistics == true
      ) {
        return;
      } else {
        this.pitch = this.isAfLi = 5;
      }
    },
    // ========================关联地区==========================
    // 如果没有定制商品，点击发请求
    ensurerelecommAskClick() {
      var self = this;

      if (this.goodsareas.length == 0) {
        this.$message("请选择商品的销售地区");
      } else {
        if (self.checked1 == true) {
          self.productType = "2";
        } else {
          self.productType = "1";
        }
        if (self.ground == true) {
          self.upShelves = "0";
        } else {
          self.upShelves = "1";
        }
        if (self.goodssell == true) {
          self.isProduct = "1";
        } else {
          self.isProduct = "2";
        }
        if (self.freegoods == true) {
          self.isFreeFreight = "1";
          self.selectedlogistics = "";
        } else {
          self.isFreeFreight = "2";
        }
        var arr_1 = [];
        for (var i = 0; i < this.goodsareas.length; i++) {
          arr_1.push(this.goodsareas[i].key);
        }
        if (self.ensureRequestTrue == false) {
          self.ensureRequestTrue = true;
          self
            .getaddproduct({
              productType: self.productType,
              classfily: self.selectedpath,
              brandId: self.selectedBrand,
              // 进货价
              buyingPrice: self.buyingPrice == "" ? 0 : self.buyingPrice,
              productName: self.productName,
              // description: self.description,
              lable: self.lable,
              details: self.content,
              weight: self.goosWeight == "" ? 0 : Number(self.goosWeight),
              noticeNum:
                self.stockwarnNum == "" ? 0 : Number(self.stockwarnNum),
              upShelves: self.upShelves,
              isProduct: self.isProduct,
              isFreeFreight: self.isFreeFreight,
              // 物流id
              logisticsType: self.selectedlogistics,
              productAttr: JSON.stringify(this.detas_1),
              pictureStr: JSON.stringify(self.photos),
              saveOrUpdate: self.$route.query.operation
                ? self.$route.query.operation.toString()
                : "1",
              productCode: self.goodsNo,
              productRegion: arr_1.join(","),
              productId: self.$route.query.id ? self.$route.query.id : ""
            })
            .then(data => {
              self.ensureRequestTrue = false;
              if (data.code == 200) {
                if (this.$route.query.operation) {
                  this.$message({
                    type: "success",
                    message: "修改商品成功"
                  });
                } else {
                  this.$message({
                    type: "success",
                    message: "添加商品成功"
                  });
                }
                this.$router.push({
                  path: "/store/commodity/sale"
                });
              } else if (data.code == 601) {
                this.$message("商品货号不能重复使用，请查证后重新输入！");
              } else {
                this.$message(data.message);
              }
            })
            .catch(msg => {
              self.ensureRequestTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    ensurerelecommClick() {
      if (this.goodsareas.length == 0) {
        this.$message("请选择商品的销售地区");
      } else {
        this.pitch = this.isAfLi = 6;
      }
    },
    optionliClick(index) {
      this.flag_1 = true;
      this.selectoptionareas = [];
      this.toDeleteIndexes = [];
      this.optionareas[index].checked = !this.optionareas[index].checked;
      //   console.log(this.optionareas)
      for (var i = 0; i < this.optionareas.length; i++) {
        if (this.optionareas[i].checked == true) {
          this.selectoptionareas.push(this.optionareas[i]);
          this.toDeleteIndexes.push(i);
        }
      }
      //   console.log(this.selectoptionareas)
    },
    goodsliClick(index) {
      this.flag_2 = true;
      this.selectgoodsareas = [];
      this.toDeleteIndexes_1 = [];
      this.goodsareas[index].checked = !this.goodsareas[index].checked;
      for (var i = 0; i < this.goodsareas.length; i++) {
        if (this.goodsareas[i].checked == false) {
          this.selectgoodsareas.push(this.goodsareas[i]);
          this.toDeleteIndexes_1.push(i);
        }
      }
    },
    //倒序排序
    descOrder(x, y) {
      if (x > y) {
        return -1;
      } else {
        return 1;
      }
    },
    rightarrowClick() {
      if (this.flag_1 == true) {
        this.toDeleteIndexes.sort(this.descOrder); //按大到小排列
        // console.log(this.toDeleteIndexes, '33333')
        for (var i = 0; i < this.toDeleteIndexes.length; i++) {
          this.optionareas.splice(this.toDeleteIndexes[i], 1);
        }
        this.goodsareas = this.goodsareas.concat(this.selectoptionareas);
        // console.log(this.goodsareas)
        this.flag_1 = false;
      } else {
        return;
      }
    },
    leftarrowClick() {
      if (this.flag_2 == true) {
        this.toDeleteIndexes_1.sort(this.descOrder); //按大到小排列
        // console.log(this.toDeleteIndexes_1, '22222')
        for (var i = 0; i < this.toDeleteIndexes_1.length; i++) {
          this.goodsareas.splice(this.toDeleteIndexes_1[i], 1);
        }
        this.optionareas = this.optionareas.concat(this.selectgoodsareas);
        // console.log(this.goodsareas)
        this.flag_2 = false;
      } else {
        return;
      }
    },
    // 启用定制
    upiconClick(index) {
      var clickEle = this.dataLists[index];
      if (index <= 0) {
        return;
      } else {
        this.dataLists.splice(index, 1, this.dataLists[index - 1]);
        this.dataLists.splice(index - 1, 1, clickEle);
      }
    },
    downiconClick(index) {
      var clickEle = this.dataLists[index];
      if (index >= this.dataLists.length - 1) {
        return;
      } else {
        this.dataLists.splice(index, 1, this.dataLists[index + 1]);
        this.dataLists.splice(index + 1, 1, clickEle);
      }
    },
    pretypeChange(index) {
      if (index == 1) {
        this.prechecked1 = true;
        this.prechecked2 = false;
      } else {
        this.prechecked1 = false;
        this.prechecked2 = true;
      }
    },
    backtypeChange(index) {
      if (index == 1) {
        this.backchecked1 = true;
        this.backchecked2 = false;
      } else {
        this.backchecked1 = false;
        this.backchecked2 = true;
      }
    },
    eletypeChange(index) {
      if (index == 1) {
        this.elechecked1 = true;
        this.elechecked2 = false;
      } else {
        this.elechecked1 = false;
        this.elechecked2 = true;
      }
    },
    addele() {
      this.isModalsBox = true;
      this.addeleTitle = "新增微量元素";
      this.elename = this.minvalue = this.maxvalue = this.unit = this.step = "";
    },
    cancleele() {
      this.isModalsBox = false;
    },
    editDivRule() {
      var _html = document.getElementsByClassName("editDiv");
      for (var i = 0; i < _html.length; i++) {
        _html[i].innerText = _html[i].innerText.replace(/[^0-9]+/, "");
        if (_html[i].innerText.length > 5) {
          _html[i].innerText = _html[i].innerText.substr(0, 5);
        }
      }
    },
    panduanele() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
      var reg_3 = /^[0-9]*$/; //只能输入数字
      if (reg_1.test(this.elename) || reg_2.test(this.elename)) {
        this.isRedelename = this.isRedfontelename = true;
      } else {
        this.isRedelename = this.isRedfontelename = false;
      }
      if (reg_1.test(this.minvalue)) {
        this.isRedminvalue = true;
      } else {
        this.isRedminvalue = false;
      }
      if (reg_1.test(this.maxvalue)) {
        this.isRedmaxvalue = true;
      } else {
        this.isRedmaxvalue = false;
      }
      if (reg_1.test(this.unit)) {
        this.isRedunit = true;
      } else {
        this.isRedunit = false;
      }
      if (reg_1.test(this.step)) {
        this.isRedstep = true;
      } else {
        this.isRedstep = false;
      }
      if (
        this.isRedelename == true ||
        this.isRedminvalue == true ||
        this.isRedmaxvalue == true ||
        this.isRedunit == true ||
        this.isRedstep == true
      ) {
        return false;
      }
      if (!reg_3.test(this.minvalue)) {
        this.isRedminvalue = true;
        this.$message("最小值只能输入数字");
        return false;
      } else {
        this.isRedminvalue = false;
      }
      if (!reg_3.test(this.maxvalue)) {
        this.isRedmaxvalue = true;
        this.$message("最大值只能输入数字");
        return false;
      } else {
        this.isRedmaxvalue = false;
      }
      if (!reg_3.test(this.step)) {
        this.isRedstep = true;
        this.$message("步长只能输入数字");
        return false;
      } else {
        this.isRedstep = false;
      }
      if (Number(this.minvalue) > Number(this.maxvalue)) {
        this.isRedminvalue = true;
        this.$message("最小值不能大于最大值");
        return false;
      } else {
        this.isRedminvalue = false;
      }
      if (Number(this.step) >= Number(this.maxvalue) - Number(this.minvalue)) {
        this.isRedstep = true;
        this.$message("步长不能大于或等于差值");
        return false;
      } else {
        this.isRedstep = false;
      }
      if (Number(this.step) == 0 || Number(this.step) < 0) {
        this.isRedstep = true;
        this.$message("步长不能小于或等于0");
        return false;
      } else {
        this.isRedstep = false;
      }
    },
    // 新增元素
    addeleClick() {
      if (this.panduanele() == false) {
        return;
      } else {
        this.isModalsBox = false;
        // console.log(this.dataLists, '111')
        this.dataLists.push({
          elementName: this.elename,
          minValue: this.minvalue,
          maxValue: this.maxvalue,
          unit: this.unit,
          growNum: this.step
        });
      }
    },
    // 编辑元素
    editimgClick(index) {
      this.isModalsBox = true;
      this.addeleTitle = "编辑微量元素";
      this.elename = this.dataLists[index].elementName;
      this.minvalue = this.dataLists[index].minValue;
      this.maxvalue = this.dataLists[index].maxValue;
      this.unit = this.dataLists[index].unit;
      this.step = this.dataLists[index].growNum;
      this.editIndex = index;
    },
    editeleClick() {
      if (this.panduanele() == false) {
        return;
      }
      {
        this.isModalsBox = false;
        // 替换数组某个元素
        this.dataLists[this.editIndex].elementName = this.elename;
        this.dataLists[this.editIndex].minValue = this.minvalue;
        this.dataLists[this.editIndex].maxValue = this.maxvalue;
        this.dataLists[this.editIndex].unit = this.unit;
        this.dataLists[this.editIndex].growNum = this.step;
      }
    },
    // 删除元素
    deleleClick(index) {
      var self = this;
      if (self.deleleClickTrue == false) {
        self.deleleClickTrue = true;
        if (self.dataLists[index].hasOwnProperty("id")) {
          self
            .geteleDelList({
              id: self.dataLists[index].id,
              productId: self.$route.query.id
            })
            .then(data => {
              self.deleleClickTrue = false;
              if (data.code == 200) {
                self.dataLists.splice(index, 1);
                // self.dataLists_1 = data.data
                // self.dataLists.splice(index,1)
                // self.dataLists_1.splice(index,1)
              } else {
                this.$message(data.message);
              }
            })
            .catch(msg => {
              self.deleleClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          self.dataLists.splice(index, 1);
          // self.dataLists_1.splice(index,1)
        }
      }
    },

    ...mapActions([
      "getfindByBrandName",
      "getAllBrandList",
      "getqueryTypeList",
      "getmerchantBrandList",
      "uploadFile",
      "getmerchantSKUList",
      "getaddproduct",
      "getstoreProductInfo",
      "getskuDelList",
      "geteleDelList",
      "getfindAreaFromRedisList",
      "getListResRole",
      "getRecentTypeList",
      "getStoreLogistics"
    ])
  },
  // 监视
  watch: {
    // 启用定制
    // preentry:function(val){
    //     var self = this
    //     self.preentry = val.replace(/[^0-9]+/,'')
    // },
    // backentry:function(val){
    //     this.backentry = val.replace(/[^0-9]+/,'')
    // },
    selectedFirstType: function(val) {
      if (val == "") {
        this.isselectedFirstType = false;
      } else {
        this.isselectedFirstType = true;
      }
    },
    selectedSecondType: function(val) {
      if (val == "") {
        this.isselectedSecondType = false;
      } else {
        this.isselectedSecondType = true;
      }
    },
    selectedThirdType: function(val) {
      if (val == "") {
        this.isselectedThirdType = false;
      } else {
        this.isselectedThirdType = true;
      }
    },
    selectedBrand: function(val) {
      if (val == "") {
        this.isselectedBrand = false;
      } else {
        this.isselectedBrand = true;
      }
    },
    buyingPrice: function(val) {
      var reg_1 = /^\d+(\.\d+)?$/; //输入非负浮点数
      if (val != "") {
        if (reg_1.test(val)) {
          this.isbuyingPrice = true;
        } else {
          this.isbuyingPrice = false;
        }
      } else {
        this.isbuyingPrice = true;
      }
    },
    productName: function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      // var reg_2 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}]")
      if (reg_1.test(val)) {
        this.isproductName = false;
      } else {
        this.isproductName = true;
      }
    },
    lable: function(val) {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = new RegExp(
        "[`~@#$^&*()=|{}\\[\\]<>/@#￥&*；,;（）——|{}【】]"
      );
      if (reg_1.test(val) || reg_2.test(val)) {
        this.islable = false;
      } else {
        var arr = val.split("，");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].length > 7) {
            this.islable = false;
          } else {
            this.islable = true;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.editDiv {
  outline: none;
  line-height: 49px;
}

.redInput {
  border: 1px solid #fe5371 !important;
}

.redFont {
  color: #fe5371 !important;
}

.areaBox {
  width: 200px;
  height: 320px;
  border: 1px solid #d1d1d1;
  overflow-y: auto;
}

.relecomm .main > div:nth-child(2) {
  margin-left: 165px;
}

.relecomm .main > div:nth-child(2) p {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

.rightarrow {
  width: 19px;
  height: 30px;
  background: url("/static/img/elf.png") no-repeat 50.8% 72%;
}

.leftarrow {
  width: 19px;
  height: 30px;
  background: url("/static/img/elf.png") no-repeat 53.4% 72%;
  margin-top: 40px;
}

.optionli {
  height: 35px;
  line-height: 35px;
  text-align: center;
}

.optionli:hover {
  background: #fff1f3;
}

.bgcolor {
  background: #fff1f3;
}

/*添加商品页面*/

.grayfont {
  color: #908f95;
}

.addCommodity {
  width: 100%;
  height: 100%;
}

.addCommodity > div {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
}

.mainCont {
  overflow: hidden;
  min-height: 610px;
  /*margin-left: 95px;*/
}

.mainNav {
  width: 100%;
  overflow: hidden;
  display: flex;
  height: 75px;
  align-items: center;
  /*margin-left: 95px;*/
}

.mainNav > ul > li {
  padding: 0;
  margin: 0;
  float: left;
  min-width: 30px;
  height: 40px;
  margin-left: 25px;
  line-height: 38px;
  text-align: center;
  color: #303030;
  font-size: 17px;
  position: relative;
  /*cursor: pointer;*/
}

.mainNav > ul > li:nth-child(1) {
  margin-left: 0;
}

.mainNav > ul .afLi {
  color: #fe5371;
}

.mainNav > ul .afLi::after {
  position: absolute;
  top: 39px;
  left: 2px;
  width: 90%;
  height: 3px;
  background-color: #fe5371;
  content: "";
}

.mainNav > ul > li:nth-child(1) {
}

.listTitle {
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listTitle > div:nth-child(1) > div:nth-child(1) {
  width: 25px;
  height: 25px;
}

.listTitle > div:nth-child(1) > div:nth-child(1) img {
  margin: 0;
  padding: 0;
}

.listTitle > div:nth-child(1) > div:nth-child(2) {
  float: left;
  display: flex;
  color: #303030;
  font-size: 17px;
  font-weight: 600;
  margin-left: 10px;
}

.recenttypes {
  width: 177px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*********************详细描述************************/

.dscribe {
  min-height: 600px;
  width: 100%;
}

.details {
  height: 566px;
  width: 100%;
}

.datailsB {
  color: #aeaeae;
}

.dscribe > div {
  min-height: 550px;
  width: 100%;
  margin-top: 10px;
}

.dscribe > div > div {
  display: flex;
  width: 100%;
}

.details > div:nth-child(1) {
  min-width: 90px;
  text-align: left;
  font-size: 16px;
  color: #4a4a4a;
  padding-right: 3px;
}

#detailstxt {
  width: 628px;
  height: 387px;
}

.but > div,
.footerbut > div {
  margin-left: 257px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.but > div > div,
.footerbut > div > div {
  width: 68px;
  height: 30px;
}

.but > div > div:nth-child(1),
.ensurearea,
.footerbut > div > div:nth-child(1) {
  cursor: pointer;
  width: 68px;
  height: 30px;
  background-color: #fe5371;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.but > div > div:nth-child(2) {
  cursor: pointer;
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #aeaeae;
  text-align: center;
  line-height: 30px;
}

.footerbut > div > div:nth-child(2) {
  cursor: pointer;
  width: 68px;
  height: 30px;
  background-color: #fe5371;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-right: 20px;
}

.footerbut > div > div:nth-child(3) {
  cursor: pointer;
  width: 68px;
  height: 30px;
  border-radius: 3px;
  color: #fff;
  margin-left: 25px;
  background-color: #aeaeae;
  text-align: center;
  line-height: 30px;
}

/*通用信息*********************************************/

.bgColor {
  background: #fff1f3;
}

.searchInput {
  height: 32px;
  line-height: 32px;
  margin-left: 25px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  padding-left: 8px;
  width: 210px;
}

.searchBut {
  margin-left: 25px;
  width: 70px;
  height: 32px;
  background-color: #fe5371;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
}

.user {
  min-height: 600px;
  width: 100%;
}

.cname small {
  font-size: 14px;
  margin-left: 10px;
  color: #908f95;
}

.cdetails {
  position: relative;
}

.cdetails small {
  position: absolute;
  top: 0;
  left: 588px;
  font-size: 14px;
  color: #908f95;
}

.cdetails textarea {
  padding-left: 5px;
  height: 60px;
  width: 437px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  resize: none;
}

.cdetails > div:nth-child(1) {
  height: 60px;
}

.user > div {
  display: flex;
  min-height: 50px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
}

.user .cLabel {
  margin-top: -16px;
  color: #908f95;
}

.user > div:nth-child(1) {
  margin-top: 0;
}

.abrand {
  display: flex;
  min-height: 50px;
  align-items: center;
}

.abrand > div:nth-child(2) {
  border-radius: 3px;
  border: 1px solid #d1d1d1;
  height: 32px;
  overflow: hidden;
  width: 177px;
}

.calsshead > div:nth-child(2) > ul > li {
  float: left;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 32px;
}

.addClass {
  text-align: center;
  line-height: 33px;
  border-radius: 3px;
  width: 95px;
  height: 32px;
  background-color: #fe5371;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
}

.user > div > div:nth-child(1) {
  min-width: 140px;
  text-align: right;
  font-size: 16px;
  color: #4a4a4a;
  padding-right: 3px;
}

.comone {
  height: 50px;
}

.comone > div:nth-child(1) {
  height: 50px;
  line-height: 50px;
}

.comone > div:nth-child(2) {
  margin-top: 5px;
}

.comone > div:nth-child(2) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) small {
  margin-left: 5px;
  font-size: 14px;
  color: #4a4a4a;
}

.comone > div:nth-child(3) {
  margin-top: 5px;
  overflow: hidden;
  margin-left: 30px;
}

.selectBox {
  display: flex;
}

.selectBox > div:nth-child(2) {
  margin: 0 32px;
}

select {
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
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

/*==========================商品属性==================*/

.property {
  min-height: 600px;
  width: 100%;
  overflow: hidden;
}

.property > div {
  margin-top: 10px;
}

.skucolor {
  width: 100%;
  /*height: 35px;*/
  display: flex;
  margin-top: 10px;
}

.skucolor > div:nth-child(1) {
  margin-left: 33px;
  min-width: 50px;
}

.skucolor > ul {
  margin-left: 10px;
  overflow: hidden;
}

.skucolor > ul > li {
  float: left;
  width: 80px;
}

.skuchi > ul > li {
  float: left;
  width: 80px;
}

.skuchi {
  margin-top: 5px;
  width: 100%;
  /*height: 35px;*/
  display: flex;
}

.skuchi > div:nth-child(1) {
  margin-left: 33px;
  min-width: 50px;
}

.skuchi > ul {
  margin-left: 10px;
  overflow: hidden;
}

.pClass {
  display: flex;
  align-items: center;
}

.pClass > div:nth-child(1) {
  min-width: 85px;
  color: #4f4f4f;
  font-size: 15px;
}

.pClass > div:nth-child(2) input {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pSKU > div:nth-child(1) {
  width: 100%;
  color: #4f4f4f;
  font-size: 15px;
  height: 45px;
  line-height: 45px;
}

.pSKU > div:nth-child(2) {
  width: 100%;
  /*height: 65px;*/
}

.pDetaLs .dataLi {
  height: 50px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid #d9dbde;
  background-color: #fff;
}

.pDetaLs .dataLi > div {
  font-size: 14px;
  outline: none;
}

.pDetaLs .dataLi .dataLibut {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pDetaLs .dataLi .uoBut {
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 47% 37%;
}

.firstLi {
  height: 60px;
  line-height: 60px;
  display: flex;
  border-bottom: 1px solid #d9dbde;
  border-top: 1px solid #d9dbde;
  background-color: #f2f4f8;
}

.firstLi > div {
  font-size: 17px;
}

.pDetaLs > ul > li > div {
  border-left: 1px solid #aeaeae;
  text-align: center;
  color: #3a3a3a;
  overflow: hidden;
}

.pDetaLs > ul > li > div:last-of-type {
  border-right: 1px solid #aeaeae;
}

.pDetails > div:nth-child(1) {
  width: 100%;
  color: #4f4f4f;
  font-size: 15px;
  height: 35px;
  line-height: 35px;
}

.pDetails > div:nth-child(3) {
  margin-top: 8px;
  overflow: hidden;
  width: 705px;
  min-height: 60px;
}

.pDetaLs > ul > li > div:nth-child(1) {
  width: 108px;
}

.pDetaLs > ul > li > div:nth-child(2) {
  width: 111px;
}

.pDetaLs > ul > li > div:nth-child(3) {
  width: 109px;
}

.pDetaLs > ul > li > div:nth-child(4) {
  width: 114px;
}

.pDetaLs > ul > li > div:nth-child(5) {
  width: 123px;
}

.pDetaLs > ul > li > div:nth-child(6) {
  width: 145px;
}

.delimg {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 29% 37%;
}

.editimg {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 20% 37%;
}

.dataLibut label {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.dataLibut label div:nth-child(2) {
  width: 30px;
  height: 30px;
}

.dataLibut label div:nth-child(2) img {
  width: 100%;
  height: 100%;
  vertical-align: baseline;
}

/*===============================商品相册==============*/

.photo {
  min-height: 600px;
  width: 100%;
}

.photo > div {
  min-height: 550px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.imgD {
  min-height: 135px;
  width: 100%;
  height: 100%;
}

.photo li {
  width: 165px;
  height: 135px;
  float: left;
  margin-top: 50px;
}

.photo li:nth-child(1),
.photo li:nth-child(2),
.photo li:nth-child(3),
.photo li:nth-child(4),
.photo li:nth-child(5) {
  margin-top: 0;
}

.photo .dataLi {
  /*border: 1px solid red;*/
  position: relative;
}

.photo .dataLi > div:nth-child(1) {
  position: absolute;
  top: 10px;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid #fff;
  overflow: hidden;
}

.photo .dataLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.photo .dataLi > div:nth-child(2) {
  position: absolute;
  top: 0;
  right: 33px;
  width: 22px;
  height: 22px;
  background-color: #fe5371;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.photo .addLi label > div {
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.addUploadicon {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 60% 72%;
}

/*=========================其他信息====================*/

.rest .main {
  margin-left: 140px;
  width: 100%;
}

.rest .main > div {
  height: 32px;
  line-height: 32px;
  display: flex;
  margin-bottom: 26px;
  align-items: center;
}

.rest .main > div > div:nth-child(1) {
  min-width: 140px;
  text-align: right;
  margin-right: 5px;
  /*display:flex;
    justify-content:right;
    align-items:center;*/
}

.checkBoxmt {
  margin-top: 5px;
}

/*===============================关联地区=======================*/

.relecomm .main > div {
  display: flex;
}

/*==========================启用定制============================*/

.customization {
  min-height: 600px;
  width: 100%;
  overflow: hidden;
}

.customization > div {
  overflow: hidden;
  /*border: 1px solid red;*/
  min-height: 550px;
  width: 100%;
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

.customization .dataLi {
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

.firstLi > div:nth-child(1) {
  border-left: 1px solid #e5e7eb;
}

.listCont {
  /*width: 445px;*/
  margin-top: 40px;
  /*overflow: hidden;*/
  margin-left: 10px;
}

.listCont li {
  display: flex;
  /*border: 1px solid red;*/
  min-height: 50px;
  width: 660px;
}

.listCont .dataLi > div,
.listCont .firstLi > div {
  width: 110px;
}

/*.listCont li>div:nth-child(1) {
        overflow: hidden;
        display: flex;
    }*/

.chemone {
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  min-height: 75px;
  display: flex;
  align-items: center;
}

.chemtwo {
  width: 100%;
  border: 1px solid #e5e5e5;
  min-height: 100px;
}

.chemone > div:nth-child(1) {
  width: 140px;
  text-align: right;
  font-size: 16px;
  color: #303030;
}

.chemone > div:nth-child(2) {
  margin-left: 10px;
}

.chemone > div:nth-child(3) {
  margin-left: 40px;
}

.chemone > div:nth-child(2) small {
  margin-left: 7px;
  font-size: 15px;
  color: #303030;
}

.chemone > div:nth-child(3) small {
  margin-left: 7px;
  font-size: 15px;
  color: #303030;
}

.onech {
  position: relative;
}

.twoch {
  border-bottom: 1px solid #e5e5e5;
}

.onech::before {
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  height: 1px;
  background-color: #e5e5e5;
  content: "";
}

.chemical {
  min-height: 175px;
  /*border: 1px solid red;*/
  width: 100%;
}

.onecharacter > div {
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  /*border: 1px solid red;*/
}

.onecharacter > div:nth-child(1) {
  height: 58px;
}

.onecharacter > div:nth-child(1) > div:nth-child(1) {
  width: 140px;
  text-align: right;
  font-size: 16px;
  color: #303030;
}

.onecharacter > div:nth-child(1) > div:nth-child(2) small {
  margin-left: 7px;
  font-size: 15px;
  color: #303030;
}

.onecharacter > div:nth-child(1) > div:nth-child(3) small {
  margin-left: 7px;
  font-size: 15px;
  color: #303030;
}

.onecharacter > div:nth-child(1) > div:nth-child(2) {
  margin-left: 10px;
}

.onecharacter > div:nth-child(1) > div:nth-child(3) {
  margin-left: 40px;
}

.onecharacter > div:nth-child(2) > div:nth-child(1) {
  width: 140px;
  font-size: 16px;
  text-align: right;
}

.onecharacter > div:nth-child(2) {
  height: 50px;
}

.onecharacter > div:nth-child(2) > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.onecharacter > div:nth-child(2) > div:nth-child(2) small {
  font-size: 15px;
  color: #303030;
}

.onecharacter > div:nth-child(2) > div:nth-child(2) small:nth-child(1) {
  margin-right: 7px;
}

.onecharacter > div:nth-child(2) > div:nth-child(2) small:nth-child(3) {
  margin-left: 7px;
}

.onecharacter {
  width: 100%;
  height: 135px;
}

.upicon {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 38% 37%;
  margin-right: 5px;
}

.downicon {
  cursor: pointer;
  width: 27px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 42.3% 37%;
  margin-left: 5px;
}

.addicon {
  cursor: pointer;
  width: 21px;
  height: 27px;
  background: url("/static/img/elf.png") no-repeat 74.8% 71%;
}

.addli {
  border: 1px solid #e5e7eb;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  margin-top: 27px;
  height: 32px;
  line-height: 30px;
}

.modalContent input {
  text-align: center;
  margin: 0 10px;
}

.modalContent > span {
  margin-left: 14px;
}

.list-ch li {
  float: left;
  display: flex;
  align-items: center;
  /*margin-left: 32px;*/
  margin-bottom: 10px;
}

.list-ch li > div {
  float: left;
}

.list-ch li > div:nth-child(2) {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1px solid #bfcbd9;
}

.list-ch li > div:nth-child(2):hover {
  border: 1px solid #5acdfa;
}
.list-ch li > div:nth-child(3){
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 5px;
}
</style>