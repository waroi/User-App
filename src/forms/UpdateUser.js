import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from 'axios'

//var uniqid = require('uniqid'); Json server unic id işini kendi yapacak

class UpdateUser extends Component {
    state = {
        name : "",
        department : "",
        salary : "",
        error : false
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
    componentDidMount = async () => {
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const {name,salary,department} = response.data;
        this.setState({name,salary,department})
    }
    
    updateUser = async (dispatch,e) => {
        e.preventDefault();
        //UpdateUser
            const {name,salary,department} = this.state;
            const {id} = this.props.match.params;
            const updatedUser = {name,salary,department};
            if (!this.validateForm()){
                this.setState({
                    error : true
                })
                return;
            }
            const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser);
            dispatch({type:"UPDATE_USER" , payload : response.data});
        //Redirect
        this.props.history.push("/");
    }
    render() {
        const {name,salary,department,error} = this.state;
        return <UserConsumer> 
        {
            value =>{
                const {dispatch} = value;
                return (
                    <div className="col-md-12 mb-4">
                        <div className="card border-0">
                            <div className="card-header d-flex justify-content-between align-items-center bg-dark text-secondary">
                                <h4>Update User Form</h4>
                            </div>
                            <div className="card-body bg-secondary rounded-bottom">
                            {
                                error ?
                                <div className="alert alert-danger">Lütfen Bilgilerinizi Eksiksiz Giriniz.</div>
                                :null
                            }
                                <form onSubmit= {this.updateUser.bind(this,dispatch)}>
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
                                    <button className="btn btn-dark btn-block text-secondary mt-5" type="submit">Update User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        </UserConsumer>
    }
}
export default UpdateUser;