import React, { ChangeEvent, FormEvent, useState } from "react";

import {AddUser, User} from '../App'

import "./AddUserForm.css"

interface Props {
    addUser: AddUser
}

const AddUserForm = (props: Props) => {
    
    const initialState:User = {
        id: null,
        name: '',
        username: ''
    }

    const [user, setUser] = useState<User>(initialState)

    const handleInputChange = (event: ChangeEvent) => {
        const {name, value} = event.target as HTMLInputElement

        setUser({...user, [name]: value})
    }

    return (
        <form
            onSubmit={(event: FormEvent) => {
                event.preventDefault()
                if (!user.name || !user.username) return

                props.addUser(user)
                setUser(initialState)
            }}
        >
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={user.name} onChange={handleInputChange} />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={user.username} onChange={handleInputChange} />
            <button className="button submit-btn">Add new user</button>
        </form>
    )
}

export default AddUserForm