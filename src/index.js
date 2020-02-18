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
// INIT
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
    elements.boardTitle.innerHTML = "Today";
    elements.boardDesc.innerHTML = "Stay ahead of the game with the lastest football news!";

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
                
                const index = articleBoxes.indexOf(box)

                // get article image
                const articleImg = document.querySelector(`.article-img-${index}`)

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
            // console.log(bookmarked);
            
            const index = bookmarked.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            const guid = bookmarked.dataset.guid;

            let bookmarkedElementJSON = JSON.stringify(bookmarked);
         
            const articleCata = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`);
          
            // update article-board element heading
            if (articleCata.innerHTML === "Bookmarked") {
                articleCata.innerHTML = "";
                
            } else {
                articleCata.innerHTML = "Bookmarked";
            }

            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.bookmarks.isBookmarked(guid)) {
                state.bookmarks.addBookmark(bookmarked, guid);
                // console.log(guid);
                
            } else {
                console.log(guid);
                state.bookmarks.deleteBookmark(guid);
                // console.log(guid);
            }
        })
    }








    const readIcons = document.querySelectorAll(elementStrings.readIcons);

    for (const icon of readIcons) {
        icon.addEventListener('click', e => {

            // get clicked article-board element
            const clickedArticle = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            // console.log(bookmarked);
            
            const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            const guid = clickedArticle.dataset.guid;

            // let bookmarkedElementJSON = JSON.stringify(bookmarked);
    
            // const articleCata = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`);
          
            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.read.isRead(guid)) {
                state.read.addRead(clickedArticle, guid);
                // console.log(guid);
                
            } else {
                console.log(guid);
                state.read.deleteRead(guid);
                // console.log(guid);
            }
        })
    }









        // get article href elements 
        const aTags = document.querySelectorAll('a');
        
        // add click event listener to all 
        for (const item of aTags) {

            item.addEventListener('click', e => {

                const clickedArticle = e.currentTarget.parentNode;
                const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
                const guid = clickedArticle.dataset.guid;

                let clickedArticleJSON = JSON.stringify(clickedArticle);

                // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
                if (!state.read.isRead(guid)) {
                    state.read.addRead(clickedArticle, guid);
                    // console.log(guid);
                    
                } else {
                    console.log(guid);
                    state.read.deleteRead(guid);
                    // console.log(guid);
                }

            });
        }

} // End controlFeed
controlFeed();






// =============================================================================
// BOOKMARKED CONTROLLER - RENDER 
// =============================================================================

const controlBookmarked = () => {
    //update page heading/description
    elements.boardTitle.innerHTML = "Bookmarked";
    elements.boardDesc.innerHTML = "Your bookmarked articles...";


    // clear articles-view
    feedView.clearArticles(elements.articlesView);

    // render state.bookmarks.bookmarks - check overlay button event listening
    state.bookmarks.bookmarks.forEach(article => {
        bookmarksView.renderBookmarkedArticle(article, state.bookmarks.bookmarks.indexOf(article)); //replace 2nd argument with elements.articlesView.className(?)
        
    });




    const renderedArticlesB =  Array.from(document.querySelectorAll(elementStrings.articleBoxes));

    for (const box of renderedArticlesB) {

        ['mouseover','mouseout'].forEach(evt => {
            box.addEventListener(evt, e => {
                
                const indexB = renderedArticlesB.indexOf(box)

                // get article image
                const articleImgB = document.querySelector(`.article-img-${indexB}`)

                // apply img filter -- LATER
                
                // get overlay row
                const iconOverlayRowB = document.querySelector(`.overlay-icon-row-${indexB}`)
        
                // add .show class to overlay row
                iconOverlayRowB.parentNode.classList.toggle("article-img-wrapper-hover");  
                iconOverlayRowB.classList.toggle("show");  

            })                              
        });
    }



    // get overlay icon elements
    const overlayIconsB = document.querySelectorAll(`${elementStrings.overlayIconRow} i`);

    for (const icon of overlayIconsB) {
        // add overlay icons icons click eventlistener
        icon.addEventListener('click', e => {
            // apply active icon colour
            e.target.classList.toggle("active-icon");

        })            
    }



    
    const bookmarkIconsB = document.querySelectorAll(elementStrings.bookmarkIcons);

    // add overlay bookmark icons click eventlistener
    for (const icon of bookmarkIconsB) {
        icon.addEventListener('click', e => {

            // get clicked article-board element
            const bookmarkedB = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            const indexB = bookmarkedB.classList[0].replace( /[\D,]+/g, ''); // // replace all non-digits,commas with nothing
            const guidB = bookmarkedB.dataset.guid;

            let bookmarkedElementJSON = JSON.stringify(bookmarkedB);
            
            const articleCataB = document.querySelector(`.article-data-row-${indexB} ${elementStrings.articleBoard}`)
        
            // update article-board element heading
            if (articleCataB.innerHTML === "Bookmarked") {
                articleCataB.innerHTML = "";
            } else {
                articleCataB.innerHTML = "Bookmarked";
            }

            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.bookmarks.isBookmarked(guidB)) {
                state.bookmarks.addBookmark(bookmarkedB, guidB);                
            } else {
                console.log(guidB);
                state.bookmarks.deleteBookmark(guidB);
            }
        })
    }





    const readIcons = document.querySelectorAll(elementStrings.readIcons);

    for (const icon of readIcons) {
        icon.addEventListener('click', e => {

            // get clicked article-board element
            const clickedArticle = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
            // console.log(bookmarked);
            
            const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            const guid = clickedArticle.dataset.guid;

            // let bookmarkedElementJSON = JSON.stringify(bookmarked);
    
            // const articleCata = document.querySelector(`.article-data-row-${index} ${elementStrings.articleBoard}`);
        
            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.read.isRead(guid)) {
                state.read.addRead(clickedArticle, guid);
                // console.log(guid);
                
            } else {
                console.log(guid);
                state.read.deleteRead(guid);
                // console.log(guid);
            }
        })
    }







    const aTags = document.querySelectorAll('a');
    
    // add click event listener to all 
    for (const item of aTags) {

        item.addEventListener('click', e => {

            const clickedArticle = e.currentTarget.parentNode;
            const index = clickedArticle.classList[0].replace( /[\D,]+/g, ''); // replace all non-digits,commas with nothing
            const guid = clickedArticle.dataset.guid;

            let clickedArticleJSON = JSON.stringify(clickedArticle);

            // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
            if (!state.read.isRead(guid)) {
                state.read.addRead(clickedArticle, guid);
                // console.log(guid);
                
            } else {
                console.log(guid);
                state.read.deleteRead(guid);
                // console.log(guid);
            }

        });

    }
console.log('end of controlBookmarked function!');
} // End controlBookmarked

elements.navBookmarked.addEventListener('click', e => controlBookmarked())
        
    



// =============================================================================
// TODAY/FEED CONTROLLER - RENDER 
// =============================================================================

elements.navToday.addEventListener('click', e => controlFeed())





// =============================================================================
// RECENTLY READ CONTROLLER - RENDER 
// =====h========================================================================

const controlRead = () => {

    elements.boardTitle.innerHTML = "Recently Read";
    elements.boardDesc.innerHTML = "Your recently read articles...";
    
    
    // clear articles-view
    feedView.clearArticles(elements.articlesView);
    
    // render state.bookmarks.bookmarks - check overlay button event listening
    state.read.read.forEach(article => {
        readView.renderReadArticle(article, state.read.read.indexOf(article)); 
    });
    
    //function wrap --------------------------------------------------------------------------------------------------------------
        const renderedArticlesB =  Array.from(document.querySelectorAll(elementStrings.articleBoxes));
    
        for (const box of renderedArticlesB) {
    
            ['mouseover','mouseout'].forEach(evt => {
                box.addEventListener(evt, e => {
                    
                    const indexB = renderedArticlesB.indexOf(box)
    
                    // get article image
                    const articleImgB = document.querySelector(`.article-img-${indexB}`)
    
                    // apply img filter -- LATER
                    
                    // get overlay row
                    const iconOverlayRowB = document.querySelector(`.overlay-icon-row-${indexB}`)
            
                    // add .show class to overlay row
                    iconOverlayRowB.parentNode.classList.toggle("article-img-wrapper-hover");  
                    iconOverlayRowB.classList.toggle("show");  
    
                })                              
            });
        }
    
    
    
        // get overlay icon elements
        const overlayIconsB = document.querySelectorAll(`${elementStrings.overlayIconRow} i`);
    
        for (const icon of overlayIconsB) {
            // add overlay icons icons click eventlistener
            icon.addEventListener('click', e => {
                // apply active icon colour
                e.target.classList.toggle("active-icon");
    
            })            
        }
    
    
    
        
        const bookmarkIconsB = document.querySelectorAll(elementStrings.bookmarkIcons);
    
        // add overlay bookmark icons click eventlistener
        for (const icon of bookmarkIconsB) {
            icon.addEventListener('click', e => {
    
                // get clicked article-board element
                const bookmarkedB = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
                const indexB = bookmarkedB.classList[0].replace( /[\D,]+/g, ''); // // replace all non-digits,commas with nothing
                const guidB = bookmarkedB.dataset.guid;
    
                let bookmarkedElementJSON = JSON.stringify(bookmarkedB);
                // console.log('bookmarked @ index.js:');
                // console.log(bookmarked);
    
                
                const articleCataB = document.querySelector(`.article-data-row-${indexB} ${elementStrings.articleBoard}`)
                // const bookmarkedCount = document.querySelector('elements.bookmarkedCount');
            
                // update article-board element heading
                if (articleCataB.innerHTML === "Bookmarked") {
                    articleCataB.innerHTML = "";
                    // elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();
                } else {
                    articleCataB.innerHTML = "Bookmarked";
                    // elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();
                }
    //function wrap --------------------------------------------------------------------------------------------------------------
                
                // add bookmarked article to state if guid e.target dataset guid is not found at state.bookmarks
                if (!state.bookmarks.isBookmarked(guidB)) {
                    state.bookmarks.addBookmark(bookmarkedB, guidB);
                    // console.log(guid);
                    console.log(state.bookmarks);
                    
                } else {
                    console.log(guidB);
                    state.bookmarks.deleteBookmark(guidB);
                    // console.log(guid);
                    console.log(state.bookmarks);
    
                }
            })
        }
    console.log('end of controlRead function!');
    
    } // End controlRead    


elements.navDocRead.addEventListener('click', e => controlRead())









// =============================================================================
// OTHER EVENT LISTENERS 
// =============================================================================

elements.navMenu.addEventListener('click', e => {

    if (elements.navList.classList.contains('collapse-width')) {
        elements.navList.classList.remove('collapse-width');
        elements.navList.classList.toggle('expand-width');
    } else {
        elements.navList.classList.remove('expand-width');
        elements.navList.classList.toggle('collapse-width');
    }
})

// let articlesHeaderTitle = document.querySelector('.articles-header-title');

// console.log(headerElements);


window.addEventListener('scroll', e => {
    if (window.scrollY >= 80) {

            elements.pageIcons.classList.remove('no-display');
            elements.articlesHeaderTitle.innerHTML = elements.boardTitle.innerHTML;
        } else {
            elements.pageIcons.classList.add('no-display');
            elements.articlesHeaderTitle.innerHTML = "";
        }
});


elements.navDocRSS.addEventListener('click', e => {
    controlFeed();
})


// const navDocBook = document.querySelector('.nav-doc .fa-bookmark');

elements.navDocBook.addEventListener('click', e => {
    controlBookmarked();
})