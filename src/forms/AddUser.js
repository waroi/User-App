import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context'
import axios from 'axios'

//var uniqid = require('uniqid'); Json server unic id işini kendi yapacak
const Animation = posed.div(
    {
        visible: { 
            opacity: 1,
            applyAtStart : {
                display : "block"
            }
        },
        hidden: { 
            opacity: 0,
            applyAtEnd : {
                display : "none"
            }
        }
      }
);

class AddUser extends Component {
    state = {
        visible : false,
        name : "",
        department : "",
        salary : "",
        error : false
    }
    changeVisibility = (e) => {
        this.setState({
            visible : !this.state.visible
        })
    }
    validateForm = () => {
        const {name,department,salary} =this.state;
        if (name === "" || salary === "" || department === ""){
            return false;
        }
        return true;
    }
    changeInput = (e) => {
             this.setState({
                 [e.target.name] : e.target.value
             })
    }
    addUser = async (dispatch,e) => {
        e.preventDefault();
        const {name,department,salary} =this.state;
        const newUser ={
            //id:uniqid(), Json server unic id işini kendi yapacak
            name,
            salary,
            department
        }
        if (!this.validateForm()){
            this.setState({
                error : true
            })
            return;
        }
        const response = await axios.post("http://localhost:3004/users",newUser);
        dispatch({type: "ADD_USER",payload:response.data});
        //Redirect
        this.props.history.push("/");
    }
    render() {
        const {visible,name,salary,department,error} = this.state;
        return <UserConsumer> 
        {
            value =>{
                const {dispatch} = value;
                return (
                    <div className="col-md-12 mb-4">
                    <button onClick={this.changeVisibility} className ="btn btn-dark btn-block text-secondary">{visible ? "Hide Form" : "Show Form"}</button>
                    <Animation pose = {visible ? "visible" : "hidden"} >
                        <div className="card border-0">
                            <div className="card-header d-flex justify-content-between align-items-center bg-dark text-secondary">
                                <h4>Add User Form</h4>
                            </div>
                            <div className="card-body bg-secondary rounded-bottom">
                            {
                                error ?
                                <div className="alert alert-danger">Lütfen Bilgilerinizi Eksiksiz Giriniz.</div>
                                :null
                            }
                                <form onSubmit= {this.addUser.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input name="name" id="id" type="text" placeholder="Enter Name" className="form-control bg-dark border-0 text-white" value={name} onChange={this.changeInput} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="department">Department</label>
                                        <input name="department" id="department" type="text" placeholder="Enter Department" className="form-control bg-dark border-0 text-white" value={department} onChange={this.changeInput} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="salary">Salary</label>
                                        <input name="salary" id="salary" type="text" placeholder="Enter Salary" className="form-control bg-dark border-0 text-white" value={salary} onChange={this.changeInput} />
                                    </div>
                                    <button className="btn btn-dark btn-block text-secondary mt-5" type="submit">Add User</button>
                                </form>
                            </div>
                        </div>
                        </Animation>
                    </div>
                )
            }
        }
        </UserConsumer>  
    }
}
export default AddUser