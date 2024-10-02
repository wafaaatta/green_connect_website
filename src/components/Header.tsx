import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, LogIn, Menu, User, LogOut, MessageCircle, Globe } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import Routes from "../constants/routes"
import AppImages from "../constants/app_images"
import Button from "./Button"
import { IconType } from "react-icons"
import { logoutUser } from "../redux/stores/auth_store"
import { useTranslation } from "react-i18next"

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppSelector(state => state.auth_store)

  const sidebarItems = [
    { label: t('header.home'), href: Routes.HOME },
    { label: t('header.announcements'), href: Routes.PAGES.POSTS },
    { label: t('header.blog'), href: Routes.PAGES.BLOGS },
    { label: t('header.events'), href: Routes.PAGES.EVENTS },
    { label: t('header.about'), href: Routes.PAGES.ABOUT },
  ]

  const dispatch = useAppDispatch()
  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate(Routes.AUTH.LOGIN)
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('main-header')
      if (header) {
        if (window.scrollY > 0) {
          header.classList.add('shadow-md')
        } else {
          header.classList.remove('shadow-md')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header id="main-header" className="bg-[#f3ecd6] sticky top-0 z-10 transition-shadow duration-300">
      <div className="max-w-8xl mx-auto py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <img src={AppImages.logo} className="h-28 w-auto" alt={t('header.logoAlt')} />
            </a>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {sidebarItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-green-800 hover:text-green-600 transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              leftIcon={Globe as IconType}
              variant="outline"
              color="green"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex"
            >
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  leftIcon={MessageCircle as IconType}
                  variant="outline"
                  color="green"
                  size="sm"
                  onClick={() => navigate(Routes.PAGES.CONVERSATIONS)}
                  className="hidden md:flex"
                >
                  {t('header.chat')}
                </Button>
                <Button
                  leftIcon={User as IconType}
                  variant="outline"
                  color="green"
                  size="sm"
                  onClick={() => navigate(Routes.PAGES.PROFILE)}
                  className="hidden md:flex"
                >
                  {t('header.profile')}
                </Button>
                <Button
                  leftIcon={LogOut as IconType}
                  variant="outline"
                  color="red"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:flex"
                >
                  {t('header.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  leftIcon={LogIn as IconType}
                  variant="outline"
                  color="green"
                  size="sm"
                  onClick={() => navigate(Routes.AUTH.LOGIN)}
                  className="hidden md:flex"
                >
                  {t('header.signIn')}
                </Button>
                <Button
                  leftIcon={Leaf as IconType}
                  variant="outline"
                  color="blue"
                  size="sm"
                  onClick={() => navigate(Routes.AUTH.REGISTER)}
                  className="hidden md:flex"
                >
                  {t('header.joinUs')}
                </Button>
              </>
            )}
            <button
              onClick={toggleSidebar}
              className="md:hidden bg-[#E6DFC3] rounded-md p-2 inline-flex items-center justify-center text-green-800 hover:text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-300"
            >
              <span className="sr-only">{t('header.openMenu')}</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleSidebar}></div>
            <nav className="relative max-w-xs w-full bg-white shadow-xl h-full overflow-y-auto">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <img src={AppImages.logo} className="h-12 w-auto" alt={t('header.logoAlt')} />
                </a>
                <button
                  onClick={toggleSidebar}
                  className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  <span className="sr-only">{t('header.closeMenu')}</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-green-600 transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    leftIcon={Globe as IconType}
                    variant="link"
                    color="green"
                    size="md"
                    onClick={() => {
                      toggleLanguage()
                      toggleSidebar()
                    }}
                    className="w-full justify-start mb-2"
                  >
                  </Button>
                  <Button
                    leftIcon={MessageCircle as IconType}
                    variant="link"
                    color="green"
                    size="md"
                    onClick={() => {
                      navigate(Routes.PAGES.CONVERSATIONS)
                      toggleSidebar()
                    }}
                    className="w-full justify-start mb-2"
                  >
                    {t('header.chat')}
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                          <img src="https://via.placeholder.com/40" alt={t('header.userAvatarAlt')} className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-800">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Button
                        leftIcon={User as IconType}
                        variant="link"
                        color="blue"
                        size="md"
                        onClick={() => {
                          navigate(Routes.PAGES.PROFILE)
                          toggleSidebar()
                        }}
                        className="w-full justify-start mb-2"
                      >
                        {t('header.profile')}
                      </Button>
                      <Button
                        leftIcon={LogOut as IconType}
                        variant="link"
                        color="red"
                        size="md"
                        onClick={() => {
                          handleLogout()
                          toggleSidebar()
                        }}
                        className="w-full justify-start"
                      >
                        {t('header.logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        leftIcon={LogIn as IconType}
                        variant="link"
                        color="green"
                        size="md"
                        onClick={() => {
                          navigate(Routes.AUTH.LOGIN)
                          toggleSidebar()
                        }}
                        className="w-full justify-start mb-2"
                      >
                        {t('header.signIn')}
                      </Button>
                      <Button
                        leftIcon={Leaf as IconType}
                        variant="link"
                        color="blue"
                        size="md"
                        onClick={() => {
                          navigate(Routes.AUTH.REGISTER)
                          toggleSidebar()
                        }}
                        className="w-full justify-start"
                      >
                        {t('header.joinUs')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header