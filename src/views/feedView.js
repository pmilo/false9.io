import { elements } from './base';

export const renderArticle = (article, articleIndex, storageData) => { 

    let string = "";
    let activeIcon = "";

    if(storageData) {
       for (const item of storageData) {
        
           if (findGuid(item.guid, article.guid)){
               string = "Bookmarked";
               activeIcon = "active-icon";
           }
       }
    }

    const markup = `
    <div class="article-box-${articleIndex}, article-box" data-guid=${article.guid}>
        <div class="article-img-wrapper">
            <img src=${article.enclosure.thumbnail} class=article-img-${articleIndex} alt="image">
            
            <div class="overlay-icon-row-${articleIndex} overlay-icon-row">
                <span class="overlay-icon"><i class="fas fa-bookmark bookmark bookmark-${articleIndex} ${activeIcon}"></i></span>
                <span class="overlay-icon"><i class="fas fa-check"></i></span>
            </div>
        </div>
        <a href=${article.link} target="_blank">
            <h3 class="article-title">${article.title}</h3>
            <div class="article-data-row-${articleIndex} article-data-row">
                <span class="article-board">${string}</span>
                <div class= "article-info>
                    <span class="article-source">Goal //</span>
                    <span class="article-age"> < 24h</span>
                </div>
                
            </div>
            <p class="article-text">${article.description}</p>
        </a>
    </div>
    `  
    elements.articlesView.insertAdjacentHTML('beforeend', markup);

}

export const clearArticles = parent => {
    parent.innerHTML = "";
}


const findGuid = (bookmarkGuid, articleGuid) => {
    if (bookmarkGuid === articleGuid) {
        return true
    } else {
        return false;
    }
}
