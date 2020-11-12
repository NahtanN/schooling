import React from 'react';
import { FiMenu, FiBookOpen, FiSearch, FiSettings, FiHome, FiHeart, FiUploadCloud } from 'react-icons/fi'
import { NavLink } from 'react-router-dom';

import '../styles/components/Tabs.css'

export default function Tabs() {
    return (
        <div id="tabs-container">
            <header>
                <button className="menu content-wrapper">
                    <FiMenu size={20} strokeWidth={2.5}/>
                </button>

                <NavLink to="/" className="logo content-wrapper">
                    <FiBookOpen size={40} strokeWidth={1.6}/>
                    <span>school.ing</span>
                </NavLink>

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

            <nav>
                <ul>
                    <NavLink 
                        exact
                        activeClassName="active-link"
                        id="link-home" 
                        className="link" 
                        to="/"
                    >
                        <FiHome className="aside-icon" size={25} strokeWidth={1.6}/>
                        <span>Home</span>
                    </NavLink>
                        
                    <NavLink 
                        exact
                        activeClassName="active-link"
                        id="link-following" 
                        className="link" 
                        to="/Following"
                    >
                        <FiHeart  className="aside-icon" size={25} strokeWidth={1.6}/>
                        <span>Following</span>
                    </NavLink>

                    <NavLink 
                        exact
                        activeClassName="active-link"
                        id="link-upload" 
                        className="link" 
                        to="/Upload"
                    >
                        <FiUploadCloud className="aside-icon" size={25} strokeWidth={1.6}/>
                        <span>Upload</span>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}

// onClick={selectedButton}