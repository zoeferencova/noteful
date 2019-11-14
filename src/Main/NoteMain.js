import React from 'react';
import './Main.css'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'

export default function NoteMain(props) {

	return(
		<div className='Main'>
			<ul className='Main__note-list'>
				<li className='Main__note-item' key={props.notes.id}>
					<div className='Main__note-info'>
						<Link to={`/note/${props.notes.id}`}>
							<h2 className='Main__note-title'>{props.notes.name}</h2>
						</Link>
						<p className='Main__note-date'>Date modified on {dateFormat(props.notes.modified)}</p>
					</div>
					<button className='Main__delete-note'>Delete Note</button>
				</li>
			</ul>
			<div className='Main__note-content'>{props.notes.content}</div>
		</div>
	)
}