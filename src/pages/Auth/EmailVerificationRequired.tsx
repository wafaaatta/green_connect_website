import { useEffect, useState } from 'react'
import { Mail, AlertCircle, LogOut } from 'lucide-react'
import Button from '../../components/Button'
import { subscribeToChannel, unsubscribeFromChannel } from '../../services/pusher'
import PusherBroadcasts from '../../constants/pusher_broadcasts'
import { logoutUser } from '../../redux/stores/auth_store'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import Routes from '../../constants/routes'
import axiosHttp from '../../utils/axios_client'
import { showNotification } from '../../redux/stores/notification_store'
import { useTranslation } from 'react-i18next'
import Notification from '../../components/Notification'

export default function EmailVerificationRequired() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const email = useAppSelector((state) => state.auth_store).user?.email

  const { t } = useTranslation()

  const handleResendVerification = async () => {
    try{
        await axiosHttp.post('/resend-activation', {
            email: email
        })

        dispatch(
            showNotification({
                message: t('emailVerificationRequired.notifications.resendSuccess'),
                type: 'success'
            })
        )
    }catch(error){
        console.error(error)

        dispatch(
            showNotification({
                message: t('emailVerificationRequired.notifications.resendFail'),
                type: 'error'
            })
        )
    }
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate(Routes.AUTH.LOGIN)
  }

  useEffect(() => {
    subscribeToChannel(
      PusherBroadcasts.channels.email_verification,
      PusherBroadcasts.events.email_verification.success,
      (data) => {

      }
    )

    return () => unsubscribeFromChannel(PusherBroadcasts.channels.email_verification)
  }, [])

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow border w-full max-w-md overflow-hidden">
        <div className="bg-green-600 p-4">
          <h2 className="text-2xl font-bold text-center text-white">Email Verification Required</h2>
          <p className="text-center text-green-100 mt-2">
            Let's grow our GreenConnect community together!
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-100 rounded-full p-3">
              <Mail className="h-12 w-12 text-green-600" />
            </div>
            <p className="text-center text-sm text-gray-600">
              We've planted a verification seed in your inbox. Water it by clicking the link in the email to help your GreenConnect account flourish!
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <Button 
              onClick={handleResendVerification} 
              disabled={isResending || resendSuccess}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {isResending ? "Replanting..." : resendSuccess ? "Seed Replanted!" : "Resend Verification Seed"}
            </Button>
            <Button 
              onClick={handleLogout}
              className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-green-600 rounded transition duration-300 flex items-center justify-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout and Continue as Guest
            </Button>
          </div>
          {resendSuccess && (
            <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
              <div className="flex">
                <div className="py-1">
                  <AlertCircle className="h-6 w-6 text-green-500 mr-4" />
                </div>
                <div>
                  <p className="font-bold">Success!</p>
                  <p className="text-sm">A new verification seed has been planted in your inbox. Please check and water it soon!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Notification />
    </div>
  )
}