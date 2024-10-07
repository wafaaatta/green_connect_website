import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Notification from '../components/Notification'

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen custom-scroll">
      <Header />
      {/* Main content */}
      <main className="flex-grow">
        <div className=" ">
          <Outlet />
        </div>
      </main>

      <Notification />
    </div>
  )
}

export default UserLayout