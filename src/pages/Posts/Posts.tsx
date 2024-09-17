import { motion } from 'framer-motion'
import Badge from '../../components/Badge'
import { NavLink } from 'react-router-dom'
import Routes from '../../constants/routes'

const PostsPage = () => {
  const posts = [
    { id: 1, user: 'Alice Green', title: 'Monstera Deliciosa', image: '/src/assets/images/plants/monstera.png', category: 'Indoor', city: 'New York', postalCode: '10021' },
    { id: 2, user: 'Bob Plant', title: 'Succulent', image: "/src/assets/images/plants/succulent.png", category: 'Outdoor', city: 'Los Angeles', postalCode: '90001' },
    { id: 3, user: 'Charlie Bloom', title: 'Tropical Indoor Jungle', image: "/src/assets/images/plants/aloe-vera.png", category: 'Indoor', city: 'San Francisco', postalCode: '94101' },
    { id: 4, user: 'Diana Leaf', title: 'Rare Philodendron Varieties', image: "/src/assets/images/plants/bonsai.png", category: 'Indoor', city: 'Chicago', postalCode: '60601' },
  ]

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Latest Plant Posts</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded shadow overflow-hidden border"
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-3">
              <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
              <Badge className='mb-1'>{post.category}</Badge>
              <p className="text-gray-600">{`${post.city} . ${post.postalCode}`}</p>

              <div className='mt-4'>
                <NavLink to={Routes.PAGES.POST_DETAILS.replace(':id', String(post.id))}>
                  <p className='text-end hover:underline text-green-800'>Read more</p>
                </NavLink>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PostsPage
