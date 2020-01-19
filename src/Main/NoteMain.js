import React from 'react';
import './Main.css'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import NotefulContext from '../NotefulContext';
import config from '../config';



export default class NoteMain extends React.Component {
	deleteNoteRequest(note_id, callback) {
		fetch(`${config.NOTES_API_ENDPOINT}/${note_id}`, {method: 'DELETE'})
		  .then(res => {
		    if (!res.ok) {
		      return res.json().then(error => {
		        throw error
		      })
		    }
		    return res.json()
		  })
		  .then(data => {
		    callback(note_id)
		  })
		  .then(this.props.history.push('/'))
		  .catch(error => {
		    console.log(error)
		  })
	}

	static contextType = NotefulContext;
	render() {
		const note = this.context.notes.find(note => Number(note.id) === Number(this.props.match.params.note_id))
		const noteId = Number(note.id)
		return(
			<div className='Main'>
				<ul className='Main__note-list'>
					<li className='Main__note-item' key={noteId}>
						<div className='Main__note-info'>
							<Link to={`/note/${noteId}`}>
								<h2 className='Main__note-title'>{note.name}</h2>
							</Link>
							<p className='Main__note-date'>Date modified on {dateFormat(note.modified)}</p>
						</div>
						<button className='Main__delete-note' onClick={() => this.deleteNoteRequest(noteId, this.context.deleteNote)}>Delete Note</button>
					</li>
				</ul>
				<div className='Main__note-content'>{note.content}</div>
			</div>
		)
	}
	
}