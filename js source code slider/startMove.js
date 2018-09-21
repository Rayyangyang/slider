function startMove(obj, json, fn){
	var timer = null;
	// clearInterval(timer);
	clearInterval(obj.timer);
	var speed , iCur;
	obj.timer = setInterval(function (){
		var beStop = true;
		for(var prop in json){
			if(prop == 'opacity'){
				iCur = parseFloat(getStyle(obj, prop)) * 100;
			}else{
				iCur = parseInt(getStyle(obj, prop));
			}
			speed = (json[prop] - iCur) / 7;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(prop == 'opacity'){
				obj.style.opacity = (speed + iCur) / 100;
			}else{
				obj.style[prop] = speed + iCur + 'px';
			}
			if(iCur != json[prop]){
				beStop = false;
			}
		}
		if(beStop){
			clearInterval(obj.timer);
			typeof fn == 'function' ? fn() : ''; 
		}
	},50)


}
function getStyle(obj, attr){
	if(obj.currentstyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj, false)[attr];
	}
}