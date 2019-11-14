import React from 'react';
import './Main.css'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'

export default function FolderMain(props) {

	return(
		<div className='Main'>
			<ul className='Main__note-list'>
				{props.notes.map((note, i) => {
					return( 
						<li className='Main__note-item' key={note.id}>
							<div className='Main__note-info'>
								<Link to={`/note/${note.id}`}>
									<h2 className='Main__note-title'>{note.name}</h2>
								</Link>
								<p className='Main__note-date'>Date modified on {dateFormat(note.modified)}</p>
							</div>
							<button className='Main__delete-note'>Delete Note</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}