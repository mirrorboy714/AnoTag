"use_strict";
autowatch = 1;

var message = "";

function anything(){
	
	var tempMessage = arrayfromargs(messagename,arguments).toString();
		
		if( message != tempMessage){
			
			message = tempMessage;
			outlet(0,message);
		}
}
