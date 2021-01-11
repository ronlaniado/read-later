/* global chrome */
console.log("Read Later extension has been installed!");

const createContextMenu = () => {
  return new Promise((resolve, reject) => {
    let contexts = ["page", "link"];
    chrome.contextMenus.create(
      {
        title: "Read Later",
        contexts: contexts,
        id: "test",
      },
      () => {
        if (chrome.runtime.lastError) {
          reject();
        } else {
          resolve();
        }
      }
    );
  });
};

const handleContextClick = (info, tab) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("readingList", (result) => {
      let readingList = result.readingList;
      let newLink = info.linkUrl ? info.linkUrl : tab.url;
      readingList[newLink] = { read: false, date: Date.now() };
      chrome.storage.sync.set({ readingList: readingList }, () => {
        if (chrome.runtime.lastError) {
          reject();
        } else {
          resolve();
        }
      });
    });
  });
};

// Function to initialize specific parts of extension
const initWorker = () => {
  createContextMenu() // Create the right-click add to reading list feature
    .then(() => {
      chrome.contextMenus.onClicked.addListener((info, tab) => {
        handleContextClick(info, tab)
          .then(() => {
            console.log("Updated reading list.");
          })
          .catch((e) => console.log(e));
      });
    })
    .catch((e) => {
      console.log(e);
    });
  // Initialize reading list
  chrome.storage.sync.set({ readingList: {} }, () => {
    console.log("Initialized reading list.");
  });
};
initWorker();
