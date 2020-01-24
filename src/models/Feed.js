// const crossOrigin = "https://crossorigin.me/"

    export async function getNews() {

        const proxy = "https://cors-anywhere.herokuapp.com/"
        const url = `${proxy}https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.goal.com%2Ffeeds%2Fen%2Fnews`

        const res = await fetch(url)
        const data = await res.json();

        console.log('data.items:');
        console.log(data.items);

        return data.items;
    
    }
