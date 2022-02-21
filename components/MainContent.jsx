import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore'
import { db, auth } from '../firebase-config'
import Image from 'next/image'

export default function MainContent() {
  const [data, setData] = useState([])

  useEffect(() => {
    const postsCollectionRef = collection(db, 'data')
    onSnapshot(postsCollectionRef, snapshot => {
      setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  console.log(data)

  return (
    <div className='flex flex-col items-center m-2'>
      {data &&
        data.map(item => (
          <div key={item.id} className='flex  bg-slate-500 mb-2 w-3/4'>
            <p>{item?.title}</p>
            <p>{item.companyName}</p>
            <div className='relative w-32 h-20 mx-8'>
              <Image src={item.imageUrl} layout='fill' objectFit='contain' />
            </div>
          </div>
        ))}
    </div>
  )
}
