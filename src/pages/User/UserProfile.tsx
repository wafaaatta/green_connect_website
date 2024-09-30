
import { motion } from 'framer-motion'
import { Mail, Edit, Calendar, Podcast, X, Plus, Trash2, User, Text, FolderTree, Check, Clock, MapPin, LocateFixedIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Card } from '../../components/Card'
import { DangerModal } from '../../components/DangerModal'
import FileUpload from '../../components/FileUpload'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import TextArea from '../../components/Textarea'
import Button from '../../components/Button'
import Select from '../../components/Select'
import { createAnnounce, deleteAnnounce, getUserAnnounces, updateAnnounce } from '../../redux/stores/announce_store'
import { showNotification } from '../../redux/stores/notification_store'
import { getFileUrl } from '../../utils/laravel_storage'
import { useState, useEffect } from 'react'
import { updateUser } from '../../redux/stores/auth_store'
import Announce from '../../interfaces/Announce'
import { IconType } from 'react-icons'

const UserProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const [postToEdit, setPostToEdit] = useState<Announce | null>(null)
  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    category: '', 
    image: null as File | null,
    city: '',
    country: '',
    postalCode: ''
  })

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleCreatePostModal = () => setIsCreatePostModalOpen(!isCreatePostModalOpen)
  const toggleEditPostModal = () => setIsEditPostModalOpen(!isEditPostModalOpen)

  const { user } = useAppSelector((state) => state.auth_store)
  const { announces } = useAppSelector((state) => state.announce_store)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserAnnounces())
  }, [dispatch])

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(updateUser({ id: user!.id, data: { name: name as string, email: email as string } })).unwrap()
      dispatch(showNotification({
        message: 'User updated successfully!',
        type: 'success',
      }))
    } catch (error) {
      console.error(error)
      dispatch(showNotification({
        message: 'User update failed!',
        type: 'error',
      }))
    }
  }
  

  const handleCreatePost = async () => {
    const formData = new FormData()
    formData.append('image', newPost.image as File)
    formData.append('title', newPost.title)
    formData.append('description', newPost.content)
    formData.append('category', newPost.category)
    formData.append('city', newPost.city)
    formData.append('country', newPost.country)
    formData.append('postal_code', newPost.postalCode)

    try {
      await dispatch(createAnnounce(formData)).unwrap()
      dispatch(showNotification({
        message: 'Announce created successfully!',
        type: 'success',
      }))
      setNewPost({ title: '', content: '', image: null, category: '', city: '', country: '', postalCode: '' })
      toggleCreatePostModal()
    } catch (error) {
      console.error(error)
      dispatch(showNotification({
        message: 'Announce creation failed!',
        type: 'error',
      }))
    }
  }

  const handleDeletePost = (postId: number) => {
    setPostToDelete(postId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeletePost = async () => {
    if (postToDelete) {
      try {
        await dispatch(deleteAnnounce(postToDelete)).unwrap()
        dispatch(showNotification({
          message: 'Announce deleted successfully!',
          type: 'success',
        }))
      } catch (error) {
        console.error(error)
        dispatch(showNotification({
          message: 'Announce deletion failed!',
          type: 'error',
        }))
      } finally {
        setIsDeleteModalOpen(false)
        setPostToDelete(null)
      }
    }
  }

  const handleEditPost = (post: Announce) => {
    setPostToEdit(post)
    setIsEditPostModalOpen(true)
  }

  const confirmEditPost = async () => {
    if (postToEdit) {
      try {
        const formData = new FormData()
        //formData.append('image', postToEdit.image as File)
        formData.append('title', postToEdit.title)
        formData.append('description', postToEdit.description)
        formData.append('category', postToEdit.article_category)
        formData.append('city', postToEdit.city)
        formData.append('country', postToEdit.country)
        formData.append('postal_code', postToEdit.postal_code)

        formData.append('image', postToEdit.image as unknown as File)
        
      
        await dispatch(updateAnnounce({
          id: postToEdit.id,
          data: formData
        })).unwrap()
        dispatch(showNotification({
          message: 'Announce updated successfully!',
          type: 'success',
        }))
        setIsEditPostModalOpen(false)
        setPostToEdit(null)
      } catch (error) {
        console.error(error)
        dispatch(showNotification({
          message: 'Announce update failed!',
          type: 'error',
        }))
      }
    }
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
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Mail size={20} className="mr-2" />
            {user?.email}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={20} className="mr-2" /> Joined {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(user?.created_at ?? ''))}
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Podcast size={20} className="mr-2" /> {announces.length} posts
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {announces.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden p-0 h-full flex flex-col">
                <img src={getFileUrl(post.image)} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-2 flex-grow">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{post.description.substring(0, 100)}...</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={16} className="mr-1" />
                    {post.city}, {post.country}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <LocateFixedIcon size={16} className="mr-1" />
                    {post.postal_code}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FolderTree size={16} className="mr-1" />
                    {post.article_category}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <div className="flex items-center">
                      {post.status === 'pending' && <Clock size={16} className="mr-1" />}
                      {post.status === 'accepted' && <Check size={16} className="text-green-500 mr-1" />}
                      {post.status === 'rejected' && <X size={16} className="text-red-500 mr-1" />}
                      <span className="capitalize">{post.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditPost(post)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </motion.button>
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
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={toggleEditModal} title="Edit Profile">
        <form className="space-y-4" onSubmit={handleUpdateUser}>
          <Input
            icon={User as IconType}
            label="Name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
          />
          <Input
            icon={Mail as IconType}
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
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

      <Modal size="xl" isOpen={isCreatePostModalOpen} onClose={toggleCreatePostModal} title="Create New Post">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <Input
              icon={Text as IconType}
              label="Title"
              id="title"
              name="title"
              placeholder="Enter post title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
          </div>
          <div>
            <Input
              icon={Text as IconType}
              label="Country"
              id="country"
              name="country"
              placeholder="Enter country"
              value={newPost.country}
              onChange={(e) => setNewPost({ ...newPost, country: e.target.value })}
            />
          </div>
          <div>
            <Input
              icon={Text as IconType}
              label="City"
              id="city"
              name="city"
              placeholder="Enter city"
              value={newPost.city}
              onChange={(e) => setNewPost({ ...newPost, city: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Input
              icon={Text as IconType}
              label="Postal Code"
              id="postalCode"
              name="postalCode"
              placeholder="Enter postal code"
              value={newPost.postalCode}
              onChange={(e) => setNewPost({ ...newPost, postalCode: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Select 
              icon={FolderTree as IconType}
              label="Category"
              placeholder="Select a category"
              options={[
                { value: 'Indoor Plants', label: 'Indoor Plants' },
                { value: 'Outdoor Plants', label: 'Outdoor Plants' },
                { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
                { value: 'Herb Garden', label: 'Herb Garden' },
                { value: 'Flowering Plants', label: 'Flowering Plants' },
                { value: 'Rare & Exotic Species', label: 'Rare & Exotic Species' },
              ]}
              value={newPost.category}
              onChange={(value) => setNewPost({ ...newPost, category: value as string })}
            />
          </div>
          <div className="md:col-span-2">
            <TextArea
              icon={Text as IconType}
              label="Content"
              placeholder="Write something..."
              rows={5}
              id="content"
              name="content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <FileUpload
            
              onFileSelect={(files) => setNewPost({ ...newPost, image: files[0] })}
              acceptedFileTypes="image/*" 
              mode={'single'}            
            />
          </div>
          <div className="md:col-span-2 flex justify-end space-x-3">
            <Button size="sm" color="gray" variant="outline" onClick={toggleCreatePostModal}>
              Cancel
            </Button>
            <Button size="sm" color="green" type="submit">
              Create Post
            </Button>
          </div>
        </motion.form>
      </Modal>

      <Modal size="xl" isOpen={isEditPostModalOpen} onClose={toggleEditPostModal} title="Edit Post">
        {postToEdit && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => { e.preventDefault(); confirmEditPost(); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <Input
                icon={Text as IconType}
                label="Title"
                id="editTitle"
                name="editTitle"
                placeholder="Enter post title"
                value={postToEdit.title}
                onChange={(e) => setPostToEdit({ ...postToEdit, title: e.target.value })}
              />
            </div>
            <div>
              <Input
                icon={Text as IconType}
                label="Country"
                id="editCountry"
                name="editCountry"
                placeholder="Enter country"
                value={postToEdit.country}
                onChange={(e) => setPostToEdit({ ...postToEdit, country: e.target.value })}
              />
            </div>
            <div>
              <Input
                icon={Text as IconType}
                label="City"
                id="editCity"
                name="editCity"
                placeholder="Enter city"
                value={postToEdit.city}
                onChange={(e) => setPostToEdit({ ...postToEdit, city: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                icon={Text as IconType}
                label="Postal Code"
                id="editPostalCode"
                name="editPostalCode"
                placeholder="Enter postal code"
                value={postToEdit.postal_code}
                onChange={(e) => setPostToEdit({ ...postToEdit, postal_code: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Select 
                icon={FolderTree as IconType}
                label="Category"
                placeholder="Select a category"
                options={[
                  { value: 'Indoor Plants', label: 'Indoor Plants' },
                  { value: 'Outdoor Plants', label: 'Outdoor Plants' },
                  { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
                  { value: 'Herb Garden', label: 'Herb Garden' },
                  { value: 'Flowering Plants', label: 'Flowering Plants' },
                  { value: 'Rare & Exotic Species', label: 'Rare & Exotic Species' },
                ]}
                value={postToEdit.article_category}
                onChange={(value) => console.log(value)}
              />
            </div>
            <div className="md:col-span-2">
              <TextArea
                icon={Text as IconType}
                label="Content"
                placeholder="Write something..."
                rows={5}
                id="editContent"
                name="editContent"
                value={postToEdit.description}
                onChange={(e) => setPostToEdit({ ...postToEdit, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <FileUpload
                mode='single'
                onFileSelect={(files) => console.log(files)}
                acceptedFileTypes="image/*"
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <Button size="sm" color="gray" variant="outline" onClick={toggleEditPostModal}>
                Cancel
              </Button>
              <Button size="sm" color="green" type="submit">
                Update Post
              </Button>
            </div>
          </motion.form>
        )}
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