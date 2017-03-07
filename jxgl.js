function importJquery() {
    var jquery = document.createElement('script');
    jquery.src = "https://code.jquery.com/jquery-3.1.1.min.js";
    document.getElementsByTagName('head')[0].appendChild(jquery);
}

function checkShiJian() {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        if (obj.eq(4).text() == "实践") {
            sum += parseFloat(obj.eq(6).text())
            console.log(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + obj.eq(4).text() + " " + obj.eq(6).text())
        }
    }
    console.log("实践：" + sum)
}

function checkBiXiu() {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        if (obj.eq(4).text().indexOf("必修") >= 0) {
            sum += parseFloat(obj.eq(6).text())
            console.log(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + obj.eq(4).text() + " " + obj.eq(6).text())
        }
    }
    console.log("必修：" + sum)
}

function checkRenXuan() {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        if (obj.eq(4).text().indexOf("任选") >= 0) {
            sum += parseFloat(obj.eq(6).text())
            console.log(obj.eq(0).text() + "-" + obj.eq(1).text() + " " + obj.eq(3).text() + " " + obj.eq(4).text() + " " + obj.eq(6).text())
        }
    }
    console.log("任选：" + sum)
}


function getTotalXueFen() {
    var total = jQuery('#DataGrid1.datelist').children().find('tr').length - 1
    var sum = 0
    for (var i = 0; i < total; i++) {
        var obj = jQuery('.datelist').children().children().eq(i + 1).children();
        sum += parseFloat(obj.eq(6).text())
    }
    console.log("总学分：" + sum)
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
    checkShiJian();
    checkRenXuan()
    checkBiXiu()
    getTotalXueFen()
    console.log("done")
    switchToNextTerm()
}

function installJquery(callback) {
    importJquery()
    console.log("inside installJquery")
    callback("安装jQuery")
}

installJquery(function f(s) {
        console.log(s)
    })
    //先复制以上代码到console 回车执行

//然后再执行doMain()
doMain()

/***
 * 进入大一第一个学期
 * 执行上述操作
 * 当页面刷新后只要按两次键盘向上键，到方法定义代码再回车，然后再按两次向上键回车执行doMain()
 * 到最后一个学期之后 将log保存到本地 在对log文件进行处理即刻 结合sublime和Excel处理一下就行了，easy
 */
