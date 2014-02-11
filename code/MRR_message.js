"use_strict";
autowatch = 1;
outlets = 2;

var mess = "";

function clear(){

		mess = "";
}

function is(){

		if(mess == ""){
		
			outlet(1,0);
		}else{
			outlet(1,1);
		}
}

function anything(){
	
		mess = arrayfromargs(messagename,arguments);
}

function bang(){
	
		if(mess != "")
			outlet(0,mess);
}

function postMessage(){

		post(mess);
}