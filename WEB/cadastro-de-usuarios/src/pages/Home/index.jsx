import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../sevices/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios') // Função para buscar todos os usuários no banco de dados e listar na tela

    setUsers(usersFromApi.data) 
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    }) // Função para criar um novo usuário no banco de dados ao clicar em cadastrar

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`) // Função para deletar um usuário no banco de dados ao clicar no botão de lixeira

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, []) // React Hook para buscar os usuários no banco de dados ao carregar a página
  
  return (
      <div className='container'>

        <form>
          <h1>Cadastro de Usuarios</h1>
          <input placeholder='Nome' name='name' type="text" ref={inputName} />
          <input placeholder='Idade' name='age' type="number" ref={inputAge} />
          <input placeholder='E-mail' name='email' type="email" ref={inputEmail} />
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map(user => ( //Função MAP percorre o array de usuários e exibe na tela os dados de cada usuário
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>E-mail: <span>{user.email}</span></p>
              <p>Idade: <span>{user.age}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash}/>
            </button>
          </div>
        ))}
        
      </div>
  )
}

export default Home
