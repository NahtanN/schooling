import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Tabs from '../components/Tabs';
import DropZone from '../components/DropZone';
import SelectTags from '../components/SelectTags';
import AlertIcon from '../components/AlertIcon';

import '../styles/pages/Upload.css';

export default function Upload() {
    const history = useHistory();

    const [ file, setFile ] = useState<File>();
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        console.log(file);
        history.push('/following');
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
                        <input type="text" />
                    </div>

                    <div className="title">
                        <label>Title</label>                        
                        <textarea rows={3}></textarea>
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
                        <SelectTags />
                    </div>

                    <div className="content">    
                        <label>Content</label>                        
                        <textarea rows={20}></textarea>
                    </div>

                    <button className="submit" type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}