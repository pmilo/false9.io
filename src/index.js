import "./main.css";
import "./normalize.css";

import { elements, elementStrings } from './views/base';
import Feed from "./models/Feed";
import * as feedView from "./views/feedView";
import Bookmarks from "./models/bookmarks";

const state = {};
window.state = state;

const storageData = JSON.parse(localStorage.getItem('bookmarks'));
state.bookmarks = new Bookmarks();

// TODO: ADD LOCALSTORAGE BOOKMARKS TO STATE ON PAGE RELOAD

if (storageData) {
    state.bookmarks = new Bookmarks(storageData);
} else {
    state.bookmarks = new Bookmarks();
}

console.log('storageData @ index.js:')
console.log(storageData)

elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();

// =============================================================================

// FEED CONTROLLER

// =============================================================================


const controlFeed = async () => {

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.goal.com%2Ffeeds%2Fen%2Fnews`

    // Clear articles view page
    feedView.clearArticles(elements.articlesView);

    // Render loader


    // Fetch RSS Feed articles
    state.feed = new Feed(url);
    await state.feed.getNews();

    // Render fetched RSS Feed articles
    state.feed.data.forEach(article => {
        feedView.renderArticle(article, state.feed.data.indexOf(article), storageData); //replace 2nd argument with elements.articlesView.className(?)
    });

    const articleBoxes =  Array.from(document.querySelectorAll(elementStrings.articleBoxes));

    for (const box of articleBoxes) {

        ['mouseover','mouseout'].forEach(evt => {
            box.addEventListener(evt, e => {
                
                let index = articleBoxes.indexOf(box)

                // get article image
                let articleImg = document.querySelector(`.article-img-${index}`)

                // apply img filter -- LATER
                
                // get overlay row
                const iconOverlayRow = document.querySelector(`.overlay-icon-row-${index}`)
        
                // add .show class to overlay row
                iconOverlayRow.parentNode.classList.toggle("article-img-wrapper-hover");  
                iconOverlayRow.classList.toggle("show");  

            })                              
        });
    }


    // get overlay icon elements
    const overlayIcons = document.querySelectorAll(`${elementStrings.overlayIconRow} i`);

    for (const icon of overlayIcons) {
        // add overlay icons icons click eventlistener
        icon.addEventListener('click', e => {
             // apply active icon colour
            e.target.classList.toggle("active-icon");

        })            
    }




    // get bookmark overlay icons
    const bookmarkIcons = document.querySelectorAll(elementStrings.bookmarkIcons);
 
    // add overlay bookmark icons click eventlistener
    for (const icon of bookmarkIcons) {
        icon.addEventListener('click', e => {

            // get clicked article-board element
            const bookmarked = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            const index = bookmarked.classList[0].replace( /[\D,]+/g, ''); // // replace all non-digits,commas with nothing
            const guid = bookmarked.dataset.guid;

            let bookmarkedElementJSON = JSON.stringify(bookmarked);
            console.log('bookmarked @ index.js:');
            console.log(bookmarked);

            
            const articleCata = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`)
            // const bookmarkedCount = document.querySelector('elements.bookmarkedCount');
          
            // update article-board element heading
            if (articleCata.innerHTML === "Bookmarked") {
                articleCata.innerHTML = "";
                // elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();
            } else {
                articleCata.innerHTML = "Bookmarked";
                // elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();
            }

            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.bookmarks.isBookmarked(guid)) {
                state.bookmarks.addBookmark(bookmarked, guid);
            } else {
                state.bookmarks.deleteBookmark(guid);
            }
        })
    }
    
    



} // End controlFeed

controlFeed();

    
    // get bookmarked nav element

    // add click event listener

        // clear article board
        // change article board heading & desc.
        // render bookmarked articles from state    
    




// localStorate.setItem('id', 'sadasdasdasd');

// localStorage.getItem('id'); // will return "sadasdasdasd"
// localStorage.removeItem('id'); // will remove id item


























// =============================================================================
// Event Listeners
// =============================================================================

// setTimeout(() => {alert("hi")}, 8000);




// document.querySelector('.article-box:nth-of-type(4) img');