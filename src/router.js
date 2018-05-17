export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/financial',
        redirect: '/financial/deal'
    },
    {
        path: '/health/healthFile',
        redirect: '/health/healthFile/personalData'
    },
    {
        path: '/point/getTask',
        redirect: '/point/getTask/fixation'
    },
    {
        // 登录模块
        path: '/login',
        component: function (resolve) {
            require(['./components/login.vue'], resolve)
        }
    },
    {
        path: '/home',
        component: function (resolve) {
            require(['./components/home.vue'], resolve)
        }
    },
    {
        // 后台账户管理模块
        path: '/administrator',
        component: function (resolve) {
            require(['./components/administrator/administrator.vue'], resolve)
        },
        children: [{
            // 账户管理
            path: 'account',
            component: function (resolve) {
                require(['./components/administrator/manage-account/account.vue'], resolve)
            }
        },
        {
            // 资源管理
            path: 'resource',
            component: function (resolve) {
                require(['./components/administrator/manage-resource/resource.vue'], resolve)
            }
        },
        {
            // 角色管理
            path: 'role',
            component: function (resolve) {
                require(['./components/administrator/manage-role/role.vue'], resolve)
            }
        }]
    },
    {
        // 前台账户管理模块
        path: '/clientSide',
        component: function (resolve) {
            require(['./components/clientSide/clientSide.vue'], resolve)
        },
        children: [{
            // 账户管理
            path: 'clientSideAccount',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientSideAccount/clientSideAccount.vue'], resolve)
            }
        },
        {
            // 资源管理
            path: 'clientSideResource',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientSideResource/clientSideResource.vue'], resolve)
            }
        },
        {
            // 角色管理
            path: 'clientSideRole',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientSideRole/clientSideRole.vue'], resolve)
            }
        },
        {
            // 标签管理
            path: 'clientLabel',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientLabel/clientLabel.vue'], resolve)
            }
        },
        {
            // 等级管理
            path: 'clientGrade',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientGrade/clientGrade.vue'], resolve)
            }
        },
        {
            // 账户申诉
            path: 'clientAccountAppeal',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientAccountAppeal/clientAccountAppeal.vue'], resolve)
            }
        },
        {
            // 账户申诉-查看
            path: 'clientSeeDetail',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientAccountAppeal/clientSeeDetail.vue'], resolve)
            }
        },
        {
            // 账户申诉-审核
            path: 'clientApprove',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientAccountAppeal/clientApprove.vue'], resolve)
            }
        },
        {
            // 资料审核
            path: 'clientDataAudit',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientDataAudit/clientDataAudit.vue'], resolve)
            }
        },
        {
            // 资料审核-查看
            path: 'clientLookDetail',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientDataAudit/clientLookDetail.vue'], resolve)
            }
        },
        {
            // 资料审核-审核
            path: 'clientAudit',
            component: function (resolve) {
                require(['./components/clientSide/manage-clientDataAudit/clientAudit.vue'], resolve)
            }
        },
        ]
    },
    {
        // 金融模块
        path: '/financial',
        component: function (resolve) {
            require(['./components/financial/financial.vue'], resolve)
        },
        children: [{
            // 支付管理
            path: 'pay',
            component: function (resolve) {
                require(['./components/financial/manage-pay/pay.vue'], resolve)
            }
        },
        {
            // 城市服务
            path: 'cityservice',
            component: function (resolve) {
                require(['./components/financial/manage-cityservice/cityservice.vue'], resolve)
            }
        },
        {
            // 伯图信用
            path: 'credit',
            component: function (resolve) {
                require(['./components/financial/manage-credit/credit.vue'], resolve)
            }
        },
        {
            // 交易记录
            path: 'deal',
            component: function (resolve) {
                require(['./components/financial/manage-deal/deal.vue'], resolve)
            }
        },
        {
            // 生活缴费
            path: 'fees',
            component: function (resolve) {
                require(['./components/financial/manage-fees/fees.vue'], resolve)
            }
        },
        {
            // 金融产品
            path: 'financialc',
            component: function (resolve) {
                require(['./components/financial/manage-financialc/financialc.vue'], resolve)
            }
        },
        {
            // 医保卡
            path: 'insurance',
            component: function (resolve) {
                require(['./components/financial/manage-insurance/insurance.vue'], resolve)
            }
        }
        ]
    },
    {
        // 积分模块
        path: '/point',
        component: function (resolve) {
            require(['./components/point/point.vue'], resolve)
        },
        children: [
            {
                // 积分设置
                path: 'pointSetting',
                component: function (resolve) {
                    require(['./components/point/pointSetting/pointSetting.vue'], resolve)
                }
            },
            {
                // 积分获取
                path: 'getTask',
                component: function (resolve) {
                    require(['./components/point/getPoint/getTask.vue'], resolve)
                },
                children: [
                    {
                        // 任务获取-固定
                        path: 'fixation',
                        component: function (resolve) {
                            require(['./components/point/getPoint/getTask/fixation.vue'], resolve)
                        },
                    },
                    {
                        // 任务获取-健康
                        path: 'healthy',
                        component: function (resolve) {
                            require(['./components/point/getPoint/getTask/healthy.vue'], resolve)
                        },
                    },
                    {
                        // 任务获取-医疗
                        path: 'medical',
                        component: function (resolve) {
                            require(['./components/point/getPoint/getTask/medical.vue'], resolve)
                        },
                    },
                    {
                        // 任务获取-新闻
                        path: 'news',
                        component: function (resolve) {
                            require(['./components/point/getPoint/getTask/news.vue'], resolve)
                        },
                    },
                    {
                        // 任务获取-健身
                        path: 'fitness',
                        component: function (resolve) {
                            require(['./components/point/getPoint/getTask/fitness.vue'], resolve)
                        },
                    },
                ]
            },
            {
                // 积分统计
                path: 'pointStatistics',
                component: function (resolve) {
                    require(['./components/point/pointStatistics/pointStatistics.vue'], resolve)
                }
            },
            {
                // 积分详情
                path: 'pointDetail',
                component: function (resolve) {
                    require(['./components/point/pointStatistics/pointDetail.vue'], resolve)
                }
            },
            {
                // 勋章管理
                path: 'medel',
                component: function (resolve) {
                    require(['./components/point/medalManeger/medel.vue'], resolve)
                }
            },
            {
                // 新增勋章
                path: 'addMedel',
                component: function (resolve) {
                    require(['./components/point/medalManeger/addMedel.vue'], resolve)
                }
            },
            {
                // 编辑章
                path: 'ucompileMedel',
                component: function (resolve) {
                    require(['./components/point/medalManeger/ucompileMedel.vue'], resolve)
                }
            },
        ]
    },
    {
        // 健康模块
        path: '/health',
        component: function (resolve) {
            require(['./components/health/health.vue'], resolve)
        },
        children: [
            {
                // 用户管理
                path: 'user',
                component: function (resolve) {
                    require(['./components/health/standard-user/user.vue'], resolve)
                },
            },
            {
                // 用户管理详情页面
                path: 'dateilsuser',
                component: function (resolve) {
                    require(['./components/health/standard-user/dateilsuser.vue'], resolve)
                }
            },
            {
                // 健康数据
                path: 'healthData',
                component: function (resolve) {
                    require(['./components/health/standard-user/healthData.vue'], resolve)
                }
            },
            {
                // 健康档案
                path: 'healthFile',
                component: function (resolve) {
                    require(['./components/health/standard-user/healthFile.vue'], resolve)
                },
                children: [
                    {
                        //个人资料
                        path: 'personalData',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/personalData.vue'], resolve)
                        }
                    },
                    {
                        //生活习惯
                        path: 'lifeStyle',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/lifeStyle.vue'], resolve)
                        }
                    },
                    {
                        //专属病例
                        path: 'ExclusiveCase',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/ExclusiveCase.vue'], resolve)
                        }
                    },
                    {
                        //体质检测
                        path: 'PhysicalExamination',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/PhysicalExamination.vue'], resolve)
                        }
                    },
                    {
                        //亚健康检测
                        path: 'sub-healthExamination',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/sub-healthExamination.vue'], resolve)
                        }
                    },
                    {
                        //医学报告
                        path: 'medicalReport',
                        component: function (resolve) {
                            require(['./components/health/standard-user/healthFile/medicalReport.vue'], resolve)
                        }
                    }
                ]
            },
            {
                // 诊疗记录
                path: 'medicalRecord',
                component: function (resolve) {
                    require(['./components/health/standard-user/medicalRecord.vue'], resolve)
                }
            },
            {
                // 基础字典
                path: 'dictionary',
                component: function (resolve) {
                    require(['./components/health/basis-dictionary/dictionary.vue'], resolve)
                }
            },
            {
                // 基础字典
                path: 'addDictionary',
                component: function (resolve) {
                    require(['./components/health/basis-dictionary/addDictionary.vue'], resolve)
                }
            },
            {
                // 健康建议
                path: 'suggest',
                component: function (resolve) {
                    require(['./components/health/health-suggest/suggest.vue'], resolve)
                }
            },
            {
                // 健康检查
                path: 'examination',
                component: function (resolve) {
                    require(['./components/health/standard-examination/examination.vue'], resolve)
                }
            },
            {
                // 添加健康检查
                path: 'addExamination',
                component: function (resolve) {
                    require(['./components/health/standard-examination/addExamination.vue'], resolve)
                }
            },
            {
                // 标准模型
                path: 'standard',
                component: function (resolve) {
                    require(['./components/health/standard-module/standard.vue'], resolve)
                }
            },
            {
                // 添加标准模型
                path: 'addstandard',
                component: function (resolve) {
                    require(['./components/health/standard-module/addstandard.vue'], resolve)
                }
            },
            {
                // 编辑标准模型
                path: 'upstandard',
                component: function (resolve) {
                    require(['./components/health/standard-module/upstandard.vue'], resolve)
                }
            },
        ]
    },
    {
        // 新医疗模块
        path: '/medical',
        component: function (resolve) {
            require(['./components/medical/medical.vue'], resolve)
        },
        children: [{
            // 医院管理
            path: 'hospital',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospital.vue'], resolve)
            }
        },
        {
            // 新增医院管理
            path: 'hospitalAdd',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospitalAdd.vue'], resolve)
            }
        },
        {
            // 编辑医院
            path: 'hospitalEdit',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospitalEdit.vue'], resolve)
            }
        },
        {
            // 医生管理
            path: 'doctor',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctor.vue'], resolve)
            }
        },
        {
            // 新增医生
            path: 'doctorAdd',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorAdd.vue'], resolve)
            }
        },
        {
            // 编辑医生
            path: 'doctorEdit',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorEdit.vue'], resolve)
            }
        },
        {
            // 医生详情
            path: 'doctorDetails',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorDetails.vue'], resolve)
            }
        },
        {
            // 医生诊断详情
            path: 'doctorDiagnose',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorDiagnose.vue'], resolve)
            }
        },
        {
            // 医生审核
            path: 'doctorCheck',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorCheck.vue'], resolve)
            }
        },
        {
            // 药店管理
            path: 'drugstore',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstore.vue'], resolve)
            }
        },
        {
            // 新增药店
            path: 'drugstoreAdd',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstoreAdd.vue'], resolve)
            }
        },
        {
            // 编辑药店
            path: 'drugstoreEdit',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstoreEdit.vue'], resolve)
            }
        },
        {
            // 药物管理
            path: 'drug',
            component: function (resolve) {
                require(['./components/medical/manage-drug/drug.vue'], resolve)
            }
        },
        {
            // 药品推荐
            path: 'drugpush',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpush.vue'], resolve)
            }
        },
        {
            // 新增药品
            path: 'drugpushAdd',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpushAdd.vue'], resolve)
            }
        },
        {
            // 编辑药品
            path: 'drugpushEdit',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpushEdit.vue'], resolve)
            }
        },
        {
            // 疾病管理
            path: 'illness',
            component: function (resolve) {
                require(['./components/medical/manage-illness/illness.vue'], resolve)
            }
        },
        {
            // 新增疾病
            path: 'addillness',
            component: function (resolve) {
                require(['./components/medical/manage-illness/addillness.vue'], resolve)
            }
        },
        {
            // 问答管理
            path: 'questions',
            component: function (resolve) {
                require(['./components/medical/manage-questions/questions.vue'], resolve)
            }
        },
        {
            // 问答详情 
            path: 'answerDetails',
            component: function (resolve) {
                require(['./components/medical/manage-questions/answerDetails.vue'], resolve)
            }
        },
        {
            // 症状管理-人体图
            path: 'symptom',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/symptom.vue'], resolve)
            }
        },
        {
            // 症状管理-列表
            path: 'symptomlist',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/symptomlist.vue'], resolve)
            }
        },
        {
            // 症状管理-新增/编辑
            path: 'addsymptom',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/addsymptom.vue'], resolve)
            }
        },
        {
            // 文章管理
            path: 'article',
            component: function (resolve) {
                require(['./components/medical/manage-article/article.vue'], resolve)
            }
        },
        {
            // 新增文章
            path: 'articleAdd',
            component: function (resolve) {
                require(['./components/medical/manage-article/articleAdd.vue'], resolve)
            }
        },
        {
            // 圈子管理
            path: 'circle',
            component: function (resolve) {
                require(['./components/medical/manage-circle/circle.vue'], resolve)
            }
        },
        {
            // 人物资料
            path: 'figureDatum',
            component: function (resolve) {
                require(['./components/medical/manage-circle/figureDatum.vue'], resolve)
            }
        },
        {
            // 动态列表
            path: 'dynamicState',
            component: function (resolve) {
                require(['./components/medical/manage-circle/dynamicState.vue'], resolve)
            }
        },
        {
            // 动态评论详情
            path: 'remarkOn',
            component: function (resolve) {
                require(['./components/medical/manage-circle/remarkOn.vue'], resolve)
            }
        },
        {
            // 动态评论详情
            path: 'discussDetails',
            component: function (resolve) {
                require(['./components/medical/manage-circle/discussDetails.vue'], resolve)
            }
        },
        ]
    },
    {
        // 新医疗模块
        path: '/medical',
        component: function (resolve) {
            require(['./components/medical/medical.vue'], resolve)
        },
        children: [{
            // 医院管理
            path: 'hospital',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospital.vue'], resolve)
            }
        },
        {
            // 新增医院管理
            path: 'hospitalAdd',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospitalAdd.vue'], resolve)
            }
        },
        {
            // 编辑医院
            path: 'hospitalEdit',
            component: function (resolve) {
                require(['./components/medical/manage-hospital/hospitalEdit.vue'], resolve)
            }
        },
        {
            // 医生管理
            path: 'doctor',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctor.vue'], resolve)
            }
        },
        {
            // 新增医生
            path: 'doctorAdd',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorAdd.vue'], resolve)
            }
        },
        {
            // 编辑医生
            path: 'doctorEdit',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorEdit.vue'], resolve)
            }
        },
        {
            // 医生详情
            path: 'doctorDetails',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorDetails.vue'], resolve)
            }
        },
        {
            // 医生诊断详情
            path: 'doctorDiagnose',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorDiagnose.vue'], resolve)
            }
        },
        {
            // 医生审核
            path: 'doctorCheck',
            component: function (resolve) {
                require(['./components/medical/manage-doctor/doctorCheck.vue'], resolve)
            }
        },
        {
            // 药店管理
            path: 'drugstore',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstore.vue'], resolve)
            }
        },
        {
            // 新增药店
            path: 'drugstoreAdd',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstoreAdd.vue'], resolve)
            }
        },
        {
            // 编辑药店
            path: 'drugstoreEdit',
            component: function (resolve) {
                require(['./components/medical/manage-drugstore/drugstoreEdit.vue'], resolve)
            }
        },
        {
            // 药物管理
            path: 'drug',
            component: function (resolve) {
                require(['./components/medical/manage-drug/drug.vue'], resolve)
            }
        },
        {
            // 药品推荐
            path: 'drugpush',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpush.vue'], resolve)
            }
        },
        {
            // 新增药品
            path: 'drugpushAdd',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpushAdd.vue'], resolve)
            }
        },
        {
            // 编辑药品
            path: 'drugpushEdit',
            component: function (resolve) {
                require(['./components/medical/manage-drugpush/drugpushEdit.vue'], resolve)
            }
        },
        {
            // 疾病管理
            path: 'illness',
            component: function (resolve) {
                require(['./components/medical/manage-illness/illness.vue'], resolve)
            }
        },
        {
            // 新增疾病
            path: 'addillness',
            component: function (resolve) {
                require(['./components/medical/manage-illness/addillness.vue'], resolve)
            }
        },
        {
            // 问答管理
            path: 'questions',
            component: function (resolve) {
                require(['./components/medical/manage-questions/questions.vue'], resolve)
            }
        },
        {
            // 问答详情
            path: 'answerDetails',
            component: function (resolve) {
                require(['./components/medical/manage-questions/answerDetails.vue'], resolve)
            }
        },
        {
            // 症状管理-人体图
            path: 'symptom',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/symptom.vue'], resolve)
            }
        },
        {
            // 症状管理-列表
            path: 'symptomlist',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/symptomlist.vue'], resolve)
            }
        },
        {
            // 症状管理-新增/编辑
            path: 'addsymptom',
            component: function (resolve) {
                require(['./components/medical/manage-symptom/addsymptom.vue'], resolve)
            }
        },
        {
            // 症状自查-人体图
            path: 'symptomCheck',
            component: function (resolve) {
                require(['./components/medical/manage-symptomCheck/symptomCheck.vue'], resolve)
            }
        },
        {
            // 症状自查-列表
            path: 'symptomCheckList',
            component: function (resolve) {
                require(['./components/medical/manage-symptomCheck/symptomCheckList.vue'], resolve)
            }
        },
        {
            // 症状自查-新增/编辑
            path: 'addSymptomCheck',
            component: function (resolve) {
                require(['./components/medical/manage-symptomCheck/addSymptomCheck.vue'], resolve)
            }
        },
        {
            // 圈子分类
            path: 'circleType',
            component: function (resolve) {
                require(['./components/medical/manage-circleType/circleType.vue'], resolve)
            }
        },
        {
            // 热搜管理
            path: 'hotkye',
            component: function (resolve) {
                require(['./components/medical/manage-hotkeys/hotkye.vue'], resolve)
            }
        },
        {
            // 文章管理
            path: 'article',
            component: function (resolve) {
                require(['./components/medical/manage-article/article.vue'], resolve)
            }
        },
        {
            // 新增文章
            path: 'articleAdd',
            component: function (resolve) {
                require(['./components/medical/manage-article/articleAdd.vue'], resolve)
            }
        },
        {
            // 圈子管理
            path: 'circle',
            component: function (resolve) {
                require(['./components/medical/manage-circle/circle.vue'], resolve)
            }
        },
        {
            // 人物资料
            path: 'figureDatum',
            component: function (resolve) {
                require(['./components/medical/manage-circle/figureDatum.vue'], resolve)
            }
        },
        {
            // 动态列表
            path: 'dynamicState',
            component: function (resolve) {
                require(['./components/medical/manage-circle/dynamicState.vue'], resolve)
            }
        },
        {
            // 动态评论详情
            path: 'remarkOn',
            component: function (resolve) {
                require(['./components/medical/manage-circle/remarkOn.vue'], resolve)
            }
        },
        {
            // 动态评论详情
            path: 'discussDetails',
            component: function (resolve) {
                require(['./components/medical/manage-circle/discussDetails.vue'], resolve)
            }
        },
        {
            // 圈主审核
            path: 'circleCheck',
            component: function (resolve) {
                require(['./components/medical/manage-circle/circleCheck.vue'], resolve)
            }
        },
        {
            // 新增药物
            path: 'addMedical',
            component: function (resolve) {
                require(['./components/medical/manage-drug/addMedical.vue'], resolve)
            }
        },
        {
            // 编辑药物
            path: 'compileMedical',
            component: function (resolve) {
                require(['./components/medical/manage-drug/compileMedical.vue'], resolve)
            }
        },
        {
            // 医疗字典
            path: 'medicalDict',
            component: function (resolve) {
                require(['./components/medical/manage-medicalDict/medicalDict.vue'], resolve)
            }
        },
        {
            // 指标与科室
            path: 'target',
            component: function (resolve) {
                require(['./components/medical/manage-target/target.vue'], resolve)
            }
        },
        ]
    },
    {
        // 健身模块
        path: '/fitness',
        component: function (resolve) {
            require(['./components/fitness/fitness.vue'], resolve)
        },
        children: [{
            // 标签管理
            path: 'tally',
            component: function (resolve) {
                require(['./components/fitness/manage-tally/tally.vue'], resolve)
            }
        },
        {
            // 动作管理
            path: 'movement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/movement.vue'], resolve)
            }
        },
        {
            // 动作新增和编辑
            path: 'opMovement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/opMovement.vue'], resolve)
            }
        },
        {
            // 动作查看
            path: 'lookMovement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/lookMovement.vue'], resolve)
            }
        },
        {
            // 首页文案管理
            path: 'homedocuments',
            component: function (resolve) {
                require(['./components/fitness/manage-homedocuments/homedocuments.vue'], resolve)
            }
        },
        {
            // 分享文案管理
            path: 'shoredocuments',
            component: function (resolve) {
                require(['./components/fitness/manage-shoredocuments/shoredocuments.vue'], resolve)
            }
        },
        {
            // 训练管理-查看
            path: 'lookDrill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/lookDrill.vue'], resolve)
            }
        },
        {
            // 训练管理-编辑
            path: 'opDrill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/opDrill.vue'], resolve)
            }
        },
        {
            // 训练管理
            path: 'drill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/drill.vue'], resolve)
            }
        },
        {
            // 部位管理
            path: 'part',
            component: function (resolve) {
                require(['./components/fitness/manage-part/part.vue'], resolve)
            }
        },
        {
            // 课程管理
            path: 'course',
            component: function (resolve) {
                require(['./components/fitness/manage-course/course.vue'], resolve)
            }
        },
        {
            // 课程管理-编辑
            path: 'opCourse',
            component: function (resolve) {
                require(['./components/fitness/manage-course/opCourse.vue'], resolve)
            }
        },
        {
            // 课程管理-查看
            path: 'lookCourse',
            component: function (resolve) {
                require(['./components/fitness/manage-course/lookCourse.vue'], resolve)
            }
        }
        ]
    },
    {
        // 饮食模块
        path: '/recreation',
        component: function (resolve) {
            require(['./components/recreation/recreation.vue'], resolve)
        },
        children: [{
            // 食谱管理
            path: 'recipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/recipe.vue'], resolve)
            }
        },
        {
            // 食物管理
            path: 'food',
            component: function (resolve) {
                require(['./components/recreation/manage-food/food.vue'], resolve)
            }
        },
        {
            // 症状关联
            path: 'associatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/associatedSymptoms.vue'], resolve)
            }
        },
        {
            //计量单位管理
            path: 'unit',
            component: function (resolve) {
                require(['./components/recreation/manage-units/unit.vue'], resolve)
            }
        },
        {
            //刻度尺管理
            path: 'ruler',
            component: function (resolve) {
                require(['./components/recreation/manage-ruler/ruler.vue'], resolve)
            }
        },
        {
            //自定义实物
            path: 'customFood',
            component: function (resolve) {
                require(['./components/recreation/custom-food/customFood.vue'], resolve)
            }
        },
        {
            // 新增关联
            path: 'addAssociatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/addAssociatedSymptoms.vue'], resolve)
            }
        },
        {
            // 编辑关联
            path: 'compileAssociatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/compileAssociated.vue'], resolve)
            }
        },
        {
            // 新增食物
            path: 'addfood',
            component: function (resolve) {
                require(['./components/recreation/manage-food/addFood.vue'], resolve)
            }
        },
        {
            // 编辑食物
            path: 'compilefood',
            component: function (resolve) {
                require(['./components/recreation/manage-food/compileFood.vue'], resolve)
            }
        },
        {
            // 新增食谱
            path: 'addrecipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/addRecipe.vue'], resolve)
            }
        },
        {
            // 编辑食谱
            path: 'compilerecipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/compileRecipe.vue'], resolve)
            }
        }
        ]
    },
    {
        // 公共模块
        path: '/common',
        component: function (resolve) {
            require(['./components/common/common.vue'], resolve)
        },
        children: [
            {
                // 圈主审核
                path: 'circleCheck',
                component: function (resolve) {
                    require(['./components/medical/manage-circle/circleCheck.vue'], resolve)
                }
            },
            {
                // 新增药物
                path: 'addMedical',
                component: function (resolve) {
                    require(['./components/medical/manage-drug/addMedical.vue'], resolve)
                }
            },
            {
                // 编辑药物
                path: 'compileMedical',
                component: function (resolve) {
                    require(['./components/medical/manage-drug/compileMedical.vue'], resolve)
                }
            },
            {
                // 医疗字典
                path: 'medicalDict',
                component: function (resolve) {
                    require(['./components/medical/manage-medicalDict/medicalDict.vue'], resolve)
                }
            },
            {
                // 指标与科室
                path: 'target',
                component: function (resolve) {
                    require(['./components/medical/manage-target/target.vue'], resolve)
                }
            },
        ]
    },
    {
        // 健身模块
        path: '/fitness',
        component: function (resolve) {
            require(['./components/fitness/fitness.vue'], resolve)
        },
        children: [{
            // 标签管理
            path: 'tally',
            component: function (resolve) {
                require(['./components/fitness/manage-tally/tally.vue'], resolve)
            }
        },
        {
            // 动作管理
            path: 'movement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/movement.vue'], resolve)
            }
        },
        {
            // 动作新增和编辑
            path: 'opMovement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/opMovement.vue'], resolve)
            }
        },
        {
            // 动作查看
            path: 'lookMovement',
            component: function (resolve) {
                require(['./components/fitness/manage-movement/lookMovement.vue'], resolve)
            }
        },
        {
            // 首页文案管理
            path: 'homedocuments',
            component: function (resolve) {
                require(['./components/fitness/manage-homedocuments/homedocuments.vue'], resolve)
            }
        },
        {
            // 分享文案管理
            path: 'shoredocuments',
            component: function (resolve) {
                require(['./components/fitness/manage-shoredocuments/shoredocuments.vue'], resolve)
            }
        },
        {
            // 训练详情 - 编辑
            path: 'updateDrill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/updateDrill.vue'], resolve)
            }
        },
        {
            // 训练管理-查看
            path: 'lookDrill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/lookDrill.vue'], resolve)
            }
        },
        {
            // 训练管理-编辑
            path: 'opDrill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/opDrill.vue'], resolve)
            }
        },
        {
            // 训练管理
            path: 'drill',
            component: function (resolve) {
                require(['./components/fitness/manage-drill/drill.vue'], resolve)
            }
        },
        {
            // 部位管理
            path: 'part',
            component: function (resolve) {
                require(['./components/fitness/manage-part/part.vue'], resolve)
            }
        },
        {
            // 课程管理
            path: 'course',
            component: function (resolve) {
                require(['./components/fitness/manage-course/course.vue'], resolve)
            }
        },
        {
            // 课程管理-编辑
            path: 'opCourse',
            component: function (resolve) {
                require(['./components/fitness/manage-course/opCourse.vue'], resolve)
            }
        },
        {
            // 课程管理-查看
            path: 'lookCourse',
            component: function (resolve) {
                require(['./components/fitness/manage-course/lookCourse.vue'], resolve)
            }
        },
        {
            //课程详情 - 编辑
            path: 'updateCourse',
            component: function (resolve) {
                require(['./components/fitness/manage-course/updateCourse.vue'], resolve)
            }
        }
        ]
    },
    {
        // 新闻模块
        path: '/news',
        component: function (resolve) {
            require(['./components/news/news.vue'], resolve)
        },
        children: [
            {
                // 新闻管理
                path: 'newsList',
                component: function (resolve) {
                    require(['./components/news/manage-news/newsList.vue'], resolve)
                }
            },
            {
                //  新闻管理-新增
                path: 'addNews',
                component: function (resolve) {
                    require(['./components/news/manage-news/addNews.vue'], resolve)
                }
            },
            {
                //  新闻管理-编辑
                path: 'editNews',
                component: function (resolve) {
                    require(['./components/news/manage-news/editNews.vue'], resolve)
                }
            },
            {
                //  新闻管理-详情
                path: 'newsdetails',
                component: function (resolve) {
                    require(['./components/news/manage-news/newsdetails.vue'], resolve)
                }
            },
            {
                // 新闻管理-互动数据
                path: 'newsNumber',
                component: function (resolve) {
                    require(['./components/news/manage-news/newsNumber.vue'], resolve)
                }
            },
            {
                // 新闻管理-互动数据-评论回复列表
                path: 'newsReply',
                component: function (resolve) {
                    require(['./components/news/manage-news/newsReply.vue'], resolve)
                }
            },
            {
                // 新闻-动态管理
                path: 'dynamic',
                component: function (resolve) {
                    require(['./components/news/manage-dynamic/dynamic.vue'], resolve)
                }
            },
            {
                // 新闻-动态管理-互动数据
                path: 'dynamicNumber',
                component: function (resolve) {
                    require(['./components/news/manage-dynamic/dynamicNumber.vue'], resolve)
                }
            },
            {
                // 新闻-动态管理-互动数据-评论回复列表
                path: 'dynamicReply',
                component: function (resolve) {
                    require(['./components/news/manage-dynamic/dynamicReply.vue'], resolve)
                }
            },
            {
                // 新闻-小视频管理
                path: 'video',
                component: function (resolve) {
                    require(['./components/news/manage-video/video.vue'], resolve)
                }
            },
            {
                // 新闻-小视频管理-互动数据
                path: 'videoNumber',
                component: function (resolve) {
                    require(['./components/news/manage-video/videoNumber.vue'], resolve)
                }
            },
            {
                // 新闻-问答管理
                path: 'answers',
                component: function (resolve) {
                    require(['./components/news/manage-answers/answers.vue'], resolve)
                }
            },
            {
                // 新闻-问答管理-互动数据
                path: 'answersNumber',
                component: function (resolve) {
                    require(['./components/news/manage-answers/answersNumber.vue'], resolve)
                }
            },
            {
                // 新闻-分类管理
                path: 'types',
                component: function (resolve) {
                    require(['./components/news/manage-type/types.vue'], resolve)
                }
            },
            {
                // 新闻-热搜管理
                path: 'hots',
                component: function (resolve) {
                    require(['./components/news/manage-hots/hots.vue'], resolve)
                }
            },
            {
                // 新闻-审核管理
                path: 'audit',
                component: function (resolve) {
                    require(['./components/news/manage-audit/audit.vue'], resolve)
                }
            },
            {
                // 新闻-审核管理-查看身份证
                path: 'auditCard',
                component: function (resolve) {
                    require(['./components/news/manage-audit/auditCard.vue'], resolve)
                }
            },
            {
                // 新闻-审核管理-查看内容
                path: 'auditContent',
                component: function (resolve) {
                    require(['./components/news/manage-audit/auditContent.vue'], resolve)
                }
            },
            {
                // 新闻-草稿管理
                path: 'draft',
                component: function (resolve) {
                    require(['./components/news/manage-draft/draft.vue'], resolve)
                }
            },
            {
                // 新闻-用户管理
                path: 'user',
                component: function (resolve) {
                    require(['./components/news/manage-user/user.vue'], resolve)
                }
            },
            {
                // 新闻-用户管理-数据列表
                path: 'userNumber',
                component: function (resolve) {
                    require(['./components/news/manage-user/userNumber.vue'], resolve)
                }
            },
            {
                // 新闻-兴趣管理
                path: 'label',
                component: function (resolve) {
                    require(['./components/news/manage-label/label.vue'], resolve)
                }
            },
            {
                // 新闻-作者管理
                path: 'writer',
                component: function (resolve) {
                    require(['./components/news/manage-writer/writer.vue'], resolve)
                }
            },
            {
                // 评论管理
                path: 'comment',
                component: function (resolve) {
                    require(['./components/news/manage-comment/comment.vue'], resolve)
                }
            },
            {
                // 评论详情
                path: 'commentdetail',
                component: function (resolve) {
                    require(['./components/news/manage-comment/commentdetail.vue'], resolve)
                }
            },
        ]
    },
    {
        // 娱乐模块
        path: '/recreation',
        component: function (resolve) {
            require(['./components/recreation/recreation.vue'], resolve)
        },
        children: [{
            // 食谱管理
            path: 'recipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/recipe.vue'], resolve)
            }
        },
        {
            // 食物管理
            path: 'food',
            component: function (resolve) {
                require(['./components/recreation/manage-food/food.vue'], resolve)
            }
        },
        {
            // 症状关联
            path: 'associatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/associatedSymptoms.vue'], resolve)
            }
        },
        {
            // 新增关联
            path: 'addAssociatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/addAssociatedSymptoms.vue'], resolve)
            }
        },
        {
            // 编辑关联
            path: 'compileAssociatedSymptoms',
            component: function (resolve) {
                require(['./components/recreation/associated-symptoms/compileAssociated.vue'], resolve)
            }
        },
        {
            // 新增食物
            path: 'addfood',
            component: function (resolve) {
                require(['./components/recreation/manage-food/addFood.vue'], resolve)
            }
        },
        {
            // 编辑食物
            path: 'compilefood',
            component: function (resolve) {
                require(['./components/recreation/manage-food/compileFood.vue'], resolve)
            }
        },
        {
            // 新增食谱
            path: 'addrecipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/addRecipe.vue'], resolve)
            }
        },
        {
            // 编辑食谱
            path: 'compilerecipe',
            component: function (resolve) {
                require(['./components/recreation/manage-recipe/compileRecipe.vue'], resolve)
            }
        }
        ]
    },
    {
        // 公共模块
        path: '/common',
        component: function (resolve) {
            require(['./components/common/common.vue'], resolve)
        },
        children: [
            {
                // 文件模块
                path: 'file',
                component: function (resolve) {
                    require(['./components/common/manage-file/file.vue'], resolve)
                }
            },
            {
                // 文件详情
                path: 'detailsFile',
                component: function (resolve) {
                    require(['./components/common/manage-file/detailsFile.vue'], resolve)
                }
            },
            {
                // 单页模块
                path: 'cut',
                component: function (resolve) {
                    require(['./components/common/manage-cut/cut.vue'], resolve)
                }
            },
            {
                // 添加单页模块
                path: 'addCut',
                component: function (resolve) {
                    require(['./components/common/manage-cut/addCut.vue'], resolve)
                }
            },
            {
                // 编辑单页模块
                path: 'editCut',
                component: function (resolve) {
                    require(['./components/common/manage-cut/editCut.vue'], resolve)
                }
            },
            {
                // 首页功能区
                path: 'fun',
                component: function (resolve) {
                    require(['./components/common/manage-function/fun.vue'], resolve)
                }
            },
            {
                // 添加首页功能区模块
                path: 'addFun',
                component: function (resolve) {
                    require(['./components/common/manage-function/addFun.vue'], resolve)
                }
            },
            {
                // 编辑首页功能区模块
                path: 'editFun',
                component: function (resolve) {
                    require(['./components/common/manage-function/editFun.vue'], resolve)
                }
            },
            {
                // 查看首页功能区模块
                path: 'lookFun',
                component: function (resolve) {
                    require(['./components/common/manage-function/lookFun.vue'], resolve)
                }
            },
            {
                // 首页活动
                path: 'activity',
                component: function (resolve) {
                    require(['./components/common/manage-activity/activity.vue'], resolve)
                }
            },
            {
                // 添加首页活动
                path: 'addActivity',
                component: function (resolve) {
                    require(['./components/common/manage-activity/addActivity.vue'], resolve)
                }
            },
            {
                // 编辑首页活动
                path: 'editActivity',
                component: function (resolve) {
                    require(['./components/common/manage-activity/editActivity.vue'], resolve)
                }
            },
            {
                // banner模块
                path: 'banner',
                component: function (resolve) {
                    require(['./components/common/manage-banner/banner.vue'], resolve)
                }
            },
            {
                // banner模块新增
                path: 'addBanner',
                component: function (resolve) {
                    require(['./components/common/manage-banner/addBanner.vue'], resolve)
                }
            },
            {
                // banner模块
                path: 'editBanner',
                component: function (resolve) {
                    require(['./components/common/manage-banner/editBanner.vue'], resolve)
                }
            },
            {
                // 基础字典模块
                path: 'basice',
                component: function (resolve) {
                    require(['./components/common/manage-basice/basice.vue'], resolve)
                }
            },
            {
                // 基础字典添加城市
                path: 'addBasecity',
                component: function (resolve) {
                    require(['./components/common/manage-basice/addBasecity.vue'], resolve)
                }
            },
            {
                // 初始化管理
                path: 'init',
                component: function (resolve) {
                    require(['./components/common/manage-init/init.vue'], resolve)
                }
            },
            {
                // 评论模块
                path: 'comment',
                component: function (resolve) {
                    require(['./components/common/manage-comment/comment.vue'], resolve)
                }
            },
            {
                // 版本管理
                path: 'synchronization',
                component: function (resolve) {
                    require(['./components/common/manage-synchronization/synchronization.vue'], resolve)
                }
            },
            {
                // 版本管理
                path: 'versions',
                component: function (resolve) {
                    require(['./components/common/manage-versions/versions.vue'], resolve)
                }
            },
            {
                // 查看版本
                path: 'lookVersions',
                component: function (resolve) {
                    require(['./components/common/manage-versions/lookVersions.vue'], resolve)
                }
            },
            {
                // 操作版本
                path: 'opVersions',
                component: function (resolve) {
                    require(['./components/common/manage-versions/opVersions.vue'], resolve)
                }
            }
        ]
    },
    {
        // 激励系统模块
        path: '/stimulate',
        component: function (resolve) {
            require(['./components/stimulate/stimulate.vue'], resolve)
        },
        children: [{
            // 活动模块
            path: 'activity',
            component: function (resolve) {
                require(['./components/stimulate/manage-activity/activity.vue'], resolve)
            }
        },
        {
            // 新增活动
            path: 'addactivity',
            component: function (resolve) {
                require(['./components/stimulate/manage-activity/addactivity.vue'], resolve)
            }
        },
        {
            // 编辑活动
            path: 'editactivity',
            component: function (resolve) {
                require(['./components/stimulate/manage-activity/editactivity.vue'], resolve)
            }
        }
        ]
    },
    {
        // 商城模块
        path: '/store',
        component: function (resolve) {
            require(['./components/store/store.vue'], resolve)
        },
        children: [{
            // 财务中心
            path: 'finance',
            component: function (resolve) {
                require(['./components/store/center-finance/finance.vue'], resolve)
            }
        },
        {
            // 商品中心
            path: 'commodity',
            component: function (resolve) {
                require(['./components/store/center-commodity/commodity.vue'], resolve)
            },
            children: [{
                // 在售商品
                path: 'sale',
                component: function (resolve) {
                    require(['./components/store/center-commodity/sale.vue'], resolve)
                }
            },
            {
                // 添加商品
                path: 'add',
                component: function (resolve) {
                    require(['./components/store/center-commodity/add.vue'], resolve)
                }
            },
            {
                // 详细描述
                path: 'detail',
                component: function (resolve) {
                    require(['./components/store/center-commodity/detail.vue'], resolve)
                }
            },
            {
                // 商品类目
                path: 'reartype',
                component: function (resolve) {
                    require(['./components/store/center-commodity/reartype.vue'], resolve)
                }
            },
            {
                // 商品后端类目-新建分类
                path: 'reartypeAdd',
                component: function (resolve) {
                    require(['./components/store/center-commodity/reartypeAdd.vue'], resolve)
                }
            },
            {
                // 商品规格
                path: 'standard',
                component: function (resolve) {
                    require(['./components/store/center-commodity/standard.vue'], resolve)
                }
            },
            {
                // 商品规格操作
                path: 'spStandard',
                component: function (resolve) {
                    require(['./components/store/center-commodity/spStandard.vue'], resolve)
                }
            },
            {
                // 商品规格操作
                path: 'opStandard',
                component: function (resolve) {
                    require(['./components/store/center-commodity/opStandard.vue'], resolve)
                }
            },
            {
                // 商品品牌
                path: 'brand',
                component: function (resolve) {
                    require(['./components/store/center-commodity/brand.vue'], resolve)
                }
            },
            {
                // 商品回收站
                path: 'recycle',
                component: function (resolve) {
                    require(['./components/store/center-commodity/recycle.vue'], resolve)
                }
            },
            {
                // 降价通知
                path: 'depreciate',
                component: function (resolve) {
                    require(['./components/store/center-commodity/depreciate.vue'], resolve)
                }
            },
            {
                // 新增品牌
                path: 'addBrand',
                component: function (resolve) {
                    require(['./components/store/center-commodity/addBrand.vue'], resolve)
                }
            }
            ]
        },
        {
            // 库存中心
            path: 'inventory',
            component: function (resolve) {
                require(['./components/store/center-inventory/inventory.vue'], resolve)
            }
        },
        {
            // 编辑库存中心
            path: 'editinventory',
            component: function (resolve) {
                require(['./components/store/center-inventory/editinventory.vue'], resolve)
            }
        },
        {
            // 物流中心
            path: 'logistics',
            component: function (resolve) {
                require(['./components/store/center-logistics/logistics.vue'], resolve)
            }
        },
        {
            // 新增项
            path: 'addLogistics',
            component: function (resolve) {
                require(['./components/store/center-logistics/addLogistics.vue'], resolve)
            }
        },
        {
            // 编辑
            path: 'compileLogistics',
            component: function (resolve) {
                require(['./components/store/center-logistics/compileLogistics.vue'], resolve)
            }
        },
        {
            // 营销中心
            path: 'marketing',
            component: function (resolve) {
                require(['./components/store/center-marketing/marketing.vue'], resolve)
            },
            children: [{
                // 优惠券
                path: 'packet',
                component: function (resolve) {
                    require(['./components/store/center-marketing/packet.vue'], resolve)
                }
            },
            {
                // 编辑优惠券
                path: 'operatePacket',
                component: function (resolve) {
                    require(['./components/store/center-marketing/operatePacket.vue'], resolve)
                }
            },
            {
                // 查看优惠券
                path: 'lookPacket',
                component: function (resolve) {
                    require(['./components/store/center-marketing/lookPacket.vue'], resolve)
                }
            }
            ]
        },
        {
            // 运营中心
            path: 'operation',
            component: function (resolve) {
                require(['./components/store/center-operation/operation.vue'], resolve)
            }
        },
        {
            // 小图标编辑
            path: 'navOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/navOperation.vue'], resolve)
            }
        },
        {
            // 新增新品
            path: 'xpchoicenessOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/xpchoicenessOperation.vue'], resolve)
            }
        },
        {
            // 新品首发和为你精选
            path: 'xpOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/xpOperation.vue'], resolve)
            }
        },
        {
            // 新品首发和为你精选
            path: 'xpConjOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/xpConjOperation.vue'], resolve)
            }
        },
        {
            // 为你精选图标编辑
            path: 'choicenessOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/choicenessOperation.vue'], resolve)
            }
        },
        {
            // 为你精选图标展示删除
            path: 'delchoicenessOperation',
            component: function (resolve) {
                require(['./components/store/center-operation/delchoicenessOperation.vue'], resolve)
            }
        },
        {
            // 订单中心
            path: 'order',
            component: function (resolve) {
                require(['./components/store/center-order/order.vue'], resolve)
            },
            children: [{
                // 退货原因列表
                path: 'cause',
                component: function (resolve) {
                    require(['./components/store/center-order/cause.vue'], resolve)
                }
            },
            {
                // 查看订单
                path: 'orderReview',
                component: function (resolve) {
                    require(['./components/store/center-order/orderReview.vue'], resolve)
                }
            },
            {
                // 打印订单
                path: 'printOrder',
                component: function (resolve) {
                    require(['./components/store/center-order/printOrder.vue'], resolve)
                }
            },
            {
                // 发货单列表
                path: 'dispatch',
                component: function (resolve) {
                    require(['./components/store/center-order/dispatch.vue'], resolve)
                }
            },
            {
                // 退换货列表
                path: 'exchange',
                component: function (resolve) {
                    require(['./components/store/center-order/exchange.vue'], resolve)
                }
            },
            {
                // 订单列表
                path: 'list',
                component: function (resolve) {
                    require(['./components/store/center-order/list.vue'], resolve)
                }
            },
            {
                // 订单日志
                path: 'operate',
                component: function (resolve) {
                    require(['./components/store/center-order/operate.vue'], resolve)
                }
            },
            {
                // 订单打印格式
                path: 'stamp',
                component: function (resolve) {
                    require(['./components/store/center-order/stamp.vue'], resolve)
                }
            }
            ]
        },
        {
            // 支付中心
            path: 'payment',
            component: function (resolve) {
                require(['./components/store/center-payment/payment.vue'], resolve)
            }
        },
        {
            // 评价管理
            path: 'evaluate',
            component: function (resolve) {
                require(['./components/store/manage-evaluate/evaluate.vue'], resolve)
            }
        },
        {
            // 系统设置
            path: 'system',
            component: function (resolve) {
                require(['./components/store/setting-system/system.vue'], resolve)
            },
            children: [
                {
                    // 商城设置
                    path: 'components',
                    component: function (resolve) {
                        require(['./components/store/setting-system/components.vue'], resolve)
                    }
                },
                {
                    // 指定配送时间
                    path: 'distribution',
                    component: function (resolve) {
                        require(['./components/store/setting-system/distribution.vue'], resolve)
                    }
                },
                {
                    // 热词搜索
                    path: 'hotword',
                    component: function (resolve) {
                        require(['./components/store/setting-system/hotword.vue'], resolve)
                    }
                },
                {
                    // 地区列表
                    path: 'region',
                    component: function (resolve) {
                        require(['./components/store/setting-system/region.vue'], resolve)
                    }
                },
                {
                    // 用户检索记录
                    path: 'searching',
                    component: function (resolve) {
                        require(['./components/store/setting-system/searching.vue'], resolve)
                    }
                }
            ]
        }
        ]
    },
    {
        // 健身2.0
        path: '/fitness2',
        component: function (resolve) {
            require(['./components/fitness2/fitness2.vue'], resolve)
        },
        children: [
            {
                // 健身首页
                path: 'home',
                component: function (resolve) {
                    require(['./components/fitness2/manage-home/home.vue'], resolve)
                }
            },
            {
                // 训练管理
                path: 'drill',
                component: function (resolve) {
                    require(['./components/fitness2/manage-drill/drill.vue'], resolve)
                }
            },
            {
                // 课程管理
                path: 'plan',
                component: function (resolve) {
                    require(['./components/fitness2/manage-plan/plan.vue'], resolve)
                }
            },
            {
                // 动作管理
                path: 'movement',
                component: function (resolve) {
                    require(['./components/fitness2/manage-movement/movement.vue'], resolve)
                }
            },
            {
                // 维度标签
                path: 'label',
                component: function (resolve) {
                    require(['./components/fitness2/manage-label/label.vue'], resolve)
                }
            },
            {
                // 动态管理
                path: 'dynamic',
                component: function (resolve) {
                    require(['./components/fitness2/manage-dynamic/dynamic.vue'], resolve)
                }
            },
            {
                // 路线管理
                path: 'course',
                component: function (resolve) {
                    require(['./components/fitness2/manage-course/course.vue'], resolve)
                }
            },
            {
                // 训练营管理
                path: 'training',
                component: function (resolve) {
                    require(['./components/fitness2/manage-training/training.vue'], resolve)
                }
            },
            {
                // 用户管理
                path: 'user',
                component: function (resolve) {
                    require(['./components/fitness2/manage-user/user.vue'], resolve)
                }
            }
        ]
    },
    {
        path: '*',
        component: function (resolve) {
            require(['./components/error.vue'], resolve)
        }
    },

]
