import React from 'react'
import { motion } from 'framer-motion'
import { Clock, User, ArrowRight } from 'lucide-react'
import AppImages from '../../constants/app_images'

const BlogsPage = () => {
  const blogs = [
    { id: 1, title: 'Top 10 Low-Maintenance Houseplants for Beginners', author: 'Emma Green', date: '2023-05-15', image: AppImages.visuals.background, excerpt: 'Discover the best plants for new plant parents that are hard to kill and easy to love.' },
    { id: 2, title: 'The Art of Bonsai: A Beginner\'s Guide', author: 'Alex Bonsai', date: '2023-05-10', image: AppImages.visuals.background, excerpt: 'Learn the basics of bonsai cultivation and how to start your own miniature tree garden.' },
    { id: 3, title: 'Vertical Gardening: Maximizing Space in Urban Homes', author: 'Sophia Urban', date: '2023-05-05', image: AppImages.visuals.background, excerpt: 'Explore creative ways to grow plants vertically and make the most of limited space in city apartments.' },
    { id: 4, title: 'The Benefits of Plants in the Workplace', author: 'Mark Office', date: '2023-04-30', image: AppImages.visuals.background, excerpt: 'Discover how adding plants to your office can boost productivity, reduce stress, and improve air quality.' },
  ]

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Green Connect Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-md shadow-md overflow-hidden flex flex-col"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{blog.date}</span>
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