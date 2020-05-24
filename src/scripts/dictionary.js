var storage = require ("./utils/storage");
var extension = require ("./utils/extension");
var Constants = require ("./domain/constant");

var dictionaryUrl = Constants.DEFAULT_DICTIONARY_URL;

storage.get(Constants.DICTIONARY_URL_STORAGE_KEY, function (resp) {
    dictionaryUrl = resp[Constants.DICTIONARY_URL_STORAGE_KEY] || Constants.DEFAULT_DICTIONARY_URL;
})

function openDictionaryPage(word) {
    // TODO: Check if only open in one tab
    // => Query in current tabs and reload tab with new url if the option open dictionary in only one tab was enabled
    // Code query tab sample    
    // extension.tabs.query({ currentWindow: true }, function (tabs) {
    //     console.log(tabs)
    //     var activeTab = tabs[0];
    //     extension.tabs.sendMessage(activeTab.id, { action: 'reload-dictionary' }, '{word: "xxx"}');
    // })

    if (word) {
        var url = dictionaryUrl.replace(Constants.REGEX_WORD_PLACEHOLDER, word)
        extension.tabs.create({ url });
    }
}

export {
    openDictionaryPage
}