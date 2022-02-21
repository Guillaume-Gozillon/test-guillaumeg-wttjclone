import { useState } from 'react'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import { db, storage } from '../firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'

export default function Form() {
  const [title, setTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contractType, setContractType] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [image, setCoverImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [endSubmit, setEndsubmit] = useState(false)

  const postsCollectionRef = collection(db, 'data')

  const createPost = e => {
    e.preventDefault()
    const storageRef = ref(storage, `/images/${image.name}`)
    const uploadImage = uploadBytesResumable(storageRef, image)

    uploadImage.on(
      'state_changed',
      snapshot => {
        const progressPercent =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progressPercent)
        console.log(progress)
      },
      err => {
        console.log(err)
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(url => {
          addDoc(postsCollectionRef, {
            title,
            companyName,
            contractType,
            localisation,
            imageUrl: url,
            createdAt: Timestamp.now().toDate()
          })
            .then(() => {
              setProgress(0)
            })
            .catch(err => {
              console.log(err)
            })
          setEndsubmit(true)
        })
      }
    )
  }

  return (
    <form className='flex flex-col items-center bg-wttj-light-yellow'>
      <h2 className='mt-8 text-2xl font-bold'>
        Postez votre annonce sur Welcome To The Jungle
      </h2>
      <div className='bg-white mt-8 rounded-xl p-8 mb-8 border'>
        <div className='mb-6'>
          <label className='mr-4 font-semibold'>
            Titre de l&apos;annonce :
          </label>
          <input
            required
            className='border-b outline-none p-1'
            placeholder='Titre'
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='mr-4 font-semibold'>
            Nom de l&apos;entreprise :
          </label>
          <input
            required
            className='border-b outline-none p-1'
            placeholder='Entreprise'
            onChange={e => setCompanyName(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='mr-4 font-semibold'>Lieu :</label>
          <input
            required
            className='border-b outline-none p-1'
            placeholder='Lieu de travail :'
            onChange={e => setLocalisation(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='mr-4 font-semibold'>Type de contrat :</label>
          <input
            required
            className='border-b outline-none p-1'
            placeholder='Contrat'
            onChange={e => setContractType(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className='mr-6 font-semibold' htmlFor=''>
            Image :
          </label>
          <input
            required
            type='file'
            name='image'
            accept='image/*'
            onChange={e => setCoverImage(e.target.files[0])}
          />
        </div>
        <div className='flex w-full justify-center'>
          <button
            className='bg-wttj-yellow p-4 m-4 font-bold text-white rounded-xl hover:shadow-lg'
            onClick={e => createPost(e)}
          >
            Publier l'annonce
          </button>
        </div>
      </div>
    </form>
  )
}
