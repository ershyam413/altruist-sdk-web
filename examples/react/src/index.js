import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App-WithEffect';
import * as serviceWorker from './serviceWorker';
import Altruist from 'altruist-sdk-web';

//Exposing Altruist to the DOM as a global variable
//Usecase - Heatmaps
window.Altruist = Altruist;
Altruist.init({
    app_key: 'YOUR_APP_KEY',
    url: 'YOUR_SERVER_URL',
    debug: true
});

Altruist.q.push(['track_sessions']);
Altruist.q.push(['track_scrolls']);
Altruist.q.push(['track_clicks']);
Altruist.q.push(['track_links']);
Altruist.q.push(["track_errors"]);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
