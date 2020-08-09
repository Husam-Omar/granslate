
function getSelectedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

var body = document.getElementsByTagName("body")[0];
var menu = document.createElement("menu");
var subMenu = document.createElement("menu");
var menuItem=document.createElement("menuItem");
menu.setAttribute("type", "context");
menu.setAttribute("id", "gtranslateMenu");
body.appendChild(menu);
body.setAttribute("contextmenu", "gtranslateMenu");
body.addEventListener('contextmenu', function(ev) {
  selectedText = getSelectedText();
  subMenu.setAttribute("label", "translate '"+selectedText+"'");
  menu.appendChild(subMenu);
  translate(selectedText, function(res){
    menuItem.setAttribute("label", res);
    subMenu.appendChild(menuItem);
  });
  return false;
}, false);

function translate(text, callback){
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let results = JSON.parse(this.responseText)[0][0][0];
    callback(results);
  };
  xhr.onerror = function () {
    console.log('An error occurred');
  }
  xhr.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q='+text, true);
  xhr.setRequestHeader("Access-Control-Allow-Origin", "https://translate.googleapis.com");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
