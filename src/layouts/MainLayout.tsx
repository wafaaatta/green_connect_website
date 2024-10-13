import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Notification from '../components/Notification'
import { useAppSelector } from '../hooks/hooks'
import Routes from '../constants/routes'

const MainLayout = () => {
  const {user} = useAppSelector((state) => state.auth_store)

  if(user != null && user.email_verified_at == null){
    return <Navigate  to={Routes.AUTH.EMAIL_VERIFICATION_REQUIRED} replace={true}/>;
    
  }

  return (
    <div className="flex flex-col min-h-screen bg-white custom-scroll">
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