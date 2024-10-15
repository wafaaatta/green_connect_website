import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, User, X, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { createConversation } from '../../redux/stores/conversation_store'
import { unwrapResult } from '@reduxjs/toolkit'
import moment from 'moment'
import { ConfirmationModal } from '../../components/ConfirmationDialog'
import { getOtherUserAcceptedAnnounces, setCurrentAnnounce } from '../../redux/stores/announce_store'
import Announce from '../../interfaces/Announce'
import { getFileUrl } from '../../utils/laravel_storage'

export default function AnnounceDetails() {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector(state => state.auth_store)
  const dispatch = useAppDispatch()
  const { currentAnnounce, announces } = useAppSelector(state => state.announce_store)

  useEffect(() => {
    if (currentAnnounce?.id) {
      dispatch(getOtherUserAcceptedAnnounces(currentAnnounce.id))
    }
  }, [dispatch, currentAnnounce?.id])

  const handleConnect = async () => {
    if (!isAuthenticated) {
      return setIsDialogOpen(true)
    }
    
    setIsConfirmModalOpen(true)
  }

  const confirmConnect = async () => {
    if (currentAnnounce?.user.id && currentAnnounce?.id) {
      await dispatch(
        createConversation({
          receiver_id: currentAnnounce.user.id,
          announce_id: currentAnnounce.id
        })
      ).then(unwrapResult)
      .then(() => {
        navigate(Routes.PAGES.CONVERSATIONS)
      }).catch((error) => {
        console.error('Error creating conversation:', error)
      })
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    navigate(Routes.AUTH.LOGIN)
  }

  const navigateToAnnounceDetails = (announce: Announce) => {
    dispatch(
      setCurrentAnnounce(announce)
    )
    navigate(Routes.PAGES.ANNOUNCE_DETAILS.replace(':id', announce.id.toString()))
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
          aria-hidden="true"
          loading='lazy'
          src={'/src/assets/images/plants/spider-plant.png'}
          alt={currentAnnounce?.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2 heading-font">{currentAnnounce?.title}</h1>
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
                {currentAnnounce?.user?.name ? currentAnnounce.user.name.slice(0, 2).toUpperCase() : ''}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold heading-font">{currentAnnounce?.user.name}</h2>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 heading-font">{t('postDetails.aboutPlant')}</h3>
            <p className="text-gray-700 body-font">{currentAnnounce?.description}</p>
          </div>

          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <p className="text-lg text-gray-800">
              {t('postDetails.policyReminder')} 
              <Link aria-label="See policy" to={Routes.PAGES.PRIVACY_POLICY} className="ml-1 text-green-800 text-xl hover:underline">
                {t('postDetails.seePolicy')}
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('postDetails.morePosts', { name: currentAnnounce?.user.name })}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {announces.map((announce) => (
                <motion.div
                  key={announce.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded shadow overflow-hidden border flex flex-col"
                >
                  <img aria-hidden="true" loading='lazy' src={getFileUrl(announce.image)} alt={announce.title} className="w-full h-40 object-cover" />
                  <div className="p-3 flex-grow">
                    <h4 className="text-lg font-semibold mb-1">{announce.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{`${announce.city} . ${announce.postal_code}`}</p>
                    <div className='flex justify-end'>
                      <button
                        aria-label="See details"
                        onClick={() => navigateToAnnounceDetails(announce)}
                        className="mt-auto bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center"
                      >
                        {t('postDetails.seeDetails')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-end fixed bottom-0 left-0 right-0 p-4 shadow-md z-50">
        <button
          onClick={handleConnect}
          className="bg-green-800 text-white py-2 px-6 rounded hover:bg-green-900 transition duration-300"
        >
          {t('postDetails.connectWith', { name: currentAnnounce?.user.name })}
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-3 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{t('postDetails.signInRequired')}</h3>
              <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4">{t('postDetails.signInMessage')}</p>
            <button
              onClick={handleCloseDialog}
              className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900 transition duration-300 flex items-center justify-center"
            >
              {t('postDetails.goToSignIn')}
              <User className="ml-2" />
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        onCancel={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onAccept={confirmConnect}
        title={t('postDetails.confirmConnect.title')}
        content={t('postDetails.confirmConnect.content', { name: currentAnnounce?.user.name })}
      />
    </div>
  )
}