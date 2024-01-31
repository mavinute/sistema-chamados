import { Routes, Route } from 'react-router-dom'

import { Private } from './Private'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

import { Dashboard } from '../pages/Dashboard'
import { Profile } from '../pages/Profile'
import { Customers } from '../pages/Customers'
import { New } from '../pages/New'

export function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/cadastro' element={<SignUp/>} />

            <Route path='/dashboard' element={<Private><Dashboard/></Private>} />
            <Route path='/perfil' element={<Private><Profile/></Private>} />
            <Route path='/clientes' element={<Private><Customers/></Private>} />
            <Route path='/novo-chamado' element={<Private><New/></Private>} />
            <Route path='/novo-chamado/:id' element={<Private><New/></Private>} />
        </Routes>
    )
}