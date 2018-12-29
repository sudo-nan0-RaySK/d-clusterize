//@Author Ray S. Kan 

'use strict';

//WebRequest Http intervention
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details.url)
    return {
      cancel: true
    }
  },
  { urls: ["<all_urls>"], types: ['script', 'image', 'stylesheet'], tabId: this.tabId },
  ["blocking"]);


//Blocking if images and stylesheets are the main document
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    console.log(details.url)
    return {
      cancel: true
    }
  },
  { urls: ["<all_urls>"], types: ['script', 'image', 'stylesheet'], tabId: this.tabId },
  ["blocking"]);


//OnInstall Boiler-Plate
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: '.' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
