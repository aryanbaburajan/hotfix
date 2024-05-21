hideBlockedMessages();

function hideBlockedMessages() {
  window.addEventListener(
    "load",
    function () {
      const onDOMChange = (records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (
              node.textContent.endsWith("Show messages") ||
              node.textContent.endsWith("Show message")
            ) {
              node.style.display = "none";
            }
          });
        });
      };

      var observer = new MutationObserver(onDOMChange);
      observer.observe(document.body, { childList: true, subtree: true });
    },
    false
  );
}
