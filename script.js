document.addEventListener("DOMContentLoaded", function () {
    // Fetch news data from the API
    fetch("https://api.qewertyy.dev/news/categories")
        .then(response => response.json())
        .then(data => {
            // Display default category news (India)
            displayNews(data['India']);

            // Populate categories in the navbar
            populateCategories(Object.keys(data));
            
            // Add event listener for category selection in the navbar
            document.getElementById('navbarNav').addEventListener('click', function (event) {
                if (event.target.classList.contains('nav-link')) {
                    const selectedCategory = event.target.dataset.category;
                    displayNews(data[selectedCategory]);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateCategories(categories) {
    const navbarList = document.querySelector('.navbar-nav');

    // Add a list item for each category in the navbar
    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        const link = document.createElement('a');
        link.classList.add('nav-link');
        link.setAttribute('href', '#');
        link.setAttribute('data-category', category);
        link.textContent = category;

        listItem.appendChild(link);
        navbarList.appendChild(listItem);
    });
}

function displayNews(news) {
    // Clear previous news
    document.getElementById('newsContainer').innerHTML = '';

    // Display each news article
    news.forEach(article => {
        const newsElement = document.createElement('div');
        newsElement.classList.add('card', 'mb-3');
        newsElement.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${article.image}" class="card-img" alt="${article.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('newsContainer').appendChild(newsElement);
    });
}
