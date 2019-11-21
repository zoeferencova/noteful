import React from 'react';
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'
import '../App.css'

export default class AddNote extends React.Component {


	static contextType = NotefulContext;

	onAddNote(event) {
		event.preventDefault();
	}

	render() {
		return (
			<Link to={'/add-note'} className='AddNote__button'>
				Add Note
			</Link>
		);
	}
}