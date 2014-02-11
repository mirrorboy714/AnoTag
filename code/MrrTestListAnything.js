autowatch = 1;
inlets = 1;

function list(){

		post("list:" + arrayfromargs(messagename,arguments));
		post();
}

function anything(){
	
		post("anything:" + arrayfromargs(messagename,arguments));
		post();
}