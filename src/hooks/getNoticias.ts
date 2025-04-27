import axios from "axios";


export default async function getNoticias() {
    let noticias = [];

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
        
        if (response.data.status === "ok") {
            noticias = response.data.articles
            console.log(noticias)
        }
    } catch (e) {
        // pass
        console.log(e)
    }

    return noticias;
}