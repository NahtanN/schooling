import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ScroolToTop from './utils/ScroolToTop';

import Home from './pages/Home';
import Following from './pages/Following';
import Upload from './pages/Upload';

export default function Routes() {
    return (
        <BrowserRouter>
            <ScroolToTop/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Following" component={Following} />
                <Route path="/Upload" component={Upload} />
            </Switch>
        </BrowserRouter>
    );
}