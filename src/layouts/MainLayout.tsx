import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Notification from '../components/Notification'
import Pusher from 'pusher-js'
import { useEffect } from 'react'

const MainLayout = () => {
  const pusher = new Pusher('c54be6c2bdbc371de2e5', {
    cluster: 'mt1',
  });

  useEffect(() => {
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });

    return () => {
      pusher.unsubscribe('my-channel');
    }
  }, [pusher])

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