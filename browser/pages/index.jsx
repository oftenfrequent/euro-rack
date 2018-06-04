import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import HomePage from './HomePage'
import PlayPage from './PlayPage'
import WalkthroughPage from './WalkthroughPage'
import LoginPage from './LoginPage'
import StyleGuidePage from './StyleGuidePage'
import { NotFoundPage } from './NotFoundPage'

export default function appRoutes() {
        // <Navbar />
  return (
    <BrowserRouter>
      <div className='main-container'>
        <Switch>
		      <Route exact path="/" component={HomePage}/>
		      <Route path="/play" component={PlayPage} />
		      <Route path="/login" component={LoginPage}/>
		      <Route path="/style" component={StyleGuidePage}/>
		      <Route path="/walkthrough" component={WalkthroughPage}/>
          <Route path="/not-found" component={NotFoundPage}/>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
