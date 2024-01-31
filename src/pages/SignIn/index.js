import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from '../../contexts/auth'

import logoImg from '../../assets/logo-ns.png'

import { Container } from './styles'

export function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, accountGoogle, loadingAuth } = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault()

        if(email !== '' && password !== ''){
            signIn(email, password)
        }
    }
    
    return(
        <Container>
            <div className='box-login'>
                <div className='logo-area'>
                    <img src={logoImg} alt="logo"  />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit' >{loadingAuth ? "Acessando..." : "Acessar"}</button>
                </form>
                <div className='btn-google'>
                    <button onClick={accountGoogle} > Acessar com <FcGoogle size={25}/></button>
                </div>
                <Link to="/cadastro" >Cadastre-se</Link>
            </div>
        </Container>
    )
}