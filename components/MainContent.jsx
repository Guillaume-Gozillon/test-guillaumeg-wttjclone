import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore'
import { db } from '../firebase-config'
import Image from 'next/image'
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/outline'

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
    <div className='flex flex-col items-center mb-2 pt-8 bg-wttj-light-yellow'>
      {data &&
        data.map(item => (
          <div
            key={item.id}
            className='flex justify-between bg-white mb-8 w-3/4 h-48 border cursor-pointer hover:shadow hover:border-wttj-yellow'
          >
            <div className='relative w-1/3 h-full'>
              <Image
                quality={2}
                src={item.imageUrl}
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className='w-2/3 py-6 px-8'>
              <h2 className='text-gray-600'>{item.companyName}</h2>
              <p className='text-2xl font-semibold mb-3'>{item?.title}</p>
              <div className='flex items-center mb-3'>
                <div className='flex items-center mr-4'>
                  <SearchIcon className='h-4 mr-2' />
                  <p>{item.localisation}</p>
                </div>
                <div className='flex items-center'>
                  <SearchIcon className='h-4 mr-2' />
                  <p>{item.contractType}</p>
                </div>
              </div>
              <div>
                <div>
                  Créé le {item.createdAt.toDate().toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
