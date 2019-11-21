import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import AddFolder from './AddFolder'
import AddFolderForm from '../AddFolderForm'

export default class FolderSidebar extends React.Component {
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
			<AddFolder />
			{this.context.folderPopup ? <AddFolderForm /> : ''}
		</div>
	)
	}
	
}