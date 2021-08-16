const url = URL;
const completeUrl = COMPLETE_URL;
const chrome = Application('Google Chrome');

main(url, completeUrl);

function main(domain, specificUrl) {
  checkIfChromeIsActivated();
  const [window, tab] = searchWindowAnTab(domain);
  if(tab) { openTab(window, tab); }
  if(!tab) {
    const urlToOpen = !!specificUrl ? specificUrl : domain;
    openUrl(urlToOpen);
  }
}

function checkIfChromeIsActivated() {
  if(!chrome.frontmost()) {
    chrome.activate();
  }
}

function openTab(windowIndex, tabIndex) {
  chrome.windows[windowIndex].activeTabIndex = tabIndex + 1;
}

function searchWindowAnTab(domain) {
  let windowFound = null;
  let tabFound = null;
  chrome.windows().forEach((window, winIdx) => {
    window.tabs().forEach((tab, tabIdx) => {
      if(tab.url().includes(domain)) {
        windowFound = winIdx;
        tabFound = tabIdx;
      }
    })
  })
  return [windowFound, tabFound];
}

function openUrl(url) {
  const newTab = new chrome.Tab();
  newTab.url = url;
  chrome.windows[0].tabs.push(newTab);

}
