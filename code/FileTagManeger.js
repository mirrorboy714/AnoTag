"use_strict";
inlets = 1;
outlets = 1;
autowatch = 1;
  
var _files = [];
var _tags = [];
var _folders = [];
var _separator = "|";
var _extension = [];
  
function loadbang(){

}

function separator(sep){
	
	_separator = sep;	
}

function getFile(number){
	
	outlet(0,"file",_files[number]);
}

function getFilesLength(){
	
	outlet(0,"filesLength",_files.length);
}

function extension(ext){

	_extension = arrayfromargs(messagename,arguments);
	_extension = _extension.splice(1,_extension.length);
	_extension.push("fold");
}

function read(folderPath){
	
	_files = [];
	_tags = [];
	_folders = [];
		
	f = new Folder(folderPath);
	registFilesInFolder(f);
	
} 

function getFilesWithTag(tag){

	var tempFiles = [];

	for(var index = 0 ; index < _files.length ; index++){
		
		var filename = getFileNameFromAbsolutePath(_files[index]);
		filename = deleteExtension(filename);
		var tempTags = getTagFromFile(filename);
		
		for(var indexOfTag = 0 ; indexOfTag < tempTags.length ; indexOfTag++){
				
				var tempTag = tempTags[indexOfTag];
				
				if(tag.length == tempTag.length && tempTag.indexOf(tag) >= 0){
					tempFiles.push(_files[index]);					
				}
				
		}				
	}	

	getFiles(tempFiles);
};

function getFilesWithFolder(fold){
	

	var folders = getFoldersArray();
	var index = folders.indexOf(fold);	
	var fullfolderpath = _folders[index][0];	
	var files = [];
	
	_files.forEach(function(v,i,a){

		if(v.indexOf(fullfolderpath) >= 0){
				
				files.push(v);
		}
	});
	
	outlet(0,"files",files);
}


function getTagsFromFile(filename){

		filename = deleteExtension(filename);

		var tempTags = getTagFromFile(filename);		

		getTags(tempTags);
}
getTagsFromFile.local = 1;


function getFileNameFromAbsolutePath(absoluteFilePath){
	
	var fileName = absoluteFilePath.slice(absoluteFilePath.lastIndexOf("/") + 1);

	return fileName;
}
getFileNameFromAbsolutePath.local = 1;



function getTagsFromFileWithCount(assoluteFilePath){
	
	    var filename = getFileNameFromAbsolutePath(assoluteFilePath);	
		filename = deleteExtension(filename)

		var tagsOfFilename = getTagFromFile(filename);		
		var tagsArray = getTagsArray();
		var tagsFromFileArray = [];
	
		for(var index=0; index < tagsOfFilename.length ; index++){
		
			var indexOfTag = tagsArray.indexOf(tagsOfFilename[index]);
			tagsFromFileArray.push(_tags[indexOfTag]);
		}
		
		//post("tagsFromFileArray:" + tagsFromFileArray);

		getTagsWithCount(tagsFromFileArray);
}

function getTagsWithCount(tags){
	
	var tagsWithCount = [];
	
	if(!tags){ 
		tags = _tags;
	}

	for(var index = 0 ; index < tags.length ; index++){

		tagsWithCount.push(tags[index][0] + " (" + tags[index][1] + ")");			
	}
	
	outlet(0,"tags",tagsWithCount);
}

function getTagsWithFolder(folder){
	
	var tempFiles = [];

	for(var index = 0 ; index < _files.length ; index++){
		
		var filename = getFileNameFromAbsolutePath(_files[index]);
		
		if(filename.indexOf(folder) >= 0){
					
				tempFiles.push(_files[index]);
		}	
	}
	
	var tags = [];
	
	for (var index = 0 ; index < tempFiles.length; index++){

		var filename = getFileNameFromAbsolutePath(tempFiles[index]);	
		filename = deleteExtension(filename)
		var tempTags = getTagFromFile(filename);
		var tagsArray = getTagsArray();
		
		for(var indexOfTag = 0 ; indexOfTag < tempTags.length ; indexOfTag++){
			
			var indexOfTagArray = tagsArray.indexOf(tempTags[indexOfTag]);
			
			if(tags.indexOf( _tags[indexOfTagArray]) < 0)
				tags.push(_tags[indexOfTagArray]);
		}
	}
	
	getTagsWithCount(tags);
}

function getFiles(files){

	if(files != null){
	
		outlet(0,"files",files);
	}else{

		outlet(0,"files",_files);
		
	}
}

function getTags(tags){

	if(tags != null){
	
		outlet(0,"tags",tags);
	
	}else{

		outlet(0,"tags",getTagsArray());	
	}
}

function getFoldersWithCount(){

	var folders = getFoldersArray();
		
	for(var index = 0 ; index < folders.length ; index++){
	
		folders[index] += " (" + _folders[index][1] + ")";
	}
	
	/*
	function numberorder(a, b) { return a - b; }
	folders.sort(numberorder);
	*/

	folders.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	outlet(0,"folders",folders);
	
}


//for Debug
function postTags(){

	for(var index = 0 ; index < _tags.length ; index++){
	
		post("tags[" + index + "]:" + _tags[index][0] + _tags[index][1]); 
		post();
	}
}

function postFiles(){

	for(var index = 0 ; index < _files.length ; index++){
	
		post("files[" + index + "]" + _files[index]);
		post();
	}
}

function postFolders(){

	for(var index =0 ; index < _folders.length ; index++){
	
		post("folders[" + index + "]" + _folders[index]);
		post();
	}
}

//Private
function registTag(filename){
	
	var tempTags = getTagFromFile(filename);
	//post("tempTags:" + tempTags);post();
	
	for(var index=0 ; index < tempTags.length ; index++){
		
		var tempTag = tempTags[index];		
		var indexOfTag = getTagsArray().indexOf(tempTag);
	
		if( indexOfTag < 0){

			_tags.push([tempTag,1]);
		
		}else{
		
			_tags[indexOfTag][1]++;
		}
	}
	
	_tags.sort(order);
	
	function order(a,b){
	
		return (b[1] - a[1]);
	}
}
registTag.local = 1;

function getTagsArray(){
	
		var tags = [];
		
		for(var indexOfTags = 0 ; indexOfTags < _tags.length ; indexOfTags++){
			
				tags.push(_tags[indexOfTags][0]);
		}
		
		return tags;
}
getTagsArray.local = 1;


function getFoldernameFromFullpathFoldername(fullpathFoldername){
	/*
	post("fullpathFoldername:" + fullpathFoldername);
	var indexOfCurrent = fullpathFoldername.indexOf("//");
	
	post("current:" + indexOfCurrent);
	post("length:" + fullpathFoldername.length );
	post();

	if(indexOfCurrent == fullpathFoldername.length -2){
	
		return getFoldernameFromFullpathFoldername(fullpathFoldername.substring(0,indexOfCurrent));
	}
	else{
	*/
		var splitFold = fullpathFoldername.split("/");		
		var fold = splitFold[splitFold.length-1];
	
		return fold;
		
	//}
	
}
getFoldernameFromFullpathFoldername.local = 1;


function getFoldersArray(){
	
	var folders = [];
	
	for( var indexOfFolders = 0 ; indexOfFolders < _folders.length ; indexOfFolders++){
	
		var fold = getFoldernameFromFullpathFoldername(_folders[indexOfFolders][0]);
		folders.push(fold);
	}
	
	return folders;
	
}
getFoldersArray.local = 1;


function getTagFromFile(filename){
	
	var tempTags = filename.split(_separator);
	var returnTags = [];
	
	for(var index = 0 ; index < tempTags.length ; index++){
	
		var tag = tempTags[index];
		if( (tag != "") && isNaN(tag)){
				returnTags.push(tag);
		}
	}
		
	return returnTags;
}
getTagFromFile.local = 1;


function isfilenamePushed(filename){
					
	return !_files.every( 
		function( absoluteFilePath){ 
			var tempFilename = getFileNameFromAbsolutePath(absoluteFilePath); 
			tempFilename = deleteExtension(tempFilename);

			return filename != tempFilename;
		});	
};
isfilenamePushed.local = 1;

function isFilenameStartWithDot(filename){

	return filename[0] == ".";
}
isFilenameStartWithDot.local = 1;

function registFilesInFolder(folder){
	
	folder.typelist = _extension;
	
	if(folder != null){
	
		while (!folder.end) {
			
			if( folder.filename == "" ){
				folder.next();
 				continue;

			}else if(( folder.filetype != "fold")){

				var filename = folder.filename;
				filename = deleteExtension(filename);
				
				if(!isfilenamePushed(filename) && !isFilenameStartWithDot(filename))
				{
					registTag(filename); 
					registFolder(folder.pathname);
					_files.push(folder.pathname + "/" + folder.filename);
 				}
								
			}else/*fold*/{
				
					var nextFolderPath = folder.pathname + "/" + folder.filename;
					registFilesInFolder(new Folder(nextFolderPath));
			}
			
			folder.next();
    	}
	}else{
		post("Folder is not find");
		post();
	}
	
	folder.close();
}
registFilesInFolder.local = 1; 

function registFolder(folderpath){

	var tempFold = [];

	if(_folders.every(
		function(v){ 
			tempFold = v;
			return v[0] != folderpath;
		})		
	){
	//regist
		_folders.push([folderpath,1]);				
	}else{
	//not regits
		tempFold[1]++;			
	}					
	
	_folders.sort();
}
registFolder.local = 1;

function deleteExtension(filename){
	
	var indexOfDot = filename.lastIndexOf(".");
	filename = filename.slice(0,indexOfDot);

	return filename;
}
deleteExtension.local = 1;
 
//////////////////////////////////////////////////////////////////////////////////////////
 
//////////////////////////////////////////////////////////////////////////////////////////
 
function save(){
     
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