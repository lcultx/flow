import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getURLObj } from '../util';

export default function () {
	return (
		<header className="header">
			<h1>Nest System</h1>
			<nav>
				<Link to={`/?server=${getURLObj().query.server}`}>机器列表</Link>
			</nav>
		</header>
	)
}
