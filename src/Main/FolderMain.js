import React from 'react';
import './Main.css'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import NotefulContext from '../NotefulContext'

function deleteNoteRequest(noteId, callback) {
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
	    console.log(error)
	  })
	}

export default class FolderMain extends React.Component {
	static contextType = NotefulContext;
	
	render() {
		const list = this.context.notes.filter(note => note.folderId === this.props.match.params.folderId)
		return(
		<div className='Main'>
			<ul className='Main__note-list'>
				{list.map((note) => {
					return( 
						<li className='Main__note-item' key={note.id}>
							<div className='Main__note-info'>
								<Link to={`/note/${note.id}`}>
									<h2 className='Main__note-title'>{note.name}</h2>
								</Link>
								<p className='Main__note-date'>Date modified on {dateFormat(note.modified)}</p>
							</div>
							<button className='Main__delete-note' onClick={() => deleteNoteRequest(note.id, this.context.deleteNote)}>Delete Note</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
	}

	
}