var apis = [
  'alarms',
  'bookmarks',
  'browserAction',
  'commands',
  'contextMenus',
  'cookies',
  'downloads',
  'events',
  'extension',
  'extensionTypes',
  'history',
  'i18n',
  'idle',
  'notifications',
  'pageAction',
  'runtime',
  'storage',
  'tabs',
  'webNavigation',
  'webRequest',
  'windows',
]

function Extension () {
  var me = this

  apis.forEach(function (api) {

    me[api] = null

    try {
      if (chrome[api]) {
        me[api] = chrome[api]
      }
    } catch (e) {}

    try {
      if (window[api]) {
        me[api] = window[api]
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        me[api] = browser[api]
      }
    } catch (e) {}
    try {
      me.api = browser.extension[api]
    } catch (e) {}
  })

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction
    }
  } catch (e) {}

}

module.exports = new Extension();