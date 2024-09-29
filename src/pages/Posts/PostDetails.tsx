import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, MapPin, User, X } from 'lucide-react'
import ContactMap from './ContactMap'
import { useNavigate } from 'react-router-dom'
import Routes from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { createConversation } from '../../redux/stores/conversation_store'
import { unwrapResult } from '@reduxjs/toolkit'
import { getFileUrl } from '../../utils/laravel_storage'
import moment from 'moment'
import { AutocompleteInput } from '../../components/AutoComplete'
import cities from '../../constants/mapped_france_cities'

interface Post {
  id: number
  user: string
  title: string
  image: string
  category: string
  city: string
  postalCode: string
  creationDate: string
  description: string
  userImage?: string
}

const otherPosts: Post[] = [
  { id: 2, user: 'Alice Green', title: 'Fiddle Leaf Fig', image: '/src/assets/images/plants/fiddle-leaf-fig.png', category: 'Indoor', city: 'New York', postalCode: '10021', creationDate: '2023-06-10', description: 'Fiddle Leaf Fig description...' },
  { id: 3, user: 'Alice Green', title: 'Snake Plant', image: '/src/assets/images/plants/snake-plant.png', category: 'Indoor', city: 'New York', postalCode: '10021', creationDate: '2023-06-05', description: 'Snake Plant description...' },
  { id: 3, user: 'Alice Green', title: 'Snake Plant', image: '/src/assets/images/plants/snake-plant.png', category: 'Indoor', city: 'New York', postalCode: '10021', creationDate: '2023-06-05', description: 'Snake Plant description...' },
  { id: 3, user: 'Alice Green', title: 'Snake Plant', image: '/src/assets/images/plants/snake-plant.png', category: 'Indoor', city: 'New York', postalCode: '10021', creationDate: '2023-06-05', description: 'Snake Plant description...' },
]


export default function PostDetails() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()
  const {isAuthenticated} = useAppSelector(state => state.auth_store)
  const dispatch = useAppDispatch()
  const {currentAnnounce} = useAppSelector(state => state.announce_store)

  const handleConnect = async () => {
    if(!isAuthenticated) {
      return setIsDialogOpen(true)
    }
    
    await dispatch(
      createConversation({
        receiver_id: currentAnnounce?.user.id as number, 
        announce_id: currentAnnounce?.id as number
    })
    ).then(unwrapResult)
    .then(() => {
      navigate(Routes.PAGES.CONVERSATIONS)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    navigate(Routes.AUTH.LOGIN)

  }


  return (
    <div className="max-w-7xl mx-auto relative p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded border shadow overflow-hidden"
      >
        <img 
          src={'/src/assets/images/plants/bonsai.png'} 
          alt={currentAnnounce?.title} 
          className="w-full h-96 "
          style={{
            aspectRatio: '16/9',
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
          }}
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{currentAnnounce?.title}</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-600 flex items-center justify-end">
                <MapPin className="w-4 h-4 mr-1" />
                {currentAnnounce?.city}, {currentAnnounce?.postal_code}
              </p>
              <p className="text-gray-600 flex items-center justify-end mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {moment(currentAnnounce?.created_at).format('MMMM Do YYYY')}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <div className="w-full h-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  {currentAnnounce?.user?.name[0] + currentAnnounce?.user?.name[1]}
                </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentAnnounce?.user.name}</h2>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">About this plant</h3>
            <p className="text-gray-700">{currentAnnounce?.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <ContactMap city='lyon' country='france'  />
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4">More posts by {currentAnnounce.user.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded shadow overflow-hidden border"
                >
                  <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h4 className="text-lg font-semibold mb-1">{post.title}</h4>
                    <p className="text-gray-600 text-sm">{`${post.city} . ${post.postalCode}`}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-end fixed bottom-0 left-0 right-0  p-4 shadow-md z-50">
        <button
          onClick={handleConnect}
          className=" bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 transition duration-300"
        >
          Connect with {currentAnnounce.user.name}
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-3 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Sign In Required</h3>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4">Please sign in to connect with other plant enthusiasts.</p>
            <button
              onClick={handleCloseDialog}
              className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900 transition duration-300 flex items-center justify-center"
            >
              Go to Sign In
              <User className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}