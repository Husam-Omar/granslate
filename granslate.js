
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
var openNewTapMenu = document.createElement("menuItem");
var menuItem = document.createElement("menuItem");
menu.setAttribute("type", "context");
menu.setAttribute("id", "gtranslateMenu");
body.appendChild(menu);
body.setAttribute("contextmenu", "gtranslateMenu");

menu.appendChild(subMenu);
subMenu.appendChild(menuItem);


menu.appendChild(openNewTapMenu);

openNewTapMenu.setAttribute("label", "translate in new tab");

var selectedText = "";

document.addEventListener("mouseup", (event) => {
  selectedText = getSelectedText();

  if (selectedText != "" && event.button == 0) {
    var results = translateFun(selectedText);
    selectedText = "";
  }
  selectedText = "";
});

openNewTapMenu.addEventListener("click", (ev) => {
  selectedText = getSelectedText();
  if (ev.button == 0 && selectedText != "") {
    var url = "https://translate.google.com/?sl=en&tl=ar&text=" + selectedText;
    var win = window.open(url, '_blank');
    win.focus();
  }
});






body.addEventListener('contextmenu', (ev) => {



  let selectedTxt = getSelectedText();
  subMenu.setAttribute("label", "translate '" + selectedTxt + "'");

  return false;
}, false);


async function translateFun(selectedText) {
  let results = await translate(selectedText);
  menuItem.setAttribute("label", results);
  return results;
}



async function translate(text) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=' + text, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "https://translate.googleapis.com");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status == 200) {
        // alert("results");

        resolve(JSON.parse(this.responseText)[0][0][0]);
      }
      else {
        //alert(xhr.statusText);

        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function () {
      reject(Error("Network Error"));
    };
    xhr.send();
  });
}
