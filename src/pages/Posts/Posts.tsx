import { motion } from 'framer-motion'
import Badge from '../../components/Badge'
import { NavLink, useNavigate } from 'react-router-dom'
import Routes from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useEffect } from 'react'
import { getAllAnnounces, setCurrentAnnounce } from '../../redux/stores/announce_store'
import Announce from '../../interfaces/Announce'
import { getFileUrl } from '../../utils/laravel_storage'

const PostsPage = () => {
  const dispatch = useAppDispatch()
  const {announces} = useAppSelector(state => state.announce_store)

  useEffect(() => {
    dispatch(getAllAnnounces())
  }, [dispatch])

  const navigate = useNavigate()

  const navigateToAnnounceDetails = (announce: Announce) => {
    dispatch(
      setCurrentAnnounce(
        announce
      )
    )
    navigate(Routes.PAGES.POST_DETAILS.replace(':id', announce.id.toString()))
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Latest Plant Posts</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {announces.map((announce, index) => (
          <motion.div
            key={announce.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded shadow overflow-hidden border"
          >
            <img src={getFileUrl(announce.image)} alt={announce.title} className="w-full h-48 object-cover" />
            <div className="p-3">
              <h2 className="text-xl font-semibold mb-1">{announce.title}</h2>
              <Badge className='mb-1'>{announce.category}</Badge>
              <p className="text-gray-600">{`${announce.city} . ${announce.postalCode}`}</p>

              <div className='mt-4'>
                <p onClick={() => navigateToAnnounceDetails(announce)} className='text-end hover:underline text-green-800'>Read more</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PostsPage
