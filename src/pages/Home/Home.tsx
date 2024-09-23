"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Users, Calendar, BookOpen, ArrowRight, MapPin, Sprout, Recycle, Sun, Mail, Phone, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const articles = [
    { id: 1, title: "Top 10 Low-Maintenance Houseplants", author: "Emma Green", date: "2023-05-15", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "The Art of Bonsai: A Beginner's Guide", author: "Alex Bonsai", date: "2023-05-10", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, title: "Vertical Gardening: Maximizing Space", author: "Sophia Urban", date: "2023-05-05", image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    {
      id: 4, 
      title: "The Benefits of Plants in the Workplace", 
      author: "Mark Office", 
      date: "2023-04-30", 
      image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ]

  const events = [
    { id: 1, title: "Annual Plant Swap Meet", date: "2023-06-15", location: "Central Park, New York", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "Succulent Care Workshop", date: "2023-06-20", location: "Green Thumb Nursery, LA", image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, title: "Bonsai Masterclass", date: "2023-06-25", location: "Japanese Garden, San Francisco", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { 
      id: 4, 
      title: "Indoor Jungle Design Workshop", 
      date: "2023-07-01", 
      location: "Botanical Gardens, Chicago", 
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ]

  const posts = [
    { id: 1, title: "My Monstera Deliciosa Journey", author: "Alice Green", likes: 120, comments: 45, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "Succulent Propagation Tips", author: "Bob Plant", likes: 89, comments: 32, image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, title: "Creating a Tropical Indoor Jungle", author: "Charlie Bloom", likes: 156, comments: 67, image: "https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    {
      id: 4, 
      title: "The Benefits of Vertical Gardening", 
      author: "David Miller", 
      likes: 98, 
      comments: 21,
    }
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-green-800 text-white overflow-hidden">
        <div className='inset-0 absolute w-full h-full bg-gray-900 opacity-50'></div>
        <div className="container mx-auto px-4 py-12 relative mr-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Green Connect
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Cultivate connections, share the joy of plants, and grow together in our vibrant community.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/register"
                  className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300 inline-block"
                >
                  Join Our Community
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Green Connect Community"
                className="rounded shadow"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover the Green Connect Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: 'Plant Adoption', description: 'Give plants a new home or find your perfect green companion' },
              { icon: Users, title: 'Community', description: 'Connect with plant enthusiasts and share your green journey' },
              { icon: Calendar, title: 'Events', description: 'Join workshops, seminars, and plant swap meets' },
              { icon: BookOpen, title: 'Knowledge Hub', description: 'Access a wealth of plant care tips and gardening advice' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <feature.icon size={48} className="text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Posts Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Community Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-green-50 rounded-lg overflow-hidden shadow border-shadow duration-300"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">By {post.author}</p>
                  <div className="flex justify-between text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/posts" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold">
              Explore More Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Green Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded overflow-hidden shadow border  transition-shadow duration-300"
              >
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-2">By {article.author}</p>
                  <p className="text-gray-500">{article.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/articles" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold">
              Read More Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Green Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded overflow-hidden shadow border transition-shadow duration-300"
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-600" />
                    {event.date}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-green-600" />
                    {event.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/events" className="inline-flex items-center bg-green-600 text-white hover:bg-green-700 font-semibold py-2 px-6 rounded-full transition duration-300">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6">Our Green Mission</h2>
              <p className="text-xl mb-8">At Green Connect, we're committed to fostering a community of plant lovers and environmental stewards. Our mission is to promote sustainable living, biodiversity, and the joy of nurturing nature.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {icon: Sprout, text: 'Promote Plant Adoption'},
                  {icon: Recycle, text: 'Encourage Sustainability'},
                  {icon: Sun, text: 'Spread Green Knowledge'},
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="h-8 w-8 text-green-600 mr-2" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Green Connect Mission"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative bg-gradient-to-r from-green-400 via-green-700 to-green-600 py-12 overflow-hidden">
      <div className='inset-0 absolute w-full h-full bg-gray-900 opacity-50'></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder='Enter your name'
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder='Enter your message'
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage