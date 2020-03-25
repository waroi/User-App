import React, { Component } from 'react'
import User from './User'
// import PropTypes from 'prop-types'
import UserConsumer from '../context'

class Users extends Component {
    render() {
        return(
            <UserConsumer>
                {
                    value => {
                        const {users} = value;
                        return (
                            <div>
                                {
                                    users.map(user => {
                                        return(
                                            <User
                                            //iteratorlerde unic(farklı) bir key olması gerekiyor bunun içi id verdik key olarak.
                                                key = {user.id}
                                                id = {user.id}
                                                name = {user.name}
                                                salary = {user.salary}
                                                department = {user.department}
                                                // deleteUser = {deleteUser}
                                            />
                                        ) 
                                    })
                                }
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
        // const {users,deleteUser} = this.props;
    }
}
export default Users
