let startTime = Date.now();

chrome.tabs.onActivated.addListener(() => {
  const timeSpent = Date.now() - startTime;

  chrome.storage.local.get(["time"], (data) => {
    let total = data.time || 0;
    chrome.storage.local.set({ time: total + timeSpent });
  });

  startTime = Date.now();
});
