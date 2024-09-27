import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Notification from '../components/Notification'
import Pusher from 'pusher-js'
import { useEffect } from 'react'

const MainLayout = () => {
  const pusher = new Pusher('5f950ee8879a3ee4e0ea', {
    cluster: 'mt1'
  });

  useEffect(() => {
    const channel = pusher.subscribe('my-channel')
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });

    return () => {
      pusher.unsubscribe('my-channel');
    }
  }, [])

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