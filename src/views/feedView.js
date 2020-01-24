import { elements } from './base';

export const renderArticle = (article, parent) => { 

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1;

    // let date = `${}${}`
    const [pubDate, pubTime] = article.pubDate.split(" ");
    const [pubYr, pubMo, pubDd] = article.pubDate.split("-");
    // console.log(pubYr, pubMo, pubDd);

    const markup = `
    <div class="article-box">
        <div class="article-img-wrapper">
            <img src=${article.enclosure.thumbnail} alt="image">
        </div>
        <h3 class="article-title">${article.title}</h3>
        <div class="article-data-row">
                <span class=article-board>Read Later</span>
                <span class=article-age>${article.pubDate}</span>
        </div>
        <p class="article-text">${article.description}</p>
    </div>
    `  
    document.querySelector(parent).insertAdjacentHTML('beforeend', markup);

}

export const clearArticles = parent => {
    parent.innerHTML = "";
}