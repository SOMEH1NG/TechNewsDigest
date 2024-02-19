document.addEventListener('DOMContentLoaded', function () {
    const categories = ["India", "Business", "Politics", "Sports", "Technology", "Startups", "Entertainment", "International", "Automobile", "Science", "Travel", "Miscellaneous", "Fashion", "Education", "Health & Fitness", "Anime", "Mixed"];

    const navList = document.querySelector('.navbar-nav');
    const newsList = document.getElementById('newsList');

    categories.forEach(category => {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.innerHTML = `<a class="nav-link" href="#" id="${category.toLowerCase()}">${category}</a>`;
        navList.appendChild(navItem);

        navItem.addEventListener('click', () => {
            fetchNews(category);
            // Close the navbar after clicking on a category
            document.querySelector('.navbar-toggler').click();
        });
    });

    // Fetch news for all categories initially
    fetchNews('Mixed');

    setInterval(() => {
        // Periodic fetch for all categories
        fetchNews('Mixed');
    }, 3600000);

    async function fetchNews(category) {
        try {
            let apiUrl;
            if (category.toLowerCase() === 'mixed') {
                apiUrl = 'https://api.qewertyy.dev/news/all';
            } else {
                apiUrl = `https://api.qewertyy.dev/news/${category.toLowerCase().replace(/ /g, '-')}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.code === 2) {
                const articles = data.content;
                newsList.innerHTML = '';

                articles.forEach((article, index) => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    newsItem.innerHTML = `
                        <h5 class="news-title">${index + 1}. ${article.title}</h5>
                        <img src="${article.imageUrl}" class="news-image" alt="News Image">
                        <p class="news-content">${article.content}</p>
                        <button class="read-more-btn" onclick="window.open('${article.url}', '_blank')">Read More</button>
                    `;
                    newsList.appendChild(newsItem);
                });
            } else {
                console.error(`Failed to fetch ${category} news:`, data.message);
            }
        } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
        }
    }
});
