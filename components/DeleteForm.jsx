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
    <div>
      {postLists.map((post, i) => (
        <div key={i}>
          <div>
            <div>
              <h1>{post.title}</h1>
            </div>
            <div>
              {post.author?.id === auth.currentUser.uid && (
                <button
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
