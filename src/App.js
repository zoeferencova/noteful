import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainSidebar from './Sidebar/MainSidebar';
import FolderSidebar from './Sidebar/FolderSidebar';
import NoteSidebar from './Sidebar/NoteSidebar';
import MainMain from './Main/MainMain';
import FolderMain from './Main/FolderMain';
import NoteMain from './Main/NoteMain';
import NotefulContext from './NotefulContext'
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null
    }
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({ notes: newNotes })
    
  }

  getFolders(url, options) {
    fetch(`${url}/folders`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json()
      })
      .then(response => this.setState({ folders: response}))
      .catch(error => {
        console.log(error)
      })
  }

  getNotes(url, options) {   
    fetch(`${url}/notes`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json()
      })
      .then(response => this.setState({ notes: response}))
      .catch(error => {
        console.log(error)
      })
  }

  getData() {
    const url = 'http://localhost:9090'
    const options = {
      method: 'GET'
    } 

    this.getFolders(url, options);
    this.getNotes(url, options);
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
    }
    return(
      <main className='App'>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <p>{this.state.error}</p>
        <NotefulContext.Provider value={contextValue}>    
          <div className='content'>
              <Route exact path='/' component={MainSidebar} />
              <Route exact path='/' component={MainMain} />

              <Route path='/folder/:folderId' component={FolderSidebar} />
              <Route path='/folder/:folderId' component={FolderMain} />

              <Route path='/note/:noteId' component={NoteSidebar} />
              <Route path='/note/:noteId' component={NoteMain} />
          </div>
        </NotefulContext.Provider> 
      </main>
    );
  }
}

export default App;
