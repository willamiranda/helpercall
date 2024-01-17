import { useContext, useState } from "react"
import Header from "../../components/Header"
import Title from "../../components/Title"

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from "../../contexts/auth"

import { db, storage } from "../../services/firebaseConnection"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'

import './profile.css'

export default function Profile() {

    const { user, storageUser, setUser, logout } = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null);
    const [name, setNome] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/bmp' || image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                alert("Envia uma imagem do tipo JPEG ou PNG")
                setImageAvatar(null);
                return;
            }
        }
    }
    async function handleUpload() {
        const currentUid = user.uid;
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
        const uploadTastk = uploadBytes(uploadRef, imageAvatar)
            .then((snapshot) => {

                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    let urlFoto = downloadURL;

                    const docRef = doc(db, "users", user.uid)
                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        name: name
                    })
                        .then(() => {
                            let data = {
                                ...user,
                                name: name,
                                avatarUrl: urlFoto,
                            }

                            setUser(data)
                            storageUser(data)
                            toast.success("Atualizado com sucesso")
                        })
                })

            })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (imageAvatar === null && name !== '') {
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                name: name,
            })
                .then(() => {
                    let data = {
                        ...user,
                        name: name,
                    }

                    setUser(data)
                    storageUser(data)
                    toast.success("Atualizado com sucesso")
                })
        } else if (name !== '' && imageAvatar !== null) {
            handleUpload()
        }
    }



    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Minha Conta">
                    <FiSettings size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile" onSubmit={handleSubmit} >

                        <label className="label-avatar">

                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /> <br />

                            {avatarUrl === null ? (
                                <img src={avatar} alt="foto de perfil"
                                    width={250} height={250} />
                            ) : (<img src={avatarUrl} alt="foto de perfil"
                                width={250} height={250} />)}

                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit"> Salvar</button>

                    </form>

                </div>

                <div className="container">
                    <button className="logout-btn" onClick={() => logout()}>Sair</button>
                </div>

            </div>

        </div >
    )
}