const routes = {
  gogoanime: [
    {
      method: "GET",
      url: "/api/gogoanime/search?q=query",
      description: "Search anime with a query string.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/topairing?page=1",
      description: "Fetch top airing anime by page.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/details?id=anime-id",
      description: "Fetch details of a specific anime.",
    },
  ],
  zoroanime: [
    {
      method: "GET",
      url: "/api/zoroanime/search?q=query",
      description: "Search anime with a query string.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/popularanime",
      description: "Fetch popular anime.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/topairing?page=page_no",
      description: "Fetch top Airing.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/schedule?date=YYY-MM-DD",
      description: "Get Anime Schedule.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/spotlight",
      description: "Get Anime SpotLight.",
    },
  ],
};

function renderRoutes(sectionId, title, apiRoutes) {
  const section = document.getElementById(sectionId);
  section.innerHTML = `<h2>${title}</h2>`;
  const ul = document.createElement("ul");
  apiRoutes.forEach(({ method, url, description }) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div>
          <code>${method} ${url}</code>
          <p>${description}</p>
        </div>
        <button onclick="testApi('${method}', '${url}')">Test</button>
      `;
    ul.appendChild(li);
  });
  section.appendChild(ul);
}

function testApi(method, url) {
  document.getElementById("testForm").style.display = "block";
  document.getElementById("method").value = method;
  document.getElementById("url").value = url;
  document.getElementById("body").style.display =
    method === "POST" ? "block" : "none";
}

async function sendRequest() {
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value;
  const body = document.getElementById("body").value;

  try {
    const options = { method };
    if (method === "POST" && body.trim() !== "") {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }
    const response = await fetch(url, options);
    const result = await response.json();

    document.getElementById("result").style.display = "block";
    document.getElementById("response").textContent = JSON.stringify(
      result,
      null,
      2
    );
    Prism.highlightAll();
  } catch (error) {
    document.getElementById("result").style.display = "block";
    document.getElementById("response").textContent = `Error: ${error.message}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRoutes("gogoanime-routes", "GogoAnime Routes", routes.gogoanime);
  renderRoutes("zoroanime-routes", "ZoroAnime Routes", routes.zoroanime);
});

function checkApiStatus(apiUrl, statusElementId, successText, failureText) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const statusElement = document.getElementById(statusElementId);

      if (typeof data === "boolean") {
        if (data) {
          statusElement.innerHTML = `<div class="status working">${successText}</div>`;
        } else {
          statusElement.innerHTML = `<div class="status not-working">${failureText}</div>`;
        }
      } else if (data.isWorking !== undefined) {
        if (data.isWorking) {
          statusElement.innerHTML = `<div class="status working">${successText}</div>`;
        } else {
          statusElement.innerHTML = `<div class="status not-working">${failureText}</div>`;
        }
      }
    })
    .catch(() => {
      const statusElement = document.getElementById(statusElementId);
      statusElement.innerHTML = `<div class="status not-working">${failureText}</div>`;
    });
}

// Call on page load for ZoroAnime & GogoAnime
document.addEventListener("DOMContentLoaded", () => {
  checkApiStatus(
    "/api/zoroanime/iszoroworking",
    "zoro-status",
    "✅ ZoroAnime Working",
    "❌ ZoroAnime Not Working"
  );

  checkApiStatus(
    "/api/gogoanime/isworking",
    "gogo-status",
    "✅ GogoAnime Working",
    "❌ GogoAnime Not Working"
  );
});