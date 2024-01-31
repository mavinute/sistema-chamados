import { useContext, useState } from 'react'
import { FiUser, FiUpload } from 'react-icons/fi'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'
import { db, storage } from '../../services/firebaseConnection'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import avatarImg from '../../assets/avatar.png'

import { Content } from './styles'

export function Profile(){
    const { user, setUser, storageUser } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e){
        //console.log(e.target.files)

        if(e.target.files[0]){
            const img = e.target.files[0]

            if(img.type === 'image/jpeg' || img.type === 'image/png'){
                setImageAvatar(img)
                setAvatarUrl(URL.createObjectURL(img))
            }else{
                alert("Envie uma imagem no formato PNG ou JPEG")
                setImageAvatar(null)
                return
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid

        //prepara a imagem com as credenciais de acesso e informação do caminho da img
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        //faz o upload da imagem
        uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            //console.log("enviado com sucesso")

            //obtem o retorno com o caminho o caminho da imagem
            getDownloadURL(snapshot.ref)
            .then(async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    name: name,
                    avatarUrl: urlFoto
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: name,
                        avatarUrl: urlFoto
                    }

                    setUser(data)
                    storageUser(data)
                    toast.success("Nome e foto atualizados com sucesso")
                })
            })
        })
        //console.log(uploadTask)


    }

    async function handleSubmit(e){
        e.preventDefault()

        if(imageAvatar === null && name !== ''){
            //atualizar apenas o nome do user

            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                name: name
            })
            .then(() => {
                let data = {
                    ...user,
                    name: name
                }

                setUser(data)
                storageUser(data)
                toast.success("Nome atualizado com sucesso")
            })

        }else if(name !== '' && imageAvatar !== null){
            //atualizar tanto o nome quanto a foto

            handleUpload()
        }
    }
    
    return(
        <>
            <Header />
            <Content>
                <Title name="Meu Perfil">
                    <FiUser size={25} />
                </Title>
                <form onSubmit={handleSubmit}>
                    <label className='label-avatar'>
                        <span>
                            <FiUpload color="#fff" size={25} />
                        </span>
                        <input type='file' accept='image/*' onChange={handleFile} /><br/>
                        {avatarUrl === null ? (
                            <img src={avatarImg} alt="avatar alternativo" width={250} height={250} />
                        ): (
                            <img src={avatarUrl} alt="avatar do usuario" width={250} height={250} />
                        )}
                    </label>

                    <label>Nome</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Email</label>
                    <input type='email' value={email} disabled={true} />

                    <button type='submit' >Salvar</button>
                </form>
            </Content>
        </>
    )
}