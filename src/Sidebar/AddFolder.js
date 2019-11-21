import React from 'react';
import NotefulContext from '../NotefulContext'
import '../App.css'

export default class AddFolder extends React.Component {


	static contextType = NotefulContext;

	onAddFolder(event) {
		event.preventDefault();
		this.context.toggleFolderPopup();
	}

	render() {
		return (
			<button className="button" onClick={e => this.onAddFolder(e)}>
				Add Folder
			</button>
		);
	}
}