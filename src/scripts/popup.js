var extension = require ("./utils/extension");
var Dictionary = require ("./dictionary");

var popupContainer = document.getElementById("app");
var inputWord = document.getElementById("input-word");
var btnSearch = document.getElementById("search-btn");

// Open click search
btnSearch.addEventListener("click", (e) => {
  submitSearchHandler(e);
})

// on press enter
inputWord.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    submitSearchHandler(e);
  }
});

// handler submit word
let submitSearchHandler = function (e) {
  let word = inputWord.value
  Dictionary.openDictionaryPage(word)
}

// Open options page
var optionsLink = document.getElementById("js-options");
optionsLink.addEventListener("click", function (e) {
  e.preventDefault();
  extension.tabs.create({ 'url': extension.extension.getURL('options.html') });
})
