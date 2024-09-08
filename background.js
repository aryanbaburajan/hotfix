chrome.runtime.onInstalled.addListener(function (object) {
  let url = chrome.runtime.getURL("settings/settings.html");

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url });
  }
});
