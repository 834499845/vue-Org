// 娱乐模块
import Vue from 'vue'
const food = {
    // 2.0
    // 食物管理
    // 新增食物数据
    foodFoodAdd: function foodFoodAdd(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 修改食物数据
    foodFoodUpdate: function foodFoodUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除食物数据,并逻辑删除对应食物成分
    foodFoodDelete: function foodFoodDelete(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 分页查询食物数据
    foodFoodFindFoodByPageNoAndPageSize: function foodFoodFindFoodByPageNoAndPageSize(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 食谱管理
    // 新增或修改食谱
    foodRecipesAddOrUpdate: function foodRecipesAddOrUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除食谱
    foodRecipesDelete: function foodRecipesDelete(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 计量单位管理
    // 新增或修改食物计量单位
    foodMeasurementUnitAddOrUpdate: function foodMeasurementUnitAddOrUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除计量单位
    foodMeasurementUnitDelete: function foodMeasurementUnitDelete(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询计量单位
    foodMeasurementUnitSelectAll: function foodMeasurementUnitSelectAll(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 自定义食物
    // 查询自定义食物列表
    foodCustomerFoodSelectCustomerFood: function foodCustomerFoodSelectCustomerFood(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // ************************************************************************
    // 获取食物管理列表
    foodControl: function foodControl(ip, postdata) {
//      var ipstr = ip + '?current=' + postdata.current + '&size=' + postdata.size + '&name=' + postdata.name + '&token=' + postdata.token
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增食物
    foodadd: function foodadd(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑食物
    foodUpdate: function foodUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除食物
    foodremove: function foodremove(ip, postdata) {
        var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传图片
    fooduploadFile: function fooduploadFile(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            // console.log(postdata)
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取食谱管理列表
    RecipesList: function RecipesList(ip, postdata) {
        var ipstr = ip + '?pageNo=' + postdata.pageNo + '&pageSize=' + postdata.pageSize + '&token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 搜索食谱管理列表
    SeekRecipesList: function SeekRecipesList(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //查询食物重量标准
    foodweightStandard: function foodweightStandard(ip, postdata) {
        var ipstr = ip + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 模糊查询食物
    foodFuzzyQuery: function foodFuzzyQuery(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增食谱
    RecipesAdd: function RecipesAdd(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑食谱
    RecipesUpdate: function RecipesUpdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除食谱
    RecipesRemove: function RecipesRemove(ip, postdata) {
        var ipstr = ip + '/' + postdata.id + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取症状关联列表
    AssociatedSymptoms: function AssociatedSymptoms(ip, postdata) {
        var ipstr = ip + '?pageNo=' + postdata.pageNo + '&pageSize=' + postdata.pageSize + '&token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 搜索获取症状关联列表
    SeekAssociatedSymptoms: function SeekAssociatedSymptoms(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 新增症状关联
    AddAssociatedSymptoms: function AddAssociatedSymptoms(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除症状关联
    RemoveAssociatedSymptoms: function RemoveAssociatedSymptoms(ip, postdata) {
        var ipstr = ip + '?id=' + postdata.id + '&token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //修改症状关联
    AmendAssociatedSymptoms: function AmendAssociatedSymptoms(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //查询指标
    IndexQuery: function IndexQuery(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
        //获取所有食物的千卡
    RecipesKcal: function RecipesKcal(ip, postdata) {

        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //按食谱类型查询食谱
    findRecipesByType: function findRecipesByType(ip, postdata) {
        var ipstr = ip + '?token=' + postdata.token
        return Vue.http.get(ipstr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //校验食谱名是否存在
    verifyByName: function verifyByName(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    //商城-系统设置-检索记录
    findSearchData: function findSearchData(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default food