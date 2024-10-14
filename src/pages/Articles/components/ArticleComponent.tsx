import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Button from '../../../components/Button'
import { Card } from '../../../components/Card'
import Article from '../../../interfaces/Article'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFileUrl } from '../../../utils/laravel_storage'

interface ArticleComponentProps {
    article: Article
    setSelectedArticle: (article: Article | null) => void
}

const ArticleComponent: FC<ArticleComponentProps> = ({
    article, setSelectedArticle
}) => {
    const { t } = useTranslation()
  return (
    <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="min-h-[420px] cursor-pointer transition-shadow duration-300 bg-green-100 flex flex-col"
                >
                  <img 
                    aria-hidden="true"
                    loading='lazy'
                    src={getFileUrl(article.image)} 
                    alt={article.title} 
                    className="w-full h-48 object-cover rounded-t" 
                  />
                  <div className="mt-4 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold mb-2 text-green-800">{article.title}</h2>
                    <div className="flex items-center mb-2 text-green-800">
                      <Calendar size={16} className="mr-1" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mb-2 text-green-800">
                      <span>{article.article_category.name}</span>
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow overflow-hidden">
                      {article.content.slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-end mt-auto">
                      <Button 
                        aria-label="Read more"
                        size="sm" 
                        className="bg-green-800 hover:bg-green-700 text-white"
                        onClick={() => setSelectedArticle(article)}
                      >
                        {t('articlesPage.readMore')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
  )
}

export default ArticleComponent