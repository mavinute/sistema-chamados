import { createContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, 
        GoogleAuthProvider, 
        signInWithPopup,
        signInWithEmailAndPassword,
        signOut } from 'firebase/auth'
import { setDoc, doc, getDoc  } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { auth, db } from '../services/firebaseConnection'

export const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading]= useState(true)

    const navigate = useNavigate()

    //altera o loading ao detectar login, dentro do localstorage
    useEffect(() => {
        function loadUser(){
            const storageUser = localStorage.getItem("dataUser")
            
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadUser()
    }, [])

    async function signUp(name, email, password){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async(value) => {
            //console.log(value)
            const uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                uid: uid,
                name: name,
                email: email,
                avatarUrl: null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success("Cadastro realizado com sucesso")
                navigate("/dashboard")
            })
        })
        .catch((err) => {
            console.log(err)
            setLoadingAuth(false)
        })
    }

    async function accountGoogle(){
        const provider = new GoogleAuthProvider()
        //console.log(provider)

        await signInWithPopup(auth, provider)
        .then(async (value) => {
            //console.log(value)
            const uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                uid: uid,
                name: value.user.displayName,
                email: value.user.email,
                avatarUrl: value.user.photoURL
            })

            let data = {
                uid: uid,
                name: value.user.displayName,
                email: value.user.email,
                avatarUrl: value.user.photoURL
            }

            setUser(data)
            storageUser(data)
            toast.success("Cadastro realizado com sucesso")
            navigate("/dashboard")
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    async function signIn(email, password){
        setLoadingAuth(true)
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            const uid = value.user.uid

            const docSnap = await getDoc(doc(db, "users", uid))

            let data = {
                uid: uid,
                name: docSnap.data().name,
                email: docSnap.data().email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success("Acesso autorizado")
            navigate("/dashboard")
        })
        .catch((err) => {
            console.log(err)
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem("dataUser", JSON.stringify(data))
    }

    async function logOut(){
        await signOut(auth)
        localStorage.removeItem("dataUser")
        setUser(null)
    }
    
    return(
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, 
        loadingAuth, accountGoogle, loading, logOut, storageUser, setUser }} >
            {children}
        </AuthContext.Provider>
    )
}