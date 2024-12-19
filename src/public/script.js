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
      url: "/api/gogoanime/animenfo?id=anime-id",
      description: "Fetch anime information of a specific anime.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/episodesource?id=episode-id",
      description: "Fetch episode source.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/episode?id=episode-id",
      description: "Fetch a specific episode.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/popularanime",
      description: "Fetch popular anime.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/genrelist",
      description: "Fetch list of genres.",
    },

    {
      method: "GET",
      url: "/api/gogoanime/movies",
      description: "Fetch movies.",
    },
    {
      method: "GET",
      url: "/api/gogoanime/isworking",
      description: "Check if GogoAnime is working.",
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
    {
      method: "GET",
      url: "/api/zoroanime/mostfavorite",
      description: "Get Most Favorite Anime.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/recentlyupdated",
      description: "Get Recently Updated Anime.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/episodesource?id=episode_id",
      description: "Get Episode Source.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/recentlyadded",
      description: "Get Recently Added Anime.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/animeinfo?id=anime_id",
      description: "Get Anime Info.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/genres",
      description: "Get Anime Genres.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/searchbygenre?genre=genre_name",
      description: "Search Anime By Genre.",
    },

    {
      method: "GET",
      url: "/api/zoroanime/iszoroworking",
      description: "Check if ZoroAnime is working.",
    },
    {
      method: "GET",
      url: "/api/zoroanime/movie",
      description: "Get Movies.",
    },
  ],
};

// Render Routes in UI
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
      <button onclick="testApi('${method}', '${url}')">
        <i class="fas fa-arrow-right"></i>
      </button>
    `;
    ul.appendChild(li);
  });

  section.appendChild(ul);
}

// Test API Form
function testApi(method, url) {
  document.getElementById("testForm").style.display = "block";
  document.getElementById("method").value = method;
  document.getElementById("url").value = url;
  document.getElementById("body").style.display =
    method === "POST" ? "block" : "none";

  document.getElementById("testForm").scrollIntoView({ behavior: "smooth" });
}

// Handle Send Request
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

    const responseElement = document.getElementById("response");
    responseElement.textContent = JSON.stringify(result, null, 2);

    // Apply syntax highlighting
    hljs.highlightElement(responseElement);
  } catch (error) {
    document.getElementById("result").style.display = "block";

    const responseElement = document.getElementById("response");
    responseElement.textContent = `Error: ${error.message}`;

    // Apply syntax highlighting for error messages as well
    hljs.highlightElement(responseElement);
  }
}

// DOMContentLoaded to Render Routes
document.addEventListener("DOMContentLoaded", () => {
  renderRoutes("gogoanime-routes", "GogoAnime Routes", routes.gogoanime);
  renderRoutes("zoroanime-routes", "ZoroAnime Routes", routes.zoroanime);
});

// Highlight response JSON safely
function displayResponse(data) {
  const responseElement = document.getElementById("response");

  try {
    const prettyJson = JSON.stringify(data, null, 2);

    responseElement.textContent = prettyJson;
    hljs.highlightElement(responseElement);
  } catch (error) {
    responseElement.textContent = "Error parsing response!";
  }
}
