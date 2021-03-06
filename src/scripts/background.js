var extension = require("./utils/extension");
var Dictionary = require ("./dictionary");

var backgroundListener = function (request, sender, sendResponse) {
  console.log('backgroundListener got Message.', request, sender, sendResponse)
  if (request.action === "reload-dictionary") {
    // TODO: reload this tab if got request reload dictionary
    sendResponse({ action: "reloaded" });
  }
}

extension.runtime.onMessage.addListener(backgroundListener);

extension.contextMenus.create({
  title: "Search in favorite dictionary",
  contexts: ["selection"],
  onclick: getword
});

function getword(info, tab) {
  Dictionary.openDictionaryPage(info.selectionText)
}