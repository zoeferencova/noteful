import React from 'react';
import './Form.css'
import NotefulContext from '../NotefulContext'

let keyCount = 0;

function getKey() {
	keyCount++;
	return `folder-key_${keyCount}`
}

export default class AddFolderForm extends React.Component {
	static contextType = NotefulContext
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: null
		}
	}

	handleAddFolder(event) {
		event.preventDefault();
		const { name } = this.state;
		const id = getKey();
		const folder = { id, name }
		fetch(`http://localhost:9090/folders`, {method: 'POST', body: JSON.stringify(folder), headers: {'Content-Type': 'application/json'}})
	      .then(res => {
	        if (!res.ok) {
	          return res.json().then(error => {
	            throw new Error(error.message)
	          })
	        }
	        return res.json()
	      })
	      .then(data => {
	        this.context.addFolder(folder)
	      })	      
	      .catch(error => {
	      	console.log(error)
	      	const errorMessage = `There was an issue creating the folder: ${error}`
	        this.setState({ error: errorMessage })
	      })
	      .then(res => {if (this.state.error === null) {this.context.toggleFolderPopup()}})
	}

	render() {
		return(
			<div className='PopupForm'>
				<form>
					<h1>Add Folder</h1>
					<input id='folder-name' type='text' placeholder='Folder Name' className='PopupForm__input' onChange={(e) => this.setState({ name: e.target.value })}></input>
				</form>
				{this.state.error}
				<div className='PopupForm__buttons'>
					<button className='button' onClick={() => this.context.toggleFolderPopup()}>Cancel</button>
					<button className='button' onClick={(e) => this.handleAddFolder(e)}>Add Folder</button>				
				</div>
			</div>
		);
	}
}