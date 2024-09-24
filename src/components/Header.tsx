import React, { useState, useEffect } from "react"
import { Leaf, LogIn, Menu, User, Bell, Settings, LogOut } from "lucide-react"
import Routes from "../constants/routes"
import AppImages from "../constants/app_images"
import Button from "./Button"
import { IconType } from "react-icons"
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const sidebarItems = [
    { label: 'Home', href: Routes.HOME },
    { label: 'Announces', href: Routes.PAGES.POSTS },
    { label: 'Blog', href: Routes.PAGES.BLOGS },
    { label: 'Events', href: Routes.PAGES.EVENTS },
    { label: 'About', href: Routes.PAGES.ABOUT },
  ]

  const userMenuItems = [
    { label: 'Profile', icon: User, action: () => console.log('Profile clicked') },
    { label: 'Logout', icon: LogOut, action: () => setIsLoggedIn(false) },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu)

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header id="main-header" className="bg-[#E6DFC3] sticky top-0 z-10 transition-shadow duration-300">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex justify-between items-center md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <img src={AppImages.logo} className="h-20 transition-transform duration-300 hover:scale-105" alt="logo Green Connect" />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              onClick={toggleSidebar}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 transition-colors duration-300"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xl font-medium text-green-800 hover:text-green-1100 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-2">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <Button
                    leftIcon={User as IconType}
                    variant="link"
                    color="blue"
                    size="md"
                    onClick={toggleUserMenu}
                  >
                    John Doe
                  </Button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded shadow py-1 z-10"
                      >
                        {userMenuItems.map((item, index) => (
                          <button
                            key={item.label}
                            onClick={item.action}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                          >
                            <item.icon className="inline-block w-4 h-4 mr-2" />
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Button
                  leftIcon={LogIn as IconType}
                  variant="link"
                  color="green"
                  size="md"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign in
                </Button>
                <Button
                  leftIcon={Leaf as IconType}
                  variant="link"
                  color="blue"
                  size="md"
                >
                  Join Us
                </Button>
              </>
            )}
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
            <nav className="relative max-w-xs w-full bg-white shadow-xl py-6 px-6 space-y-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <img src={AppImages.logo} className="h-16" alt="logo Green Connect" />
                </a>
                <button
                  onClick={toggleSidebar}
                  className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flow-root">
                <div className="divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {sidebarItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center space-x-4 mb-4">
                          <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">john.doe@example.com</p>
                          </div>
                        </div>
                        {userMenuItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={item.action}
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                          onClick={() => {
                            setIsLoggedIn(true)
                            toggleSidebar()
                          }}
                          className="w-full justify-start"
                        >
                          Sign in
                        </Button>
                        <Button
                          leftIcon={Leaf as IconType}
                          variant="link"
                          color="blue"
                          size="md"
                          className="w-full justify-start mt-2"
                        >
                          Join Us
                        </Button>
                      </>
                    )}
                  </div>
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