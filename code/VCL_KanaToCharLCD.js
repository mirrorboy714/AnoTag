"use_strict";
 
inlets = 1;
outlets = 1;
autowatch = 1;

function text(text){
	
	var returnText = "";	
	var length = text.length;
	
	for(var index = 0 ; index < length ; index++){
		
		var char = text[index];
		var charCode = text.charCodeAt(index);
			
		switch(char){

			case "ぎ": 
			case "ぐ": 
			case "げ": 
			case "ご": 
			case "ざ": 
			case "じ": 
			case "ず": 
			case "ぜ": 
			case "ぞ": 
			case "だ": 
			case "ぢ": 
			case "づ": 
			case "で": 
			case "ど": 
			case "ば": 
			case "び": 
			case "ぶ": 
			case "べ": 
			case "ぼ": 
			case "ガ": 
			case "ギ": 
			case "グ": 
			case "ゲ": 
			case "ゴ": 
			case "ザ": 
			case "ジ": 
			case "ズ": 
			case "ゼ": 
			case "ゾ": 
			case "ダ": 
			case "ヂ": 
			case "ヅ": 
			case "デ":
			case "ド": 
			case "バ": 
			case "ビ": 
			case "ブ": 
			case "ベ": 
			case "ボ": 				
				char = String.fromCharCode(charCode-1);
				returnText = returnText.concat(char);
				returnText = returnText.concat("゛");								
				break;
			case "ぱ": 
			case "ぴ": 
			case "ぷ": 
			case "ぺ": 
			case "ぽ": 
			case "パ": 
			case "ピ": 
			case "プ": 
			case "ペ": 
			case "ポ": 
				char = String.fromCharCode(charCode-2);
				returnText = returnText.concat(char);
				returnText = returnText.concat("゜");								
				break;
				
			case "ゔ": 
			case "ヴ":
			default:
				returnText = returnText.concat(char);
				break;
		};	
	}

	outlet(0,returnText);
		
}