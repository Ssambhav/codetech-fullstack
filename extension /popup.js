chrome.storage.local.get(["time"], (data) => {
  document.getElementById("time").innerText =
    (data.time / 1000).toFixed(2) + " seconds spent";
});
