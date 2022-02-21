import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore'
import { db, auth } from '../firebase-config'

export default function DeleteForm() {
  const [postLists, setPostLists] = useState([])

  useEffect(() => {
    const postsCollectionRef = collection(db, 'data')
    onSnapshot(postsCollectionRef, snapshot => {
      setPostLists(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  const deletePost = async id => {
    const postDoc = doc(db, 'data', id)
    await deleteDoc(postDoc)
  }

  return (
    <div className='flex flex-col justify-start items-start border w-2/3 mx-auto mt-8 p-4 rounded-lg bg-gray-50'>
      <h2 className='text-xl font-semibold mb-4'>
        Supprimez vos annonces en cliquant sur la croix : X
      </h2>
      {postLists.map((post, i) => (
        <div key={i}>
          <div className='flex items-center'>
            <div className='mr-4'>
              <h1>{post.title}</h1>
            </div>
            <div>
              {post.author?.id === auth.currentUser.uid && (
                <button
                  className='bg-slate-200 p-1 rounded-full h-8 w-8 cursor-pointer hover:bg-slate-400'
                  onClick={() => {
                    deletePost(post.id)
                  }}
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
