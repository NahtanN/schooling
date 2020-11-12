import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './pages/Menu';
import Following from './pages/Following';
import Upload from './pages/Upload';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/Following" component={Following} />
                <Route path="/Upload" component={Upload} />
            </Switch>
        </BrowserRouter>
    );
}