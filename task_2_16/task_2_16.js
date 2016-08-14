/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city=document.getElementById("aqi-city-input");
var nums=document.getElementById("aqi-value-input");


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var strcity=city.value.trim();
	var aqi=nums.value.trim();
	
	if(!strcity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
		alert("请输入中英文字符");
		return;
	}
	if(!aqi.match(/^\d+$/)){
		alert("请输入整数");
		return;
	}
	aqiData[strcity]=aqi;
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table");
	table.innerHTML = "";
	for(var strcity in aqiData){
		if(table.children.length===0){
			table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
		}
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		var td2=document.createElement("td");
		var td3=document.createElement("td");
		td1.innerHTML=strcity;
		td2.innerHTML=aqiData[strcity];
		td3.innerHTML="<button>删除</button>";
		table.appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
	}	
}
/*上面renderAqiList()代码可以简化为
	var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var strcity in aqiData){
		items += "<tr><td>"+strcity+"</td>"+"<td>"+aqiData[strcity]+"</td><td><button>删除</button></td></tr>"
	}
	document.getElementById("aqi-table").innerHTML=strcity ? items : ""
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
    // do sth.
    var tr=obj.parentNode.parentNode;
	var strcity=tr.children[0].innerHTML;
	delete aqiData[strcity];
	renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	table.addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            delBtnHandle(event.target);
        }
    })
}

init();