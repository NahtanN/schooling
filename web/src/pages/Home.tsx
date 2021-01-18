import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Tabs from '../components/Tabs';
import API from '../service/api';

import '../styles/pages/Home.css';

interface ArticlesType {
    author: string;
    date: string;
    id: number;
    image: string;
    tag: {
        id: number;
        tag: string;
    }
    title: string;
}

export default function Menu() {
    const history = useHistory();
    const [ articles, setArticles ] = useState<ArticlesType[]>([]);
    
    console.log(articles);
    useEffect(() => {
        API.get('/')
            .then(articles => setArticles(articles.data));
    }, []);
    
    const handleOnClick = (id: number, data: object) => {
        history.push({ pathname: `/Article/${id}`, state: data });
    }

    return (
        <div className="wrapper">
            <Tabs />

            <h1 className="featured">Featured</h1>

            <section className="feed">                
                { articles.map(article => {
                    return (
                        <article key={article.id} className="articles">
                            <img 
                                className="image" 
                                src={ article.image } 
                                alt="thumbnail"
                                onClick={() => handleOnClick(article.id, article)}
                            />                            

                            <span className="tag">{ article.tag.tag }</span>
                            <h1 
                                className="title"
                                onClick={() => handleOnClick(article.id, article)}
                            >
                                    { article.title }
                            </h1>
                            
                            <p className="post-time"><strong>{ article.author }</strong> { article.date }</p>
                        </article>
                    );
                }) }                               
            </section>
        </div>        
    );
}