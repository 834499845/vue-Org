<!--评论管理-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="init">
        <div>
            <div class="listTitle">
                <div>
                    初始化管理
                </div>
                <div>
                    <!--新增热词-->
                </div>
            </div>
            <!--列表-->
            <div class="init-main">
              <div class="main-nav">
                <ul>
                  <li v-for="(item,index) in navLists" @click="navClick(index)" :class="{selectNav:isSelectNav == index}">
                    {{item.name}}
                  </li>
                </ul>
              </div>
              <div class="main-but">
                <div @click="initClick"> 
                  开始初始化
                </div>
              </div>
              <div class="main-main">
                <ul>
                  <li v-for="(item,index) in lists">
                    <div class="list-left">
                      {{item.name}}
                    </div>
                    <div class="list-center" v-loading="item.load" element-loading-spinner="el-icon-loading">

                    </div>
                    <div class="list-right">
                      {{item.error}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      loading: true,
      navLists: [
        { name: "全局组件" },
        { name: "医疗" },
        { name: "新闻" },
        { name: "健康" },
        { name: "饮食" },
        { name: "健身" },
        { name: "商城" },
        { name: "激励" },
        { name: "个人中心" }
      ],
      isSelectNav: 0,
      lists: [],
      doclists: [
        { name: "初始化医生", load: false, error: "未开始" },
        { name: "初始化医生geo", load: false, error: "未开始" },
        { name: "初始化医院", load: false, error: "未开始" },
        { name: "初始化医院Geo", load: false, error: "未开始" },
        { name: "初始化Redis健康回答", load: false, error: "未开始" },
        { name: "初始化医疗字典到redis", load: false, error: "未开始" },
        { name: "初始化医疗圈子分类", load: false, error: "未开始" },
        {
          name: "初始化疾病和疾病子症状关联",
          load: false,
          error: "未开始"
        },
        {
          name: "初始化症状疾病关联和症状子症状",
          load: false,
          error: "未开始"
        },
        { name: "初始化圈子成员至缓存", load: false, error: "未开始" },
        { name: "初始化文章认证", load: false, error: "未开始" }
      ],
      commmlists: [
        { name: "初始化轮播图到redis接口-商城", load: false, error: "未开始" },
        { name: "初始化轮播图到redis接口-激励", load: false, error: "未开始" },
        { name: "初始化系统消息", load: false, error: "未开始" },
        { name: "初始化所有字典缓存", load: false, error: "未开始" },
        { name: "初始化领域缓存", load: false, error: "未开始" },
        { name: "初始化基础字典缓存", load: false, error: "未开始" },
        { name: "初始化地区字典到redis", load: false, error: "未开始" },
        { name: "初始化所有热词到redis-商城",load: false,error: "未开始"},
        { name: "初始化所有热词到redis-医疗",load: false,error: "未开始"},
        { name: "初始化日志监控系统接收人缓存",load: false,error: "未开始"},
        { name: "初始化日志监控系统服务列表缓存",load: false,error: "未开始"},
      ],
      newslists: [
        { name: "问题回答缓存初始化", load: false, error: "未开始" },
        { name: "问题缓存初始化", load: false, error: "未开始" },
        { name: "热搜初始化", load: false, error: "未开始" },
        { name: "新闻信息初始化", load: false, error: "未开始" },
        { name: "新闻个人分类初始化", load: false, error: "未开始" }
      ],
      heallists: [
        { name: "初始化所有字典到redis", load: false, error: "未开始" }
      ],
      foodlists: [{ name: "初始化食谱到redis", load: false, error: "未开始" }],
      finesslists: [
        { name: "初始化健身数据到redis", load: false, error: "未开始" }
      ],
      malllists: [
        { name: "初始化为你精选图到redis", load: false, error: "未开始" },
        { name: "初始化所有图标到redis", load: false, error: "未开始" },
        { name: "初始化优惠券到redis", load: false, error: "未开始" },
        { name: "初始化必康定制水", load: false, error: "未开始" },
        { name: "初始化商品信息", load: false, error: "未开始" }
      ],
      accountlists: [
        { name: "初始化角色-资源关系到redis", load: false, error: "未开始" },
        { name: "初始化app用户缓存", load: false, error: "未开始" }
      ],
      encouragelists: [
        { name: "缓存所有可用激励任务", load: false, error: "未开始" }
      ]
    };
  },
  // 过滤
  filters: {},
  // 模块新建时
  created: function() {
    var self = this;
    // 权限限制
    var roleIdStr = sessionStorage.getItem("roleId");
    var TOKEN = sessionStorage.getItem("token");

    var userRoleOBj = sessionStorage.getItem("userRole");
    if (userRoleOBj) {
      userRoleOBj = JSON.parse(userRoleOBj);
      var arrs = [];
      var arrs = [];
      userRoleOBj.forEach(function(ele, ind) {
        if (ele.name == "公共管理") {
          ele.children.forEach(function(one, oneIndex) {
            arrs.push(one.path);
          });
        }
      });
      if (arrs.indexOf("init") == -1) {
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
        self.lists = self.commmlists;
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
    navClick(index) {
      this.isSelectNav = index;
      this.lists = [];
      if (index == 0) {
        this.lists = [
          {
            name: "初始化轮播图到redis接口-商城",
            load: false,
            error: "未开始"
          },
          {
            name: "初始化轮播图到redis接口-激励",
            load: false,
            error: "未开始"
          },
          { name: "初始化系统消息", load: false, error: "未开始" },
          { name: "初始化所有字典缓存", load: false, error: "未开始" },
          { name: "初始化领域缓存", load: false, error: "未开始" },
          { name: "初始化基础字典缓存", load: false, error: "未开始" },
          { name: "初始化地区字典到redis", load: false, error: "未开始" },
          { name: "初始化所有热词到redis-商城",load: false,error: "未开始"},
          { name: "初始化所有热词到redis-医疗",load: false,error: "未开始"},
          { name: "初始化日志监控系统接收人缓存",load: false,error: "未开始"},
          { name: "初始化日志监控系统服务列表缓存",load: false,error: "未开始"},
        ];
      } else if (index == 1) {
        this.lists = [
          { name: "初始化医生", load: false, error: "未开始" },
          { name: "初始化医生geo", load: false, error: "未开始" },
          { name: "初始化医院", load: false, error: "未开始" },
          { name: "初始化医院Geo", load: false, error: "未开始" },
          { name: "初始化Redis健康回答", load: false, error: "未开始" },
          { name: "初始化医疗字典到redis", load: false, error: "未开始" },
          { name: "初始化医疗圈子分类", load: false, error: "未开始" },
          {
            name: "初始化疾病和疾病子症状关联",
            load: false,
            error: "未开始"
          },
          {
            name: "初始化症状疾病关联和症状子症状",
            load: false,
            error: "未开始"
          },
          { name: "初始化圈子成员至缓存", load: false, error: "未开始" },
          { name: "初始化文章认证", load: false, error: "未开始" }
        ];
      } else if (index == 2) {
        this.lists = [
          { name: "问题回答缓存初始化", load: false, error: "未开始" },
          { name: "问题缓存初始化", load: false, error: "未开始" },
          { name: "热搜初始化", load: false, error: "未开始" },
          { name: "新闻信息初始化", load: false, error: "未开始" },
          { name: "新闻个人分类初始化", load: false, error: "未开始" }
        ];
      } else if (index == 3) {
        this.lists = [
          { name: "初始化所有字典到redis", load: false, error: "未开始" }
        ];
      } else if (index == 4) {
        this.lists = [
          { name: "初始化食谱到redis", load: false, error: "未开始" }
        ];
      } else if (index == 5) {
        this.lists = [
          { name: "初始化健身数据到redis", load: false, error: "未开始" }
        ];
      } else if (index == 6) {
        this.lists = [
          { name: "初始化为你精选图到redis", load: false, error: "未开始" },
          { name: "初始化所有图标到redis", load: false, error: "未开始" },
          { name: "初始化优惠券到redis", load: false, error: "未开始" },
          { name: "初始化必康定制水", load: false, error: "未开始" },
          { name: "初始化商品信息", load: false, error: "未开始" }
        ];
      } else if (index == 7) {
        this.lists = [
          { name: "缓存所有可用激励任务", load: false, error: "未开始" }
        ];
      } else if (index == 8) {
        this.lists = [
          { name: "初始化角色-资源关系到redis", load: false, error: "未开始" },
          { name: "初始化app用户缓存", load: false, error: "未开始" }
        ];
      }
    },
    initClick() {
      if (this.isSelectNav == 0) {
        this.initCommClick();
      } else if (this.isSelectNav == 1) {
        this.initDocClick();
      } else if (this.isSelectNav == 2) {
        this.initNewsClick();
      } else if (this.isSelectNav == 3) {
        this.initHealClick();
      } else if (this.isSelectNav == 4) {
        this.initFoodClick();
      } else if (this.isSelectNav == 5) {
        this.initFinessClick();
      } else if (this.isSelectNav == 6) {
        this.initMallClick();
      } else if (this.isSelectNav == 7) {
        this.initEncourageClick();
      } else if (this.isSelectNav == 8) {
        this.initAccountClick();
      }
    },
    initEncourageClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitEncourageTasks({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initAccountClick() {
      var self = this;
      self.lists[0].load = true;
      var TOKEN = sessionStorage.getItem("token");
      self
        .getbaseinitinitRoleResources({
          token: TOKEN
        })
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].load = false;
            self.lists[0].error = data.message;
          }
          self.lists[1].load = true;
          self
            .getbaseinitinitAccount({
              token: TOKEN
            })
            .then(data1 => {
              if (data1.code == 200) {
                self.lists[1].load = false;
                self.lists[1].error = "成功";
              } else {
                self.lists[1].error = data1.message;
              }
            })
            .catch(msg => {
              self.lists[1].load = false;
              self.lists[1].error = "服务器异常";
            });
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initMallClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitCarefullyChosenToRedis({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
          self.lists[1].load = true;
          self
            .getbaseinitinitHomeIconToRedis({})
            .then(data1 => {
              if (data1.code == 200) {
                self.lists[1].load = false;
                self.lists[1].error = "成功";
              } else {
                self.lists[1].error = data1.message;
              }
              self.lists[2].load = true;
              self
                .getbaseinitcouponinitRedis({})
                .then(data2 => {
                  if (data2.code == 200) {
                    self.lists[2].load = false;
                    self.lists[2].error = "成功";
                  } else {
                    self.lists[2].error = data2.message;
                  }
                  self.lists[3].load = true;
                  self
                    .getbaseinitinnitCustomWater({
                      id: "cba90714354c4525a43297c04aa85a81",
                      pictureId: "24825f89b8fe46d4a092f26984663e3c"
                    })
                    .then(data3 => {
                      if (data3.code == 200) {
                        self.lists[3].load = false;
                        self.lists[3].error = "成功";
                      } else {
                        self.lists[3].error = data3.message;
                      }
                      self.lists[4].load = true;
                      self
                        .getbaseinitinnitProductInfo({})
                        .then(data4 => {
                          if (data4.code == 200) {
                            self.lists[4].load = false;
                            self.lists[4].error = "成功";
                          } else {
                            self.lists[4].error = data4.message;
                          }
                        })
                        .catch(msg => {
                          self.lists[4].load = false;
                          self.lists[4].error = "服务器异常";
                        });
                    })
                    .catch(msg => {
                      self.lists[3].load = false;
                      self.lists[3].error = "服务器异常";
                    });
                })
                .catch(msg => {
                  self.lists[2].load = false;
                  self.lists[2].error = "服务器异常";
                });
            })
            .catch(msg => {
              self.lists[1].load = false;
              self.lists[1].error = "服务器异常";
            });
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initDocClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitDoctorToRedis({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
          self.lists[1].load = true;
          self
            .getbaseinitinitDoctorGeo({})
            .then(data1 => {
              if (data1.code == 200) {
                self.lists[1].load = false;
                self.lists[1].error = "成功";
              } else {
                self.lists[1].error = data1.message;
              }
              self.lists[2].load = true;
              self
                .getbaseinitinitHospitalToRedis({})
                .then(data2 => {
                  if (data2.code == 200) {
                    self.lists[2].load = false;
                    self.lists[2].error = "成功";
                  } else {
                    self.lists[2].error = data2.message;
                  }
                  self.lists[3].load = true;
                  self
                    .getbaseinitinitHospitalGeo({})
                    .then(data3 => {
                      if (data3.code == 200) {
                        self.lists[3].load = false;
                        self.lists[3].error = "成功";
                      } else {
                        self.lists[3].error = data3.message;
                      }
                      self.lists[4].load = true;
                      self
                        .getbaseinitintoHealthAnswerRedis({})
                        .then(data4 => {
                          if (data4.code == 200) {
                            self.lists[4].load = false;
                            self.lists[4].error = "成功";
                          } else {
                            self.lists[4].error = data4.message;
                          }
                          self.lists[5].load = true;
                          self
                            .getbaseinitinitMedicalDictionaryRedis({})
                            .then(data5 => {
                              if (data5.code == 200) {
                                self.lists[5].load = false;
                                self.lists[5].error = "成功";
                              } else {
                                self.lists[5].error = data5.message;
                              }

                              self.lists[6].load = true;
                              self
                                .getbaseinitinitCircleAssortmentToRedis({})
                                .then(data6 => {
                                  if (data6.code == 200) {
                                    self.lists[6].load = false;
                                    self.lists[6].error = "成功";
                                  } else {
                                    self.lists[6].error = data6.message;
                                  }
                                })
                                .catch(msg => {
                                  self.lists[6].load = false;
                                  self.lists[6].error = "服务器异常";
                                });
                              self.lists[7].load = true;
                              self
                                .getbaseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis(
                                  {}
                                )
                                .then(data7 => {
                                  if (data7.code == 200) {
                                    self.lists[7].load = false;
                                    self.lists[7].error = "成功";
                                  } else {
                                    self.lists[7].error = data7.message;
                                  }

                                  self.lists[8].load = true;
                                  self
                                    .getbaseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis(
                                      {}
                                    )
                                    .then(data8 => {
                                      if (data8.code == 200) {
                                        self.lists[8].load = false;
                                        self.lists[8].error = "成功";
                                      } else {
                                        self.lists[8].error = data8.message;
                                      }

                                      self.lists[9].load = true;
                                      self
                                        .getbaseinitinitCircleMember({})
                                        .then(data9 => {
                                          if (data9.code == 200) {
                                            self.lists[9].load = false;
                                            self.lists[9].error = "成功";
                                          } else {
                                            self.lists[9].error = data9.message;
                                          }

                                          self.lists[10].load = true;
                                          self
                                            .getbaseinitinitCircleMember({})
                                            .then(data10 => {
                                              if (data10.code == 200) {
                                                self.lists[10].load = false;
                                                self.lists[10].error = "成功";
                                              } else {
                                                self.lists[10].error =
                                                  data10.message;
                                              }
                                            })
                                            .catch(msg => {
                                              self.lists[10].load = false;
                                              self.lists[10].error =
                                                "服务器异常";
                                            });
                                        })
                                        .catch(msg => {
                                          self.lists[9].load = false;
                                          self.lists[9].error = "服务器异常";
                                        });
                                    })
                                    .catch(msg => {
                                      self.lists[8].load = false;
                                      self.lists[8].error = "服务器异常";
                                    });
                                })
                                .catch(msg => {
                                  self.lists[7].load = false;
                                  self.lists[7].error = "服务器异常";
                                });
                            })
                            .catch(msg => {
                              self.lists[5].load = false;
                              self.lists[5].error = "服务器异常";
                            });
                        })
                        .catch(msg => {
                          self.lists[4].load = false;
                          self.lists[4].error = "服务器异常";
                        });
                    })
                    .catch(msg => {
                      self.lists[3].load = false;
                      self.lists[3].error = "服务器异常";
                    });
                })
                .catch(msg => {
                  self.lists[2].load = false;
                  self.lists[2].error = "服务器异常";
                });
            })
            .catch(msg => {
              self.lists[1].load = false;
              self.lists[1].error = "服务器异常";
            });
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initCommClick() {
      var self = this;
      self.lists[0].load = true;
      var Token = sessionStorage.getItem("token")
      self
        .getbaseinitBannerToRedis({
          bannerModular: 1,
          bannerPosition: 1
        })
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
          self.lists[1].load = true;
          self
            .getbaseinitBannerToRedis({
              bannerModular: 2,
              bannerPosition: 1
            })
            .then(data1 => {
              if (data1.code == 200) {
                self.lists[1].load = false;
                self.lists[1].error = "成功";
              } else {
                self.lists[1].error = data1.message;
              }
              self.lists[2].load = true;
              self
                .getbaseinitinformation({})
                .then(data2 => {
                  if (data2.code == 200) {
                    self.lists[2].load = false;
                    self.lists[2].error = "成功";
                  } else {
                    self.lists[2].error = data2.message;
                  }
                  self.lists[3].load = true;
                  self
                    .getbaseinitinitDictionaryRedis({})
                    .then(data3 => {
                      if (data3.code == 200) {
                        self.lists[3].load = false;
                        self.lists[3].error = "成功";
                      } else {
                        self.lists[3].error = data3.message;
                      }
                      self.lists[4].load = true;
                      self
                        .getbaseinitinitAdvantageAreaToRedis({})
                        .then(data4 => {
                          if (data4.code == 200) {
                            self.lists[4].load = false;
                            self.lists[4].error = "成功";
                          } else {
                            self.lists[4].error = data4.message;
                          }
                          self.lists[5].load = true;
                          self
                            .getbaseinitinitBaseDictionaryRedis({})
                            .then(data5 => {
                              if (data5.code == 200) {
                                self.lists[5].load = false;
                                self.lists[5].error = "成功";
                              } else {
                                self.lists[5].error = data5.message;
                              }

                              self.lists[6].load = true;
                              self
                                .getbaseinitinitAreaToRedis({})
                                .then(data6 => {
                                  if (data6.code == 200) {
                                    self.lists[6].load = false;
                                    self.lists[6].error = "成功";
                                  } else {
                                    self.lists[6].error = data6.message;
                                  }
                                })
                                .catch(msg => {
                                  self.lists[6].load = false;
                                  self.lists[6].error = "服务器异常";
                                });

                              self.lists[7].load = true;
                              self
                                .getbaseinitinitHotSearchToRedis({
                                  type: "mall"
                                })
                                .then(data7 => {
                                  if (data7.code == 200) {
                                    self.lists[7].load = false;
                                    self.lists[7].error = "成功";
                                  } else {
                                    self.lists[7].error = data7.message;
                                  }

                                  self.lists[8].load = true;
                                  self
                                    .getbaseinitinitHotSearchToRedis({
                                      type: "medical"
                                    })
                                    .then(data8 => {
                                      if (data8.code == 200) {
                                        self.lists[8].load = false;
                                        self.lists[8].error = "成功";
                                        
                                      } else {
                                        self.lists[8].error = data8.message;
                                      }                                      
                                      self.lists[9].load = true;
                                      self
                                        .getbaseinitStaticLogstashDictionaryInitReceive({
                                            token : Token
                                        })
                                        .then(data9 => {
                                          if (data9.code == 200) {
                                            self.lists[9].load = false;
                                            self.lists[9].error = "成功";
                                            
                                          } else {
                                            self.lists[9].error = data9.message;
                                          }                                      
                                          self.lists[10].load = true;
                                          self
                                            .getbaseinitStaticLogstashDictionaryInitServiceList({
                                                token : Token
                                            })
                                            .then(data10 => {
                                              if (data10.code == 200) {
                                                self.lists[10].load = false;
                                                self.lists[10].error = "成功";
                                                
                                              } else {
                                                self.lists[10].error = data10.message;
                                              }                                      
                                              
                                                
                                              
                                            })
                                            .catch(msg => {
                                              self.lists[10].load = false;
                                              self.lists[10].error = "服务器异常";
                                            });
                                            
                                          
                                        })
                                        .catch(msg => {
                                          self.lists[9].load = false;
                                          self.lists[9].error = "服务器异常";
                                        });
                                        
                                       
                                    })
                                    .catch(msg => {
                                      self.lists[8].load = false;
                                      self.lists[8].error = "服务器异常";
                                    });
                                })
                                .catch(msg => {
                                  self.lists[7].load = false;
                                  self.lists[7].error = "服务器异常";
                                });
                            })
                            .catch(msg => {
                              self.lists[5].load = false;
                              self.lists[5].error = "服务器异常";
                            });
                        })
                        .catch(msg => {
                          self.lists[4].load = false;
                          self.lists[4].error = "服务器异常";
                        });
                    })
                    .catch(msg => {
                      self.lists[3].load = false;
                      self.lists[3].error = "服务器异常";
                    });
                })
                .catch(msg => {
                  self.lists[2].load = false;
                  self.lists[2].error = "服务器异常";
                });
            })
            .catch(msg => {
              self.lists[1].load = false;
              self.lists[1].error = "服务器异常";
            });
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initNewsClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitAnswersCache({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
          self.lists[1].load = true;
          self
            .getbaseinitinitQuestionsCache({})
            .then(data1 => {
              if (data1.code == 200) {
                self.lists[1].load = false;
                self.lists[1].error = "成功";
              } else {
                self.lists[1].error = data1.message;
              }
              self.lists[2].load = true;
              self
                .getbaseinittopSearchControlPush({})
                .then(data2 => {
                  if (data2.code == 200) {
                    self.lists[2].load = false;
                    self.lists[2].error = "成功";
                  } else {
                    self.lists[2].error = data2.message;
                  }
                  self.lists[3].load = true;
                  self
                    .getbaseinittopSearchControlInit({})
                    .then(data3 => {
                      if (data3.code == 200) {
                        self.lists[3].load = false;
                        self.lists[3].error = "成功";
                      } else {
                        self.lists[3].error = data3.message;
                      }
                        self.lists[4].load = true;
                        self
                          .getbaseinituserClassifyinitUserClassifyRedis({})
                          .then(data4 => {
                            if (data4.code == 200) {
                              self.lists[4].load = false;
                              self.lists[4].error = "成功";
                            } else {
                              self.lists[4].error = data4.message;
                            }
                          })
                          .catch(msg => {
                            self.lists[4].load = false;
                            self.lists[4].error = "服务器异常";
                          });
                          })
                    .catch(msg => {
                      self.lists[3].load = false;
                      self.lists[3].error = "服务器异常";
                    });
                })
                .catch(msg => {
                  self.lists[2].load = false;
                  self.lists[2].error = "服务器异常";
                });
            })
            .catch(msg => {
              self.lists[1].load = false;
              self.lists[1].error = "服务器异常";
            });
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initHealClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitAllDictionaryToRedis({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initFoodClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitRecipesToRedis({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    initFinessClick() {
      var self = this;
      self.lists[0].load = true;
      self
        .getbaseinitinitRedis({})
        .then(data => {
          if (data.code == 200) {
            self.lists[0].load = false;
            self.lists[0].error = "成功";
          } else {
            self.lists[0].error = data.message;
          }
        })
        .catch(msg => {
          self.lists[0].load = false;
          self.lists[0].error = "服务器异常";
        });
    },
    ...mapActions([
      "getbaseinitBannerToRedis",
      "getbaseinitinformation",
      "getbaseinitinitDictionaryRedis",
      "getbaseinitinitAdvantageAreaToRedis",
      "getbaseinitinitBaseDictionaryRedis",
      "getbaseinitinitAreaToRedis",
      "getbaseinitinitHotSearchToRedis",

      "getbaseinitinitDoctorToRedis",
      "getbaseinitinitDoctorGeo",
      "getbaseinitinitHospitalToRedis",
      "getbaseinitinitHospitalGeo",
      "getbaseinitintoHealthAnswerRedis",
      "getbaseinitinitMedicalDictionaryRedis",
      "getbaseinitinitCircleAssortmentToRedis",
      "getbaseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis",
      "getbaseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis",
      "getbaseinitinitCircleMember",
      "getbaseinitinitArticleAuthenticationToRedis",

      "getbaseinitinitAnswersCache",
      "getbaseinitinitQuestionsCache",
      "getbaseinittopSearchControlPush",
      "getbaseinittopSearchControlInit",
      "getbaseinituserClassifyinitUserClassifyRedis",

      "getbaseinitinitAllDictionaryToRedis",

      "getbaseinitinitRecipesToRedis",

      "getbaseinitinitRedis",

      "getbaseinitinitCarefullyChosenToRedis",
      "getbaseinitinitHomeIconToRedis",
      "getbaseinitcouponinitRedis",
      "getbaseinitinnitCustomWater",
      "getbaseinitinnitProductInfo",

      "getbaseinitinitEncourageTasks",

      "getbaseinitinitRoleResources",
      "getbaseinitinitAccount",
      "getbaseinitStaticLogstashDictionaryInitReceive",
      "getbaseinitStaticLogstashDictionaryInitServiceList"
    ])
  }
};
</script>
<style scoped>
/*主页*/
.list-left {
  margin-left: 15px;
}

.list-center {
  margin-left: 25px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-right {
  margin-left: 25px;
  padding-left: 15px;
  padding-right: 15px;
}
.main-but {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.main-but > div {
  cursor: pointer;
  width: 120px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  line-height: 35px;
}
.main-main li {
  width: 100%;
  height: 34px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: 9px;
}
.main-main li:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.main-main {
  width: 100%;
  min-height: 500px;
}
.main-nav .selectNav {
  background-color: #fe5371;
  color: #fff;
}
.main-nav li {
  float: left;
  border: 1px solid #ccc;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 19px;
  border-radius: 4px;
  cursor: pointer;
}
.main-nav {
  width: 100%;
  min-height: 50px;
}
.init {
  width: 100%;
  height: 100%;
}

.init > div:nth-child(1) {
  overflow: hidden;
  width: calc(100% - 72px);
  margin-left: 36px;
}

.init-main {
  margin-top: 15px;
  overflow: hidden;
  min-height: 540px;
  width: 100%;
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
  border: 1px solid #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  color: #fe5371;
  cursor: pointer;
}
</style>