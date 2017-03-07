//获取对象
var $ = function(str){
	if(str[0] == "#"){
		var idName = str.slice(1);
		return document.getElementById(idName);
	}else if(str[0]== "." ){
		var className = str.slice(1);
		if(document.getElementsByClassName){
			return document.getElementsByClassName(className);
		}else{
			var items = document.getElementsByTagName("*");
			var itemsArr = [];
			for(var i = 0; i < items.length; i++){
				var classNames = items[i].className;
				var classArr = classNames.split(" ");
				for(var j = 0; j < classArr.length; j++){
					if(classArr[j]==className){
						itemsArr.push(items[i]);
					}
				}
			}
			return itemsArr;
		}
	}else if(str.indexOf("=") != -1){
		var nameArr = str.split("=");
		var itemsArr = document.getElementsByName(nameArr[1]);
		return itemsArr;
	}else{
		return document.getElementsByTagName(str);
	}
}
var getUntil = {
	/*******************************通过类名获取元素*****************************/
	getByClass: function(cla, obj) {
		obj = obj || document;
		if (obj.getElementsByClassName) { //如果支持该方法，则用该方法获取
			return obj.getElementsByClassName(cla);
		} else { //如果不支持，则用下面的方法
			var arr = []; //用于保存有该类的元素
			var eleArr = []; //用于保存父元素中的所有元素
			eleArr = obj.getElementsByTagName("*");
			for (var i = 0; i < eleArr.length; i++) { //遍历所有元素
				var str = eleArr[i].className; //取得元素类名-->"class1 class2"
				var s = []; //保存所有类名
				s = str.split(" "); //--->["class1","class2"]
				for (var j = 0; j < s.length; j++) { //遍历所有类名
					if (s[j] == cla) { //如果找到规定类名
						arr.push(eleArr[i]); //将该元素存入数组
						break;
					}
				}
			}
		}
		return arr; //返回由有规定class的元素组成的数组
	},
	/*******************************获取元素样式*****************************/
	getStyle: function(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	},
	//获取某对象的第一个元素节点
	getFirst: function(obj) {
		var eles = obj.childNodes;
		for (var i = 0; i < eles.length; i++) {
			if (eles[i].nodeType == 1) {
				return eles[i];

			}
		}
	},
};

//日期对象
var dateUntil = {
	/*********************判断一年是否是闰年*************/
	runNian: function(n) {
		if (n % 4 == 0 && n % 100 != 0 || n % 400 == 0) {
			return true;
		} else {
			return false;
		}
	},
	/*********************格式化日期********************/
	riQi:
	/* 
			console.log(riQi("2016/2/3","--"));
		*/
		function(str1, str2) {
		var obj = new Date(str1);
		var year = obj.getFullYear();
		var month = obj.getMonth() + 1;
		var day = obj.getDate();
		month < 10 ? month = "0" + month : month = month;
		day < 10 ? day = "0" + day : day = day;
		return (year + str2 + month + str2 + day);
	},
	/*********************输出某一年某一月的天数*************/
	tianShu:
	// console.log(tianShu(2016,2));
		function(y, m) {
		var day;
		switch (m) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				n = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				n = 30;
				break;
			case 2:
				if (this.runNian(y)) {
					n = 29;
				} else {
					n = 28;
				}
				break;

		}
		return n;
	},
	/*********************输出两个日期相差几天********************/
	twoDate:
	// console.log(twoDate("2016/8/3","2016/8/4"));
		function(str1, str2) {
		var obj1 = new Date(str1);
		var obj2 = new Date(str2);
		var time1 = obj1.getTime();
		var time2 = obj2.getTime();
		var n = Math.ceil(Math.abs(time1 - time2) / (1000 * 60 * 60 * 24));
		return n;
	},
	/*********************输出某个日期n天后的日期********************/
	nDate:
	/*
			var date=ndate(100,"2016/2/3");
		*/
		function(n, str) {
		var obj = new Date(str);
		var ntime = n * 24 * 60 * 60 * 1000;
		var time = obj.getTime();
		var num = ntime + time;
		var newdate = new Date(num);
		return (newdate);
	}

};

//时间对象
var timeUntil = {
	//小于10时前面加0，返回字符串
	addZero: function(num) {
		num < 10 ? num = "0" + num : num = "" + num;
		return num;
	},
	//两个日期相差多少天，时，分，秒,返回数组
	disTime: function(date1, date2) {
		var dis = Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 1000); //转换成还剩多少秒
		var day = Math.floor(dis / (24 * 60 * 60));
		var hour = Math.floor(dis / (60 * 60) % 24);
		var minute = Math.floor(dis / 60 % 60);
		var second = Math.floor(dis % 60);
		var arr = [this.addZero(day), this.addZero(hour), this.addZero(minute), this.addZero(second)];
		return arr;
	}
};

/************************事件对象*************************/

var eventUntil = { //将实现跨浏览器函数封装在一个对象中
	addEventHandler: function(element, type, handler) { //添加事件函数
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	removeEventHandler: function(element, type, handler) { //移除事件函数
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null; // [] === .
		}
	}
}

/******************************cookie****************************/
var cookieUntil = {
	//添加cookie                                                          
	setCookie: function(name, value, time) {
		//console.log(name,value)
		var date = new Date();
		date.setDate(date.getDate() + time); //设置date的天为现在加上间隔
		document.cookie = name + "=" + value + ";expires=" + date;
	},

	//删除cookie
	removeCookie: function(name) {
		this.setCookie(name, 1, -1); //设置cookie过期，则该条cookie被删除
	},

	//获取cookie的值
	getCookie: function(name) {
		var str = document.cookie;
		var arr = str.split("; "); //分割成 key1=value1; key2=value2; key3=value3 
		for (var i = 0; i < arr.length; i++) { //遍历每个键值对
			var arr1 = arr[i].split("="); //得到存储键值对的数组  [key,value]
			if (arr1[0] == name) { //找到则返回对应的值
				return arr1[1];
			}
		}
		return ""; //找不到，返回空值
	}
};

/********************************AJAX*******************************/
var ajaxUntil = {
		ajax: function(url, successFn, failFn) {
			//声明一个XHR对象
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			xhr.open("GET", url, true); //调用open方法
			xhr.send(); //调用send方法
			xhr.onreadystatechange = function() { //当准备情况改变时触发事件
				if (xhr.readyState == 4) { //当准备情况为完成状态时
					if (xhr.status == 200) { //当返回的状态码为200（成功返回了数据）
						successFn(xhr.responseText); //执行后续操作
					} else if (failFn) {
						failFn(); //接受失败，执行相关操作
					}
				}
			}
		}
	}
	/*********************************运动函数********************************/
function startMove(obj, json, fnCallback) {
	//console.log(json.length);  obj没有length属性
	console.log(json);
	var iSpeed = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for (var attr in json) {
			if (attr == "opacity") {
				var iCur = Math.round(parseFloat(getStyle(obj, attr) * 100));
			} else {
				var iCur = parseFloat(getStyle(obj, attr));
				console.log(iCur);
			}
			iSpeed = json[attr] - iCur > 0 ? Math.ceil((json[attr] - iCur) / 8) : Math.floor((json[attr] - iCur) / 8);
			if (iCur != json[attr]) {
				flag = false;
				if (attr == "opacity") {
					obj.style[attr] = (iCur + iSpeed) / 100;
					obj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
				} else {
					obj.style[attr] = iCur + iSpeed + "px";
				}
			}
		}

		if (flag) {
			clearInterval(obj.timer);
			if (fnCallback) {
				fnCallback();
			}
		}

	}, 30);
}
/*********************************获取样式函数********************************/
function getStyle (obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}