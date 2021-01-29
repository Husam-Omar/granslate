
const granslateMenuId = "granslate-menu";

browser.contextMenus.create({
    id: granslateMenuId,
    title: "translate ''",
    contexts: ["all"],

});

browser.contextMenus.onShown.addListener(async function (info, tab) {
    var selectedText = info.selectionText;
    if (selectedText) {
        let translation = await translate(selectedText);
        browser.contextMenus.update(granslateMenuId, {
            title: translation,
            visible: true
        });
    } else {
        browser.contextMenus.update(granslateMenuId, {
            visible: false
        });
    }
    browser.contextMenus.refresh();

});

browser.contextMenus.onClicked.addListener((info, tab) => {
    var selectedText = info.selectionText;
    if (info.menuItemId === granslateMenuId) {
        browser.tabs.create({
            index: tab.index + 1,
            url: "https://translate.google.com/?sl=auto&tl=ar&text=" + selectedText
        })
    }
});

async function translate(text) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=' + text, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "https://translate.googleapis.com");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(JSON.parse(this.responseText)[0][0][0]);
            }
            else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}