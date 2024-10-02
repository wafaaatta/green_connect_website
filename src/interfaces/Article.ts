import ArticleCategory from "./ArticleCategory"

interface Article {
    id: number
    title: string
    content: string
    image: string
    views: number
    article_category: ArticleCategory
    created_at: string
}

export default Article