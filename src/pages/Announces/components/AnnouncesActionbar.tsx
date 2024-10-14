import { Search, Filter, Calendar } from 'lucide-react'
import { IconType } from 'react-icons'
import { Card } from '../../../components/Card'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface AnnouncesActionbarProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    sortBy: string
    setSortBy: (value: string) => void
    categoryFilter: string
    setCategoryFilter: (value: string) => void
}

const AnnouncesActionbar: FC<AnnouncesActionbarProps> = ({
    searchTerm, setSearchTerm, sortBy, setSortBy, categoryFilter, setCategoryFilter
}) => {

    const { t } = useTranslation()
    return (
        <Card className=" z-10 mb-8 mx-0 sm:mx-4 lg:mx-8 bg-white">
            <div className="flex flex-col md:flex-row justify-between  space-y-4 md:space-y-0 md:space-x-4">
                <h1 className="text-3xl max-sm:text-xl max-md:text-2xl font-bold text-green-800 mb-4 md:mb-0">{t('postsPage.title')}</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                    <div className="w-full">
                        <Input
                            aria-label="Search posts"
                            icon={Search as IconType}
                            placeholder={t('postsPage.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <Select
                            aria-label="Sort posts"
                            icon={Filter as IconType}
                            value={categoryFilter}
                            onChange={(value) => setCategoryFilter(value as string)}
                            options={[
                                { value: 'all', label: t('postsPage.allCategories') },
                                { value: 'Indoor Plants', label: t('postsPage.indoorPlants') },
                                { value: 'Outdoor Plants', label: t('postsPage.outdoorPlants') },
                                { value: 'Succulents & Cacti', label: t('postsPage.succulentsCacti') },
                                { value: 'Herb Garden', label: t('postsPage.herbGarden') },
                                { value: 'Flowering Plants', label: t('postsPage.floweringPlants') },
                                { value: 'Rare & Exotic Species', label: t('postsPage.rareExoticSpecies') },
                            ]}
                        />
                    </div>
                    <div className="w-full">
                        <Select
                            aria-label="Sort posts"
                            icon={Calendar as IconType}
                            value={sortBy}
                            onChange={(value) => setSortBy(value as string)}
                            options={[
                                { value: 'latest', label: t('postsPage.latest') },
                                { value: 'oldest', label: t('postsPage.oldest') },
                                { value: 'alphabetical', label: t('postsPage.alphabetical') },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default AnnouncesActionbar