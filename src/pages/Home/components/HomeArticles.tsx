import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { getAllArticles } from "../../../redux/stores/article_store"
import Routes from "../../../constants/routes"
import HomeArticleComponent from "./HomeArticleComponent"

const HomeArticles = () => {
    const {articles} = useAppSelector((state) => state.article_store)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getAllArticles(4))
    }, [dispatch])
  return (
    <section className="py-12 ">
        <div className=" mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('homePage.latestInsights')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => <HomeArticleComponent article={article} />)}
          </div>
          <div className="text-center mt-10">
            <Link aria-label="View all articles" to={Routes.PAGES.ARTICLES} className="inline-flex items-center text-white bg-green-800 hover py-4 px-8 rounded-full font-semibold">
              {t('homePage.readMoreArticles')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
  )
}

export default HomeArticles