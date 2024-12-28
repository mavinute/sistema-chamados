import { useEffect, useState, useContext } from 'react'
import { getDocs, collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import { FiCreditCard } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import { db } from '../../services/firebaseConnection'
import { AuthContext } from '../../contexts/auth'

import { Content } from './styles'

const collectionRef = collection(db, "customers")

export function New() {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [complement, setComplement] = useState('')
    const [subject, setSubject] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            await getDocs(collectionRef)
                .then((snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            nameClient: doc.data().nameClient
                        })
                    })

                    if (snapshot.docs.size === 0) {
                        setCustomers([{ id: '1', nameClient: "Nenhum cliente" }])
                        setLoadCustomer(false)
                        return
                    }

                    setCustomers(list)
                    setLoadCustomer(false)

                    if (id) {
                        loadId(list)
                    }

                })
                .catch((err) => {
                    setCustomers([{ id: '1', nameClient: 'Erro ao encontrar' }])
                    setLoadCustomer(false)
                })
        }

        loadCustomers()
    }, [id])

    async function loadId(list) {
        const docRef = doc(db, "called", id)

        await getDoc(docRef)
            .then((snapshot) => {
                setSubject(snapshot.data().subject)
                setStatus(snapshot.data().status)
                setComplement(snapshot.data().complement)

                let index = list.findIndex(item => item.id === snapshot.data().clientId)
                setCustomerSelected(index)
                setIdCustomer(true)

            })
            .catch((err) => {
                console.log(err)
                setCustomers(false)
            })
    }

    function handleOptionChange(e) {
        //console.log(e.target.value)

        setStatus(e.target.value)
    }

    function handleChangeSelect(e) {
        //console.log(e.target.value)

        setSubject(e.target.value)
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.valur)
    }

    async function handleRegister(e) {
        e.preventDefault()

        if (idCustomer) {
            const docRef = doc(db, "called", id)
            await updateDoc(docRef, {
                complement: complement,
                status: status,
                userId: user.uid
            })
                .then(() => {
                    toast.success("Atualisado com sucesso")
                    setCustomerSelected(0)
                    setComplement('')
                    navigate('/dashboard')
                })
                .catch((err) => {
                    toast.error("Erro ao atualizar")
                    console.log(err)
                })

            return
        }

        await addDoc(collection(db, "called"), {
            created: new Date(),
            client: customers[customerSelected].nameClient,
            clientId: customers[customerSelected].id,
            complement: complement,
            status: status,
            userId: user.uid,
            subject: subject
        })
            .then(() => {
                //console.log(value.id)
                toast.success("Cadastrado com sucesso")
                setComplement('')
                setCustomerSelected(0)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Erro ao cadastrar chamado")
            })
    }

    return (
        <>
            <Header />
            <Content>
                <Title name={id ? "Editando Produto" : "Cadastrar Produto"} >
                    <FiCreditCard size={25} />
                </Title>
                <div className="container">
                    <form onSubmit={handleRegister}>
                        <label>Produto</label>
                        {/* {loadCustomer ? (
                            <>
                                <input type='text' disabled={true} value="Carregando..." />
                            </>
                        ) : (
                            <>
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index} >{item.nameClient}</option>
                                        )
                                    })}
                                </select>
                            </>
                        )} */}
                        <input
                            type="text"
                            placeholder="Nome do Produto"
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        />

                        <label>Categoria</label>
                        <select value={subject} onChange={handleChangeSelect}>
                            <option value="Suporte" >Teste1</option>
                            <option value="Visita Tecnica" >Teste2</option>
                            <option value="Financeiro" >Teste3</option>
                        </select>

                        {/* <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div> */}

                        <label>Descrição</label>
                        <textarea
                            type="text"
                            placeholder="Descrição do produto"
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        />

                        <button type='submit' >{id ? "Atualizar" : "Registrar"}</button>
                    </form>
                </div>
            </Content>
        </>
    )
}