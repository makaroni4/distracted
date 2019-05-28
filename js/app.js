(function() {
  var initSiteWall = function() {
    console.log("--> initSiteWall");

    const body = document.querySelector("body");
    const anchor = document.createElement("div");
    anchor.id = "distracted-app";

    body.innerHTML = "";
    document.body.appendChild(anchor);
    document.body.style.display = "block";

    const APP_STORAGE_KEY = "distracted-app";

    var app = new Vue({
      el: "#distracted-app",
      data: {
        totalHits: null
      },
      methods: {
      },
      mounted() {
        chrome.storage.local.get([APP_STORAGE_KEY], result => {
          let appData = result[APP_STORAGE_KEY];

          if(appData) {
            appData.totalHits += 1;
          } else {
            appData = {
              totalHits: 1
            }
          }

          this.totalHits = appData.totalHits;

          chrome.storage.local.set({ [APP_STORAGE_KEY]: appData });
        });
      },
      template: `
        <div class="distracted-site-wall">
          <div class="distracted-site-wall__total-hits" v-if="totalHits">
            Total hits: {{totalHits}}
          </div>

          <h1>
            This website is blocked by Distracted.
          </h1>
        </div>
      `
    });
  }

  const blockedWebsites = [
    "instagram.com",
    "theberrics.com",
    "www.facebook.com"
  ];

  const isBlockedPage = blockedWebsites.some(function(blacklistedUrl) {
    return window.location.href.includes(blacklistedUrl);
  });

  if(isBlockedPage) {
    document.body.style.display = "none";

    initSiteWall();
  }
})();
