"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Users, Calendar, BookOpen, ArrowRight, MapPin, Sprout, Recycle, Sun, Mail, Phone, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllAnnounces } from '../../redux/stores/announce_store'
import { getFileUrl } from '../../utils/laravel_storage'
import { getAllArticles } from '../../redux/stores/article_store'
import { getAllEvents } from '../../redux/stores/event_store'
import moment from 'moment'

const HomePage = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllAnnounces())
    dispatch(getAllArticles())
    dispatch(getAllEvents())
  }, [dispatch])

  const {announces} = useAppSelector((state) => state.announce_store)
  const {articles} = useAppSelector((state) => state.article_store)
  const {events} = useAppSelector((state) => state.event_store)

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="bg-white p-4 border rounded shadow transition-shadow duration-300"
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
            {announces.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-green-50 rounded overflow-hidden shadow border-shadow duration-300"
              >
                <img src={getFileUrl(post.image)} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">By {post?.user?.name}</p>
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
                <img src={getFileUrl(article.image)} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-500">{article.content.substring(0, 100)}</p>
                  <p className="text-gray-600 font-semibold">
                    Category: {article.articleCategory?.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blogs" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold">
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
                <img src={getFileUrl(event.image)} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-600" />
                    {moment(event.event_date).format('MMMM DD, YYYY')}
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

      <section className="w-full py-12 bg-gray-100">
        <div className="container mx-auto grid items-center justify-center gap-8 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
              Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <div className="p-4">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200 min-h-[150px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-green-700 rounded-md hover:bg-green-900 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage