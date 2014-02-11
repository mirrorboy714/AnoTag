"use_strict";
inlets = 2;
outlets = 1;
autowatch = 1;


function anything(){
	
	var list = arrayfromargs(messagename,arguments);
	
	
	var length = list.length;
	
	for(var index = 0 ; index < length ; index++){
			
			outlet(0,list[index]);
	}
}