import React from 'react';
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom'
import NotefulContext from '../NotefulContext'

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
	}

	deleteNoteRequest(noteId, callback) {
	    fetch(`http://localhost:9090/notes/${noteId}`, {method: 'DELETE'})
	      .then(res => {
	        if (!res.ok) {
	          return res.json().then(error => {
	            throw error
	          })
	        }
	        return res.json()
	      })
	      .then(data => {
	        callback(noteId)
	      })
	      .catch(error => {
	        const errorMessage = `Could not delete: ${error.message}`
	        this.setState({error: errorMessage})
	    })
}

	static contextType = NotefulContext;

	render() {
		return(
			<>
				<div className='Main__note-info'>
					<Link to={`/note/${this.props.id}`}>
						<h2 className='Main__note-title'>{this.props.name}</h2>
					</Link>
					<p className='Main__note-date'>Date modified on {dateFormat(this.props.modified)}</p>
					{this.state.error}
				</div>
				<button className='Main__delete-note' onClick={() => this.deleteNoteRequest(this.props.id, this.context.deleteNote)}>Delete Note</button>
				
			</>
		)
	}
}