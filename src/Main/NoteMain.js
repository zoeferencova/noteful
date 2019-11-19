import React from 'react';
import './Main.css'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import NotefulContext from '../NotefulContext'

export default class NoteMain extends React.Component {

	static contextType = NotefulContext;
	render() {
		const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
		return(
			<div className='Main'>
				<ul className='Main__note-list'>
					<li className='Main__note-item' key={note.id}>
						<div className='Main__note-info'>
							<Link to={`/note/${note.id}`}>
								<h2 className='Main__note-title'>{note.name}</h2>
							</Link>
							<p className='Main__note-date'>Date modified on {dateFormat(note.modified)}</p>
						</div>
						<button className='Main__delete-note'>Delete Note</button>
					</li>
				</ul>
				<div className='Main__note-content'>{note.content}</div>
			</div>
		)
	}
	
}