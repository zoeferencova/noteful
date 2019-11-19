import React from 'react';
import './Sidebar.css';
import NotefulContext from '../NotefulContext'

export default class NoteSidebar extends React.Component {

	static contextType = NotefulContext;

	render() {
		console.log(this.context.notes)
		const target = this.context.notes.find(note => note.id === this.props.match.params.noteId)
		const folderId = target.folderId
		const folderName = this.context.folders.find(folder => folder.id === folderId)
		const back = () => {
			this.props.history.goBack()
		}

		return(
			<div className='Sidebar'>
				<button className='Sidebar__back-button' onClick={back}>Go Back</button>
				<h2>{folderName.name}</h2>
			</div>
		)
	}

	
}