var firstTerm = "2013-2014-1" // 设置第一学期
var lastTerm = "2016-2017-2" // 设置最后一个学期

// 因为不确定哪些是A类哪些B类以及哪些是C类 这里可以自定义实践课什么的  必修和课外必修区别开来了不用担心
var typeList = [
    "实践",
    "学科必修",
    "公共必修",
    "专业必修",
    "校定必修",
    "任选", // 包括专业任选和校公选课
    "限选",
    "课外必修"
]

var finalSum = {}

function importJquery() {
    var jquery = document.createElement('script');
    jquery.src = "https://code.jquery.com/jquery-3.1.1.min.js";
    document.getElementsByTagName('head')[0].appendChild(jquery);
}

function generateName() {
    var yearNow = jQuery('#ddlxn>option:checked').text()
    var termNow = $('#ddlxq').val()
    return yearNow + "-" + termNow
}

function saveIntoLocalStorage(str) {
    console.log(str)
    var oldStr = localStorage.getItem(generateName())
    if (oldStr != null) {
        localStorage.setItem(generateName(), oldStr + ";" + str)
    } else {
        localStorage.setItem(generateName(), str)
    }
}

function saveKeysIntoLocalStorage(key) {
    var oldStr = localStorage.getItem('keyList')
    if (oldStr != null) {
        localStorage.setItem('keyList', oldStr + ";" + key)
    } else {
        localStorage.setItem('keyList', key)
    }
}

function getKeyListFromLocalStorage() {
    var keyListStr = localStorage.getItem('keyList')
    var keyList = keyListStr.split(';')
    return keyList
}

function printDateFromLocalStorage() {
    finalSum = {}
    for (var idx in typeList) {
        finalSum[typeList[idx]] = 0
    }
    finalSum["总学分"] = 0
    keyList = getKeyListFromLocalStorage()
    for (var key in keyList) {
        var value = keyList[key]
        var termInfo = localStorage.getItem(value).split(';')
        console.log("\n学期:" + value)
        for (var infoIndex in termInfo) {
            var info = termInfo[infoIndex]
            console.log(info)
            for (var sumKey in finalSum) {
                var sumVal = finalSum[sumKey]
                var findKey = sumKey + '：'
                if (findKey == "必修") {
                    if (info.indexOf(findKey) >= 0 && info.indexOf("课外必修：") < 0) {
                        sumVal += parseFloat(info.substring(info.indexOf(findKey) + findKey.length))
                        finalSum[sumKey] = sumVal
                    }
                } else {
                    if (info.indexOf(findKey) >= 0) {
                        sumVal += parseFloat(info.substring(info.indexOf(findKey) + findKey.length))
                        finalSum[sumKey] = sumVal
                    }
                }
            }
        }
    }

    console.log("\n\n ==============↓Result:↓==============")
    console.log(JSON.stringify(finalSum))
    console.log("剔除课外必修后的总学分：" + (finalSum["总学分"] - finalSum["课外必修"]))
}


function dealWityDiffType(strType) {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        var courseNature = obj.eq(4).text()
        var courseType = obj.eq(5).text()
        if (typeof(courseType) == "undefined") {
            courseType = ""
        }
        if (strType == "必修") {
            if ((courseType.indexOf(strType) >= 0 || courseNature.indexOf(strType) >= 0) && courseNature.indexOf("课外必修") < 0) {
                sum += parseFloat(obj.eq(6).text())
                saveIntoLocalStorage(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + courseNature + " " + courseType + " " + obj.eq(6).text())
            }
        } else if (strType == "任选") {
            if ((courseType.indexOf(strType) >= 0 || courseNature.indexOf(strType) >= 0) || (courseType.indexOf("公选") >= 0 || courseNature.indexOf("公选") >= 0)) {
                sum += parseFloat(obj.eq(6).text())
                if (courseType.indexOf('公选') >= 0) {
                    courseType += "[任选]"
                }
                saveIntoLocalStorage(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + courseNature + " " + courseType + " " + obj.eq(6).text())
            }
        } else {
            if (courseNature.indexOf(strType) >= 0 || courseType.indexOf(strType) >= 0) {
                sum += parseFloat(obj.eq(6).text())
                saveIntoLocalStorage(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + courseNature + " " + courseType + " " + obj.eq(6).text())
            }
        }
    }
    saveIntoLocalStorage("==============↑" + strType + "↑==============")
    return strType + "：" + sum
}

function getAll() {
    var sumList = []
    for (var idx in typeList) {
        sumList[idx] = dealWityDiffType(typeList[idx])
    }
    for (var idx in sumList) {
        saveIntoLocalStorage(sumList[idx])
    }
}


function getTotalXueFen() {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        sum += parseFloat(obj.eq(6).text())
    }
    saveIntoLocalStorage("总学分：" + sum)
}

function switchToNextTerm() {
    var yearNow = jQuery('#ddlxn>option:checked').index()
    var termNow = $('#ddlxq').val()
    console.log("now:" + jQuery('#ddlxn>option:checked').text() + "第" + termNow + "学期")
    if (termNow == '2') {
        jQuery('#ddlxn').children()[yearNow + 1].selected = true
        $('#ddlxq').val(1)
    } else {
        $('#ddlxq').val(2)
    }
    $('#btnCx').click()
}

function doMain() {
    if (firstTerm == generateName()) {
        localStorage.clear()
        console.log("第一学期开始,清空本地缓存")
    }

    saveKeysIntoLocalStorage(generateName())
    getAll()
    getTotalXueFen()
    console.log("done")

    if (lastTerm == generateName()) {
        printDateFromLocalStorage()
    } else {
        switchToNextTerm()
    }

}

function installJquery(callback) {
    importJquery()
    console.log("inside installJquery")
    callback("安装jQuery")
}

installJquery(function f(s) {
        console.log(s)
        console.log("outside installJquery")
    })
    //先复制以上代码到console 回车执行

//然后再执行doMain()
doMain()

/***
 * 修改最上方开始学期和结束学期（13届就不用改了）
 * 先进入大一第一个学期
 * 执行上述操作
 * 当页面刷新后只要按两次键盘向上键，到方法定义代码再回车，然后再按两次向上键回车执行doMain()
 * 到最后一个学期之后 自动输出学分统计信息
 * eg.{"实践：":21,"必修：":98.5,"任选：":21,"限选：":21,"课外必修：":7.5}
 */
