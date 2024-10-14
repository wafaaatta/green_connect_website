import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon, Mail, Lock, User, Globe } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppImages from '../../constants/app_images'
import { useAppDispatch } from '../../hooks/hooks'
import { showNotification } from '../../redux/stores/notification_store'
import { registerUser } from '../../redux/stores/auth_store'
import { unwrapResult } from '@reduxjs/toolkit'
import Notification from '../../components/Notification'
import Routes from '../../constants/routes'

export default function Register() {
  const { t, i18n } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      dispatch(
        showNotification({
          message: t('register.errors.passwordMismatch'),
          type: 'error',
        })
      )
      return
    }
    
    // Validate each condition individually
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push(t('register.errors.passwordTooShort'));  // Password too short
    }
    if (password.length > 16) {
      errors.push(t('register.errors.passwordTooLong'));   // Password too long
    }
    if (!(/[A-Z]/.test(password))) {
      errors.push(t('register.errors.passwordNeedsCapital'));  // Needs uppercase letter
    }
    if (!/\d/.test(password)) {
      errors.push(t('register.errors.passwordNeedsNumber'));   // Needs a number
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t('register.errors.passwordNeedsChar'));     // Needs lowercase letter
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push(t('register.errors.passwordNeedsSpecialChar'));  // Needs a special character
    }
    
    // If there are errors, show them in the notification
    if (errors.length > 0) {
      dispatch(
        showNotification({
          message: errors.join('\n'),
          type: 'error',
        })
      );
      return;
    }

    await dispatch(
      registerUser({
        name,
        email,
        password,
      })
    ).then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          message: t('register.success'),
          type: 'success',
        })
      )

      setTimeout(() => {
        navigate(Routes.AUTH.LOGIN)
      }, 1000)
    }).catch((error) => {
      dispatch(
        showNotification({
          message: error.message,
          type: 'error',
        })
      )
    })

    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded shadow border overflow-hidden w-full max-w-6xl relative"
      >
        <button
          aria-label="Toggle Language"
          onClick={toggleLanguage}
          className="absolute top-4 right-4 p-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors duration-200"
        >
          <Globe size={20} />
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Image */}
          <div className="md:w-1/2 relative max-md:hidden">
            <img 
              aria-hidden="true"
              loading='lazy'
              src="/assets/images/plants-workshop/workshop-house.png" 
              alt={t('register.imageAlt')}
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-green-800 bg-opacity-30 flex items-center justify-center">
            </div>
          </div>

          {/* Right Column - Register Form */}
          <div className="md:w-1/2 w-full p-4 bg-white">
            <div className="flex justify-center">
              <img aria-hidden="true" loading='lazy' src={AppImages.logo} alt={t('common.logoAlt')} className="w-52 max-md:w-40" />
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('register.username')}
                </label>
                <div className="relative">
                  <input
                    aria-label="username"
                    id="username"
                    name="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('register.usernamePlaceholder')}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('register.email')}
                </label>
                <div className="relative">
                  <input
                    aria-label="email"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('register.emailPlaceholder')}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('register.password')}
                </label>
                <div className="relative">
                  <input
                    aria-label="password"
                    id="password"
                    name="password"
                    data-testid="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('register.passwordPlaceholder')}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    aria-label="show password"
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
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('register.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    aria-label="confirmPassword"
                    id="confirmPassword"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('register.confirmPasswordPlaceholder')}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    aria-label="show password"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  aria-label="terms"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-green-700 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  {t('register.termsAgreement')} {" "}
                  <a href={Routes.PAGES.PRIVACY_POLICY} className="text-green-700 hover:text-green-900">
                    {t('register.termsLink')}
                  </a>
                </label>
              </div>
              <div className='w-full flex justify-center items-center'>
                <button
                  aria-label="create account"
                onClick={handleSubmit}
                  className="text-md flex justify-center py-2 px-6 border border-transparent rounded shadow-sm font-medium text-white bg-green-800 hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-500"
                >
                  {t('register.createAccount')}
                </button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('register.alreadyHaveAccount')} {" "}
                <Link aria-label="sign in" to={Routes.AUTH.LOGIN} replace  className="font-medium text-green-700 hover:text-green-900">
                  {t('register.signIn')}
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