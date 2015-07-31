
(function($){

	function NinePM (options) {
		var options = options || {};
		this.objNum = options.objNum || 9;
		this.randomList = [];
		this.template = options.template || "number";
		this.fileType = options.fileType || "jpg";
	} 

	NinePM.prototype = {
		constructor: NinePM,
		getRandom: getRandom,
		setPalaces: setPalaces,
		play9PM: play9PM
	};

	function getRandom (){
    var tmpArr = [],
     		len = 9,
     		randomI;

    for(var i = 0; i < len; i++) {
    	tmpArr[i] = i;
    }

    for(var i = 0; i < len; i++) {
        randomI = Math.floor(Math.random() * (len-i));
        tmpArr.push(tmpArr.splice(randomI, 1)[0]);
    }
    return tmpArr;
	}

	function setPalaces () {
		var _this = this,
				bg_img = "img/bgimg/bg-06s.jpg";

		var getSrc = function (obj, n) {
				return "img/"+ obj.template + "/" + (n+1) + "." + obj.fileType;
		}

		this.randomList = this.getRandom();

		//set random list imgs to palaces
		$(this).find("img").each(function(i){
			var randomI = _this.randomList[i];
			if (randomI >= _this.objNum) {
				this.src = bg_img;
			} else {
				// this.src = "img/"+ _this.template + "/" + (randomI+1) + "." + _this.fileType;
				this.src = getSrc(_this, randomI);
			}
		});				

		//set original list imgs to the selected template
		$(this).parent().find("#template").find("img").each(function(i){
			if (i >= _this.objNum) {
				this.src = bg_img;
			} else {
				// this.src = "img/"+ _this.template + "/" + (i+1) + "." + _this.fileType;
				this.src = getSrc(_this, i);
			}
		});
		return this;
	}


	function play9PM () {

		
	}



	//define plugin
	$.fn.ninePM = function(options){
		this.each(function(){
			var defaultOptions = $.extend({}, $.fn.ninePM.defaults, options);
			NinePM.call(this,defaultOptions);
			jQuery.fn.extend(this, NinePM.prototype );
			this.setPalaces().play9PM();
		});	
		return this;
	};		

	$.fn.ninePM.defaults = {
		objNum: 9,
		// template value:
		// "number", "solar", "poker", "guozhen"
		// "mj-suo","mj-tong","mj-wang", "mj-zi"
		template: "number",  
		fileType: "jpg"
	};





	//---start a new 9PM
 
	var ninePm1 = $("#palaces").ninePM({
		objNum:9, 
		fileType: "png",
		// template:"guozhen"
		// template:"solar"
		// template:"mj-zi"
		// template:"mj-wang"s
	})[0];

	// console.log(ninePm1.randomList);





})(jQuery);



