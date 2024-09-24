import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 custom-scroll">
      <Header />
      {/* Main content */}
      <main className="flex-grow">
        <div className=" ">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserLayout