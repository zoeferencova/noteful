import React from 'react';
import NotefulContext from './NotefulContext'
import './App.css'

let keyCount = 0;

function getKey() {
	keyCount++;
	return `note-key_${keyCount}`
}


export default class AddNoteForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			content: '',
			folder: '',
			modified: '',
			id: ''
		}
	}

	static contextType = NotefulContext;

	goBack(event) {
		event.preventDefault();
		this.props.history.goBack();
	}

	findFolderId() {
		const folderName = this.state.folder;
		const folder = this.context.folders.find(folder => folder.name === folderName);
		return folder.id;
	}

	handleAddNote(event) {
		event.preventDefault();
		const { name, content } = this.state;
		const folderId = this.findFolderId();
		const modified = new Date()
		const id = getKey()
		const note = { id, name, modified, folderId, content }
		fetch(`http://localhost:9090/notes`, {method: 'POST', body: JSON.stringify(note), headers: {'Content-Type': 'application/json'}})
	      .then(res => {
	        if (!res.ok) {
	          return res.json().then(error => {
	            throw error
	          })
	        }
	        return res.json()
	      })
	      .then(data => {
	        this.context.addNote(note)
	      })
	      .then(this.props.history.goBack())
	      .catch(error => {
	        console.log(error)
	      })
	}

	render() {
		return(
			<div className='NoteForm'>
				<form className='NoteForm__content'>
					<h2>Add Note</h2>
					<div className='NoteForm__details'>
						<div>
							<label htmlFor='note-name'>Note Name: </label>
							<input id='note-name' type='text' onChange={(e) => this.setState({name: e.target.value})}></input>
						</div>
						<div>
							<label htmlFor='note-folder'>Folder: </label>
							<select id='note-content' onChange={(e) => this.setState({folder: e.target.value})}>
								<option></option>
								{this.context.folders.map((folder) => <option key={folder.id}>{folder.name}</option>)}
							</select>
						</div>
					</div>
					<div className='NoteForm__textarea'>
						<label htmlFor='note-content'>Note Content: </label>
						<textarea id='note-content' onChange={(e) => this.setState({content: e.target.value})}></textarea>
					</div>
					
					<div className='NoteForm__buttons'>
						<button className='button' onClick={e => this.goBack(e)}>Cancel</button>
						<button className='button' onClick={e => this.handleAddNote(e)}>Save Note</button>
					</div>
					
				</form>
			</div>
		);
	}
}