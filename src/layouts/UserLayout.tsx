import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Notification from '../components/Notification'
//import { useAppSelector } from '../hooks/hooks'
//import Routes from '../constants/routes'

const UserLayout = () => {
  /* const {user} = useAppSelector((state) => state.auth_store)

  if(user != null && user.email_verified_at == null){
    return <Navigate  to={Routes.AUTH.EMAIL_VERIFICATION_REQUIRED} replace={true}/>;
     
  }*/

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