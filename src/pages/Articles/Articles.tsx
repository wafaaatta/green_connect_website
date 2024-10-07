import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllArticles } from '../../redux/stores/article_store'
import { Card } from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { IconType } from 'react-icons'
import Modal from '../../components/Modal'

const ITEMS_PER_PAGE = 12

const ArticlesPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { articles } = useAppSelector(state => state.article_store)
  const [displayedArticles, setDisplayedArticles] = useState<typeof articles>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null)

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
    <div className="w-full">
      <Card className='shadow'>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-3xl max-md:text-2xl font-bold text-green-800">{t('articlesPage.title')}</h1>
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
            className="grid  max-xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            {
              filteredArticles.length === 0 && (
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-green-800">{t('articlesPage.noResults')}</h1>
                </div>
              )
            }
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className="min-h-[420px] cursor-pointer transition-shadow duration-300 bg-green-100 flex flex-col"
                >
                  <img 
                    src={'/src/assets/images/plants/rosemary.png'} 
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
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={loadMore}
              className="px-8 py-3 bg-green-800 hover:bg-green-700 text-white font-semibold rounded-full shadow transition-all duration-300"
            >
              {t('articlesPage.loadMore')}
            </Button>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title='Article'>
      {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-green-800">{selectedArticle.title}</h2>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex items-center mb-4 text-green-800">
                  <Calendar size={16} className="mr-1" />
                  <span>{new Date(selectedArticle.created_at).toLocaleDateString()}</span>
                </div>
                <div className="mb-4 ">
                  {selectedArticle.image && (
                    <img
                      src={'/src/assets/images/plants/rosemary.png'}
                      alt={selectedArticle.title}
                      className="object-cover rounded  w-full h-80 mb-4 shadow border"
                      
                    />
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-green-800 font-semibold">{selectedArticle.article_category.name}</span>
                </div>
                <div className="prose max-w-none">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </Modal>
    </div>
  )
}

export default ArticlesPage