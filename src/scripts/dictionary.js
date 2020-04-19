import storage from "./utils/storage";
import extension from "./utils/extension";
var dictionaryUrl = 'https://dictionary.cambridge.org/dictionary/english/{word}'

storage.get('dictionaryUrl', function (resp) {
    console.log(222, resp)
    if (resp && resp.dictionaryUrl) {
        dictionaryUrl = resp.dictionaryUrl;
    }
})

console.log(11, dictionaryUrl)

function openDictionaryPage(word) {
    // TODO: Check if only open in one tab
    // => Query in current tabs and reload tab if exist tab
    // Code query tab sample    
    // extension.tabs.query({ currentWindow: true }, function (tabs) {
    //     console.log(tabs)
    //     var activeTab = tabs[0];
    //     extension.tabs.sendMessage(activeTab.id, { action: 'reload-dictionary' }, '{word: "xxx"}');
    // })

    if (word) {
        const regex = /{(\s)*word(\s)*}/g;
        let url = dictionaryUrl.replace(regex, word)
        extension.tabs.create({ url });
    }
}

export {
    openDictionaryPage
}