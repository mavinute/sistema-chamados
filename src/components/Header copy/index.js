import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiTarget, FiUser, FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'

import avatarImg from '../../assets/avatar.png'
import logoTeste from '../../assets/logo.png'

import { SideBar } from './styles'

export function Header2() {
    const { user, logOut } = useContext(AuthContext)

    return (
        <SideBar>
            {/* <div className='background-avatar'>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto do perfil" />
            </div> */}
            <div className='background-avatar'>
                <img src={logoTeste} alt="foto do perfil" />
            </div>

            <Link to="/">
                <FiHome size={25} />
                Inicio
            </Link>


        </SideBar>
    )
}