import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiXCircle } from 'react-icons/fi'

import '../styles/components/DropZone.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploaded }) => {
    const [ selectedImageUrl, setSelectedImageUrl ] = useState('');        

    const onDrop = useCallback(acceptedFiles => {
        try {
            const image = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(image);
    
            setSelectedImageUrl(imageUrl);
            onFileUploaded(image);
        } catch(err) {
            console.log('Max files: 1')
        }
    }, [onFileUploaded]);                


    const handleDelete = () => {
        console.log(selectedImageUrl);
        setSelectedImageUrl('');
        console.log(selectedImageUrl);
    }

    const { getRootProps, getInputProps, open } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        noClick: true,              
        onDrop,
    });        

    return (
        <div {...getRootProps({className: selectedImageUrl ? 'thumbnail' : 'dropzone'})}>
            <input {...getInputProps()} accept="image/*"/>

            { selectedImageUrl
                ? (
                    <div>
                        <FiXCircle onClick={handleDelete}/>
                        <img 
                            className="selected-image" src={selectedImageUrl} 
                            alt="thumbnail"
                        />
                    </div>
                )
                : (
                    <div>
                        <FiUpload />
                        <p>Drag & Drop your image here</p>
                        <p>OR</p>
                        <button type="button" onClick={open}>Browse Files</button>
                    </div>
                )
            }
        </div>
    );
}

export default DropZone;