import React, { useState } from 'react'
import './App.css'
import AddUserForm from './forms/AddUserForm'
import UserTable from './tables/UserTable'
import EditUserForm from './forms/EditUserForm'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello Vite + React!</p>
//         <p>
//           <button type="button" onClick={() => setCount((count) => count + 1)}>
//             count is: {count}
//           </button>
//         </p>
//         <p>
//           Edit <code>App.tsx</code> and save to test HMR updates.
//         </p>
//         <p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//           {' | '}
//           <a
//             className="App-link"
//             href="https://vitejs.dev/guide/features.html"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Vite Docs
//           </a>
//         </p>
//       </header>
//     </div>
//   )
// }

export interface User {
  id: number | null,
  name: string,
  username: string
}

export interface AddUser {
  (user: User): void
}

export interface DeleteUser {
  (id: number): void
}

export interface EditRow {
  (user: User): void
}

export interface UpdateUser {
  (id: number, updatedUser: User): void
}

const App = () => {

  const usersData: User[] = [
    {id: 1, name: 'Tania', username: 'floppydiskette'},
    {id: 2, name: 'Craig', username: 'siliconeidolon'},
    {id: 3, name: 'Ben', username: 'benisphere'},
  ]

  const [users, setUsers] = useState<User[]>(usersData)

  const [editing, setEditing] = useState<boolean>(false)

  const initialState:User = {
    id: null,
    name: '',
    username: ''
  }

  const [currentUser, setCurrentUser] = useState<User>(initialState)

  const addUser:AddUser = (user: User) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser:DeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))

    setEditing(false)
  }

  const editRow:EditRow = (user: User) => {
    setEditing(true)

    setCurrentUser(user)

    // setCurrentUser({id: user.id, name: user.name, username: user.username})
  }

  const updateUser: UpdateUser = (id: number, updatedUser: User) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {
            editing ? (
              <div>
                <h2>Edit User</h2>
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>Add User</h2>
                <AddUserForm addUser={addUser}/>
              </div>
            )
          }
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
