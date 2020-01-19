import React from 'react';
import config from '../config'
import './Form.css'
import NotefulContext from '../NotefulContext'

export default class AddFolderForm extends React.Component {
	static contextType = NotefulContext
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			},
			error: null
		}
	}

	handleAddFolder(event) {
		event.preventDefault();
		const name = this.state.name.value;
		const folder = { name }
		fetch(config.FOLDERS_API_ENDPOINT, {method: 'POST', body: JSON.stringify(folder), headers: {'Content-Type': 'application/json'}})
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

	validateName(fieldValue) {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return 'Name is required'
		}
	}

	render() {
		return(
			<div className='PopupForm'>
				<form>
					<h1>Add Folder</h1>
					<input id='folder-name' type='text' placeholder='Folder Name' className='PopupForm__input' onChange={(e) => this.setState({name: {value: e.target.value, touched: true}})}></input>
				</form>
				{this.state.name.touched && this.validateName()}
				{this.state.error}
				<div className='PopupForm__buttons'>
					<button className='button' onClick={() => this.context.toggleFolderPopup()}>Cancel</button>
					<button className='button' disabled={this.validateName()} onClick={(e) => this.handleAddFolder(e)}>Add Folder</button>				
				</div>
			</div>
		);
	}
}