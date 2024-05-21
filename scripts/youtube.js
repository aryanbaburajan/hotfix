showDislikeCounter();

function showDislikeCounter() {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num.toString();
    }
  };

  window.addEventListener(
    "load",
    async function () {
      const videoIdRegex =
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*?v=([a-zA-Z0-9_-]{11})/;
      const videoId = window.location.href.match(videoIdRegex)
        ? window.location.href.match(videoIdRegex)[1]
        : null;

      if (!videoId) {
        console.log("No videoId found.");
        return;
      }

      const url = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dislikeCount = (await response.json()).dislikes;

      let dislikeButton = document.querySelector(
        '[aria-label="Dislike this video"]'
      );

      const addCounter = () => {
        if (
          dislikeButton.querySelector(
            ".yt-spec-button-shape-next__button-text-content"
          )
        )
          return;

        let dislikeCounter = this.document.createElement("div");
        dislikeCounter.className =
          "yt-spec-button-shape-next__button-text-content";
        dislikeCounter.innerText = formatNumber(dislikeCount);
        dislikeButton.append(dislikeCounter);
        dislikeButton.style.width = "auto";
        console.log(dislikeButton);
        dislikeButton.querySelector(
          ".yt-spec-button-shape-next__icon"
        ).style.marginRight = "6px";
      };

      addCounter();

      var observer = new MutationObserver(function (mutations) {
        addCounter();
      });

      var config = { attributes: true, childList: true, characterData: true };
      observer.observe(dislikeButton, config);
    },
    false
  );
}
