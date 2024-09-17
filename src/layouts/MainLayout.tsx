import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 custom-scroll">
      <Header />
      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8 ">
          <Outlet />
        </div>
      </main>

        <Footer />
    </div>
  )
}

export default MainLayout