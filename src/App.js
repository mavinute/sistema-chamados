import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { RoutesApp } from './routes'
import { AuthProvider } from './contexts/auth'

import { GlobalStyle } from './styles/global'

import 'react-toastify/dist/ReactToastify.css';

export function App(){
  return(
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3500} />
        <GlobalStyle/>
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  )
}