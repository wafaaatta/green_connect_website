import { Search } from 'lucide-react'
import { IconType } from 'react-icons'
import { Card } from '../../../components/Card'
import Input from '../../../components/Input'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ArticlesActionbarProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
}

const ArticlesActionbar: FC<ArticlesActionbarProps> = ({
    searchTerm, setSearchTerm
}) => {
    const { t } = useTranslation()
    return (
        <Card className='shadow'>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <h1 className="text-3xl max-md:text-2xl font-bold text-green-800">{t('articlesPage.title')}</h1>
                <div className="w-full md:w-64">
                    <Input
                        aria-label="Search articles"
                        icon={Search as IconType}
                        placeholder={t('articlesPage.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </Card>
    )
}

export default ArticlesActionbar