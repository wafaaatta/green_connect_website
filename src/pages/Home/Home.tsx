import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Users, Calendar, BookOpen, ArrowRight, Clock, MapPin } from 'lucide-react'
import ContactUs from './components/ContactUs'
import { Link } from 'react-router-dom'
import AppImages from '../../constants/app_images'

const LandingPage = () => {
  const articles = [
    { id: 1, title: "Top 10 Low-Maintenance Houseplants", author: "Emma Green", date: "2023-05-15" },
    { id: 2, title: "The Art of Bonsai: A Beginner's Guide", author: "Alex Bonsai", date: "2023-05-10" },
    { id: 3, title: "Vertical Gardening: Maximizing Space", author: "Sophia Urban", date: "2023-05-05" },
  ]

  const events = [
    { id: 1, title: "Annual Plant Swap Meet", date: "2023-06-15", location: "Central Park, New York" },
    { id: 2, title: "Succulent Care Workshop", date: "2023-06-20", location: "Green Thumb Nursery, LA" },
    { id: 3, title: "Bonsai Masterclass", date: "2023-06-25", location: "Japanese Garden, San Francisco" },
  ]

  const posts = [
    { id: 1, title: "My Monstera Deliciosa Journey", author: "Alice Green", likes: 120, comments: 45 },
    { id: 2, title: "Succulent Propagation Tips", author: "Bob Plant", likes: 89, comments: 32 },
    { id: 3, title: "Creating a Tropical Indoor Jungle", author: "Charlie Bloom", likes: 156, comments: 67 },
  ]

  return (
    <div className="space-y-20">
      {/* Hero 1 */}
      <section className="w-full py-12 bg-gradient-to-r from-primary to-primary">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl">
                  <span className="block text-5xl lg:text-6xl text-green-600">Green Connect</span>
                </h1>
                <p className="max-w-[600px] text-primary-foreground md:text-2xl lg:text-xl xl:text-2xl">
                  A community-driven platform for plant enthusiasts
                  to share, trade, and grow together.
                </p>
              </div>
              <Link
                to="/register"
                className="font-medium hover:bg-green-700 bg-green-600 text-white inline-flex h-12 items-center justify-center rounded-md bg-secondary px-12 text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Join Our Community
              </Link>
            </div>
            <img
              src={AppImages.workshops.group}
              width="650"
              height="400"
              alt="AI-driven success"
              className="mx-auto aspect-[13/8] overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Hero 2 */}
      <section className="w-full py-12 bg-green-50 text-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[550px_1fr] lg:gap-12 xl:grid-cols-[650px_1fr]">
            <img
              src={AppImages.workshops.care}
              width="650"
              height="400"
              alt="Diverse plant collection"
              className="mx-auto aspect-[13/8] overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Many Plants
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Explore our vast network of plant enthusiasts and find rare specimens to add to your collection.
                </p>
              </div>
              <Link
                to="/plants"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-colors"
              >
                Explore Plants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero 3 */}
      <section className="w-full py-12 text-slate-800 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn from Experts
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Attend workshops, webinars, and events hosted by plant care professionals and passionate hobbyists.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-md bg-green-600 text-white hover:bg-green-700 px-6 py-3 font-medium transition-colors"
              >
                View Upcoming Events
              </Link>
            </div>
            <img
            //   src="/src/assets/workshop.jpg"
              src={AppImages.workshops.house}
              width="650"
              height="400"
              alt="Plant care workshop"
              className="mx-auto aspect-[13/8] overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Discover the Green Connect Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: 'Plant Exchange', description: 'Trade plants and cuttings with enthusiasts worldwide' },
            { icon: Users, title: 'Vibrant Community', description: 'Connect, share, and learn from passionate plant lovers' },
            { icon: Calendar, title: 'Exciting Events', description: 'Join workshops, seminars, and plant swap meets' },
            { icon: BookOpen, title: 'Expert Blog', description: 'Access a wealth of plant care tips and gardening advice' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-md hover:bg-green-50 transition-all duration-300 shadow-md text-center cursor-pointer select-none"
            >
              <feature.icon size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">By {article.author}</p>
              <p className="text-gray-500">{article.date}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/articles" className="inline-flex items-center text-green-600 hover:text-green-700">
            View More Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-green-50 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2 flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {event.date}
              </p>
              <p className="text-gray-600 flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/events" className="inline-flex items-center text-green-600 hover:text-green-700">
            View More Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Community Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">By {post.author}</p>
              <div className="flex justify-between text-gray-500">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/posts" className="inline-flex items-center text-green-600 hover:text-green-700">
            View More Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Green Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our thriving community of plant enthusiasts and unlock a world of botanical wonders!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Get Started Now
          </motion.button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah L.', quote: 'Green Connect has transformed my plant hobby into a passion. The community is so supportive and knowledgeable!' },
            { name: 'Mike T.', quote: 'I\'ve discovered so many rare plants through the exchange program. It\'s like a treasure hunt every day!' },
            { name: 'Emma R.', quote: 'The events and workshops have helped me become a better plant parent. I\'m grateful for this amazing platform!' },
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-green-600">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactUs />
    </div>
  )
}

export default LandingPage