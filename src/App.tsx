import { useEffect, useState } from "react";
import axios from "axios";
import LoaddingComponent from "./components/loaddingComponent";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    console.log(apiKey);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`
      )
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar as notícias", error);
        setLoading(false);
      });
  });

  if (loading) {
    return <LoaddingComponent />;
  }

  return (
    <>
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-10 mb-5">
          <h1 className="text-3xl font-bold text-left before:w-full before:h-1 before:bg-blue-500 before:block after:h-1 after:bg-blue-500 after:block">
            Tech News
          </h1>
          <h2 className="text-2xl font-bold">Today News</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((article: Article, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md hover:scale-105 duration-300"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Leia mais
              </a>
            </div>
          ))}
        </div>
      </div>
      <footer className="text-center bg-blue-950 p-5 text-sm text-gray-300">
        &copy; 2025 Eder Henrique. Todos os direitos reservados.
      </footer>
    </>
  );
};

export default NewsList;
