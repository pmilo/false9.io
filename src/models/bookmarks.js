import { elements, elementStrings } from "../views/base";

export default class Bookmarks {
    constructor(storageData) {

        if(storageData) {
            this.bookmarks = [...storageData];
        } else {
            this.bookmarks = [];
        }
        
    }

    addBookmark(bookmark, guid) {
        //add bookmark to state.bookmarks 
        this.bookmarks.push(bookmark);

        // update UI bookmark count 
        elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();

        // Persist data in localStorage
        this.persistData();

    }

    deleteBookmark(guid) {
        let index;
        for (const bookmark of state.bookmarks.bookmarks) {
            if (!state.bookmarks.dataset) {
               if (bookmark.guid === guid) {
                index = state.bookmarks.bookmarks.indexOf(bookmark);
               }
            } else {
                if (bookmark.dataset.guid === guid) {
                    index = state.bookmarks.indexOf(bookmark);
                }
            //    index = bookmark.dataset.guid.find(el => el.dataset.guid === guid);
            }
        }
        this.bookmarks.splice(index, 1);

        // update UI bookmark count 
        elements.bookmarkedCount.innerHTML = state.bookmarks.getBookmarksCount();

        // Persist data in localStorage
        this.persistData();
    }

    isBookmarked(guid) {
        // if findIndex cannot find the passed in id after looping through the likes array, the output = -1
        // if the id can NOT be found the findIndex method outputs 'false'
        // if the id CAN be found the findIndex method outputs 'true'
        
        for (const bookmark of state.bookmarks.bookmarks)
            if (bookmark.dataset) {
                if (bookmark.dataset.guid === guid) {
                    return true;
                }
            } else {
                if (bookmark.guid === guid) {
                    return true;
                }
            }
    }

    persistData() {
        let bookmarksJSON = [];
        let obj = {};

        for (const element of this.bookmarks) {

            bookmarksJSON.push({
                "guid": (element.dataset) ? `${element.dataset.guid}` : `${element.guid}`,
                "outerHTML": element.outerHTML,
            });
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarksJSON));    
    }

    getBookmarksCount() {
        // console.log('state.bookmarks.bookmarks.length @ getBookmarksCount:');
        // console.log(state.bookmarks.bookmarks.length);
        if (state.bookmarks.bookmarks.length < 1) {
            return " ";   
        } else {
            return this.bookmarks.length;
        }
    }

    getStorage() {
         // convert localStorage.bookmarks to arroy:
         const storage = JSON.parse(localStorage.getItem('bookmarks'));
         return storage;
    }




} // END Bookmarks class
