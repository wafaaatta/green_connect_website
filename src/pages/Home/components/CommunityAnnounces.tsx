import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useEffect } from "react"
import { getAllAnnounces } from "../../../redux/stores/announce_store"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Routes from "../../../constants/routes"
import CommunityAnnounceComponent from "./CommunityAnnounceComponent"

const CommunityAnnounces = () => {
    const dispatch = useAppDispatch()
    const {announces} = useAppSelector((state) => state.announce_store)
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getAllAnnounces(4))
    }, [dispatch])
  return (
    <section className="bg-green-800 py-12">
        <div className=" mx-auto px-4">
          <h2 className="text-4xl text-white font-bold text-center mb-12">{t('homePage.plant_sharing')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {announces.slice(0, 4).map((announce) => <CommunityAnnounceComponent announce={announce} />)}
          </div>
          <div className="flex justify-center mt-10">
            <Link aria-label="View all posts" to={Routes.PAGES.ANNOUNCEMENTS}
              className="bg-white flex items-center justify-between text-green-800 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300"

            >
              {t('homePage.explorePosts')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CommunityAnnounces