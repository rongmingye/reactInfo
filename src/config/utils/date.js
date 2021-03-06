var date = { 

	// 当前日期
	currentDate: function(timestamp){
		var date = null;
		if(timestamp){
			date = new Date(timestamp);
		}else{
			date = new Date();
		}
		
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
	    var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

	    var currentDate = year + "-" + month + "-" + strDate;

	    return currentDate;
	},

	// 当前时间， 精确到秒
	currentSecond: function(timestamp){
		var date = null;
		if(timestamp){
			date = new Date(timestamp);
		}else{
			date = new Date();
		}

	    var year = date.getFullYear();
	    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
	    var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	    
	    var hour = date.getHours() < 10 ? '0' + date.getHours(): date.getHours();
	    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes();
	    var second = date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds();

	    var currentTime = year + "-" + month + "-" + strDate+ " "
	                    + hour + ":" + minute + ":" + second;

	    return currentTime;
	},

	// 当前时间，精确到分
	currentMinute: function(timestamp){
		var date = null;
		if(timestamp){
			date = new Date(timestamp);
		}else{
			date = new Date();
		}

	    var year = date.getFullYear();
	    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
	    var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	    
	    var hour = date.getHours() < 10 ? '0' + date.getHours(): date.getHours();
	    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes();

	    var currentTime = year + "-" + month + "-" + strDate+ " "
	                    + hour + ":" + minute ;

	    return currentTime;
	}
}

export default date;