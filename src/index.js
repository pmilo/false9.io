import "./main.css";
import "./normalize.css";

import { elements } from './views/base';
import * as Feed from "./models/Feed";
import * as feedView from "./views/feedView";

var state = {};

const controlFeed = async () => {

    // Clear articles view page
    feedView.clearArticles(elements.articlesView);

    // Render loader

    // Fetch RSS Feed articles
    const articles = await Feed.getNews() 
    
    // Render fetched articles
    articles.forEach(article => {
        feedView.renderArticle(article, ".articles-view"); //replace 2nd argument with elements.articlesView.className(?)
    });        
}

controlFeed();





