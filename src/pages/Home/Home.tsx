import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Users, Calendar, BookOpen, ArrowRight, MapPin, Sprout, Recycle, Sun, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllAnnounces } from '../../redux/stores/announce_store'
import { getAllArticles } from '../../redux/stores/article_store'
import { getAllEvents } from '../../redux/stores/event_store'
import moment from 'moment'
import axiosHttp from '../../utils/axios_client'
import { showNotification } from '../../redux/stores/notification_store'
import { BiEnvelope } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllAnnounces(4))
    dispatch(getAllArticles(4))
    dispatch(getAllEvents(4))
  }, [dispatch])

  const {announces} = useAppSelector((state) => state.announce_store)
  const {articles} = useAppSelector((state) => state.article_store)
  const {events} = useAppSelector((state) => state.event_store)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      name,
      email,
      message
    }
    
    try{
      await axiosHttp.post('/contact-submissions', data)
      dispatch(showNotification({ message: t('homePage.messageSentSuccess'), type: 'success'  }))
    }catch(error){
      console.error(error)
      dispatch(showNotification({ message: t('homePage.messageSentFail'), type: 'error' }))
    }
  }

  return (
    <div className="bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-green-800 text-white overflow-hidden">
        <div className='inset-0 absolute w-full h-full bg-gray-900 opacity-50'></div>
        <div className=" mx-auto px-4 py-12 relative mr-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t('homePage.heroTitle')}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('homePage.heroSubtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to={'/auth/register'}
                  className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300 inline-block"
                >
                  {t('homePage.joinCommunity')}
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
                alt={t('homePage.heroImageAlt')}
                className="rounded shadow"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('homePage.featuresTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
             { icon: Leaf, title: t('homePage.feature1Title'), description: t('homePage.feature1Description') },
             { icon: Users, title: t('homePage.feature2Title'), description: t('homePage.feature2Description') },
             { icon: Calendar, title: t('homePage.feature3Title'), description: t('homePage.feature3Description') },
             { icon: BookOpen, title: t('homePage.feature4Title'), description: t('homePage.feature4Description') },
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
      <section className="bg-gradient-to-r from-green-500 to-green-800 py-20">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl text-white font-bold text-center mb-12">{t('homePage.communityHighlights')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {announces.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded overflow-hidden shadow border-shadow duration-300"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{t('homePage.by')} {post?.user?.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/posts" className="inline-flex items-center text-white font-semibold">
              {t('homePage.explorePosts')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 ">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('homePage.latestInsights')}</h2>
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
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-500">{article.content.substring(0, 100)}</p>
                  <p className="text-gray-600 font-semibold">
                    {t('homePage.category')}: {article.article_category?.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blogs" className="inline-flex items-center text-white bg-green-800 hover py-4 px-8 rounded-full font-semibold">
              {t('homePage.readMoreArticles')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className=" py-20 bg-green-100">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('homePage.upcomingEvents')}</h2>
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
            <Link to="/events" className="inline-flex items-center bg-green-800 text-white hover:bg-green-700 font-semibold py-2 px-6 rounded-full transition duration-300">
              {t('homePage.viewAllEvents')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className=" mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6">{t('homePage.ourGreenMission')}</h2>
              <p className="text-xl mb-8">{t('homePage.missionDescription')}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                 {icon: Sprout, text: t('homePage.missionPoint1')},
                 {icon: Recycle, text: t('homePage.missionPoint2')},
                 {icon: Sun, text: t('homePage.missionPoint3')},
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
                alt={t('homePage.missionImageAlt')}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-gray-100">
        <div className=" mx-auto flex items-center justify-center gap-8 px-4 md:px-6">
          <div className="space-y-3 text-center flex flex-col items-center justify-start">
            <BiEnvelope className="h-28 w-28 text-gray-500" />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('homePage.getInTouch')}</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
                {t('homePage.contactDescription')}
              </p>
          </div>
          <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <div className="p-4">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t('homePage.yourName')}
                  </label>
                  <input
                    id="name"
                    placeholder={t('homePage.enterYourName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t('homePage.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('homePage.enterYourEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    {t('homePage.message')}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('homePage.tellUsHowWeCanHelp')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200 min-h-[150px]"
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    type="submit"
                    className="flex justify-between items-center px-6 py-2 font-medium text-white bg-green-700 transition duration-300 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    <span>{t('homePage.submit')}</span>
                    <Send className="ml-2 h-4 w-4" />
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