import { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from '../../contexts/auth'

import { Container } from './styles'

import logoImg from '../../assets/logo-ns.png'

export function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [numberPhone, setNumberPhone] = useState('')

    const { signUp, loadingAuth, accountGoogle } = useContext(AuthContext)

    async function handleSubmit(e){
        e.preventDefault()

        if(name !== '' && email !== '' && password !== '' && numberPhone !== ''){
            await signUp(name, email, password, numberPhone)
        }else {
            alert("Preencha todos os campos corretamente")
        }
    }
    
    return(
        <Container>
            <div className='box-login'>
                <div className='logo-area'>
                    <img src={logoImg} alt="logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Fazer Cadastro</h1>
                    <input
                        type='text'
                        placeholder='nome completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='number'
                        placeholder='numero de contato'
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>{loadingAuth ? "Cadastrando..." : "Fazer Cadastro"}</button>
                </form>
                <div className='btn-google'>
                    <button onClick={accountGoogle} > Cadastrar com <FcGoogle size={25} /></button>
                </div>
                <Link to="/login">Já tenho cadastro, quero voltar</Link>
            </div>
        </Container>
    )
}