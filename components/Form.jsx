import { useEffect, useState } from 'react'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import { auth, db, storage } from '../firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'

export default function Form() {
  const [title, setTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contractType, setContractType] = useState('')
  const [image, setCoverImage] = useState(null)
  const [logo, setLogo] = useState('')
  const [progress, setProgress] = useState(0)
  const [endSubmit, setEndsubmit] = useState(false)
  const types = ['image/png', 'image.jpeg']

  const postsCollectionRef = collection(db, 'data')

  console.log(image)

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
    <form className='flex flex-col items-center'>
      <div className='mb-6'>
        <label>Titre de l&apos;annonce :</label>
        <input
          required
          className='border'
          placeholder='Title...'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <label>Nom de l&apos;entreprise :</label>
        <input
          required
          className='border'
          placeholder='Title...'
          onChange={e => setCompanyName(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <label>Type de contrat :</label>
        <input
          required
          className='border'
          placeholder='Title...'
          onChange={e => setContractType(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor=''>Image</label>
        <input
          required
          type='file'
          name='image'
          accept='image/*'
          onChange={e => setCoverImage(e.target.files[0])}
        />
      </div>
      {/* <div className='mb-6'>
        <label htmlFor=''>Logo</label>
        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={e => setLogo(e)}
        />
      </div> */}
      <button className='bg-wttj-yellow p-4 m-4' onClick={e => createPost(e)}>
        Submit Post
      </button>
    </form>
  )
}
