chrome.storage.local.get("bigrock.hideStartFreeTrialRows", (result) => {
  if (result["bigrock.hideStartFreeTrialRows"] !== false) {
    hideStartFreeTrialRows();
  }
});

function hideStartFreeTrialRows() {
  const isStartFreeTrialButton = (element) => {
    const text = (element.innerText || element.value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return text === "start free trial";
  };

  const hideRow = (button) => {
    const row = button.closest(".ccp_order_card_wrapper");

    if (!row) return;

    row.style.setProperty("display", "none", "important");
  };

  const hideRows = () => {
    document.querySelectorAll("button.trial_text_bold").forEach((element) => {
      if (isStartFreeTrialButton(element)) hideRow(element);
    });
  };

  let updateQueued = false;
  const observer = new MutationObserver(() => {
    if (updateQueued) return;

    updateQueued = true;
    requestAnimationFrame(() => {
      updateQueued = false;
      hideRows();
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  hideRows();
}
