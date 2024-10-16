import { FC } from "react"
import Article from "../../../interfaces/Article"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { getFileUrl } from "../../../utils/laravel_storage"

interface HomeArticleComponentProps {
    article: Article
}

const HomeArticleComponent: FC<HomeArticleComponentProps> = ({ article }) => {
    const {t} = useTranslation()
  return (
    <motion.div
        key={article.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
        className="bg-green-100 rounded overflow-hidden shadow border  transition-shadow duration-300"
        >
        <img aria-hidden="true" loading='lazy' src={getFileUrl(article.image)} alt={article.title} className="w-full object-cover" />
        <div className="p-4">
            <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-500 ">{article.content.substring(0, 100)}</p>
            <p className="text-gray-600 font-semibold">
            {t('homePage.category')}: {article.article_category?.name}
            </p>
        </div>
        </motion.div>
  )
}

export default HomeArticleComponent