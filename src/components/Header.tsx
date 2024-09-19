import { Leaf, LogIn, Menu } from "lucide-react"
import Routes from "../constants/routes"
import { useState } from "react"
import AppImages from "../constants/app_images"
import Button from "./Button"
import { IconType } from "react-icons"

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const sidebarItems = [
      { label: 'Home', href: Routes.HOME },
      { label: 'Announces', href: Routes.PAGES.POSTS },
      { label: 'Blog', href: Routes.PAGES.BLOGS },
      { label: 'Events', href: Routes.PAGES.EVENTS },
      { label: 'About', href: Routes.PAGES.ABOUT },
      ]

      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)


  return (
    <>
        <header className="bg-[#E6DFC3] shadow-sm sticky top-0 z-10">
    <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
      <div className="flex justify-between items-center  md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/" className="flex items-center">
            <img src={AppImages.logo} className='h-32' alt="logo Green Connect" />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700"
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
              className="text-xl font-medium text-green-700 hover:text-green-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-2">
        <a
            href="#"
          >
            <Button
                        leftIcon={LogIn as IconType}

                variant="link"
                color="green"
                size="md"
            >
                Sign in
            </Button>
          </a>

          <a
            href="#"
          >
            <Button
            leftIcon={Leaf as IconType}
                variant="link"
                color="blue"
                size="md"
            >
                Join Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  </header>
    </>
  )
}

export default Header