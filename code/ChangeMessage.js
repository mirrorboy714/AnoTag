"use_strict";
inlets = 1;
outlets = 2;
autowatch = 1;

var _preMessage = "";

/*
function anything(message){
	
	if(_preMessage != message)){
	
		outlet(0,message);
	}
	
	_preMessage = message;
	
}
*/

function anything(){
	
  var mess = arrayfromargs(messagename,arguments);

/*
  post("pre:" + _preMessage);
  post("mess:" + mess);
  post();
*/

  if(_preMessage.toString().indexOf(mess) != 0){
		outlet(0,mess);
  }else
  {
	outlet(1,"bang");
   }

  _preMessage = mess;
}
