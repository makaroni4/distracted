(function() {
  var initSiteWall = function() {
    console.log("--> initSiteWall");

    const body = document.querySelector("body");
    const anchor = document.createElement("div");
    anchor.id = "distracted-app";

    body.innerHTML = "";
    document.body.appendChild(anchor);
    document.body.style.display = "block";

    var app = new Vue({
      el: "#distracted-app",
      data: {
      },
      methods: {
      },
      template: `
        <div class="distracted-site-wall">
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
  ];

  const isBlockedPage = blockedWebsites.some(function(blacklistedUrl) {
    return window.location.href.includes(blacklistedUrl);
  });

  if(isBlockedPage) {
    document.body.style.display = "none";

    initSiteWall();
  }
})();
