inlineShowMore();

function inlineShowMore() {
  const collectionHas = (a, b) => {
    for (var i = 0, len = a.length; i < len; i++) if (a[i] == b) return true;
    return false;
  };

  const findParentBySelector = (elm, selector) => {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while (cur && !collectionHas(all, cur)) cur = cur.parentNode;
    return cur;
  };

  const getTweetContent = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json.tweet.text;
  };

  const format = (text) => {
    text = text.replace(
      /@(\w+)/g,
      '<a href="/$1" role="link" style="text-overflow: unset; color: rgb(29, 155, 240); text-decoration: none;">@$1</a>'
    );
    text = text.replace(
      /#(\w+)/g,
      '<a href="/hashtag/$1" role="link" style="text-overflow: unset; color: rgb(29, 155, 240); text-decoration: none;">#$1</a>'
    );
    return text;
  };

  window.addEventListener(
    "load",
    function () {
      const url = window.location;

      const onDOMChange = (records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (!node.querySelector) return;

            let link = node.querySelector(
              "[data-testid='tweet-text-show-more-link']"
            );

            if (link) {
              link.addEventListener("click", async (e) => {
                e.preventDefault();

                const datetime = findParentBySelector(link, "article")
                  .querySelector("[datetime]")
                  .getAttribute("datetime");
                const url = findParentBySelector(link, "article").querySelector(
                  "[datetime]"
                ).parentNode.href;

                const description = await getTweetContent(
                  url
                    .replace("twitter.com", "api.fxtwitter.com")
                    .replace("x.com", "api.fxtwitter.com")
                );

                const tweetText = link.parentNode.querySelector(
                  "[data-testid='tweetText']"
                );
                tweetText.innerHTML = format(description);
                tweetText.style.display = "block";

                link.remove();
              });
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
