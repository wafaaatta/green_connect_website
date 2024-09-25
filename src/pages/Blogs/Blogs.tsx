import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, ArrowRight } from 'lucide-react'
import AppImages from '../../constants/app_images'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllArticles } from '../../redux/stores/article_store'

const BlogsPage = () => {
  const dispatch = useAppDispatch()
  const {articles} = useAppSelector(state => state.article_store)
  console.log(articles);

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch])

  
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Green Connect Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-md shadow-md overflow-hidden flex flex-col"
          >
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <a href="#" className="text-green-700 hover:text-green-800 font-medium flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default BlogsPage