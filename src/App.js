import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import STORE from './STORE';
import MainSidebar from './Sidebar/MainSidebar';
import FolderSidebar from './Sidebar/FolderSidebar';
import NoteSidebar from './Sidebar/NoteSidebar';
import MainMain from './Main/MainMain';
import FolderMain from './Main/FolderMain';
import NoteMain from './Main/NoteMain';
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: STORE.folders,
      notes: STORE.notes
    }
  }

  render() {
    return(
      <main className='App'>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <div className='content'>     
            <Route exact path='/' render={() => <MainSidebar folders={this.state.folders} />}/>
            <Route exact path='/' render={() => <MainMain notes={this.state.notes} />} />

            <Route path='/folder/:folderId' render={(props) => <FolderSidebar folders={this.state.folders} />} />
            <Route path='/folder/:folderId' render={(props) => <FolderMain notes={this.state.notes.filter(note => note.folderId === props.match.params.folderId)} />} />

            <Route path='/note/:noteId' render={(props) => <NoteSidebar folders={this.state.folders} notes={this.state.notes.find(note => note.id === props.match.params.noteId)} history={props.history} />} />
            <Route path='/note/:noteId' render={(props) => <NoteMain notes={this.state.notes.find(note => note.id === props.match.params.noteId)} />} />
        </div>
      </main>
    );
  }
}

export default App;
