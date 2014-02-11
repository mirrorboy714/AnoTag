autowatch = 1;
inlets = 1;
outlets = 2;

var folderList = [];
var MAX_SIZE = 64;
var pageNum = 0;

function tabs(){
	
	folderList = arrayfromargs(messagename,arguments);
	folderList = folderList.slice(1,folderList.length)
	
	pageNum = folderList.length / MAX_SIZE;
		
	var pageTab = ["tabs"];
	for(var index = 0 ; index < pageNum ; index++){
		
		pageTab.push("Page " + (index+1));
	}
	
	outlet(1,pageTab);
	
}

function getFileTab(index){
	
	if(index < pageNum){
		
		var start = MAX_SIZE*index;
		var end = MAX_SIZE*(index+1) + 1;
		
		if(end > folderList.length){
			end = folderList.length;
		}
		
		outlet(0,"tabs",folderList.slice(start,end));
	}
}