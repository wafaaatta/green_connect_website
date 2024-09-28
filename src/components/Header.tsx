import React, { useState, useEffect, useRef } from "react"
import { Leaf, LogIn, Menu, User, Bell, Settings, LogOut } from "lucide-react"
import Routes from "../constants/routes"
import AppImages from "../constants/app_images"
import Button from "./Button"
import { IconType } from "react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector } from "../hooks/hooks"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const sidebarItems = [
    { label: 'Home', href: Routes.HOME },
    { label: 'Announces', href: Routes.PAGES.POSTS },
    { label: 'Blog', href: Routes.PAGES.BLOGS },
    { label: 'Events', href: Routes.PAGES.EVENTS },
    { label: 'About', href: Routes.PAGES.ABOUT },
  ]

  const navigate = useNavigate()


  const handleLogout = async () => {
    // Implement logout logic here
    console.log('Logout clicked')
  }


  const userMenuItems = [
    { label: 'Profile', icon: User, action: () => navigate(Routes.PAGES.PROFILE) },
    { label: 'Logout', icon: LogOut, action: handleLogout, color: 'text-red-700' },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu)

  const { isAuthenticated, user } = useAppSelector(state => state.auth_store)

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

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <header id="main-header" className="bg-[#E6DFC3] sticky top-0 z-10 transition-shadow duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <img src={AppImages.logo} className="h-20 w-auto transition-transform duration-300 hover:scale-105" alt="Green Connect logo" />
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
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  leftIcon={User as IconType}
                  variant="link"
                  color="blue"
                  size="md"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-sm text-gray-600">{user?.email}</span>
                  </div>
                </Button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded shadow p-1 z-10"
                    >
                      {userMenuItems.map((item) => (
                        <motion.button
                          key={item.label}
                          onClick={item.action}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                        >
                          <item.icon className={`inline-block w-4 h-4 mr-2 ${item.color}`} />
                          <span className={`font-medium ${item.color}`}>{item.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button
                  leftIcon={LogIn as IconType}
                  variant="link"
                  color="green"
                  size="md"
                  onClick={toggleSidebar}
                  className="w-full justify-start mb-2"
                >
                  Sign in
                </Button>
                <Button
                  leftIcon={Leaf as IconType}
                  variant="link"
                  color="blue"
                  size="md"
                  onClick={toggleSidebar}
                  className="w-full justify-start"
                >
                  Join Us
                </Button>
              </>
            )}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleSidebar}
                className="bg-[#E6DFC3] rounded-md p-2 inline-flex items-center justify-center text-green-800 hover:text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-300"
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
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
                  <img src={AppImages.logo} className="h-12 w-auto" alt="Green Connect logo" />
                </a>
                <button
                  onClick={toggleSidebar}
                  className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  <span className="sr-only">Close menu</span>
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
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                          <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-800">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      {userMenuItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            item.action()
                            toggleSidebar()
                          }}
                          className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-green-600 transition-colors duration-300"
                        >
                          <item.icon className="inline-block w-5 h-5 mr-2" />
                          {item.label}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <Button
                        leftIcon={LogIn as IconType}
                        variant="link"
                        color="green"
                        size="md"
                        onClick={toggleSidebar}
                        className="w-full justify-start mb-2"
                      >
                        Sign in
                      </Button>
                      <Button
                        leftIcon={Leaf as IconType}
                        variant="link"
                        color="blue"
                        size="md"
                        onClick={toggleSidebar}
                        className="w-full justify-start"
                      >
                        Join Us
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