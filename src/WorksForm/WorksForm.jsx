import React, { Component } from 'react';
import './WorksForm.css';

class WorksForm extends Component {
    constructor(){
        super();
        this.addWorks = this.addWorks.bind(this);
    }
    addWorks(){
        this.props.addWorks(this.txtTitle.value, this.txtDescription.value);
        this.txtTitle.value = '';
        this.txtDescription.value = '';
        this.txtTitle.focus();
    }
    render(){
        return(
            <div className="worksForm">
                <input type="text" ref= {input => {this.txtTitle = input}} placeholder = "Escribe el titulo de la tarea"/>
                <input type="text" ref={input => {this.txtDescription = input}} placeholder = "Escribe la descripcion de la tarea"/>
                <button onClick={this.addWorks}>
                    Agregar tarea
                </button>
            </div>
        );
    }
}

export default WorksForm;