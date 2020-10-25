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

            // this.data (state.feed.data) 
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


    // hoursPublished(pubDate, pubTime) {
    // let hours;

    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth()+1; //January is 0!
    // let yyyy = today.getFullYear();

    // let pubDateStr = "2020-02-08 21:50:44";

    // let pubDate = [pYear, pMon, pDay, pTime] = pubDateStr.split(/[ -]+/)

    // let pubDateOnly = pubDateStr.split(" ")[0];
    // let pubTimeOnly = pubDateStr.split(" ")[1];

    // const newPubDate = new Date(pubDateOnly);
    // const currDate = new Date(`${yyyy}/${mm}/${dd}`)

    // let diffTime = Math.abs(currDate - newPubDate);
    // let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // hours += diffDays * 24;

    // return hours;

} // END Feed class


    
   
 