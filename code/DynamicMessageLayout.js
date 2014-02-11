var messages = new Array();
var messageObjects = new Array();
var p = this.patcher;

function addMessage(message){

	messages.push(message);	
	messageObjects.push(p.newdefault(0,0,"message"));
}