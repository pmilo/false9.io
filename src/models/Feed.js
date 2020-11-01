export default class Feed {
    constructor(url) {
        this.url = url;
    }

    async getNews() {
        try {
            const res = await fetch(this.url);
            const json = await res.json();

            // this.data (state.feed.data) 
            this.data = await json.items;

        } catch(error) {
            alert(error);
        }
    }


    calcDaysAgo(datePosted) {

        //split date str
        let [ year, month, day] = datePosted.split('-');
        day = day.split(' ')[0];
        
        let start = new Date(`${month} ${day}, ${year}`),
            end = new Date(), //current date
            days = 1000 * 60 * 60 * 24,
            diff = end - start,
            result = Math.floor(diff / days);
    
        const posted = `${result <= 1 ? 'Today' : result + ' days ago' }`;
        return posted;
    }

} // END Feed class


    
   
 