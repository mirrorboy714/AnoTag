"use_strict";
inlets = 2;
outlets = 1;
autowatch = 1;
  
var foo = 100;
declareattribute("foo",null,null,1);

var files;// = new Array();
var tags;
 
 
function loadbang(){
         
    out(messagename);
	loadFolderAndPrint();

}

function loadFolder(){
	
	files = new Array();
	tags = new Array();
	
 	var patchPath = this.patcher.filepath;
 	var lastSeparatorIndex = patchPath.lastIndexOf(this.patcher.name);
 
 	//Patch's Absolute Path
 	var folderPath = patchPath.slice(0,lastSeparatorIndex);
	
	f = new Folder(folderPath + "Movie");
	registFilesInFolder(f);
	
	outFiles();
	outTags();
} 

function filesWithTag(tag){

	for(var index = 0 ; index < files.length ; index++){
		
		if(files[index].indexOf(tag) >= 0){
			
			//post("tag:" + tag);
			
			//post();
			file(index);
		}	
	}
}

//Private
function file(num){

	if(0 <= num && num < files.length){
		out("file",files[num]);
	}
}
file.local = 1;

function tag(num){
	
	if(0 <= num && num < tags.length){
		out("tag",tags[num]);
	}
}
tag.local = 1;

//private
function registTag(filename){
	
	var divideFileName = filename.split("_");
	
	for(var index=0 ; index < divideFileName.length ; index++){
		
		var tag = divideFileName[index];
		
		if( tags.indexOf(tag) < 0){

			tags.push(tag);
		
		}

	}
	
	tags.sort();
	
}
registTag.local = 1;

function registFilesInFolder(folder){
	
	folder.typelist = ["MooV","fold"];
	
	post();
		
	if(folder != null){
	
		while (!folder.end) {
			
			if(folder.filetype == "MooV"){

				var filename = folder.filename;
				filename = filename.slice(0,filename.length-4); //remove .mov
				registTag(filename); 
				files.push(folder.filename);
				
			}else/*fold*/{
				
				if(folder.filename != ""){
					var nextFolderPath = folder.pathname + "/" + folder.filename;
					post(nextFolderPath);	
					post();
					registFilesInFolder(new Folder(nextFolderPath));
				}
				
			}
			
			folder.next();
    	}
	}else{
		post("Folder is not find");
	}
	
	folder.close();
	post();
}
registFilesInFolder.local = 1; 


function outFiles(){

	for(var index = 0 ; index < files.length ; index++){
			
			file(index);
	}		
}
outFiles.local = 1;

function outTags(){

	for(var index = 0 ; index < tags.length ; index++){
		tag(index);
	}
}
outTags.local = 1;


/*
function bang(){
 
    if(inlet == 0){
 
        out(messagename);       
    }
     
    foo++;
    post("foo: " + foo);
    post();
}
 

 
function msg_int(num){
 
    out(num);
}
 
function msg_float(num){
 
    out(num);
}
 
function message(){
     
  var a = arrayfromargs(messagename,arguments);
 
  out(a);   
     
}
 
function list(){
 
  var a = arrayfromargs(messagename,arguments);
 
  out(a);
};
 
function anything()
{
  var a = arrayfromargs(messagename,arguments);
 
  out(a);
}
*/

/*
function fileLength(){

	out("fileLength",files.length);
}



function tagLength(){

	out("tagLength",tags.length);
}
*/
 
 
//////////////////////////////////////////////////////////////////////////////////////////
 
function init(){
         
    post("jsarguments:");   
    for(var i = 0 ; i < jsarguments.length ; i++){
     
        post(jsarguments[i]);
        post();
    }
}
 
 
function out(){
         
//    post(messagename + " :");
	var outList = new Array();
	
    for(var i = 0 ; i < arguments.length ; i++){
 
		outList.push(arguments[i]);
    }

    
	outlet(0,outList);
}
 
 
//////////////////////////////////////////////////////////////////////////////////////////
 
function save(){
     
    post("save");
    post();
     
    //When the js object containing this script is recreated, the function numchairs will be called
    embedmessage("init");
}
 
 
//Assistance for Inlet
function describe_inlet(num){
     
    assist("this is inlet number : " + num,num);
}
setinletassist(-1,describe_inlet);
 
 
//Assistance for Outlet
function describe_outlet(num){
    assist("this is outlet number : " + num,num);
}
setoutletassist(-1,describe_outlet);