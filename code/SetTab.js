"use_strict";
inlets = 1;
outlets = 1;
autowatch = 1;
 
function tabs(num){

	var tabs = ["tabs"];
	
	for(var index = 0 ; index < num ; index++){
		
			tabs.push("Page " + (index + 1));
	}
	
	outlet(0,tabs);	
}
