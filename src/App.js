import React from 'react';
import { Route, Link } from 'react-router-dom';
import ListSidebar from './Sidebar/ListSidebar';
import NoteSidebar from './Sidebar/NoteSidebar';
import ListMain from './Main/ListMain';
import NoteMain from './Main/NoteMain';
import NotefulContext from './NotefulContext'
import './App.css'
import AddNoteForm from './Forms/AddNoteForm'
import config from './config'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null,
      folderPopup: false,
    }
  }

  componentDidMount() {
    const options = {
      method: 'GET'
    }

    Promise.all([
      fetch(config.NOTES_API_ENDPOINT, options),
      fetch(config.FOLDERS_API_ENDPOINT, options)
      ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        const errorMessage = `Something went wrong: ${error.message}`
        this.setState({ error: errorMessage });
      });
  }

  toggleFolderPopup = () => {
    this.state.folderPopup === false ? this.setState({ folderPopup: true }) : this.setState({ folderPopup: false })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({ notes: newNotes }) 
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ],
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
      folderPopup: this.state.folderPopup,
      toggleFolderPopup: this.toggleFolderPopup,
    }

    return(
      <main className='App'>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        {this.state.error}
        <NotefulContext.Provider value={contextValue}>    
          <div className='content'>
          
              <Route exact path='/' component={ListSidebar} />
              <Route exact path='/' component={ListMain} />

              <Route path='/folders/:folder_id' component={ListSidebar} />
              <Route path='/folders/:folder_id' component={ListMain} />

              <Route path='/notes/:note_id' component={NoteSidebar} />
              <Route path='/notes/:note_id' component={NoteMain} />

              <Route path='/add-note' component={AddNoteForm} />
          </div>
        </NotefulContext.Provider> 
      </main>
    );
  }
}

export default App;
