"use_strict";
inlets = 1;
outlets = 0;
autowatch = 1;
  
function read(folderPath){
	
	postFile(folderPath);
	
}

function postFile(folderPath){
	
	var	f = new Folder(folderPath);
	f.next();
	
	while(!f.end){

		if(f.filetype != "fold"){

			post("filename:" + f.filename);
			post();
			
		}else{
			
			postFile(f.filename);
		}
		
		f.next();
	}
	
	f.close();
}
postFile.local = 1;