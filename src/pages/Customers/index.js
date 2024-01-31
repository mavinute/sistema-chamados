import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../../services/firebaseConnection'

import { FiUser } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import { Content } from './styles'

export function Customers(){
    const [name , setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [address, setAddress] = useState('')

    async function handleRegister(e){
        e.preventDefault()

        if(name !== '' && cnpj !== '' && address !== ''){
            await addDoc(collection(db, "customers"), {
                nameClient: name,
                cnpj: cnpj,
                address: address
            })
            .then(() => {
                setName('')
                setCnpj('')
                setAddress('')
                toast.success("Cliente cadastrado com sucesso")
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            toast.info("Preencha todos os campos corretamente")
        }
    }

    
    return(
        <>
            <Header/>
            <Content>
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
                <div className='content-clients'>
                    <form onSubmit={handleRegister} >
                        <label>Nome Fantasia</label>
                        <input 
                            type='text'
                            placeholder='Nome da empres' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <label>CNPJ</label>
                        <input
                            type='number'
                            placeholder='CNPJ'
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                        <label>Endereço</label>
                        <input
                            type='text'
                            placeholder='Endereço'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button type='submit' >Salvar</button>
                    </form>
                </div>
            </Content>
        </>
    )
}