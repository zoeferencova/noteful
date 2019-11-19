import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

export default class MainSidebar extends React.Component {
	static contextType = NotefulContext;

	render() {
		return(
		<div className='Sidebar'>
			<ul className='Sidebar__folder-list'>
				{this.context.folders.map((folder) => {
					return (
						<NavLink to={`/folder/${folder.id}`} key={folder.id}>
							<li className='Sidebar__folder-item' >
								<h2 className='Sidebar__folder-title'>{folder.name}</h2>
							</li>
						</NavLink>	
					)
				})}
			</ul>
		</div>
	)
	}
	
}