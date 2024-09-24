import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, MapPin, Leaf, Heart, Edit, Camera, Calendar, Award, Trash2, MessageCircle, Share2 } from 'lucide-react'

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate plant lover and environmental enthusiast. Always looking to expand my green family!',
    avatar: '/src/assets/images/users/jane-doe.jpg',
    joinDate: 'January 2022',
    plantsOwned: 15,
    tradesMade: 7,
    badges: ['Plant Expert', 'Eco Warrior', 'Community Leader'],
  }

  const [editedUser, setEditedUser] = useState(user)

  const userPosts = [
    { id: 1, title: 'Monstera Deliciosa', image: '/src/assets/images/plants/monstera.png', likes: 24, comments: 5 },
    { id: 2, title: 'Fiddle Leaf Fig', image: '/src/assets/images/plants/fiddle-leaf-fig.png', likes: 18, comments: 3 },
    { id: 3, title: 'Snake Plant', image: '/src/assets/images/plants/snake-plant.png', likes: 32, comments: 7 },
    { id: 4, title: 'Pothos', image: '/src/assets/images/plants/pothos.png', likes: 15, comments: 2 },
  ]

  const userFavorites = [
    { id: 1, title: 'Pothos', image: '/src/assets/images/plants/pothos.png', owner: 'Alice Green' },
    { id: 2, title: 'ZZ Plant', image: '/src/assets/images/plants/zz-plant.png', owner: 'Bob Plant' },
    { id: 3, title: 'Peace Lily', image: '/src/assets/images/plants/peace-lily.png', owner: 'Charlie Bloom' },
    { id: 4, title: 'Spider Plant', image: '/src/assets/images/plants/spider-plant.png', owner: 'Diana Flower' },
  ]

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically send the editedUser data to your backend
    console.log('Saving profile:', editedUser)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full object-cover" />
            <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-300">
              <Camera size={20} />
              <span className="sr-only">Change profile picture</span>
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-green-800">{user.name}</h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start">
              <MapPin size={16} className="mr-1" /> {user.location}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
              <span className="text-sm text-gray-600 flex items-center">
                <Calendar size={16} className="mr-1" /> Joined {user.joinDate}
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <Leaf size={16} className="mr-1" /> {user.plantsOwned} plants
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <Share2 size={16} className="mr-1" /> {user.tradesMade} trades
              </span>
            </div>
          </div>
        </div>
        {!isEditing ? (
          <>
            <p className="text-gray-700 mb-4">{user.bio}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Mail size={20} className="mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={20} className="mr-2" />
                {user.phone}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.badges.map((badge, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                  <Award size={14} className="mr-1" /> {badge}
                </span>
              ))}
            </div>
            <button
              onClick={handleEditProfile}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
            >
              <Edit size={20} className="mr-2" /> Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editedUser.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-wrap border-b">
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'profile' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'posts' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'favorites' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                <h3 className="text-lg font-semibold mb-2">Interests</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  <li>Sustainable gardening</li>
                  <li>Plant propagation techniques</li>
                  <li>Indoor plant care</li>
                  <li>Rare plant collecting</li>
                </ul>
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                      <Award size={14} className="mr-1" /> {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'posts' && (
              <motion.div
                key="posts"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h2 className="text-xl font-semibold mb-4">My Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center"><Heart size={16} className="mr-1" /> {post.likes}</span>
                          <span className="flex items-center"><MessageCircle size={16} className="mr-1" /> {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h2 className="text-xl font-semibold mb-4">My Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userFavorites.map((favorite) => (
                    <div key={favorite.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={favorite.image} alt={favorite.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{favorite.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Owner: {favorite.owner}</p>
                        <button className="text-green-600 hover:text-green-700 transition-colors duration-300">
                          <MessageCircle size={20} />
                          <span className="sr-only">Message owner</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage