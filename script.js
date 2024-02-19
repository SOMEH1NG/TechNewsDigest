document.addEventListener('DOMContentLoaded', function () {
    const categories = ["India", "Business", "Politics", "Sports", "Technology", "Startups", "Entertainment", "International", "Automobile", "Science", "Travel", "Miscellaneous", "Fashion", "Education", "Health & Fitness", "Anime"];

    const navList = document.querySelector('.nav-list');
    const newsList = document.getElementById('newsList');

    categories.forEach(category => {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.innerHTML = `<a class="nav-link" data-category="${category}" href="#">${category}</a>`;
        navList.appendChild(navItem);

        navItem.addEventListener('click', () => {
            fetchNews(category);
        });
    });

    categories.forEach(category => {
        fetchNews(category);
    });

    setInterval(() => {
        categories.forEach(category => {
            fetchNews(category);
        });
    }, 3600000);

    async function fetchNews(category) {
        try {
            const response = await fetch(`https://api.qewertyy.dev/news/${category}`);
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
      
