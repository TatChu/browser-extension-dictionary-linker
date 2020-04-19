import extension from "./extension";

module.exports = (extension.storage.sync ? extension.storage.sync : extension.storage.local);