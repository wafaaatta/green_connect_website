import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllArticles } from '../../redux/stores/article_store'
import { Card } from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { IconType } from 'react-icons'

const ITEMS_PER_PAGE = 12

const ArticlesPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { articles } = useAppSelector(state => state.article_store)
  const [displayedArticles, setDisplayedArticles] = useState<typeof articles>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch])

  useEffect(() => {
    setDisplayedArticles(articles.slice(0, ITEMS_PER_PAGE))
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles

    const lowercasedTerm = searchTerm.toLowerCase()
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowercasedTerm) ||
      article.content.toLowerCase().includes(lowercasedTerm)
    )
  }, [articles, searchTerm])

  const loadMore = () => {
    setDisplayedArticles(prevArticles => [
      ...prevArticles,
      ...filteredArticles.slice(prevArticles.length, prevArticles.length + ITEMS_PER_PAGE)
    ])
  }

  const hasMore = displayedArticles.length < filteredArticles.length

  return (
    <div className="w-full bg-gray-50">
      <Card className='sticky top-32 shadow'>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-3xl font-bold text-green-800">{t('articlesPage.title')}</h1>
          <div className="w-full md:w-64">
            <Input
              icon={Search as IconType}
              placeholder={t('articlesPage.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols2 gap-4"
          >
            {displayedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className="h-full cursor-pointer transition-shadow duration-300 bg-white"
                >
                  <img 
                    src={'/src/assets/images/plants-workshop/workshop-care.png'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover rounded-t" 
                  />
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2 text-green-800">{article.title}</h2>
                    <div className="flex items-center mb-2 text-green-600">
                      <Calendar size={16} className="mr-1" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mb-2 text-green-600">
                      <span>{article.article_category.name}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        {t('articlesPage.readMore')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={loadMore}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow transition-all duration-300"
            >
              {t('articlesPage.loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticlesPage