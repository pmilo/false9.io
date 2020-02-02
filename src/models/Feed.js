// const crossOrigin = "https://crossorigin.me/"
    
export default class Feed {
    constructor(url) {
        this.url = url;
    }

    async getNews() {
        try {
            const res = await fetch(this.url);
            const json = await res.json();

            // console.log('json');
            // console.log(json);

            this.data = await json.items;

        } catch(error) {
            alert(error);
        }
        

        // const res = await fetch(this.url);
        // this.data = await res.json();

        // console.log('data.items:');
        // console.log(data.items);

        // return this.data;
    }

}




    // export const hoursPublished = (pubDate) => {
        
    // const today = new Date();
    // const dd = today.getDate();
    // const mm = today.getMonth()+1;

    // // let date = `${}${}`

    // // const [pubDate, pubTime] = article.pubDate.split(" ");
    // // const [pubYr, pubMo, pubDd] = article.pubDate.split("-");

    // // console.log(pubYr, pubMo, pubDd);

    // }


    
   
 