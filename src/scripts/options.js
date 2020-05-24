var storage = require("./utils/storage");
var Constants = require("./domain/constant");
var Dictionaries = require("./domain/builtin-dictionaries");

var currentDictionaryUrl = Constants.DEFAULT_DICTIONARY_URL;

var inputDictionaryUrl = document.getElementById("dictionary-url");
var suggessListContainer = document.getElementById("suggess-list");

storage.get(Constants.DICTIONARY_URL_STORAGE_KEY, function (resp) {
  inputDictionaryUrl.value = currentDictionaryUrl = resp[Constants.DICTIONARY_URL_STORAGE_KEY] || Constants.DEFAULT_DICTIONARY_URL
  initOptions();
});

document.getElementById('btn-save').addEventListener("click", function (e) {
  inputDictionaryUrl = document.getElementById("dictionary-url");
  var value = inputDictionaryUrl.value;
  if (!value) {
    showError('Please enter dictionary url')
    return;
  }

  var urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/g;
  if (!urlRegex.test(value)) {
    showError('The entered value is valid an URL')
    return;
  }

  if (!Constants.REGEX_WORD_PLACEHOLDER.test(value)) {
    showError('The dictionary URL must have {word} placeholder')
    return;
  }

  var storageValueToSave = {}
  storageValueToSave[Constants.DICTIONARY_URL_STORAGE_KEY] = value;
  storage.set(storageValueToSave, function () {
    showSuccess('Saved')
  });
})

// bind options
function initOptions() {
  for (var key in Dictionaries) {
    var item = Dictionaries[key]
    var checked = (currentDictionaryUrl === item.url ? 'checked': '');
    suggessListContainer.innerHTML +=
      `<li>
        <input type="radio" ${checked} name="builtin_dictionary_url" id="${key}">
        <label class="suggess-item" for="${key}"><i>${item.name}</i></label>
      </li>
      `;
  }

  // option handler
  document.querySelectorAll('[name="builtin_dictionary_url"]').forEach(input => {
    input.addEventListener('change', function (event) {
      var id = event.target.id;
      inputDictionaryUrl.value = Dictionaries[id].url;
    })
  })
}

// Message utilites
var alertContainer = document.getElementById('alert-container')
function showError(message) {
  alertContainer.classList.remove('success');
  alertContainer.classList.add('error');
  alertContainer.classList.remove('d-none');
  alertContainer.innerHTML = message;
  autoHideMessage();
}
function showSuccess(message) {
  alertContainer.classList.add('success');
  alertContainer.classList.remove('error');
  alertContainer.classList.remove('d-none');
  alertContainer.innerHTML = message;
  autoHideMessage();
}

function hideMessage() {
  alertContainer.classList.add('d-none');
  alertContainer.classList.remove('success');
  alertContainer.classList.remove('error');
  alertContainer.innerHTML = '';
}

let intervalHideMsg, elapsedTime, timeToShowMessage = 6000;
function autoHideMessage() {
  clearInterval(intervalHideMsg);
  elapsedTime = 0;
  intervalHideMsg = setInterval(function () {
    elapsedTime += 100;
    if (elapsedTime >= timeToShowMessage) {
      clearInterval(intervalHideMsg);
      hideMessage();
    }
    alertContainer.style.opacity = 1 - (elapsedTime / timeToShowMessage)
  }, 100)
}

alertContainer.addEventListener('hover', function () {
  alertContainer.style.opacity = 1;
  elapsedTime = 0;
})
