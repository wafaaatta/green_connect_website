import { IconType } from "react-icons"
import Input from "../../../components/Input"
import Select from "../../../components/Select"
import { Search, Filter } from "lucide-react"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface EventActionbarProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    sortBy: string
    setSortBy: (value: string) => void
}

const EventActionbar: FC<EventActionbarProps> = ({
    searchTerm, setSearchTerm, sortBy, setSortBy
}) => {

    const { t } = useTranslation()
    return (
        <div className="z-10 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center max-md:items-start  space-y-4 md:space-y-0 md:space-x-4">
                    <h1 className="text-3xl font-bold text-green-800 max-md:text-center max-md:w-full">{t('eventsPage.title')}</h1>
                    <div className="flex justify-between flex-grow items-center gap-4 max-md:w-full">
                        <div className="w-full">
                            <Input
                                aria-label="Search events"
                                icon={Search as IconType}
                                placeholder={t('eventsPage.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <Select
                                aria-label="Sort events"
                                icon={Filter as IconType}
                                value={sortBy}
                                onChange={(value) => setSortBy(value as string)}
                                options={[
                                    { value: 'upcoming', label: t('eventsPage.sortUpcoming') },
                                    { value: 'latest', label: t('eventsPage.sortLatest') },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventActionbar