'use strict';

ramlCode.methods.getRaml = function(url, callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// Action to be performed when the document is read;
			if (callback){
				callback(xmlhttp.responseText);
			}

			return xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};
