import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'

export default function MainSidebar(props) {

	return(
		<div className='Sidebar'>
			<ul className='Sidebar__folder-list'>
				{props.folders.map((folder, i) => {
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