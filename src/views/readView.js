import { elements } from './base';

export const renderReadArticle = (article, articleIndex) => { 

    // const markup = `
    // <div class="article-box-${articleIndex}, article-box" data-guid=${article.guid}>
    //     <div class="article-img-wrapper">
    //         <img src=${article.enclosure.thumbnail} class=article-img-${articleIndex} alt="image">
            
    //         <div class="overlay-icon-row-${articleIndex} overlay-icon-row">
    //             <span class="overlay-icon"><i class="fas fa-bookmark bookmark bookmark-${articleIndex}"></i></span>
    //             <span class="overlay-icon"><i class="fas fa-check"></i></span>
    //         </div>
        
    //     </div>
    //     <h3 class="article-title">${article.title}</h3>
    //     <div class="article-data-row-${articleIndex} article-data-row">
    //             <span class="article-board"></span>
    //             <span class="article-age">${article.pubDate}</span>
    //     </div>
    //     <p class="article-text">${article.description}</p>
    // </div>
    // `  


    // remove article hover state / update article index
    let matchObj = {
        show: " ",
        "article-img-wrapper-hover": " ",
        "box-0": `box-${articleIndex}`,
        "row-0": `row-${articleIndex}`,
        "img-0": `img-${articleIndex}`,


        "box-1": `box-${articleIndex}`,
        "row-1": `row-${articleIndex}`,
        "img-1": `img-${articleIndex}`,


        "box-2": `box-${articleIndex}`,
        "row-2": `row-${articleIndex}`,
        "img-2": `img-${articleIndex}`,


        "box-3": `box-${articleIndex}`,
        "row-3": `row-${articleIndex}`,
        "img-3": `img-${articleIndex}`,


        "box-4": `box-${articleIndex}`,
        "row-4": `row-${articleIndex}`,
        "img-4": `img-${articleIndex}`,


        "box-5": `box-${articleIndex}`,
        "row-5": `row-${articleIndex}`,
        "img-5": `img-${articleIndex}`,


        "box-6": `box-${articleIndex}`,
        "row-6": `row-${articleIndex}`,
        "img-6": `img-${articleIndex}`,


        "box-7": `box-${articleIndex}`,
        "row-7": `row-${articleIndex}`,
        "img-7": `img-${articleIndex}`,


        "box-8": `box-${articleIndex}`,
        "row-8": `row-${articleIndex}`,
        "img-8": `img-${articleIndex}`,


        "box-9": `box-${articleIndex}`,
        "row-9": `row-${articleIndex}`,
        "img-9": `img-${articleIndex}`,

    }

    //remove classes from article's outerHTML
    const doctoredArticle = article.outerHTML.replace(
        /show|article-img-wrapper-hover|box-0|box-1|box-2|box-3|box-4|box-5|box-6|box-7|box-8|box-9|row-0|row-1|row-2|row-3|row-4|row-5|row-6|row-7|row-8|row-9|img-0|img-1|img-2|img-3|img-4|img-5|img-6|img-7|img-8|img-9/gi, matched => {
        return matchObj[matched];
    });

    elements.articlesView.insertAdjacentHTML('beforeend', doctoredArticle);
}

export const clearArticles = parent => {
    parent.innerHTML = "";
}
