import React, { useState } from 'react';

import Tabs from '../components/Tabs';

import DropZone from '../components/DropZone';

import '../styles/pages/Upload.css';

export default function Upload() {
    const [ file, setFile ] = useState<File>();
    
    return (
        <div className="upload-page">
            <Tabs />

            <h1 className="write-article">Write an article</h1>

            <main className="container">
                <div className="form-image"></div>

                <form action="" className="article">
                    <div className="author">
                        <label>Author</label>
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
                        <label>Tags</label>
                        <input type="text" />
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