import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiTarget, FiUser, FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'

import avatarImg from '../../assets/avatar.png'

import { SideBar } from './styles'

export function Header(){
    const { user, logOut } = useContext(AuthContext)
    
    return(
        <SideBar>
            <div className='background-avatar'>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto do perfil" />
            </div>

            <Link to="/dashboard">
                <FiHome size={25} />
                Inicio
            </Link>
            <Link to="/clientes" >
                <FiTarget size={25} />
                Clientes
            </Link>
            <Link to="/perfil">
                <FiUser size={25} />
                Perfil
            </Link>
            <Link onClick={logOut} >
                <FiLogOut size={25} />
                Sair
            </Link>

        </SideBar>
    )
}