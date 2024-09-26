import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Heart, Edit, Calendar, Podcast, X } from 'lucide-react'
import { useAppSelector } from '../../hooks/hooks'

const UserProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const userPosts = [
    { id: 1, title: 'Monstera Deliciosa', image: '/src/assets/images/plants/monstera.png', likes: 24 },
    { id: 2, title: 'Fiddle Leaf Fig', image: '/src/assets/images/plants/fiddle-leaf-fig.png', likes: 18 },
    { id: 3, title: 'Snake Plant', image: '/src/assets/images/plants/snake-plant.png', likes: 32 },
    { id: 4, title: 'Pothos', image: '/src/assets/images/plants/pothos.png', likes: 15 },
  ]

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)

  const {user} = useAppSelector((state) => state.auth_store)

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className=" bg-white rounded shadow p-4 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">{user?.name}</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
            onClick={toggleEditModal}
          >
            <Edit size={20} className="mr-2" /> Edit Profile
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Mail size={20} className="mr-2" />
            {user?.email}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={20} className="mr-2" /> Joined {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(user?.created_at as string))}
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Podcast size={20} className="mr-2" /> {15} posts
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {userPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded border shadow overflow-hidden transition-shadow duration-300"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Heart size={16} className="mr-1" />
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded shadow-xl p-4 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button onClick={toggleEditModal} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>

                  <input type="text" id="name" name="name" defaultValue={user?.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" defaultValue={user?.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={toggleEditModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfilePage