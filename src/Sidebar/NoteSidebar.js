import React from 'react';
import './Sidebar.css';
import { Link, withRouter } from 'react-router-dom'

function NoteSidebar(props) {
	const folderId = props.notes.folderId
	const folderName = props.folders.find(folder => folder.id === folderId)
	const back = () => {
		props.history.goBack()
	}

	return(
		<div className='Sidebar'>
			<button className='Sidebar__back-button' onClick={back}>Go Back</button>
			<h2>{folderName.name}</h2>
		</div>
	)
}

export default withRouter(NoteSidebar)