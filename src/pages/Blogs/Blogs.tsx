import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllArticles } from '../../redux/stores/article_store'
import Article from '../../interfaces/Article'
import ArticleCategory from '../../interfaces/ArticleCategory'

const ITEMS_PER_PAGE = 8

const ArticlesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { articles } = useAppSelector(state => state.article_store)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch])

  useEffect(() => {
    setFilteredArticles(
      selectedCategory
        ? articles.filter(article => article.category.id === selectedCategory)
        : articles
    )
    setCurrentPage(1)
  }, [articles, selectedCategory])

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const categories: ArticleCategory[] = Array.from(
    new Set(articles.map(article => article.articleCategory))
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-green-800 mb-8">Green Connect Articles</h1>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === null
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category?.id}
            onClick={() => handleCategoryChange(category?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category?.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category?.name}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {currentArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-green-800">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{article.articleCategory?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye size={16} className="mr-1" />
                  <span>{article.views} views</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <a
                  href={`/article/${article.id}`}
                  className="text-green-700 hover:text-green-800 font-medium flex items-center transition-colors duration-200"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ArticlesPage