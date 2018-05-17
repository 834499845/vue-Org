<!--食物管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="sale">
    <div class="foodControl">
      <div class="img" @click="backFood"></div>
      编辑食物
    </div>
    <div class="foodList">
      <div class="foodName">
        名称：
        <input type="text" maxlength="12" @focus='foodNameInput' v-model='foodName' placeholder="请输入食物名称" />
        <span class="markedWords" v-show='greyPrompt'>最多输入12个字符</span>
        <span class="redMarkedWords" v-show='redPrompt'>请输入正确的食物名称</span>
      </div>
      <input type="text" v-model='foodnameCon' v-show='contrast' />
      <div class="foodPic">
        <div class="picBox">
          <input id="upfile" type="file" value="+" @change="onFileChange" />
          <img v-show='thumbnail' :src='zoomPath' />
        </div>
        <div class="uploading">上传图片</div>
        <span class="picGreyPrompt" v-show='picGreyPrompt'>图片文件大小不能超过1M，尺寸为1280*778</span>
        <span class="picMarkedWords" v-show='picMarkedWords'>请选择合适图片上传</span>
      </div>
      <div class="weightStandard">重量标准：
        <select class='select1' v-model="brandVal" @change="selecBradnsClick">
          <option v-for="(item,brandValindex) in brands" :key="brandValindex" :value="brandValindex">
            {{item.value}}
          </option>
        </select>
      </div>
      <div class="foodSpecifications">食物规格：
        <!--<input type="text" v-model='foodSpecifications' :class="{foodSpecificationsa:IsfoodSpecifications}" @focus='foodSpecificationsInput'/>-->
        <select v-model="foodSpecifications">
          <option value="">请选择</option>
          <option>克</option>
          <option>毫升</option>
        </select>
      </div>
      <div class="foodComposition">
        <ul>
          <li>
            <div class="foodTitle">热量：</div>
            <input type="text" v-model='heats' :class="{heatas:Isheatas}" @focus='heatsInput' />
            <span>千卡</span>
          </li>
          <li>
            <div class="foodTitle protein" id='protein'>蛋白质：</div>
            <input type="text" v-model='protein' :class="{proteins:Isprotein}" @focus='proteinInput' />
            <span>克</span>
          </li>
          <li>
            <div class="foodTitle">烟酸：</div>
            <input type="text" v-model='carbonicAcid' :class="{carbonicAcid:IscarbonicAcid}" @focus='carbonicAcidInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">膳食纤维：</div>
            <input type="text" v-model='dietFiber' :class="{dietFiber:IsdietFiber}" @focus='dietFiberInput' />
            <span>克</span>
          </li>
          <li>
            <div class="foodTitle">脂肪：</div>
            <input type="text" v-model='axunge' :class="{axunge:Isaxunge}" @focus='axungeInput' />
            <span>克</span>
          </li>
          <li>
            <div class="foodTitle">维生素A：</div>
            <input type="text" v-model='vitaminA' :class="{vitaminA:IsvitaminA}" @focus='vitaminAInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle protein">维生素B1：</div>
            <input type="text" v-model='vitaminB1' :class="{vitaminB1:IsvitaminB1}" @focus='vitaminB1Input' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">维生素B2：</div>
            <input type="text" v-model='vitaminB2' :class="{vitaminB2:IsvitaminB2}" @focus='vitaminB2Input' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">维生素C：</div>
            <input type="text" v-model='vitaminC' :class="{vitaminC:IsvitaminC}" @focus='vitaminCInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">维生素E：</div>
            <input type="text" v-model='vitaminE' :class="{vitaminE:IsvitaminE}" @focus='vitaminEInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">胡萝卜素：</div>
            <input type="text" v-model='renieratene' :class="{renieratene:Isrenieratene}" @focus='renierateneInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle protein">碳水化合物：</div>
            <input type="text" v-model='carbohydrate' :class="{carbohydrate:Iscarbohydrate}" @focus='carbohydrateInput' />
            <span>克</span>
          </li>
          <li>
            <div class="foodTitle">钙：</div>
            <input type="text" v-model='Ca' :class="{Ca:IsCa}" @focus='CaInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">铁：</div>
            <input type="text" v-model='Fe' :class="{Fe:IsFe}" @focus='FeInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">锌：</div>
            <input type="text" v-model='Zn' :class="{Zn:IsZn}" @focus='ZnInput' />
            <span>毫克</span>
          </li>

          <li>
            <div class="foodTitle">锰：</div>
            <input type="text" v-model='Mn' :class="{Mn:IsMn}" @focus='MnInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle protein">钾：</div>
            <input type="text" v-model='K' :class="{K:IsK}" @focus='KInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">磷：</div>
            <input type="text" v-model='P' :class="{P:IsP}" @focus='PInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">钠：</div>
            <input type="text" v-model='Na' :class="{Na:IsNa}" @focus='NaInput' />
            <span>毫克</span>
          </li>
          <li>
            <div class="foodTitle">硒：</div>
            <input type="text" v-model='Se' :class="{Se:IsSe}" @focus='SeInput' />
            <span>毫克</span>
          </li>

          <li>
            <div class="foodTitle">铜：</div>
            <input type="text" v-model='Cu' :class="{Cu:IsCu}" @focus='CuInput' />
            <span>毫克</span>
          </li>
        </ul>
      </div>
      <div class="foodUnit">
        <div>
          计量单位：
          <span :class="{'foodUnitTost':isfoodUnitTost}">(选择或输入计量单位对应的重量,单位为g)</span>
        </div>
        <div>
          <ul>
            <li v-for="(item,index) in unitLists" :key="index">
              <div class="unitListsLeft" @click="checkedOneChangeClick(index)">
                <img v-if="item.unitShow == true" src="/static/img/unchecked.png" alt="">
                <img v-else src="/static/img/checked.png" alt="">
              </div>
              <div class="unitListsCenter">{{item.name}}</div>
              <div v-show="!item.unitShow" class="unitListsRight">
                <select @change="selectChange(index)" v-model="item.unitValue">
                  <option v-for="(unitItem,unitIndex) in item.unitArr" :key="unitIndex" :value="unitItem">
                    {{unitItem}}
                  </option>
                </select>
                <input type="number" :class="{inputStyle:isInputStyle,inputShow:item.unitShow}" placeholder="请输入重量" v-model="item.unitValue">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="foodWindow">
        <div class="windowTitle">食物亮点：</div>
        <textarea class="textarea" @focus='textareaInput' :class={foodWindowBorder:IsfoodWindowBorder} v-model="foodWindowText"
          maxlength="80" />
        <span class="astrict">最多输入80个字符</span>
      </div>
      <div class="handle">
        <div class="foodSave" @click='addfoodSave'>保存</div>
        <div class="abolish" @click="backFood">取消</div>
      </div>
    </div>
    <!--提示信息弹出框-->
    <div :class="{delPopup:isdelPopup,showdel:isShowdels}">
      <transition name="slide-fade">
        <div class="delContent" v-show="delShows">
          <v-hosdels @canle="canleClicks" @ok="okclicks" :name="nametitles"></v-hosdels>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import select from "../../cModule/foodSelects";
import intercept from "../../cModule/intercept";
export default {
  components: {
    "v-select": select,
    "v-hosdels": intercept
  },
  data() {
    return {
      isInputStyle: true,
      isInputShow: false,
      unitLists: [], //计量单位列表
      isfoodUnitTost: false,

      foodnameCon: "",
      contrast: false,
      brands: [],
      brandVal: 0,
      selectedfl: "",
      selectsId: false,
      selectId: "",
      selected: "",
      selectfl: "",
      sTypes: [],
      weightStandard: "",
      IsweightStandard: false,
      foodSpecifications: "",
      IsfoodSpecifications: false,
      Cu: "",
      IsCu: false,
      Se: "",
      IsSe: false,
      Na: "",
      IsNa: false,
      P: "",
      IsP: false,
      K: "",
      IsK: false,
      zoomPath: "",
      path: "",
      greyPrompt: true,
      redPrompt: false,
      foodName: "",
      thumbnail: true,
      foodWindowText: "",
      IsfoodWindowBorder: false,
      picGreyPrompt: true,
      picMarkedWords: false,
      heats: "",
      Isheatas: false,
      protein: "",
      Isprotein: false,
      carbonicAcid: "",
      IscarbonicAcid: false,
      dietFiber: "",
      IsdietFiber: false,
      axunge: "",
      Isaxunge: false,
      vitaminA: "",
      IsvitaminA: false,
      vitaminB1: "",
      IsvitaminB1: false,
      vitaminB2: "",
      IsvitaminB2: false,
      vitaminC: "",
      IsvitaminC: false,
      vitaminE: "",
      IsvitaminE: false,
      renieratene: "",
      Isrenieratene: false,
      carbohydrate: "",
      Iscarbohydrate: false,
      Ca: "",
      IsCa: false,
      Fe: "",
      IsFe: false,
      Zn: "",
      IsZn: false,
      Mn: "",
      IsMn: false,
      selectData: [],
      isShowdels: true,
      topath: "",
      delShows: false,
      nametitles: "劳动成果还未保存，确定退出？",
      intercept: false,
      isdelPopup: true
    };
  },
  // 过滤
  filters: {},
  beforeRouteLeave(to, from, next) {
    this.toPath = to.path;
    if (this.intercept == false) {
      this.isShowdels = false;
      this.delShows = true;
      // this.istipMsg = true
    } else if (this.intercept == true) {
      // this.istipMsg = false
      this.isShowdels = true;
      this.delShows = false;
      next();
    }
  },
  // 模块新建时
  created: function() {
    let self = this;
    self.token = sessionStorage.token;
    let addFoods = [];
    self.edata = JSON.parse(sessionStorage.foodData);
    self.foodId = self.edata.foodId;
    self.foodName = self.edata.name;
    self.foodnameCon = self.edata.name;
    self.zoomPath = self.edata.itemImage;
    self.path = self.edata.topImage;
    self.foodSpecifications = self.edata.specifications.split("100")[1];
    self.kcal = self.heats;

    self
      .getfoodMeasurementUnitSelectAll({})
      .then(data => {
        if (data.code == 200) {
          if (data.data) {
            if (data.data) {
              if (data.data.length > 0) {
                var untilArr = [];
                var unitArrs = [];
                unitArrs.push("请输入重量");
                for (var i = 50; i <= 3000; i += 50) {
                  unitArrs.push(i);
                }
                data.data.forEach(function(ele, ind) {
                  untilArr.push({
                    name: ele.name,
                    id: ele.id,
                    unitShow: true,
                    unitValue: "",
                    unitArr: unitArrs
                  });
                });
                self.unitLists = untilArr;
                if (self.edata.foodUnitDTOList.length > 0) {
                  var foodUnitDTOListArr = self.edata.foodUnitDTOList;
                  self.unitLists.forEach(function(eleAll, allInd) {
                    foodUnitDTOListArr.forEach(function(eleSel, selInd) {
                      if (eleAll.id == eleSel.unitId) {
                        self.unitLists[allInd].unitShow = false;
                        self.unitLists[allInd].unitValue = eleSel.unitValue;
                      }
                    });
                  });
                }
              } else {
                self.unitLists = [];
              }
            } else {
              self.unitLists = [];
            }
          } else {
            self.unitLists = [];
          }
        } else {
          self.unitLists = [];
          self.$message({
            type: "info",
            message: data.message
          });
        }
      })
      .catch(msg => {
        self.unitLists = [];
        self.$message({
          type: "info",
          message: "服务器异常!"
        });
      });
    self
      .getweightStandard({
        token: sessionStorage.token
      })
      .then(data => {
        if (data.code == 200) {
          if (data.data.length > 0) {
            self.brands = data.data;
            data.data.forEach(function(ele, ind) {
              if (self.edata.weightStandardId == ele.key) {
                self.brandVal = ind;
              }
            });
          } else {
            self.$message({
              type: "info",
              message: "暂无重量标准"
            });
          }
        } else {
          self.$message({
            type: "info",
            message: data.message
          });
        }
      })
      .catch(msg => {
        self.$message({
          type: "info",
          message: "服务器异常"
        });
      });
    self.foodWindowText = self.edata.instruction;
    self.addFoods = self.edata.foodComponentControllerDTOList;
    for (var i = 0; i < self.addFoods.length; i++) {
      self.heats = self.addFoods[0].amount;
      self.protein = self.addFoods[1].amount;
      self.carbonicAcid = self.addFoods[2].amount;
      self.dietFiber = self.addFoods[3].amount;
      self.axunge = self.addFoods[4].amount;
      self.vitaminA = self.addFoods[5].amount;
      self.vitaminB1 = self.addFoods[6].amount;
      self.vitaminB2 = self.addFoods[7].amount;
      self.vitaminC = self.addFoods[8].amount;
      self.vitaminE = self.addFoods[9].amount;
      self.renieratene = self.addFoods[10].amount;
      self.carbohydrate = self.addFoods[11].amount;
      self.Ca = self.addFoods[12].amount;
      self.Fe = self.addFoods[13].amount;
      self.Zn = self.addFoods[14].amount;
      self.Mn = self.addFoods[15].amount;
      self.K = self.addFoods[16].amount;
      self.P = self.addFoods[17].amount;
      self.Na = self.addFoods[18].amount;
      self.Se = self.addFoods[19].amount;
      self.Cu = self.addFoods[20].amount;
      if (self.heats == -1) {
        self.heats = "";
      }
      if (self.protein == -1) {
        self.protein = "";
      }
      if (self.axunge == -1) {
        self.axunge = "";
      }
      if (self.carbonicAcid == -1) {
        self.carbonicAcid = "";
      }
      if (self.dietFiber == -1) {
        self.dietFiber = "";
      }
      if (self.axunge == -1) {
        self.axunge = "";
      }
      if (self.vitaminA == -1) {
        self.vitaminA = "";
      }
      if (self.vitaminB1 == -1) {
        self.vitaminB1 = "";
      }
      if (self.vitaminB2 == -1) {
        self.vitaminB2 = "";
      }
      if (self.vitaminC == -1) {
        self.vitaminC = "";
      }
      if (self.vitaminE == -1) {
        self.vitaminE = "";
      }
      if (self.renieratene == -1) {
        self.renieratene = "";
      }
      if (self.carbohydrate == -1) {
        self.carbohydrate = "";
      }
      if (self.Ca == -1) {
        self.Ca = "";
      }
      if (self.Fe == -1) {
        self.Fe = "";
      }
      if (self.Zn == -1) {
        self.Zn = "";
      }
      if (self.Mn == -1) {
        self.Mn = "";
      }
      if (self.K == -1) {
        self.K = "";
      }
      if (self.P == -1) {
        self.P = "";
      }
      if (self.Na == -1) {
        self.Na = "";
      }
      if (self.Se == -1) {
        self.Se = "";
      }
      if (self.Cu == -1) {
        self.Cu = "";
      }
    }
    self.token = sessionStorage.token;
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");
    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "饮食管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("food") == -1) {
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
  mounted() {},
  // 事件处理
  methods: {
    //      	消息框
    canleClicks() {
      this.isShowdels = true;
      this.delShows = false;
    },
    okclicks() {
      this.intercept = true;
      var url = this.toPath;
      this.$router.push({
        path: url
      });
    },
    // 返回食物管理
    backFood() {
      this.$router.push({
        path: "food"
      });
    },
    // 分类选择
    selecBradnsClick(sType) {
      this.selectfl = sType;
    },
    //获取焦点
    foodNameInput() {
      this.redPrompt = false;
      this.greyPrompt = true;
    },
    textareaInput() {
      this.IsfoodWindowBorder = false;
    },
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      console.log("点的是这个");
      self.picMarkedWords = false;
      self.picGreyPrompt = true;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (image.width != 1280) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else if (image.height != 778) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else if (fileData.size > 1048576) {
            self.$message({
              type: "warning",
              message: "您上传图片的格式或大小不正确，请重新上传"
            });
            return;
          } else {
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    // 上传图片
    uploadImage(file) {
      var TOKEN = sessionStorage.getItem("token");
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appName", "BOTU");
      formdata.append("appId", "BOTU");
      formdata.append("module", "amusment");
      formdata.append("business", "foodItem");
      formdata.append("token", TOKEN);
      this.getfooduploadFile(formdata)
        .then(data => {
          if (data.code == 200) {
            this.path = data.data[0].path;
            this.zoomPath = data.data[0].zoomPath;
            this.thumbnail = true;
            this.$message({
              message: "上传图片成功",
              type: "success"
            });
            document.getElementById("upfile").value = "";
            if (this.ismainPicuter == true) {
              this.imgbox_1 = false;
              this.imgbox_2 = true;
              this.mainPicuter = data.data[0].path;
            } else {
              this.imgbox_3 = false;
              this.imgbox_4 = true;
              this.minorPicuter = data.data[0].path;
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
    //计量单位下拉框选择或者下拉框输入
    checkedOneChangeClick(index) {
      this.unitLists[index].unitShow = !this.unitLists[index].unitShow;
      this.unitLists[index].unitValue = "";
      this.isInputStyle = true;
      this.isInputShow = false;
    },
    //选择重量还是输入重量change事件
    selectChange(index) {
      this.isInputShow = true;
      this.isInputStyle = true;
      if (this.unitLists[index].unitValue == "请输入重量") {
        this.isInputShow = false;
        this.isInputStyle = true;
        this.unitLists[index].unitValue = "";
      }
    },
    //新增食物保存
    addfoodSave() {
      if (!this.validation()) {
        return;
      }
      this.intercept = true;
      var self = this;
      if (self.foodName == self.foodnameCon) {
        var addfood = [
          { name: "热量", amount: self.heats || -1, unit: "千卡" },
          { name: "蛋白质", amount: self.protein || -1, unit: "克" },
          { name: "烟酸", amount: self.carbonicAcid || -1, unit: "毫克" },
          { name: "膳食纤维", amount: self.dietFiber || -1, unit: "克" },
          { name: "脂肪", amount: self.axunge || -1, unit: "克" },
          { name: "维生素A", amount: self.vitaminA || -1, unit: "毫克" },
          { name: "维生素B1", amount: self.vitaminB1 || -1, unit: "毫克" },
          { name: "维生素B2", amount: self.vitaminB2 || -1, unit: "毫克" },
          { name: "维生素C", amount: self.vitaminC || -1, unit: "毫克" },
          { name: "维生素E", amount: self.vitaminE || -1, unit: "毫克" },
          { name: "胡萝卜素", amount: self.renieratene || -1, unit: "毫克" },
          { name: "碳水化合物", amount: self.carbohydrate || -1, unit: "克" },
          { name: "钙", amount: self.Ca || -1, unit: "毫克" },
          { name: "铁", amount: self.Fe || -1, unit: "毫克" },
          { name: "锌", amount: self.Zn || -1, unit: "毫克" },
          { name: "锰", amount: self.Mn || -1, unit: "毫克" },
          { name: "钾", amount: self.K || -1, unit: "毫克" },
          { name: "磷", amount: self.P || -1, unit: "毫克" },
          { name: "钠", amount: self.Na || -1, unit: "毫克" },
          { name: "硒", amount: self.Se || -1, unit: "毫克" },
          { name: "铜", amount: self.Cu || -1, unit: "毫克" }
        ];
        var addFoods = JSON.stringify(addfood);
        var measurementUnitArr = [];
        var measurementUnitArrTrue = false;
        self.unitLists.forEach(function(ele, ind) {
          if (ele.unitValue * 1 > 0) {
            if (ele.unitShow == false) {
              measurementUnitArr.push({
                unitId: ele.id,
                unitValue: ele.unitValue
              });
            }
          }
        });
        if (measurementUnitArr.length > 0) {
          self.isfoodUnitTost = false;
          self
            .getfoodFoodUpdate({
              foodId: self.foodId,
              name: self.foodName,
              itemImage: self.zoomPath,
              topImage: self.path,
              specifications: self.foodSpecifications,
              kcal: self.heats,
              weightStandardId: self.brands[self.brandVal].key,
              weightStandardName: self.brands[self.brandVal].value,
              instruction: self.foodWindowText,
              componentJson: addFoods,
              measurementUnitJson: JSON.stringify(measurementUnitArr)
            })
            .then(data => {
              if (data.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$router.push({
                  path: "food"
                });
              } else {
                this.$message({
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        } else {
          self.isfoodUnitTost = true;
          self.$message({
            message: "计量单位输入错误",
            type: "info"
          });
        }
      } else {
        self
          .getfoodFuzzyQuery({
            name: self.foodName
          })
          .then(data => {
            if (data.code == 200) {
              var addfood = [
                { name: "热量", amount: self.heats || -1, unit: "千卡" },
                { name: "蛋白质", amount: self.protein || -1, unit: "克" },
                {
                  name: "烟酸",
                  amount: self.carbonicAcid || -1,
                  unit: "毫克"
                },
                {
                  name: "膳食纤维",
                  amount: self.dietFiber || -1,
                  unit: "克"
                },
                { name: "脂肪", amount: self.axunge || -1, unit: "克" },
                {
                  name: "维生素A",
                  amount: self.vitaminA || -1,
                  unit: "毫克"
                },
                {
                  name: "维生素B1",
                  amount: self.vitaminB1 || -1,
                  unit: "毫克"
                },
                {
                  name: "维生素B2",
                  amount: self.vitaminB2 || -1,
                  unit: "毫克"
                },
                {
                  name: "维生素C",
                  amount: self.vitaminC || -1,
                  unit: "毫克"
                },
                {
                  name: "维生素E",
                  amount: self.vitaminE || -1,
                  unit: "毫克"
                },
                {
                  name: "胡萝卜素",
                  amount: self.renieratene || -1,
                  unit: "毫克"
                },
                {
                  name: "碳水化合物",
                  amount: self.carbohydrate || -1,
                  unit: "克"
                },
                { name: "钙", amount: self.Ca || -1, unit: "毫克" },
                { name: "铁", amount: self.Fe || -1, unit: "毫克" },
                { name: "锌", amount: self.Zn || -1, unit: "毫克" },
                { name: "锰", amount: self.Mn || -1, unit: "毫克" },
                { name: "钾", amount: self.K || -1, unit: "毫克" },
                { name: "磷", amount: self.P || -1, unit: "毫克" },
                { name: "钠", amount: self.Na || -1, unit: "毫克" },
                { name: "硒", amount: self.Se || -1, unit: "毫克" },
                { name: "铜", amount: self.Cu || -1, unit: "毫克" }
              ];
              var addFoods = JSON.stringify(addfood);
              var measurementUnitArr = [];
              var measurementUnitArrTrue = false;
              self.unitLists.forEach(function(ele, ind) {
                if (ele.unitValue * 1 > 0) {
                  if (ele.unitShow == false) {
                    measurementUnitArr.push({
                      unitId: ele.id,
                      unitValue: ele.unitValue
                    });
                  }
                }
              });
              if (data.data.length > 0) {
                data.data.forEach(function(ele, ind) {
                  if (val == ele.list.name) {
                    self.$message("该食物已存在，请重新输入！");
                    self.redPrompt = true;
                    self.greyPrompt = false;
                  }
                });
                if (self.redPrompt == true) {
                } else {
                  if (measurementUnitArr.length > 0) {
                    self.isfoodUnitTost = false;
                    self
                      .getfoodFoodUpdate({
                        foodId: self.foodId,
                        name: self.foodName,
                        itemImage: self.zoomPath,
                        topImage: self.path,
                        specifications: self.foodSpecifications,
                        kcal: self.heats,
                        weightStandardId: self.brands[self.brandVal].key,
                        weightStandardName: self.brands[self.brandVal].value,
                        instruction: self.foodWindowText,
                        componentJson: addFoods,
                        measurementUnitJson: JSON.stringify(measurementUnitArr)
                      })
                      .then(data => {
                        if (data.code == 200) {
                          this.$message({
                            message: "保存成功",
                            type: "success"
                          });
                          this.$router.push({
                            path: "food"
                          });
                        } else {
                          this.$message({
                            message: data.message
                          });
                        }
                      })
                      .catch(msg => {
                        self.$message({
                          type: "info",
                          message: "服务器异常"
                        });
                      });
                  } else {
                    self.isfoodUnitTost = true;
                    self.$message({
                      message: "计量单位输入错误",
                      type: "info"
                    });
                  }
                }
              } else {
                self.redPrompt = false;
                self.greyPrompt = true;
                if (measurementUnitArr.length > 0) {
                  self.isfoodUnitTost = false;
                  self
                    .getfoodFoodUpdate({
                      foodId: self.foodId,
                      name: self.foodName,
                      itemImage: self.zoomPath,
                      topImage: self.path,
                      specifications: self.foodSpecifications,
                      kcal: self.heats,
                      weightStandardId: self.brands[self.brandVal].key,
                      weightStandardName: self.brands[self.brandVal].value,
                      instruction: self.foodWindowText,
                      componentJson: addFoods,
                      measurementUnitJson: JSON.stringify(measurementUnitArr)
                    })
                    .then(data => {
                      if (data.code == 200) {
                        this.$message({
                          message: "保存成功",
                          type: "success"
                        });
                        this.$router.push({
                          path: "food"
                        });
                      } else {
                        this.$message({
                          message: data.message
                        });
                      }
                    })
                    .catch(msg => {
                      self.$message({
                        type: "info",
                        message: "服务器异常"
                      });
                    });
                } else {
                  self.isfoodUnitTost = true;
                  self.$message({
                    message: "计量单位输入错误",
                    type: "info"
                  });
                }
              }
            } else {
              self.$message({
                type: "info",
                message: "查询食物名称异常"
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    //验证规则
    validation() {
      var flag = true;
      var chineseCharacters = /[\u4e00-\u9fa5_a-zA-Z0-9_]/;
      var punctuation = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
      var num = /(^[0-9]{1,5}$)|(^[0-9]{1,5}[\.]{1}[0-9]{1,2}$)/;
      var nums = /^[1-9]\d{0,4}$/;
      var kongge = /\s+/g;
      var feiK = /^\s*$/g;
      if (!nums.test(this.heats)) {
        this.Isheatas = true;
        this.$message({
          message: "热量最多五位的正整数！"
        });
        flag = false;
      }
      if (!feiK.test(this.protein)) {
        if (!num.test(this.protein)) {
          this.Isprotein = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.carbonicAcid)) {
        if (!num.test(this.carbonicAcid)) {
          this.IscarbonicAcid = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.dietFiber)) {
        if (!num.test(this.dietFiber)) {
          this.IsdietFiber = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.axunge)) {
        if (!num.test(this.axunge)) {
          this.Isaxunge = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.vitaminA)) {
        if (!num.test(this.vitaminA)) {
          this.IsvitaminA = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.vitaminB1)) {
        if (!num.test(this.vitaminB1)) {
          this.IsvitaminB1 = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.vitaminB2)) {
        if (!num.test(this.vitaminB2)) {
          this.IsvitaminB2 = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.vitaminC)) {
        if (!num.test(this.vitaminC)) {
          this.IsvitaminC = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.vitaminE)) {
        if (!num.test(this.vitaminE)) {
          this.IsvitaminE = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.renieratene)) {
        if (!num.test(this.renieratene)) {
          this.Isrenieratene = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.carbohydrate)) {
        if (!num.test(this.carbohydrate)) {
          this.Iscarbohydrate = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Ca)) {
        if (!num.test(this.Ca)) {
          this.IsCa = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Fe)) {
        if (!num.test(this.Fe)) {
          this.IsFe = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Zn)) {
        if (!num.test(this.Zn)) {
          this.IsZn = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Mn)) {
        if (!num.test(this.Mn)) {
          this.IsMn = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.K)) {
        if (!num.test(this.K)) {
          this.IsK = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.P)) {
        if (!num.test(this.P)) {
          this.IsP = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Na)) {
        if (!num.test(this.Na)) {
          this.IsNa = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Se)) {
        if (!num.test(this.Se)) {
          this.IsSe = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!feiK.test(this.Cu)) {
        if (!num.test(this.Cu)) {
          this.IsCu = true;
          flag = false;
        }
      } else {
        flag = true;
      }
      if (!chineseCharacters.test(this.foodName)) {
        this.redPrompt = true;
        this.greyPrompt = false;
        flag = false;
      }

      if (feiK.test(this.foodSpecifications)) {
        this.IsfoodSpecifications = true;
        flag = false;
      }
      if (feiK.test(this.foodWindowText)) {
        this.IsfoodWindowBorder = true;
        flag = false;
      }
      if (this.zoomPath.length == 0) {
        this.picMarkedWords = true;
        this.picGreyPrompt = false;
        flag = false;
      }
      return flag;
    },
    weightStandardInput() {
      this.IsweightStandard = false;
    },
    foodSpecificationsInput() {
      this.IsfoodSpecifications = false;
    },
    KInput() {
      this.IsK = false;
    },
    PInput() {
      this.IsP = false;
    },
    NaInput() {
      this.IsNa = false;
    },
    SeInput() {
      this.IsSe = false;
    },
    CuInput() {
      this.IsCu = false;
    },
    MnInput() {
      this.IsMn = false;
    },
    ZnInput() {
      this.IsZn = false;
    },
    FeInput() {
      this.IsFe = false;
    },
    CaInput() {
      this.IsCa = false;
    },
    carbohydrateInput() {
      this.Iscarbohydrate = false;
    },
    renierateneInput() {
      this.Isrenieratene = false;
    },
    vitaminEInput() {
      this.IsvitaminE = false;
    },
    vitaminCInput() {
      this.IsvitaminC = false;
    },
    vitaminB2Input() {
      this.IsvitaminB2 = false;
    },
    vitaminB1Input() {
      this.IsvitaminB1 = false;
    },
    vitaminAInput() {
      this.IsvitaminA = false;
    },
    axungeInput() {
      this.Isaxunge = false;
    },
    heatsInput() {
      this.Isheatas = false;
    },
    proteinInput() {
      this.Isprotein = false;
    },
    carbonicAcidInput() {
      this.IscarbonicAcid = false;
    },
    dietFiberInput() {
      this.IsdietFiber = false;
    },
    ...mapActions([
      "getfoodFoodUpdate",
      "getfooduploadFile",
      "getfoodMeasurementUnitSelectAll",
      "getweightStandard",
      "getListResRole",
      "getfoodFuzzyQuery"
    ])
  },
  // 监视
  watch: {}
};
</script>
<style scoped>
.foodSpecifications,
.weightStandard {
  width: 100%;
  float: left;
  margin-top: 24px;
  margin-left: 110px;
}

.foodSpecifications select,
.weightStandard select {
  width: 180px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 12px;
  margin-left: 8px;
}

.picGreyPrompt {
  float: left;
  color: #8f8e94;
  padding-left: 20px;
  margin-top: 6px;
}

.picMarkedWords {
  float: left;
  color: red;
  padding-left: 20px;
  margin-top: 6px;
}

.redMarkedWords {
  padding-left: 20px;
  color: red;
}

.foodWindowBorder {
  border: 1px solid red;
}

.foodControl {
  color: #303030;
  font-size: 16px;
  width: auto;
  height: 56px;
  border-bottom: 1px solid #d1d1d1;
  line-height: 56px;
  padding-left: 1px;
  margin-right: 36px;
  margin-left: 36px;
  font-weight: 600;
  padding-top: 8px;
}

.img {
  width: 20px;
  height: 20px;
  background: url(../../../../static/img/精灵.png) no-repeat;
  background-position: 41.7% 50%;
  float: left;
  margin-top: 17px;
  margin-right: 8px;
  cursor: pointer;
}

.foodList {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.foodName {
  padding-top: 20px;
  padding-left: 140px;
}

.foodName input {
  width: 180px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  padding-left: 12px;
  margin-left: 12px;
}

.markedWords {
  padding-left: 20px;
  color: #8f8e94;
}

.foodPic {
  padding-left: 140px;
  padding-top: 24px;
}

.select1 {
  display: inline;
  margin-left: 8px;
}

.picBox {
  float: left;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  margin-left: 54px;
  border: 1px solid #d1d1d1;
  background: url(/static/img/elf.3b8efb5.png) no-repeat;
  background-position: 60% 71%;
  margin-top: 3px;
}

.picBox input {
  width: 120px;
  height: 28px;
}

.picBox img {
  float: left;
  width: 28px;
  height: 28px;
  margin-top: -29px;
  margin-left: -1px;
  border-radius: 4px;
}

.uploading {
  float: left;
  width: 68px;
  height: 30px;
  border-radius: 4px;
  background-color: #ff6339;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  margin-left: 24px;
  margin-top: 2px;
  cursor: pointer;
}

.foodComposition {
  margin-top: 40px;
  margin-left: 140px;
}

.foodTitle {
  display: inline-block;
  width: 90px;
  height: 32px;
  text-align: right;
  line-height: 32px;
}

.foodComposition input {
  width: 80px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  text-align: center;
  margin-left: 12px;
}

.foodComposition span {
  color: #cccccc;
  padding-left: 12px;
}

.protein {
  margin-left: 24px;
}

#protein {
  margin-left: 11px;
}

.foodComposition ul {
  float: left;
  margin-left: 60px;
}

.foodComposition ul:nth-child(1) {
  margin-left: -50px;
}

.foodComposition ul:nth-child(5) {
  margin-left: -50px;
}

.foodComposition ul li {
  margin-top: 24px;
  float: left;
}

.foodWindow {
  float: left;
  margin-top: 36px;
  margin-left: 110px;
}

.foodUnit {
  float: left;
  margin-top: 36px;
  margin-left: 110px;
}
.foodUnitTost {
  color: red !important;
}
.foodUnit img {
  width: 20px;
  height: 20px;
}

.foodUnit div:nth-child(2) ul {
  display: flex;
  margin-left: 80px;
  margin-top: 24px;
  flex-wrap: wrap;
  min-width: 560px;
}
.unitListsLeft {
  /* border: 1px solid red; */
}
.unitListsCenter {
  /* border: 1px solid red; */
  min-width: 30px;
}

.foodUnit div:nth-child(2) ul li {
  display: flex;
  min-width: 18%;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
  margin-bottom: 9px;
  margin-top: 9px;
}

.foodUnit li div {
  margin-right: 10px;
}
.unitListsRight {
  /* border: 1px solid red; */
  position: relative;
}

.unitListsRight select {
  width: 120px;
  height: 34px !important;
  line-height: 34px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  font-size: 13px;
  padding-left: 5px;
}

.unitListsRight select option {
  padding: 3px auto !important;
}

.unitListsRight .inputStyle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 0;
  font-size: 13px;
  /* border: 1px solid #d1d1d1; */
  border-radius: 4px;
  padding-left: 5px;
  border-right: none;
  /* border: 1px solid red; */
}

.unitListsRight .inputShow {
  display: none;
}

.windowTitle {
  float: left;
}

.textarea {
  float: left;
  width: 765px;
  height: 60px;
  /*	border: 1px solid #D1D1D1;*/
  margin-left: 12px;
  border-radius: 4px;
  padding-left: 12px;
  padding-bottom: 10px;
  resize: none;
  overflow-y: hidden;
  outline: none;
}

.astrict {
  float: left;
  margin-top: 20px;
  color: #8f8e94;
  font-size: 14px;
  margin-left: 34px;
}

.handle {
  float: left;
  margin-top: 40px;
  width: 100%;
  margin-bottom: 40px;
}

.foodSave,
.abolish {
  float: left;
  width: 68px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  margin: auto auto;
}

.abolish {
  background-color: #d1d1d1;
  margin-left: 48px;
}

.foodSave {
  background-color: #ff6339;
  margin-left: 38%;
}

.heatas {
  border: 1px solid red !important;
}

.proteins {
  border: 1px solid red !important;
}

.carbonicAcid {
  border: 1px solid red !important;
}

.dietFiber,
.axunge,
.vitaminA,
.vitaminB1,
.vitaminB2,
.vitaminC,
.vitaminE,
.renieratene,
.carbohydrate,
.Ca,
.Fe,
.Zn,
.Mn,
.K,
.P,
.Na,
.Se,
.Cu,
.weightStandarda,
.foodSpecificationsa {
  border: 1px solid red !important;
}

/*消息框*/

.delPopup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000000;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

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

.showdel {
  display: none;
}
</style>