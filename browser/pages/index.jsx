import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';
import PlayPage from './PlayPage';
import WalkthroughPage from './WalkthroughPage';
// import LoggedInHomePage from './pages/LoggedInHomePage';
// const SECRET_TOKEN = process.env.SECRET_TOKEN


// function requireAuth(nextState, replace) {
//   const authToken = localStorage.getItem(SECRET_TOKEN)
//   if (!(!!authToken)) {
//     replace({
//       pathname: '/',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

export default function appRoutes() {
  return (
    <Route component={App}>
      <Route path="/" component={PlayPage} />
      <Route path="/walkthrough" component={WalkthroughPage}/>
    </Route>
  )
}
