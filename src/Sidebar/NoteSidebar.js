import React from 'react';
import './Sidebar.css';
import NotefulContext from '../NotefulContext'

export default class NoteSidebar extends React.Component {

	static contextType = NotefulContext;

	render() {
		const target = this.context.notes.find(note => note.id === this.props.match.params.note_id)
		const folderId = target.id;
		const foundFolder = this.context.folders.find(folder => folder.id === folderId)
		const back = () => {
			this.props.history.goBack()
		}

		return(

			<div className='Sidebar'>
				<button className='Sidebar__back-button' onClick={back}>Go Back</button>
				<h2>{foundFolder.name}</h2>
			</div>
		)
	}
	
}