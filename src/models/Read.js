import { elements, elementStrings } from "../views/base";


export default class Read {
    constructor(storageRead) {

        if(storageRead) {
            this.read = [...storageRead];
        } else {
            this.read = [];
        }
        
    }


    addRead(article, guid) {
        //add bookmark to state.bookmarks 
        this.read.push(article);

        // update UI bookmark count 
        elements.rreadCount.innerHTML = state.read.getReadCount();

        // Persist data in localStorage
        this.persistData();

    }


    isRead(guid) {
    
        for (const article of state.read.read)
            if (article.dataset) {
                // if HTML origin
                if (article.dataset.guid === guid) {

                    return true;
                }
            } else {
                // if JSON origin
                if (article.guid === guid) {

                    return true;
                }
            }
    }


    
    persistData() {
        let readJSON = [];
        let obj = {};

        for (const element of this.read) {

            readJSON.push({
                "guid": (element.dataset) ? `${element.dataset.guid}` : `${element.guid}`,
                "outerHTML": element.outerHTML
            });
        }

        localStorage.setItem('read', JSON.stringify(readJSON));    
    }


    
    getReadCount() {
        if (state.read.read.length < 1) {
            return " ";   
        } else {
            return this.read.length;
        }
    }













}  // END Read class