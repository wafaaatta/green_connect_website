import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { getAllEvents } from "../../../redux/stores/event_store"
import Routes from "../../../constants/routes"
import HomeEventComponent from "./HomeEventComponent"

const HomeEvents = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      
      dispatch(getAllEvents(4))
    }, [dispatch])
  
    
    const {events} = useAppSelector((state) => state.event_store)
  return (
    <section className=" py-12">
        <div className=" mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('homePage.upcomingEvents')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event) => <HomeEventComponent event={event} />)}
          </div>
          <div className="text-center mt-10">
            <Link aria-label="View all events" to={Routes.PAGES.EVENTS} className="inline-flex items-center text-white bg-green-800 hover py-4 px-8 rounded-full font-semibold">
              {t('homePage.viewAllEvents')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
  )
}

export default HomeEvents