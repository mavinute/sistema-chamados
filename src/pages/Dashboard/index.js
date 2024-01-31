import { useState, useEffect } from 'react'
import { FiHome, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { format } from 'date-fns'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import { db } from '../../services/firebaseConnection'

import { Content } from './styles'

const listref = collection(db, "called")

export function Dashboard(){
    //const { logOut } = useContext(AuthContext)

    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)

    useEffect(() => {
        async function loadChamados(){
            const q = query(listref, orderBy('created', 'desc'), limit(8))

            const querySnaphot = await getDocs(q)
            setChamados([])
            await updateStore(querySnaphot)
        }

        loadChamados()

        return () => {}
    }, [])

    async function updateStore(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0

        if(!isCollectionEmpty){
            let list = []

            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    subject: doc.data().subject,
                    client: doc.data().client,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(),  'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complement
                })
            })

            setChamados(chamados => [...chamados, ...list])
        }else{
            setIsEmpty(true)
        }
    }

    // if(loading){
    //     return(
    //         <div>
    //             <Header/>
    //             <div>
    //                 <Content>
    //                     <Title name="Tickets">
    //                         <FiMessageSquare size={25} />
    //                     </Title>
    //                     <div>
    //                         <span>Buscando Chamados...</span>
    //                     </div>
    //                 </Content>
    //             </div>
    //         </div>
    //     )
    // }
    
    return(
        <>
            <Header/>
            <Content>
                <Title name="Início">
                    <FiHome size={25} />
                </Title>
                
                {/* <div className='container'>
                    <h1>Teste</h1>
                </div> */}

                {chamados.length === 0 ? (
                    <div>
                        <span>Nenhum chamado encontrado...</span>
                        <Link to="/novo-chamado" className='new'>
                            <FiPlus color='#fff' size={25} />
                            Novo Chamado
                        </Link>
                    </div>
                ):(
                    <>
                        <Link to="/novo-chamado" className='new'>
                            <FiPlus color='#fff' size={25} />
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='col' >Cliente</th>
                                    <th scope='col' >Assunto</th>
                                    <th scope='col' >Status</th>
                                    <th scope='col' >Cadastrado em</th>
                                    <th scope='col' >#</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {chamados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.client}</td>
                                            <td data-label="Assunto">{item.subject}</td>
                                            <td data-label="Status">
                                                <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormat}</td>
                                            <td data-label="#">
                                                <button className='action' style={{ backgroundColor: '#3583f6' }} >
                                                    <FiSearch color='#fff' size={17} />
                                                </button>
                                                <Link to={`/novo-chamado/${item.id}`} className='action' style={{ backgroundColor: '#f6a935' }}>
                                                    <FiEdit2 color='#fff' size={17} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </>
                    
                )}
            </Content>
        </>
    )
}