import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';

import Tabs from '../components/Tabs';
import API from '../service/api';

import '../styles/pages/Article.css';

interface DataType {
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

interface TypeArticle {
    content: string;
    tags: Array<string>;
}

export default function Article() {
    const location = useLocation();
    const data = location.state as DataType;

    const [ articleContent, setArticleContent ] = useState<TypeArticle>();
    
    useEffect(() => {
        API.get(`/article/${data.id}`)
            .then(content => setArticleContent(content.data));
     }, []);    
     
    return (
        <div>
            <Tabs />

            <article className="display-article">
                <div className="read-article">
                    <img src={ data.image }/>                
                    
                    <ul className="article-tags">
                        <li className="thumb-tag">{ data.tag.tag }</li>
                    { articleContent?.tags.map(tag => <li>{ tag }</li>) }
                    </ul>

                    <h1>{ data.title }</h1>

                    <p className="text">{ articleContent?.content }</p>

                    <p className="date" ><strong>{ data.author }</strong>, { data.date }</p>
                </div>            
            </article>
        </div>
    );
}