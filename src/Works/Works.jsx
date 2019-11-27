import React, { Component } from 'react';
import './Works.css';

class Works extends Component {
    constructor(props){
        super(props);
        this.worksId = props.worksId;
        this.workDescription = props.worksDescription;
        this.workTitle = props.worksTitle;
    }
    workRemove(id){
        const response = window.confirm('¿Estas seguro de eliminar esta tarea?')
        if(response){
            this.props.removeWorks(id);
        }
        return;
    }
    render(){
        return(
            <div className="Work">
                <ul>
                    <span onClick = {() => this.workRemove(this.worksId)} >&times;</span>
                    <p>{this.workTitle}</p>
                    <p>{this.workDescription}</p>
                </ul>
            </div>
        );
    }
}

export default Works;