addTurbowarpEmbed();

function addTurbowarpEmbed() {
  window.addEventListener(
    "load",
    async function () {
      const getProjectId = () => {
        return window.location.pathname.split("/")[2];
      };

      const getIsProjectShared = async (username, id) => {
        const response = await fetch(
          `https://api.scratch.mit.edu/users/${username}/projects/${id}`,
          { cache: "no-store" }
        );

        if (!response.ok) return false;
        if ((await response.json()).code === "NotFound") return false;

        return true;
      };

      async function checkForLoad() {
        const usernameLabel =
          document.querySelector("div.title a") ||
          document.querySelector("span.profile-name");
        const player = document.querySelector(".guiPlayer");

        if (!usernameLabel || !player) return;

        const username = usernameLabel.innerText;

        const isShared = await getIsProjectShared(username, getProjectId());
        if (!isShared) return;

        const extensionList = document.querySelectorAll(
          "div.extension-content span"
        );
        if (
          Array.from(extensionList).some((element) => {
            return element.innerText == "Cloud Variables";
          })
        ) {
          observer.disconnect();
          return;
        }

        let turboPlayer = document.createElement("iframe");
        turboPlayer.src = `https://turbowarp.org/${getProjectId()}/embed?settings-button&fullscreen-background=white`;
        turboPlayer.width = 482;
        turboPlayer.height = 412;
        turboPlayer.allowTransparency = true;
        turboPlayer.allowFullscreen = true;
        turboPlayer.style.border = "none";

        player.replaceWith(turboPlayer);
      }

      const observer = new MutationObserver(checkForLoad);
      observer.observe(document.body, { childList: true, subtree: true });
    },
    false
  );
}
