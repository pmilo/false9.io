import { elements, elementStrings } from './base';
// import Feed from '../models/Feed';

export const renderArticle = (article, articleIndex, storageData) => { 

    const markup = `
    <div class="article-box-${articleIndex}, article-box" data-guid=${article.guid}>
        <div class="article-img-wrapper">
            <img src=${article.enclosure.thumbnail} class=article-img-${articleIndex} alt="image">
            
            <div class="overlay-icon-row-${articleIndex} overlay-icon-row">
                <span class="overlay-icon"><i class="fas fa-bookmark bookmark bookmark-${articleIndex}" title="Toggle Bookmark"></i></span>
                <span class="overlay-icon"><i class="fas fa-check check-${articleIndex}" title="Toggle Read"></i></span>
            </div>
        </div>
        <a href=${article.link} target="_blank">
            <h3 class="article-title">${article.title}</h3>
            <div class="article-data-row-${articleIndex} article-data-row">
            <div class="article-info">
            <span class="article-board"></span>
                    <span class="article-source" title="Source">Goal.com&nbsp;&nbsp;&nbsp;/</span>
                    <span class="article-age" title="Published"><i class="far fa-calendar"></i>${state.feed.calcDaysAgo(article.pubDate)}</span>
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

export const updateBanner = (board = "today", articleCount) => {
    elements.boardTitle.innerHTML = board;

    if (board === "today") {
        elements.boardDesc.innerHTML = `stay ahead of the game with the latest football news.`;
    } else {
        let articleStr;
        articleCount === 1 ? articleStr = "article" : articleStr = "articles";

        if (board === "bookmarks") { board = "bookmarked" }
        elements.boardDesc.innerHTML = `you have <strong>${articleCount}</strong> ${board} ${articleStr}.`;
    }
}

export const initArticleBoxes = () => {

    // get article box elements
    const articleBoxes = [...document.querySelectorAll(elementStrings.articleBoxes)];

    for (const box of articleBoxes) {

        ['mouseover','mouseout'].forEach(evt => {
            box.addEventListener(evt, e => {
                
                const index = articleBoxes.indexOf(box);
                // get article image
                const articleImg = document.querySelector(`.article-img-${index}`);

                // apply img filter (currently applied css :hover selector)
                
                // get overlay row
                let iconOverlayRow = document.querySelector(`.overlay-icon-row-${index}`);

                // apply opacity/brightness class to img wrapper to facilitate icon overlay row show
                iconOverlayRow.previousElementSibling.classList.toggle("article-img-wrapper-hover");  

                // add fade-in class to icon row
                iconOverlayRow.classList.toggle("fade-in");

                // add .show class to overlay row
                // iconOverlayRow.classList.toggle("show");

            })                              
        });
    }
    setActiveOverlayIcons();
    setBookmarkIcons();
    setReadIcons();
    setAnchorTags();
}




export const setActiveOverlayIcons = () => {
    // get article overlay icons
    const overlayIcons = [...document.querySelectorAll(`${elementStrings.overlayIconRow} i`)];

    for (const icon of overlayIcons) {

        icon.addEventListener('click', e => {
            // apply active-icon colour
            e.target.classList.toggle("active-icon");
        })   
    }
}


const setBookmarkIcons = () => {
    // get bookmark overlay icons
    const bookmarkIcons = [...document.querySelectorAll(elementStrings.bookmarkIcons)];

    for (const icon of bookmarkIcons) {
        icon.addEventListener('click', e => {

            // get clicked article box element
            const bookmarked = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            // get clicked DOM article box index
            const index = bookmarked.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            // get clicked DOM article box guid
            const guid = bookmarked.dataset.guid;
            // get board title element from clicked article box
            const articleCata = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`);

            // if guid e.target dataset guid is not found at state.bookmarks, add bookmarked article to state.bookmarks 
            if (!state.bookmarks.isBookmarked(guid)) {
                // add to state.bookmarks
                state.bookmarks.addBookmark(bookmarked, guid)
                // update UI;
                articleCata.innerHTML = "Bookmarked";  
            } else {
                // remove from state.bookmarks
                state.bookmarks.deleteBookmark(guid);
                // update UI;
                articleCata.innerHTML = "";
            }
        })
    }
}


export const setReadIcons = () => {
    // get read overlay icons
    const readIcons = [...document.querySelectorAll(elementStrings.readIcons)];

    
    for (const icon of readIcons) {
        icon.addEventListener('click', e => {

           // get clicked article box element
            const clickedArticle = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            // get clicked DOM article box index
            const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            // get clicked DOM article box guid
            const guid = clickedArticle.dataset.guid;
          
            // add clicked article to state.read if guid e.target dataset guid is not found at state.read
            if (!state.read.isRead(guid)) {
                state.read.addRead(clickedArticle, guid); 
                // .rread class to clicked article to set opacity 
                clickedArticle.classList.add('rread');             
            } else {
                state.read.deleteRead(guid);
                clickedArticle.classList.remove('rread');             
            }
        })
    }
}


export const setAnchorTags = () => {
    // get ahref elements
    const aTags = [...document.querySelectorAll('a')];

    for (const item of aTags) {

        item.addEventListener('click', e => {
            // get clicked article box element
            const clickedArticle = e.currentTarget.parentNode;
    
            // get clicked DOM article box index
            const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            // get clicked article read icon
            const readIcon = document.querySelector(`.check-${index}`);
            // get clicked DOM article box guid
            const guid = clickedArticle.dataset.guid;

            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.read.isRead(guid)) {
                state.read.addRead(clickedArticle, guid);
                // .rread class to clicked article to set opacity 
                clickedArticle.classList.add('rread');
                // add active-icon class to read icon to set colour   
                readIcon.classList.add('active-icon');          
            } 
        });
    }
}

// apply for each article after rendered
export const renderArticleState = (article, index, guid, selectedBoard = "") => {
    // get article 'bookmarked' element 
    const articleBoardTitle = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`);
    // get article bookmark icon element
    const bookmarkIcon = document.querySelector(`.bookmark-${index}`);

    // check bookmarked status
    if (!state.bookmarks.isBookmarked(guid)) {
        // clear article 'bookmarked' element innerHTML
        articleBoardTitle.innerHTML = "";
        // if bookmark icon .contains active-icon class, remove it
        if (bookmarkIcon.classList.contains('active-icon')) { bookmarkIcon.classList.remove('active-icon'); }
    } else { 
       // add article 'bookmarked' status
       articleBoardTitle.innerHTML = "Bookmarked";
       // if bookmark icon does not .contains active-icon class, add it
       bookmarkIcon.classList.add('active-icon');
    }

    const readIcon = document.querySelector(`.check-${index}`);
    
// check read status
    if (!state.read.isRead(guid)) {
        if (readIcon.classList.contains('active-icon')) { readIcon.classList.remove('active-icon'); }
        if (article.classList.contains('rread')) { readIcon.classList.remove('rread'); }      
    } else { 
        if (!readIcon.classList.contains('active-icon')) { readIcon.classList.add('active-icon'); }
        if (!article.classList.contains('rread') && selectedBoard !== "read") { article.classList.add('rread'); }
        if (article.classList.contains('rread') && selectedBoard == "read") { article.classList.remove('rread'); }
        
    }
}


export const toggleArticleView = viewBtns => {
    //store article box elements
    // let articleBoxes = document.querySelectorAll(elementStrings.articleBoxes);

    // get elements & apply magazine view styling
    document.querySelectorAll(elementStrings.articleBoxes)
        .forEach(el => el.classList.toggle('mag--article-box'));

    document.querySelectorAll(elementStrings.articleImgWrapper)
        .forEach(el => el.classList.toggle('mag--article-img-wrapper'));

    document.querySelectorAll(elementStrings.articleImg)
        .forEach(el => el.classList.toggle('mag--article-img'));

    document.querySelectorAll(elementStrings.articleTitle)
        .forEach(el => el.classList.toggle('mag--article-title'));

    document.querySelectorAll(elementStrings.articleText)
        .forEach(el => el.classList.toggle('mag--article-text'));

    document.querySelectorAll(elementStrings.overlayIconRow)
        .forEach(el => el.classList.toggle('mag--overlay-icon-row'));

    document.querySelectorAll(elementStrings.overlayRowIcons)
        .forEach(el => el.classList.toggle('mag--overlay-row-icons'));    
    
    // update view icon
    // console.log(document.querySelectorAll(elementStrings.viewBtn))
    viewBtns.forEach(el => {
            if (el.firstElementChild.className.includes('fa-list')) {
                el.firstElementChild.className = "fas fa-th";
                el.firstElementChild.title = "Grid View"

                // add icon row to article-info div
                    // document.querySelectorAll('.article-box')
                    //     .forEach(articleBox => {
                    //         // get article index no
                    //         const index = articleBox.classList[0]
                    //         ///target index no from class name
                    //         .split('-')[2]
                    //         // remove comma from index string
                    //         .substr(0, 1);
                    //         // get corresponding icon row using article index
                    //         articleBox.appendChild(document.querySelector(`.article-data-row-${index}`));
                    //     })
                    
            } else {
                el.firstElementChild.className = "fas fa-list"
                el.firstElementChild.title = "Magazine View";
            }
        })

    
}