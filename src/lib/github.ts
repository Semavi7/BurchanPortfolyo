// src/lib/github.ts

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "semavi7"; // .env'den alır yoksa bunu kullanır
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Private repolar için ZORUNLU

export async function fetchGithubRepos() {
  console.log(`🌐 GitHub'dan ${GITHUB_USERNAME} kullanıcısının projeleri çekiliyor...`);

  try {
    const headers: HeadersInit = {
      "Accept": "application/vnd.github.v3+json",
    };

    // Private repolar için token ZORUNLU
    if (!GITHUB_TOKEN) {
      console.warn("⚠️ GITHUB_TOKEN bulunamadı. Sadece public repolar çekilecek.");
    } else {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    // /user/repos endpoint'i token varsa public + private tüm repoları çeker
    // /users/:username/repos sadece public repoları döner
    const endpoint = GITHUB_TOKEN
      ? `https://api.github.com/user/repos?sort=updated&per_page=100&type=owner`
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

    const response = await fetch(endpoint, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API Hatası: ${response.statusText}`);
    }

    const repos = await response.json();

    // 1. Fork olmayanları (kendi projelerini) filtrele
    // 2. Yıldız sayısına göre sırala (En popüler en üstte)
    // 3. İlk 10 projeyi al (Çok fazla çöp veri olmasın)
    const myRepos = repos
      .filter((repo: any) => !repo.fork) 
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 40);

    console.log(`✅ GitHub'dan ${myRepos.length} adet proje çekildi.`);

    // Bizim RAG sistemine uygun formata çevir
    return myRepos.map((repo: any) => ({
      title: repo.name,
      description: repo.description || "Açıklama girilmemiş.",
      tech: `Dil: ${repo.language || "Belirsiz"} | Konular: ${repo.topics?.join(", ") || "Yok"}`,
      link: repo.html_url,
      stars: repo.stargazers_count
    }));

  } catch (error) {
    console.error("GitHub Fetch Hatası:", error);
    return []; // Hata olursa boş liste dön, sistemi kırma
  }
}