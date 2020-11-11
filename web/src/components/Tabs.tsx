import React from 'react';
import { FiMenu, FiBookOpen, FiSearch, FiSettings } from 'react-icons/fi'

import '../styles/components/Tabs.css'

export default function Tabs() {
    return (
        <div id="tabs-container">
            <header>
                <button className="menu content-wrapper">
                    <FiMenu size={20} strokeWidth={2.5}/>
                </button>

                <div className="logo content-wrapper">
                    <FiBookOpen size={40} strokeWidth={1.6}/>
                    <span>school.ing</span>
                </div>

                <div className="search content-wrapper">
                    <FiSearch  id="search-icon" size={24}/>
                    <input type="text" placeholder="Search"/>
                </div>

                <button className="settings content-wrapper">
                    <FiSettings size={23}/>
                </button>

                <button className="log-in content-wrapper">
                    Log In
                </button>

                <button className="sing-up">
                    Sing Up
                </button>
            </header>
        </div>
    );
}