import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MapPin, Calendar } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllAnnounces, setCurrentAnnounce } from '../../redux/stores/announce_store'
import Routes from '../../constants/routes'
import Announce from '../../interfaces/Announce'
import { Card } from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Badge from '../../components/Badge'
import { IconType } from 'react-icons'

const ITEMS_PER_PAGE = 15

const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { announces } = useAppSelector(state => state.announce_store)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    dispatch(getAllAnnounces())
  }, [dispatch])



  const filteredAnnounces = announces.filter(announce =>
    (categoryFilter === 'all' || announce.article_category === categoryFilter) &&
    (announce.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     announce.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const sortedAnnounces = [...filteredAnnounces].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title)
    return 0
  })

  const paginatedAnnounces = sortedAnnounces.slice(0, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setHasMore(paginatedAnnounces.length < sortedAnnounces.length)
  }, [paginatedAnnounces, sortedAnnounces])

  const navigateToAnnounceDetails = useCallback((announce: Announce) => {
    dispatch(setCurrentAnnounce(announce))
    navigate(Routes.PAGES.POST_DETAILS.replace(':id', announce.id.toString()))
  }, [dispatch, navigate])

  const resetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setSortBy('latest')
    setPage(1)
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }


  return (
    <div className="w-full">
      <Card className="sticky top-32 z-10 mb-8 mx-4 sm:mx-6 lg:mx-8 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-3xl font-bold text-green-600 mb-4 md:mb-0">Discover Amazing Plants</h1>
          <div className="flex flex-wrap justify-end items-center gap-4">
            <div className="w-full md:w-60">
              <Input
                icon={Search as IconType}
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-40">
              <Select
                icon={Filter as IconType}
                value={categoryFilter}
                onChange={(value) => setCategoryFilter(value as string)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'Indoor Plants', label: 'Indoor Plants' },
                  { value: 'Outdoor Plants', label: 'Outdoor Plants' },
                  { value: 'Succulents & Cacti', label: 'Succulents & Cacti' },
                  { value: 'Herb Garden', label: 'Herb Garden' },
                  { value: 'Flowering Plants', label: 'Flowering Plants' },
                  { value: 'Rare & Exotic Species', label: 'Rare & Exotic Species' },
                ]}
              />
            </div>
            <div className="w-full md:w-40">
              <Select
                icon={Calendar as IconType}
                value={sortBy}
                onChange={(value) => setSortBy(value as string)}
                options={[
                  { value: 'latest', label: 'Latest' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'alphabetical', label: 'A-Z' },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      {paginatedAnnounces.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-700">No plants found. Try adjusting your filters.</p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={resetFilters}>Reset Filters</Button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8"
          >
            {paginatedAnnounces.map((announce, index) => (
              <motion.div
                key={announce.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => navigateToAnnounceDetails(announce)}
              >
                <Card 
                  className="h-full cursor-pointer transition-shadow duration-300 bg-white"
                >
                  <img 
                    src={'/src/assets/images/plants/bonsai.png'} 
                    alt={announce.title} 
                    className="w-full h-48 object-cover rounded-t" 
                  />
                  <div className="mt-2">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{announce.title}</h2>
                    <div className="flex items-center mb-2 text-green-600">
                      <MapPin size={16} className="mr-1" />
                      <span>{announce.city}, {announce.postal_code}</span>
                    </div>
                    <Badge className="mb-2 bg-green-100 text-green-800">{announce?.article_category}</Badge>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">
                        {new Date(announce.created_at).toLocaleDateString()}
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">View Details</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8 mb-8">
          <Button
            size="lg"
            onClick={loadMore}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full  shadow duration-300"
          >
            Load More Plants
          </Button>
        </div>
      )}
    </div>
  )
}

export default PostsPage