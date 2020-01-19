import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import AddFolder from './AddFolder'
import AddFolderForm from '../Forms/AddFolderForm'
import ErrorBoundary from '../ErrorBoundary'


export default class MainSidebar extends React.Component {
	static contextType = NotefulContext;

	getNavLinkClass = (path) => {
	   return this.props.location.pathname === path ? 'active' : '';
	}
	
	render() {	
		return(
			<div className='Sidebar'>
				<ul className='Sidebar__folder-list'>
					{this.context.folders.map((folder) => {
						const newClass = this.getNavLinkClass(`/folders/${folder.id}`)
						return (
							<li className={`Sidebar__folder-item ${newClass}`} key={folder.id}>
								<ErrorBoundary>	
									<NavLink to={`/folders/${folder.id}`}>																		
											<h2 className='Sidebar__folder-title'>{folder.name}</h2>										
									</NavLink>
								</ErrorBoundary>
							</li>	
						)
					})}
				</ul>
				<AddFolder />
				{this.context.folderPopup ? <AddFolderForm /> : ''}
			</div>
	)
	}
	
}