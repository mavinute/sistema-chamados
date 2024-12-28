import { Routes, Route } from 'react-router-dom'

import { Private } from './Private'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

import { Dashboard } from '../pages/Dashboard'
import { Profile } from '../pages/Profile'
import { Customers } from '../pages/Customers'
import { New } from '../pages/New'
import { Home } from '../pages/Home'
import { ProductView } from '../pages/ProductView'
import { Checkin } from '../pages/Checkin'

export function RoutesApp() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/cadastro' element={<SignUp />} />
            <Route path='/' element={<Home />} />

            <Route path='/dashboard' element={<Private><Dashboard /></Private>} />
            <Route path='/perfil' element={<Private><Profile /></Private>} />
            <Route path='/clientes' element={<Private><Customers /></Private>} />
            <Route path='/novo-chamado' element={<Private><New /></Private>} />
            <Route path='/novo-chamado/:id' element={<Private><New /></Private>} />
            <Route path='/produto' element={<ProductView />} />
            <Route path='/checkin' element={<Checkin />} />
        </Routes>
    )
}