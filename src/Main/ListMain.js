import React from 'react';
import './Main.css'
import NotefulContext from '../NotefulContext'
import dateFormat from 'dateformat'
import AddNote from './AddNote'
import Note from './Note'
import ErrorBoundary from '../ErrorBoundary'

const getNotesForFolder = (notes, folderId) => (!folderId) ? notes : notes.filter(note => note.folder_id === Number(folderId))

export default class MainMain extends React.Component {
	static contextType = NotefulContext;

	render() {
		const folderId = this.props.match.params.folder_id;
		const notes = this.context.notes;
		const notesForFolder = getNotesForFolder(notes, folderId)

		return(
			<div className='Main'>
				<ul className='Main__note-list'>
					{notesForFolder.map((note) => {
						return( 							
							<li className='Main__note-item' key={note.id}>
								<ErrorBoundary>
									<Note id={note.id} name={note.name} modified={`Date modified on ${dateFormat(note.modified)}`} />
								</ErrorBoundary>
							</li>							
						)
					})}
				</ul>
				<AddNote />
			</div>
		)
	}
	
}