import React, { useEffect, useState } from 'react';

import API from '../service/api';

import '../styles/components/SelectTags.css';

interface Props {
    tagsId: (tag: string[]) => void;
}

interface TagType {
    id: number;
    tag: string;
}

const SelectTags: React.FC<Props> = ({ tagsId }) => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [ selectedTags, setSelectedTags ] = useState<string[]>([]);
    
    useEffect(() => {
        API.get('/fetch-tags')
            .then(tags => {
                setTags(tags.data);
            });
    }, []);

    const handleSelectedTags = (tag: string) => {
        const findTag = selectedTags.includes(tag);        
        
        findTag ? (setSelectedTags(selectedTags.filter(item => item !== tag)))
                : (setSelectedTags([...selectedTags, tag]));

    }    

    const handleDoubleClick = (tag: string) => {
        var temp = selectedTags.filter(item => item !== tag);
        temp.unshift(tag);

        setSelectedTags(temp);
    }

    tagsId(selectedTags);
    
    return (
        <ul className="tag-options">
            { tags.map(tag => {                
                let tagClass;

                if (selectedTags[0] === tag.tag) {
                    tagClass = 'selected-thumb-tag';
                } 

                if (selectedTags.includes(tag.tag) && tag.tag !== selectedTags[0]) {
                    tagClass = 'selected-tag'
                }

                return <li 
                            key={tag.id}
                            onClick={() => handleSelectedTags(tag.tag)}
                            onDoubleClick={() => handleDoubleClick(tag.tag)}
                            className={tagClass}
                        >
                            {tag.tag}
                        </li>}
            )}
        </ul>
    );
}

export default SelectTags