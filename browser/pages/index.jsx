import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';
import PlayPage from './PlayPage';
import WalkthroughPage from './WalkthroughPage';

export default function appRoutes() {
  return (
    <Route component={App}>
      <Route path="/play" component={PlayPage} />
      <Route path="/" component={WalkthroughPage}/>
    </Route>
  )
}
