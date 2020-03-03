import "./main.css";
import "./normalize.css";

import { elements, elementStrings } from './views/base';
import Feed from "./models/Feed";
import * as feedView from "./views/feedView";
import * as bookmarksView from "./views/bookmarksView";
import * as readView from "./views/readView";
import Bookmarks from "./models/bookmarks";
import Read from "./models/Read";



// =============================================================================
// APP INIT
// =============================================================================

function init() {
    storageData = JSON.parse(localStorage.getItem('bookmarks'));
    storageRead = JSON.parse(localStorage.getItem('read'));

    if (storageData) {
        state.bookmarks = new Bookmarks(storageData);
    } else {
        state.bookmarks = new Bookmarks();
    }
    elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();

    if (storageRead) {
        state.read = new Read(storageRead);
    } else {
        state.read = new Read();
    }
    elements.rreadCount.innerHTML = state.read.getReadCount();
};


const state = {};
window.state = state;

let storageData, storageRead;

init();



// =============================================================================
// FEED CONTROLLER - RENDER
// =============================================================================


const controlFeed = async () => {

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.goal.com%2Ffeeds%2Fen%2Fnews`


    //update page heading/description
    feedView.updateBanner();

    // Clear articles view page
    feedView.clearArticles(elements.articlesView);

    // Render loading animation

    // Fetch RSS Feed articles
    state.feed = new Feed(url);
    await state.feed.getNews();

    // Render fetched RSS Feed articles
    state.feed.data.forEach(article => {
        feedView.renderArticle(article, state.feed.data.indexOf(article), storageData); //replace 2nd argument with elements.articlesView.className(?)
    });

    // add event listeners to rendered articles
    feedView.initArticleBoxes();    

    // update rendered article state
    const DOMarticleBoxes = [...document.querySelectorAll(elementStrings.articleBoxes)];

    DOMarticleBoxes.forEach(article => {
        feedView.renderArticleState(article, article.classList[0].replace( /[\D,]+/g, ''), article.dataset.guid);
    })
} // End controlFeed

controlFeed();









// =============================================================================
// BOOKMARKED CONTROLLER - RENDER ON CLICK (NAV-LIST)
// =============================================================================

const controlBookmarked = (selectedBoard, articleCount) => {

    //update page heading/description
    feedView.updateBanner(selectedBoard, articleCount);


    // clear articles-view
    feedView.clearArticles(elements.articlesView);

    // render state.bookmarks.bookmarks - check overlay button event listening
    state.bookmarks.bookmarks.forEach(article => {
        bookmarksView.renderBookmarkedArticle(article, state.bookmarks.bookmarks.indexOf(article)); //replace 2nd argument with elements.articlesView.className(?)   
    });

    // add event listeners to rendered articles
    feedView.initArticleBoxes();

    // update rendered article state
    const DOMarticleBoxes = [...document.querySelectorAll(elementStrings.articleBoxes)];

    DOMarticleBoxes.forEach(article => {
        feedView.renderArticleState(article, article.classList[0].replace( /[\D,]+/g, ''), article.dataset.guid);
    })
} // End controlBookmarked

elements.navBookmarked.addEventListener('click', e => controlBookmarked("bookmarked", state.bookmarks.bookmarks.length))
        
    



// =============================================================================
// TODAY/FEED CONTROLLER - RENDER ON CLICK (NAV-LIST)
// =============================================================================

elements.navToday.addEventListener('click', e => controlFeed())




// =============================================================================
// RECENTLY READ CONTROLLER - RENDER ON CLICK (NAV-LIST)
// =====h========================================================================

const controlRead = (selectedBoard, articleCount) => {

    //update page heading/description
    feedView.updateBanner(selectedBoard, articleCount);
    
    // clear articles-view
    feedView.clearArticles(elements.articlesView);
    
    // render state.bookmarks.bookmarks - check overlay button event listening
    state.read.read.forEach(article => { 
        readView.renderReadArticle(article, state.read.read.indexOf(article)); 
    });

    // add event listeners to rendered articles
   feedView.initArticleBoxes();

   // update rendered article state
   const DOMarticleBoxes = [...document.querySelectorAll(elementStrings.articleBoxes)];

   DOMarticleBoxes.forEach(article => {
       feedView.renderArticleState(article, article.classList[0].replace( /[\D,]+/g, ''), article.dataset.guid, selectedBoard);
   })
    
} // End controlRead    

elements.navRRead.addEventListener('click', e => controlRead("read", state.read.read.length))




// =============================================================================
// OTHER EVENT LISTENERS 
// =============================================================================

//------------------- NAV-LIST ---------------------

elements.navMenu.addEventListener('click', e => {

    if (elements.navList.classList.contains('collapse-width')) {
        elements.navList.classList.remove('collapse-width');
        elements.navList.classList.toggle('expand-width');
        elements.navDocMid.classList.toggle('no-display');
    } else {
        elements.navList.classList.remove('expand-width');
        elements.navList.classList.toggle('collapse-width');
        elements.navDocMid.classList.toggle('no-display');
    }
})



//-------------------- WINDOW ---------------------

window.addEventListener('scroll', e => {
    var scrollLenth = 80;
    if (window.outerWidth < 543) {
        scrollLenth = 1
    }

    if (window.scrollY >= scrollLenth) {

            elements.pageIcons.classList.remove('no-display');
            elements.articlesHeaderTitle.innerHTML = elements.boardTitle.innerHTML;
        } else {
            elements.pageIcons.classList.add('no-display');
            elements.articlesHeaderTitle.innerHTML = "";
        }
});



//------------------- NAV-DOC ---------------------

elements.navDocRSS.addEventListener('click', e => {
    controlFeed();
})



elements.navDocBook.addEventListener('click', e => {
    controlBookmarked("bookmarked", state.bookmarks.bookmarks.length);
})


elements.navDocRead.addEventListener('click', e => {
    controlRead("read", state.read.read.length);
})