// 公共模块
import Vue from 'vue'
const news = {
    // 获取根字典
    BasefindRootDictionary: function BasefindRootDictionary(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加字典
    baseadddictionary: function baseadddictionary(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改字典
    baseupdatedictionary: function baseupdatedictionary(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 检验字典code是否存在
    basecheckCodeIsExist: function basecheckCodeIsExist(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除字典
    basedeldictionary: function basedeldictionary(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据父字典id获取字典及子字典列表接口
    basefindListByParentId: function basefindListByParentId(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询字典详情接口
    basefindDictionaryById: function basefindDictionaryById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据字典id获取字典及子字典列表接口
    basefindDictionaryListById: function basefindDictionaryListById(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //新增/修改banner获取商品列表
    bannerProductList: function bannerProductList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增单页
    cutpageContextadd: function cutpageContextadd(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除单页
    cutpageContextdel: function cutpageContextdel(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改单页
    cutpageContextupdate: function cutpageContextupdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查找单页
    cutpageContextselect: function cutpageContextselect(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询单页分页
    cutpageContextselectPage: function cutpageContextselectPage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增版本
    baseappVersionsave: function baseappVersionsave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除版本
    baseappVersiondelete: function baseappVersiondelete(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改版本
    baseappVersionupdate: function baseappVersionupdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // ID查找版本
    baseappVersionfindOne: function baseappVersionfindOne(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 版本分页
    baseappVersionpage: function baseappVersionpage(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 数据同步接口
    basestaticdatasync: function basestaticdatasync(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据类型获取topic
    basestaticdatagetTopic: function basestaticdatagetTopic(ip, postdata) {
        var ipstr = ip + "?type=" + postdata.type
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化轮播图到redis接口
    baseinitBannerToRedis: function baseinitBannerToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化系统消息
    baseinitinformation: function baseinitinformation(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化所有字典缓存
    baseinitinitDictionaryRedis: function baseinitinitDictionaryRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化领域缓存
    baseinitinitAdvantageAreaToRedis: function baseinitinitAdvantageAreaToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化基础字典缓存
    baseinitinitBaseDictionaryRedis: function baseinitinitBaseDictionaryRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化地区字典到redis
    baseinitinitAreaToRedis: function baseinitinitAreaToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化所有热词到redis
    baseinitinitHotSearchToRedis: function baseinitinitHotSearchToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化日志监控系统接收人缓存
    baseinitStaticLogstashDictionaryInitReceive: function baseinitStaticLogstashDictionaryInitReceive(ip, postdata) {
        var ipstr = ip + "?token=" + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化日志监控系统服务列表缓存
    baseinitStaticLogstashDictionaryInitServiceList: function baseinitStaticLogstashDictionaryInitServiceList(ip, postdata) {
        var ipstr = ip + "?token=" + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医生
    baseinitinitDoctorToRedis: function baseinitinitDoctorToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医生geo
    baseinitinitDoctorGeo: function baseinitinitDoctorGeo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医院
    baseinitinitHospitalToRedis: function baseinitinitHospitalToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医院Geo
    baseinitinitHospitalGeo: function baseinitinitHospitalGeo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化Redis健康回答
    baseinitintoHealthAnswerRedis: function baseinitintoHealthAnswerRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医疗字典到redis
    baseinitinitMedicalDictionaryRedis: function baseinitinitMedicalDictionaryRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化医疗圈子分类
    baseinitinitCircleAssortmentToRedis: function baseinitinitCircleAssortmentToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化疾病和疾病子症状关联
    baseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis: function baseinitinitDiseaseAndDiseaseSubSymptomRelationToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化症状疾病关联和症状子症状
    baseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis: function baseinitinitSymptomSubSymptomRelationAndSymptomDiseaseRelationToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化圈子成员至缓存
    baseinitinitCircleMember: function baseinitinitCircleMember(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化文章认证
    baseinitinitArticleAuthenticationToRedis: function baseinitinitArticleAuthenticationToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-问题回答缓存初始化
    baseinitinitAnswersCache: function baseinitinitAnswersCache(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-问题缓存初始化
    baseinitinitQuestionsCache: function baseinitinitQuestionsCache(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化所有字典到redis
    baseinitinitAllDictionaryToRedis: function baseinitinitAllDictionaryToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化食谱到redis
    baseinitinitRecipesToRedis: function baseinitinitRecipesToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化健身数据到redis
    baseinitinitRedis: function baseinitinitRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化为你精选图到redis
    baseinitinitCarefullyChosenToRedis: function baseinitinitCarefullyChosenToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化所有图标到redis
    baseinitinitHomeIconToRedis: function baseinitinitHomeIconToRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化优惠券到redis
    baseinitcouponinitRedis: function baseinitcouponinitRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-缓存所有可用激励任务
    baseinitinitEncourageTasks: function baseinitinitEncourageTasks(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化角色资源关系到redis
    baseinitinitRoleResources: function baseinitinitRoleResources(ip, postdata) {
        var ipStr = ip + "?token=" + postdata.token
        return Vue.http.get(ipStr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化app用户缓存
    baseinitinitAccount: function baseinitinitAccount(ip, postdata) {
        var ipStr = ip + "?token=" + postdata.token
        return Vue.http.get(ipStr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-热搜初始化
    baseinittopSearchControlPush: function baseinittopSearchControlPush(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-新闻信息初始化
    baseinittopSearchControlInit: function baseinittopSearchControlInit(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-新闻个人分类初始化
    baseinituserClassifyinitUserClassifyRedis: function baseinituserClassifyinitUserClassifyRedis(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化必康定制水
    baseinitinnitCustomWater: function baseinitinnitCustomWater(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 初始化-初始化商品信息
    baseinitinnitProductInfo: function baseinitinnitProductInfo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-添加热门活动
    basehoteventaddHotEvent: function basehoteventaddHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-修改热门活动
    basehoteventeditHotEvent: function basehoteventeditHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-查询热门活动列表
    basehoteventgetHotEvent: function basehoteventgetHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-查询热门活动详情
    basehoteventgetHotEventInfo: function basehoteventgetHotEventInfo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-禁止热门活动
    basehoteventdisableHotEvent: function basehoteventdisableHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-启用热门活动
    basehoteventenableHotEvent: function basehoteventenableHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页活动热门-删除热门活动
    basehoteventdeleteHotEvent: function basehoteventdeleteHotEvent(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-添加首页功能区
    basehomeFunctioncreate: function basehomeFunctioncreate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-修改首页功能区
    basehomeFunctionupdate: function basehomeFunctionupdate(ip, postdata) {
        return Vue.http.put(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-查询首页功能区列表
    basehomeFunctionqueryAll: function basehomeFunctionqueryAll(ip, postdata) {
        var ipstr = ip + "?token=" + postdata.token + "&pageNo=" + postdata.pageNo + "&pageSize=" + postdata.pageSize
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-修改默认配置首页服务
    basehomeFunctionupdateDefault: function basehomeFunctionupdateDefault(ip, postdata) {
        return Vue.http.put(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-首页功能区明细查询
    basehomeFunctionquery: function basehomeFunctionquery(ip, postdata) {
        var ipstr = ip + "?token=" + postdata.token + "&id=" + postdata.id
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-查询默认首页服务列表
    basehomeFunctionqueryDefault: function basehomeFunctionqueryDefault(ip, postdata) {
        var ipstr = ip + "?token=" + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 首页功能区-查询默认首页服务列表
    basehomeFunctionstatus: function basehomeFunctionstatus(ip, postdata) {
        return Vue.http.put(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    }
    // 
}
export default news