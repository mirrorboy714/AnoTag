"use_strict";
inlets = 1;
outlets = 1;
autowatch = 1;

var p = this.patcher;

function clear(){
	
	//this.patcher.apply(clearObj);
	this.patcher.applyif(clearObj,isJs);
}

function test(){

	post("maxclass:" + p.maxclass);
	post();

	clear();

	var message1 = p.newdefault(100,100,"message");
	message1.set("test");

	//get js object
	var jsObj = p.firstobject;
	
	while(jsObj.maxclass != "js"){
		
		jsObj = jsObj.nextobject;
	}
	
	p.connect(message1,0,jsObj,0);

	
	var toggle1 = p.newobject("toggle",0,0,100,100);
	var toggle2 = p.newdefault(p.wind.size[0]*Math.random(),p.wind.size[1]*Math.random(),"toggle");
//	var count1 = patcher.newdefault(144,90,"counter",0,1);
//	var a = patcher.newdefault(122,90,"pack", "rgb", 255, 128, 64);
	toggle1.message("bang");
	
	p.connect(toggle1,0,toggle2,0);
	
	//apply - apply function to all object
	this.patcher.apply(printobj);
//	this.patcher.applydeep(printobj);
}

function clearObj(maxobj)
{	
	post("remove:" + maxobj.maxclass);
	post();

	p.remove(maxobj);
	return true;
}

function isJs(maxobj)
{
	return maxobj.maxclass != "js";	
}

function printobj(a)
{
	
		post(a.maxclass);
		post();
		return true;
}