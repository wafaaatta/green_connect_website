import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Notification from '../components/Notification'

const MainLayout = () => {

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 custom-scroll">
      <Header />
      {/* Main content */}
      <main className="flex-grow">
        <div className=" ">
          <Outlet />
        </div>
      </main>

        <Footer />
        <Notification />
    </div>
  )
}

export default MainLayout