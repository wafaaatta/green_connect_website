import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon, Mail, Lock, Globe } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppImages from '../../constants/app_images'
import Routes from '../../constants/routes'
import Notification from '../../components/Notification'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { unwrapResult } from '@reduxjs/toolkit'
import { loginUser } from '../../redux/stores/auth_store'
import { showNotification } from '../../redux/stores/notification_store'

export default function Login() {
  const { t, i18n } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const redirected = searchParams.get("redirected") === 'true';
    if (redirected) {
      dispatch(
        showNotification({
          type: 'info',
          message: t('login.notifications.loginAgain'),
          description: t('login.notifications.loggedOut'),
        })
      )
    }
  }, [dispatch, searchParams, t]);

  const {loading, user} = useAppSelector((state) => state.auth_store)

  const handleSubmit = async () => {    

    await dispatch(
      loginUser({
        email,
        password,
      })
    ).then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          message: t('login.notifications.loginSuccess'),
          type: 'success',
        })
      )

      if(user?.email_verified_at == null){
        navigate(Routes.AUTH.EMAIL_VERIFICATION_REQUIRED)
        return
      }

      const redirectTo = searchParams.get("redirected_from") || '/';
      navigate(redirectTo)
    }).catch((error) => {
      dispatch(
        showNotification({
          message: t('login.notifications.loginFailed'),
          description: error.message,
          type: 'error',
        })
      )
    })
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded shadow overflow-hidden w-full max-w-6xl relative"
      >
        <button
          onClick={toggleLanguage}
          className="absolute top-4 right-4 p-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors duration-200"
        >
          <Globe size={20} />
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Image */}
          <div className="md:w-1/2 relative max-md:hidden ">
            <img 
              loading='lazy'
              src="/assets/images/plants-workshop/workshop-house.png" 
              alt={t('login.imageAlt')}
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-green-800 bg-opacity-30 flex items-center justify-center">
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="md:w-1/2 w-full p-4 bg-white">
            <div className="flex justify-center">
              <img loading='lazy' src={AppImages.logo} alt={t('common.logoAlt')} className="w-60 max-md:w-40" />
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.email')}
                </label>
                <div className="relative">
                  <input
                    name='email'
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('login.emailPlaceholder')}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('login.passwordPlaceholder')}
                    title={t('login.passwordRequirements')}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-700 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t('login.rememberMe')}
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-700 hover:text-green-900">
                    {t('login.forgotPassword')}
                  </a>
                </div>
              </div> */}
              <div className='w-full flex justify-center items-center'>
                <button
                  onClick={handleSubmit}
                  className="flex justify-center py-2 px-6 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {loading ? t('login.loading') : t('login.loginButton')}
                </button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('login.noAccount')} {" "}
                <Link to={Routes.AUTH.REGISTER} className="font-medium text-green-700 hover:text-green-900">
                  {t('login.joinGreenConnect')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <Notification />
    </div>
  )
}