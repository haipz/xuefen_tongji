
function importJquery(){
 var jquery = document.createElement('script');  
jquery.src = "https://code.jquery.com/jquery-3.1.1.min.js";
document.getElementsByTagName('head')[0].appendChild(jquery);    
}

function checkShiJian(){
	var total=jQuery('#DataGrid1.datelist').children().find('tr').length-1
	var sum=0
	for(var i=0;i<total;i++){
	 var obj=jQuery('.datelist').children().children().eq(i+1).children(); 
	 if(obj.eq(4).text()=="实践"){
	 	sum+=parseFloat(obj.eq(6).text())
	 	console.log(obj.eq(0).text()+"-"+obj.eq(1).text()+" "+obj.eq(3).text()+" "+obj.eq(4).text()+" "+obj.eq(6).text())
	 }
	}
	console.log("实践："+sum)
}

function checkBiXiu(){
	var total=jQuery('#DataGrid1.datelist').children().find('tr').length-1
	var sum=0
	for(var i=0;i<total;i++){
	 var obj=jQuery('.datelist').children().children().eq(i+1).children(); 
	 if(obj.eq(4).text().indexOf("必修")>=0){
	 	sum+=parseFloat(obj.eq(6).text())
	 	console.log(obj.eq(0).text()+"-"+obj.eq(1).text()+" "+obj.eq(3).text()+" "+obj.eq(4).text()+" "+obj.eq(6).text())
	 }
	}
	console.log("必修："+sum)
}

function checkRenXuan(){
	var total=jQuery('#DataGrid1.datelist').children().find('tr').length-1
	var sum=0
	for(var i=0;i<total;i++){
	 var obj=jQuery('.datelist').children().children().eq(i+1).children(); 
	 if(obj.eq(4).text().indexOf("任选")>=0){
	 	sum+=parseFloat(obj.eq(6).text())
	 	console.log(obj.eq(0).text()+"-"+obj.eq(1).text()+" "+obj.eq(3).text()+" "+obj.eq(4).text()+" "+obj.eq(6).text())
	 }
	}
	console.log("任选："+sum)
}


function getTotalXueFen(){
	var total=jQuery('#DataGrid1.datelist').children().find('tr').length-1
	var sum=0
	for(var i=0;i<total;i++){
	 var obj=jQuery('.datelist').children().children().eq(i+1).children(); 
	 sum+=parseFloat(obj.eq(6).text())
	}
	console.log("总学分："+sum)
}
// 先粘贴上面的 回车

importJquery()// 然后输入这个 插入jQuery

//最后粘贴下面4个，回车
checkShiJian()
checkRenXuan()
checkBiXiu()
getTotalXueFen()


//点选每个学期都要重新进行上述操作