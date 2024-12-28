import { useState, useEffect } from 'react'
import { FiHome, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { format } from 'date-fns'

import { Header2 } from '../../components/Header copy'
import { Title } from '../../components/Title'

import { db } from '../../services/firebaseConnection'

import logoImage from '../../assets/logo.png'

import { Content } from './styles'

const listref = collection(db, "called")

export function ProductView() {
  //const { logOut } = useContext(AuthContext)

  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)

  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    async function loadChamados() {
      const q = query(listref, orderBy('created', 'desc'), limit(8))

      const querySnaphot = await getDocs(q)
      setChamados([])
      await updateStore(querySnaphot)
    }

    loadChamados()

    return () => { }
  }, [])

  async function updateStore(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (!isCollectionEmpty) {
      let list = []

      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          client: doc.data().client,
          clientId: doc.data().clientId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complement: doc.data().complement
        })
      })

      setChamados(chamados => [...chamados, ...list])
    } else {
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

  return (
    <>
      <Header2 />
      <Content>
        <Title name="Produto">
          <FiHome size={25} />
        </Title>

        <div className='product-view'>
          <div className='img'>
            <img src={logoImage} alt="imagem de produto" />
          </div>
          <div className='datails'>
            <strong>Produto de Teste</strong>
            <p>Detalhes de do produto que esta sendo vendido, como cor
              tamanho e qualidade.
            </p>
            <input placeholder='CEP' />
            <Link to={`/checkin`} className='button'>
              Comprar
            </Link>
          </div>
        </div>

      </Content>
    </>
  )
}