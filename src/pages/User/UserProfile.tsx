import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Heart, Edit, Calendar, Podcast, X, Plus, Image, Trash2, User, Text, FolderTree } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Card } from '../../components/Card'
import { DangerModal } from '../../components/DangerModal'
import FileUpload from '../../components/FileUpload'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import TextArea from '../../components/Textarea'
import Button from '../../components/Button'
import Select from '../../components/Select'
import { useDispatch } from 'react-redux'
import { createAnnounce, getUserAnnounces } from '../../redux/stores/announce_store'
import { showNotification } from '../../redux/stores/notification_store'
import { getFileUrl } from '../../utils/laravel_storage'

const UserProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', image: null as File | null })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)



  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleCreatePostModal = () => setIsCreatePostModalOpen(!isCreatePostModalOpen)

  const { user } = useAppSelector((state) => state.auth_store)
  const { announces } = useAppSelector((state) => state.announce_store)


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserAnnounces())
  }, [dispatch])

  const handleCreatePost = async () => {
    // Simulating post creation
    const createdPost = { ...newPost, id: newPostId, likes: 0, image: newPost.image ? URL.createObjectURL(newPost.image) : '' }
    setNewPost({ title: '', content: '', image: null, category: '' })
    setIsCreatePostModalOpen(false)
    setMessage({ type: 'success', text: 'Post created successfully!' })
    setTimeout(() => setMessage(null), 3000)

    const formData = new FormData()
    formData.append('image', newPost.image as File)
    formData.append('title', newPost.title)
    formData.append('description', newPost.content)
    formData.append('category', newPost.category)
    formData.append('location', 'Paris, France')

    await dispatch(
      createAnnounce(formData)
    ).unwrap()
    .then(() => {
      dispatch(
        showNotification({
          message: 'Announce created successfully!',
          type: 'success',
        })
      )
    }).catch((error) => {
      console.log(error)

      dispatch(
        showNotification({
          message: 'Announce creation failed!',
          type: 'error',
        })
      )
    })
  }

  const handleDeletePost = (postId: number) => {
    setPostToDelete(postId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeletePost = () => {
    if (postToDelete) {
      setMessage({ type: 'success', text: 'Post deleted successfully!' })
      setTimeout(() => setMessage(null), 3000)
    }
    setIsDeleteModalOpen(false)
    setPostToDelete(null)
  }


  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">{user?.name}</h1>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
              onClick={toggleEditModal}
            >
              <Edit size={20} className="mr-2" /> Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
              onClick={toggleCreatePostModal}
            >
              <Plus size={20} className="mr-2" /> Create Post
            </motion.button>
          </div>
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
          <Podcast size={20} className="mr-2" /> {announces.length} posts
        </div>
      </Card>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {announces.map((post) => (
            <Card key={post.id} className="overflow-hidden p-0">
              <img src={getFileUrl(post.image)} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                <h3 className="font-semibold text-lg">{post.title}</h3>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={toggleEditModal} title="Edit Profile">
        <form className="space-y-4">
          <Input
            icon={User}
            label="Name"
            id="name"
            name="name"
            defaultValue={user?.name}
          />
          <Input
            icon={Mail}
            label="Email"
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
          />
          <div className="flex justify-end space-x-3">
            <Button size="sm" color="gray" variant="outline" onClick={toggleEditModal}>
              Cancel
            </Button>
            <Button size="sm" color="green" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isCreatePostModalOpen} onClose={toggleCreatePostModal} title="Create New Post">
        <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }} className="space-y-4">
          <Input
            icon={Text}
            label="Title"
            id="title"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Select 
            icon={FolderTree}
            label="Category"
            placeholder='fdafadfda'
            options={[
              { value: 'Indoor Plants', label: 'Indoor Plants' },
              { value: 'Outdoor Plants', label: 'Outdoor Plants ' },
              { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
              { value: 'Herb Garden', label: 'Herb Garden' },
              { value: 'Flowering Plants', label: 'Flowering Plants' },
              { value: 'Rare & Exotic Species', label: 'Rare & Exotic Species' },
            ]}
            value={newPost.category as string}
            onChange={(value) => setNewPost({ ...newPost, category: value as string })}
          />
          <TextArea
            icon={Text}
            label="Content"
            placeholder='Write something...'
            rows={5}
            id="content"
            name="content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <FileUpload

            onFileSelect={(files) => setNewPost({ ...newPost, image: files[0] })}
            acceptedFileTypes="image/*"
          />
          <div className="flex justify-end space-x-3">
            <Button size="sm" color="gray" variant="outline" onClick={toggleCreatePostModal}>
              Cancel
            </Button>
            <Button size="sm" color="green" type="submit">
              Create Post
            </Button>
          </div>
        </form>
      </Modal>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Post"
        content="Are you sure you want to delete this post? This action cannot be undone."
        onAccept={confirmDeletePost}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default UserProfilePage