document.addEventListener('DOMContentLoaded', function () {
    fetchAllNews();

    async function fetchAllNews() {
        try {
            const response = await fetch('https://api.qewertyy.dev/news');
            const data = await response.json();

            if (data.code === 2) {
                const articles = data.content;
                const newsList = document.getElementById('newsList');

                articles.forEach((article, index) => {
                    const newsItem = createNewsItem(article, index + 1);
                    newsList.appendChild(newsItem);
                });
            } else {
                console.error('Failed to fetch news:', data.message);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    function createNewsItem(article, index) {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h5 class="news-title">${index}. ${article.title}</h5>
            <img src="${article.imageUrl}" class="news-image" alt="${article.title}">
            <p class="news-content">${article.description}</p>
            <button class="read-more-btn" onclick="window.open('${article.url}', '_blank')">Read More</button>
        `;
        return newsItem;
    }
});
