import extension from "./utils/extension";

function onRequest(request, sender, sendResponse) {
  console.log('got message reload')
  console.log('content.extension.runtime.onMessage.', request, sender, sendResponse)
  if (request.action === 'reload-dictionary') {
    sendResponse('xxxxxx')
  }
}

extension.runtime.onMessage.addListener(onRequest);