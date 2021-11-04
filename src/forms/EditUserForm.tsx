import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UpdateUser, User } from "../App";

interface Props {
    updateUser: UpdateUser,
    currentUser: User,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUserForm = (props: Props) => {

    const [user, setUser] = useState<User>(props.currentUser)

    const handleInputChange = (event: ChangeEvent) => {
        const {name, value} = event.target as HTMLInputElement

        setUser({...user, [name]: value})
    }

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    return (
        <form
            onSubmit={(event: FormEvent) => {
                event.preventDefault()
                if (!user.name || !user.username) return

                props.updateUser(user.id as number, user)
            }}
        >
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={user.name} onChange={handleInputChange} />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={user.username} onChange={handleInputChange} />
            <button className="button submit-btn">Update user</button>
            <button className="button muted-button" onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
    )
}

export default EditUserForm