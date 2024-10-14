import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllArticles } from '../../redux/stores/article_store'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ArticleComponent from './components/ArticleComponent'
import NoArticlesComponent from './components/NoArticlesComponent'
import ArticlesActionbar from './components/ArticlesActionbar'

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
      <ArticlesActionbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          <motion.div
            layout
            className="grid  max-xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            {
              filteredArticles.length === 0 && (
                <NoArticlesComponent />
              )
            }
            {filteredArticles.map((article) => <ArticleComponent article={article} setSelectedArticle={setSelectedArticle} />)}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              aria-label="Load more"
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
                    aria-label="Close modal"
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
                      aria-hidden="true"
                      loading='lazy'
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