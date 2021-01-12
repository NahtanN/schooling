import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import '../styles/components/AlertIcon.css';

interface props {
    alert: string;
}

export default function AlertIcon(phrase: props) {    
    return (
        <div className="help-tip">
            <FiAlertCircle />
            <p>{ phrase.alert }</p>                            
        </div> 
    );
}