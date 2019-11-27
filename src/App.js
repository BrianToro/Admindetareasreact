import React, { Component } from 'react';
import firebase from 'firebase'
import { DB_CONFIG } from './config/config.js'
import 'firebase/database'
import './App.css';
import Works from './Works/Works.jsx'
import WorksForm from './WorksForm/WorksForm.jsx'

class App extends Component {
  constructor(){
    super();
    this.state = {
      works: [
      ]
    };
    this.addWorks = this.addWorks.bind(this)
    this.removeWorks = this.removeWorks.bind(this)
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('works');
  }
  componentDidMount(){
    const { works }  = this.state;
    this.db.on('child_added', snap => {
      works.push({
        worksId: snap.key,
        workTitle: snap.val().workTitle,
        workDescription: snap.val().workDescription
      })
      this.setState({works})
    });
    this.db.on('child_removed', snap => {
      for(let i = 0; i < works.length; i++){
        if(works[i].worksId = snap.key){
          works.splice(i, 1)
        }
      }
      this.setState({works})
    });
  }
  addWorks(workTitle, workDescription){
    this.db.push().set({workTitle: workTitle, workDescription: workDescription});
  }
  removeWorks(workId){
    this.db.child(workId).remove();
  }
  render(){
    return(
      <div className="worksContainer">

        <div className="worksHeader">
          <h1>Tareas Web</h1>
        </div>

        <div className="worksBody">
          <ul>
            {
              this.state.works.map(work => {
                return (
                  <Works worksId = {work.worksId} 
                          worksTitle = {work.workTitle}
                          worksDescription = {work.workDescription}
                          key = {work.worksId}
                          removeWorks = {this.removeWorks}/>
                )
              })
            }
          </ul>
        </div>

        <div className = "worksFooter">
          <WorksForm addWorks = {this.addWorks}/>
        </div>

      </div>
    );
  }
}
export default App;
