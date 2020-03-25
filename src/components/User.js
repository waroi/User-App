import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserConsumer from '../context'
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends Component {
  state = {
    isVisible: false,
  };
  static defaultProps = {
    name: 'Bilgi yok',
    department: 'Bilgi yok',
    salary: 'Bilgi yok',
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isVisible: false,
  //   };
  // }
  // Arrow function yapılırsa bind otomatik oluyor constructor yapmak yada kullanılan yerde .bind(this) eklemeye gerek kalmıyor.
  onClickEvent=(e)=>{
    //state güncellemek için setState() fonksiyonunu kullanacaz.
    this.setState({
      //isVisible true ise false, false ise true olacak.
      isVisible : !this.state.isVisible
    })
  }
  onDeleteUser = async (dispatch,e) => {
    const {id} = this.props;
    //Delete Request
      await axios.delete(`http://localhost:3004/users/${id}`);
    // const {id,deleteUser} = this.props;
    // deleteUser(id);
    //Consumer Dispatch kullanımı:
    dispatch({type:"DELETE_USER",payload:id})
  }
  render() {
    //Destructing: class componentlarda this.props.özellik diye kullanmak yerine böyle bir const tanım yaparak direkt özellik olarak kullanabiliyoruz.
    const { id,name, department, salary } = this.props;
    const { isVisible } = this.state;
    return(
      <UserConsumer>
          {
              value => {
                  const {dispatch} = value;
                  return (
                    <div className="col-md-12 mb-4">
                      <div className="card border-0">
                        <div className="card-header d-flex justify-content-between align-items-center text-secondary" onClick = {this.onClickEvent} style = {isVisible ? {backgroundColor : "#292929"}:{backgroundColor : "#343a40"}}>
                          <h4 className="d-inline">{name}</h4>
                          <i onClick = {this.onDeleteUser.bind(this,dispatch)} className="far fa-trash-alt" style={{ cursor: 'pointer' }}></i>
                        </div>
                        {isVisible ? (
                          <div className="card-body bg-secondary rounded-bottom">
                            <p className="card-text">Maaş : {salary}</p>
                            <p className="card-text">Department : {department}</p>
                            <Link to = {`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
              }
          }
      </UserConsumer>
     );
  }
}
// User.defaultProps = {
//     name : "Bilgi yok",
//     department : "Bilgi yok",
//     salary : "Bilgi yok"
// } ==> Bunları static defaultporps olarakda tanımlayabiliyoruz.
User.proptype = {
  name: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  id:PropTypes.string.isRequired
  // deleteUser: PropTypes.func.isRequired
};
export default User;