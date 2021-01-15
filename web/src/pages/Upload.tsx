import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ScroolToTop from '../utils/ScroolToTop';

import Tabs from '../components/Tabs';
import DropZone from '../components/DropZone';
import SelectTags from '../components/SelectTags';
import AlertIcon from '../components/AlertIcon';

import '../styles/pages/Upload.css';
import API from '../service/api';

export default function Upload() {
    const history = useHistory();

    const [ file, setFile ] = useState<File>();
    const [ tags, setTags ] = useState<string[]>([]);
    const [ formData, setFormData] = useState({
        author: '',
        title: '',
        content: ''
    });

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            name,
            value
        } = event.target;
        
        setFormData({ ...formData, [name]:value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();        

        const data = new FormData();

        data.append('author', formData.author);
        data.append('title', formData.title);
        data.append('content', formData.content);
        
        tags.map(tag => {
            data.append('tags', tag);
        })

        if (file) {            
            data.append('image', file);        
        }

        // await API.post('/upload', data);        
        history.push('/');
    }

    return (
        <div className="upload-page">
            <Tabs />

            <h1 className="write-article">Write an article</h1>

            <main className="container">
                <form onSubmit={handleSubmit} className="article">
                    <div className="author">
                        <div className="alert-icon">
                            <label>Author</label>                                        
                            <AlertIcon alert="When left empty, author will be displayed as Anonymous."/>               
                        </div>
                        <input 
                            onChange={handleOnChange} 
                            type="text" 
                            name="author"
                        />
                    </div>

                    <div className="title">
                        <label>Title</label>                        
                        <textarea 
                            onChange={handleOnChange} 
                            rows={3}
                            name="title"
                            id="title"
                        ></textarea>
                    </div>

                    <div className="upload-image">
                        <label>Upload Image</label>
                        <DropZone onFileUploaded={setFile}/>
                    </div>

                    <div className="tags">
                        <div className="alert-icon">
                            <label>Tags</label>
                            <AlertIcon alert="The first tag selected gonna be displayed at the thumbnail."/>      
                        </div>
                        <SelectTags tagsId={setTags}/>
                    </div>

                    <div className="content">    
                        <label>Content</label>                        
                        <textarea 
                            onChange={handleOnChange} 
                            rows={20}
                            name="content"
                        ></textarea>
                    </div>

                    <button className="submit" type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}