// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
require("../API/config.js");
module.exports = {
    // production 环境
    build: {
        // 使用 prod.env 中定义的编译环境
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        // 编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或CDN域名
        assetsPublicPath: '/',
        // 是否开启 gzip
        productionGzip: false,
        // 需要使用 gsip 压缩的文件扩展名
        productionGzipExtensions: ['js', 'css']
    },
    // dev环境
    dev: {
        // 使用 dev.env 中定义的编译环境
        env: require('./dev.env'),
        // 进行测试页面的端口
        port: 7000,
        // 编译 输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布线上的根目录 可以自定义
        assetsPublicPath: '/',
        proxyTable: {
            // 2.0-------------------------
            // ****************************饮食管理*****************************
            // 食物管理
            '/V2.0.0/food': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            // 食谱管理
            '/V2.0.0/recipes': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            // 计量单位管理
            '/V2.0.0/measurementUnit': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            // 自定义食物
            '/V2.0.0/customerFood': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            // ****************************积分管理*****************************
            // 积分设置
            '/V2.0.0/integralSign': {
                target: global.httpStr + global.pointIp + "/" + global.pointPort,
                changeOrigin: true
            },
            // 积分获取
            '/V2.0.0/integralConfigAttr': {
                target: global.httpStr + global.pointIp + "/" + global.pointPort,
                changeOrigin: true
            },
            // 积分统计
            '/V2.0.0/integralUser': {
                target: global.httpStr + global.pointIp + "/" + global.pointPort,
                changeOrigin: true
            },
            // 勋章管理
            '/V2.0.0/integralMedal': {
                target: global.httpStr + global.pointIp + "/" + global.pointPort,
                changeOrigin: true
            },
            // 前台管理
            // 分页查询用户管理列表
            '/V2.0.0/account': {
                target: global.httpStr + global.clientSideIp + "/" + global.clientSidePort,
                changeOrigin: true
            },
            // 资料审核
            '/V2.0.0/identityAudit': {
                target: global.httpStr + global.clientSideIp + "/" + global.clientSidePort,
                changeOrigin: true
            },
            // 账号申诉
            '/V2.0.0/appeal': {
                target: global.httpStr + global.clientSideIp + "/" + global.clientSidePort,
                changeOrigin: true
            },
            // 医生管理
            '/V2.0.0/medicalDictionary/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V2.0.0/doctor/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 症状自查
            '/V2.0.0/symptomPosition/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 疾病管理
            '/V2.0.0/disease/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 用药管理
            '/V2.0.0/homeDrugRecommend/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 圈子管理
            '/V2.0.0/medicalDictionary/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V2.0.0/circle/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 圈子分类
            '/V2.0.0/circleAssortment/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 热词管理
            '/V2.0.0/hotSearch/': {
                target: global.httpStr + global.hospitalSearchIp + "/" + global.hospitalSearchPort,
                changeOrigin: true
            },
            // 2.0健康模块
            // 查询健康档案信息
            '/V2.0.0/healthRecords/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            // 数据同步
            '/V1.0.0/static/data': {
                target: global.httpStr + global.dataIp + ":" + global.dataPort,
                changeOrigin: true
            },
            // 初始化系统消息
            '/V2.0.0/information': {
                target: global.httpStr + global.informationIp + "/" + global.informationPort,
                changeOrigin: true
            },
            // 初始化-初始化圈子成员至缓存
            '/V2.0.0/circleMember': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 初始化-新闻模块
            '/V2.0.0/questionsController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 初始化-新闻个人分类初始化
            '/V2.0.0/userClassify': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 初始化-初始化健身数据
            '/V1.0.0/init': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 首页热门活动
            '/V2.0.0/web/hot-event': {
                target: global.httpStr + global.logHeadltCityIp + "/" + global.headltCityPort,
                changeOrigin: true
            },
            // 首页功能区
            '/V2.0.0/homeFunction': {
                target: global.httpStr + global.logHeadltCityIp + "/" + global.headltCityPort,
                changeOrigin: true
            },
            // 1.0---------------------------------------------------
            // 登录模块
            // '/V1.0.0/static/account': {
            //     target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
            //     changeOrigin: true,
            //     secure: false,
            //     headers: {
            //         Referer: global.httpStr + global.logAccountIp + "/" + global.adminPort,
            //     }
            // },
            // 账户模块
            '/V1.0.0/static/account': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/account/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/accountRole/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/role/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/roleResource/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/resource/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/accountRole/': {
                target: global.httpStr + global.logAccountIp + "/" + global.adminPort,
                changeOrigin: true
            },
            '/V1.0.0/user-health-data/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/userinfo/': {
                target: global.httpStr + global.logHeadltUserIp + "/" + global.headltUserPort,
                changeOrigin: true
            },
            // 字典模块
            '/V1.0.0/dictionary/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/base/dictionary/': {
                target: global.httpStr + global.logHeadltCityIp + "/" + global.headltCityPort,
                changeOrigin: true
            },
            '/V1.0.0/bodyCheckRule/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/standard-data/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/index-tip/': {
                target: global.httpStr + global.logHeadltIp + "/" + global.headltPort,
                changeOrigin: true
            },
            '/V1.0.0/topSearchControl': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            '/V1.0.0/newsControl': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            '/zuul/file-service-file-upload': {
                target: global.httpStr + global.upBigloadIp + "/" + global.upBigloadPort,
                changeOrigin: true
            },
            // //文件上传
            // '/V1.0.0/api/file/upload': {
            //     target: global.httpStr + global.uploadIp + "/" + global.uploadPort,
            //     changeOrigin: true
            // },
            '/V1.0.0/api/file/upload': {
                target: global.httpStr + global.uploadIp + "/" + global.uploadPort,
                changeOrigin: true
            },
            

            '/V1.0.0/classiflyControl': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 激励模块
            '/V1.0.0/encourage': {
                target: global.httpStr + global.encourageIp + "/" + global.encouragePort,
                changeOrigin: true
            },
            // '/v1.0.0/homePage': {
            //     target: global.httpStr + global.encourageIp + "/" + global.encouragePort,
            //     changeOrigin: true
            // },
            '/V1.0.0/banner': {
                target: global.httpStr + global.encouragebannerIp + "/" + global.encouragebannerPort,
                changeOrigin: true
            },
            // 金融模块
            '/V1.0.0/wallet': {
                target: global.httpStr + global.financialIp + "/" + global.financialPort,
                changeOrigin: true
            },
            // 饮食模块
            '/V1.0.0/food': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/indexRecipes': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/recipes': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/dictionary': {
                target: global.httpStr + global.foodIp + "/" + global.foodPort,
                changeOrigin: true
            },
            '/V1.0.0/searchStatistics': {
                target: global.httpStr + global.foodsIp + "/" + global.foodsPort,
                changeOrigin: true
            },
            // 商城模块
            // 降价通知
            '/V1.0.0/NoticeOfReductionController': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            // 品牌管理
            '/V1.0.0/brand': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            // 库存管理
            '/V1.0.0/productRepertory': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            // 商品分类
            '/V0.0.1/classfication': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            //库存下商城删除
            '/V1.0.0/product': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            // 商城删除--优惠券
            '/V1.0.0/coupon': {
                target: global.httpStr + global.storecouponIp + "/" + global.storecouponPort,
                changeOrigin: true
            },
            // 商城--商品规格
            '/V0.0.1/classAttribute': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            '/V0.0.1/classAttributeItem': {
                target: global.httpStr + global.storeIp + "/" + global.storePort,
                changeOrigin: true
            },
            // 商城-支付中心-列表
            '/V1.0.0/paymentCenter': {
                target: global.httpStr + global.financialIp + "/" + global.financialPort,
                changeOrigin: true
            },
            // 商城-物流管理-列表
            '/V1.0.0/logisticsCenter': {
                target: global.httpStr + global.logisticsIp + "/" + global.logisticsPort,
                changeOrigin: true
            },
            // 商城--订单中心
            '/V1.0.0/goodsOrder': {
                target: global.httpStr + global.storegoodsOrderIp + "/" + global.storegoodsOrderPort,
                changeOrigin: true
            },
            // 商城--模板编辑
            '/V1.0.0/homePage': {
                target: global.httpStr + global.storeoperationIp + "/" + global.storeoperationPort,
                changeOrigin: true
            },
            // 商城删除--模板编辑
            '/V1.0.0/api/homeIcon': {
                target: global.httpStr + global.storeoperationIp + "/" + global.storeoperationPort,
                changeOrigin: true
            },
            // 公共模块--单页管理
            '/V1.0.0/pageContext': {
                target: global.httpStr + global.logHeadltCityIp + "/" + global.headltCityPort,
                changeOrigin: true
            },
            // 公共模块--版本管理
            '/V1.0.0/base/appVersion': {
                target: global.httpStr + global.logHeadltCityIp + "/" + global.headltCityPort,
                changeOrigin: true
            },
            // 公共模块-初始化管理-全局组件
            '/V1.0.0/static/logstash/dictionary': {
                target: global.httpStr + global.logMonitoringIp + "/" + global.logMonitoringPort,
                changeOrigin: true
            },
            // 商城-系统设置-模板编辑
            '/V1.0.0/hotSearch': {
                target: global.httpStr + global.storehotSearchIp + "/" + global.storehotSearchPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/LabellController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/SiteController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/ActionController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/TrainActionController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/TrainController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/CourseController': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            // 健身模块
            '/V1.0.0/slogan': {
                target: global.httpStr + global.fitnessIp + "/" + global.fitnessPort,
                changeOrigin: true
            },
            //医疗模块
            //动态/评论
            '/V1.0.0/commentsInfo': {
                target: global.httpStr + global.newsCommenIp + "/" + global.newsCommenPort,
                changeOrigin: true
            },
            //评论
            '/V1.0.0/replyInfo': {
                target: global.httpStr + global.newsCommenIp + "/" + global.newsCommenPort,
                changeOrigin: true
            },
            //医院
            '/V1.0.0/hospital/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/doctor/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/doctor-word/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //药店管理
            '/V1.0.0/drugstore/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //药品推荐
            '/V1.0.0/homeDrugRecommend/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //疾病管理
            '/V1.0.0/disease/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //症状管理
            '/V1.0.0/symptomPosition/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/medicalDictionary/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            '/V1.0.0/Advertising/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //问答管理
            '/V1.0.0/healthQuestion/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //问答管理-评论详情
            '/V1.0.0/healthAnswer/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //文章管理
            '/V1.0.0/article/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //药物管理
            '/V1.0.0/drug/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //圈子管理-分页
            '/V1.0.0/circle/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //圈子管理-动态分页
            '/V1.0.0/dynamic/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            //指标与科室-分页
            '/V1.0.0/indexDepartment/': {
                target: global.httpStr + global.hospitalIp + "/" + global.hospitalPort,
                changeOrigin: true
            },
            // 新闻2.0 模块************************************************************
            //  新闻管理
            '/V2.0.0/newsController/': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 标签管理
            '/V2.0.0/labelController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            //小视频管理
            '/V2.0.0/video/': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 赞赏记录
            '/V2.0.0/appreciate-log': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 作者管理
            '/V2.0.0/newsAuthorController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 草稿管理
            '/V2.0.0/draftsController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            //问答管理
            '/V2.0.0/questionsController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            //问答管理-查询问答互动数据信息
            '/V2.0.0/newsSummaryController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 审核管理
            '/V2.0.0/userPermissionController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 审核详情
            '/V2.0.0/userSummaryController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 用户管理
            '/V2.0.0/userSummaryController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            },
            // 互动数据
            '/V2.0.0/answersController': {
                target: global.httpStr + global.newsIp + "/" + global.newsPort,
                changeOrigin: true
            }
        },
        // 是否开启 cssSourceMap
        cssSourceMap: false
    }
}