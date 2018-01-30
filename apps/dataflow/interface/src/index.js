import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import GAnalytics from 'ganalytics';
import './index.less';
import { BrowserRouter, Router } from 'react-router-dom'


import store from './store'
import { Provider } from 'react-redux'

import history from './history';
import { ConnectedRouter, push } from 'react-router-redux';


const onChange = obj => window.ga && ga.send('pageview', { dp: obj.url });
let elem, App;
function init() {
	App = require('./App').default;
	elem = ReactDOM.render(
		<Provider store={store}>
					<ConnectedRouter history={history}
			// basename="/"
			// forceRefresh={false}
			// getUserConfirmation={getConfirmation()}
			// keyLength={12}
			>
				<App></App>
			</ConnectedRouter>
		
		</Provider>
		, document.getElementById('root'), elem);
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/service-worker.js');
	}

	// add Google Analytics
	window.ga = new GAnalytics('UA-XXXXXXXX-X');
} else {
	// use preact's devtools
	//require('preact/devtools');
	// listen for HMR
	if (module.hot) {
		module.hot.accept('./App', init);
	}
}

