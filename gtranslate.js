
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

body = document.getElementsByTagName("body")[0];
selectedText = 'hus'


var menu = document.createElement("menu");
var menuItem = document.createElement("menu")
menu.setAttribute("type", "context")
menu.setAttribute("id", "gtranslateMenu")
body.addEventListener('contextmenu', function(ev) {
    selectedText = getSelectedText()
    menuItem.setAttribute("label", "translate "+selectedText)
	menu.appendChild(menuItem);
	trans();
	// translate(selectedText, function(res){
	// 	alert(res);
	// });
    return false;
}, false);
body.appendChild(menu)
body.setAttribute("contextmenu", "gtranslateMenu"); 


function translate(text, callback){
	var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q='+text;
	var xhttp = new XMLHttpRequest(); 
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    callback(this.responseText);
	    // callback(JSON.parse(this.responseText)[0][0][0]);
	  }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function trans(){
	let xhr = new XMLHttpRequest();
	xhr.onload = function () {
		let results = JSON.parse(this.responseText)[0][0][0];
		// let results = Array.from(this.responseXML.getElementsByClassName('result')).map(result => result.getElementsByClassName('result__a')[0].href);
		// results = results.filter((result) => !result.startsWith('https://duckduckgo.com/y.js'));
		applyResults(results);
	};
	xhr.onerror = function () {
		console.log('An error occurred');
	}
	xhr.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q='+getSelectedText(), true);
	// xhr.responseType = 'document';
	xhr.send();

	function applyResults(results){
		var it=document.createElement("menuItem")
		it.setAttribute("label", results);
		menuItem.appendChild(it);
	}

}





