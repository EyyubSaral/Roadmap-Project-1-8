const languageSelect = document.getElementById("language");
const fetchBtn = document.getElementById("fetchBtn");
const repoContainer = document.getElementById("repo");
const loading = document.getElementById("loading");

async function fetchRandomRepo(language) {
  const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=30`;

  try {
    loading.textContent = "Yükleniyor...";
    repoContainer.innerHTML = "";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("GitHub API hatası");
    }

    const data = await response.json();

    if (data.items.length === 0) {
      throw new Error("Repo bulunamadı");
    }

    const randomIndex = Math.floor(Math.random() * data.items.length);
    return data.items[randomIndex];
  } catch (error) {
    repoContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    return null;
  } finally {
    loading.textContent = "";
  }
}


function renderRepo(repo) {
  if (!repo) return;

  repoContainer.innerHTML = `
    <div class="repo-card">
      <h2>
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
        </a>
      </h2>
      <p>${repo.description ?? "Açıklama yok"}</p>

      <ul>
        <li>⭐ Stars: ${repo.stargazers_count}</li>
        <li>🍴 Forks: ${repo.forks_count}</li>
        <li>🐞 Open Issues: ${repo.open_issues_count}</li>
      </ul>
    </div>
  `;
}


fetchBtn.addEventListener("click", async () => {
  const language = languageSelect.value;

  if (!language) {
    alert("Lütfen bir programlama dili seçin");
    return;
  }

  const repo = await fetchRandomRepo(language);
  renderRepo(repo);
});
