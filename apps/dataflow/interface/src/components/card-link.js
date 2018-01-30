import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function (props) {
	return (
		<Link to={ props.href } className="card">{ props.children }</Link>
	)
};
