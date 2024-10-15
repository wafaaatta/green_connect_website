import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllAnnounces, setCurrentAnnounce } from '../../redux/stores/announce_store'
import Routes from '../../constants/routes'
import Announce from '../../interfaces/Announce'
import Button from '../../components/Button'
import AnnouncesActionbar from './components/AnnouncesActionbar'
import NoAnnounceComponent from './components/NoAnnouncesComponent'
import AnnounceComponent from './components/AnnounceComponent'
import PaginationSettings from '../../constants/pagination_settings'

const AnnouncesPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { announces } = useAppSelector(state => state.announce_store)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    dispatch(getAllAnnounces(undefined))
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

  const paginatedAnnounces = sortedAnnounces.slice(0, page * PaginationSettings.announces.ITEMS_PER_PAGE)

  useEffect(() => {
    setHasMore(paginatedAnnounces.length < sortedAnnounces.length)
  }, [paginatedAnnounces, sortedAnnounces])

  const navigateToAnnounceDetails = useCallback((announce: Announce) => {
    dispatch(setCurrentAnnounce(announce))
    navigate(Routes.PAGES.ANNOUNCE_DETAILS.replace(':id', announce.id.toString()))
  }, [dispatch, navigate])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setSortBy('latest')
    setPage(1)
  }

  return (
    <div className="w-full">
      <AnnouncesActionbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {paginatedAnnounces.length === 0 ? (
        <NoAnnounceComponent resetFilters={resetFilters} />
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8"
          >
            {paginatedAnnounces.map((announce) => <AnnounceComponent announce={announce} navigateToAnnounceDetails={navigateToAnnounceDetails} />)}
          </motion.div>
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8 mb-8">
          <Button
            aria-label="Load more announces"
            size="lg"
            onClick={loadMore}
            className="px-8 py-3 bg-green-800 hover:bg-green-700 text-white font-semibold rounded-full  shadow duration-300"
          >
            {t('postsPage.loadMore')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default AnnouncesPage