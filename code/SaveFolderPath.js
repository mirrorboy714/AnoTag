"use_strict";
inlets = 1;
outlets = 1;
autowatch = 1;
  
var folderPath = 100;
declareattribute("folderPath",null,"setFolderPath",1);
  
function bang(){
 
	outlet(0,folderPath);
}
 
  
//////////////////////////////////////////////////////////////////////////////////////////
 
function setFolderPath(path){

	folderPath = path;
}
setFolderPath.local = 1; 

//////////////////////////////////////////////////////////////////////////////////////////
 
function save(){
     
    post("save");
    post();
     
    //When the js object containing this script is recreated, the function numchairs will be called
    embedmessage("setFolderPath",folderPath);
}
