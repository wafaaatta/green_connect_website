import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Notebook, Box, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'

const plants = [
  { id: 1, name: "Monstera Deliciosa", image: "/src/assets/images/plants/monstera.png", category: "Indoor", difficulty: "Easy" },
  { id: 2, name: "Fiddle Leaf Fig", image: "/src/assets/images/plants/fiddle-leaf-fig.png", category: "Indoor", difficulty: "Moderate" },
  { id: 3, name: "Snake Plant", image: "/src/assets/images/plants/snake-plant.png", category: "Indoor", difficulty: "Easy" },
  { id: 4, name: "Pothos", image: "/src/assets/images/plants/pothos.png", category: "Indoor", difficulty: "Easy" },
  { id: 5, name: "Aloe Vera", image: "/src/assets/images/plants/aloe-vera.png", category: "Succulent", difficulty: "Easy" },
  { id: 6, name: "Peace Lily", image: "/src/assets/images/plants/peace-lily.png", category: "Indoor", difficulty: "Easy" },
  { id: 7, name: "Spider Plant", image: "/src/assets/images/plants/spider-plant.png", category: "Indoor", difficulty: "Easy" },
  { id: 8, name: "Rubber Plant", image: "/src/assets/images/plants/rubber-plant.png", category: "Indoor", difficulty: "Moderate" },
  { id: 9, name: "ZZ Plant", image: "/src/assets/images/plants/zz-plant.png", category: "Indoor", difficulty: "Easy" },
  { id: 10, name: "Philodendron", image: "/src/assets/images/plants/philodendron.png", category: "Indoor", difficulty: "Easy" },
  { id: 11, name: "Orchid", image: "/src/assets/images/plants/orchid.png", category: "Indoor", difficulty: "Difficult" },
  { id: 12, name: "Cactus", image: "/src/assets/images/plants/cactus.png", category: "Succulent", difficulty: "Easy" },
  { id: 13, name: "Lavender", image: "/src/assets/images/plants/lavender.png", category: "Outdoor", difficulty: "Moderate" },
  { id: 14, name: "Rosemary", image: "/src/assets/images/plants/rosemary.png", category: "Herb", difficulty: "Moderate" },
  { id: 15, name: "Basil", image: "/src/assets/images/plants/basil.png", category: "Herb", difficulty: "Easy" },
  { id: 16, name: "Mint", image: "/src/assets/images/plants/mint.png", category: "Herb", difficulty: "Easy" },
  { id: 17, name: "Sunflower", image: "/src/assets/images/plants/sunflower.png", category: "Outdoor", difficulty: "Easy" },
  { id: 18, name: "Rose", image: "/src/assets/images/plants/rose.png", category: "Outdoor", difficulty: "Moderate" },
  { id: 19, name: "Tulip", image: "/src/assets/images/plants/tulip.png", category: "Outdoor", difficulty: "Moderate" },
  { id: 20, name: "Bonsai", image: "/src/assets/images/plants/bonsai.png", category: "Indoor", difficulty: "Difficult" },
  { id: 21, name: "Fern", image: "/src/assets/images/plants/fern.png", category: "Indoor", difficulty: "Moderate" },
  { id: 22, name: "Bamboo", image: "/src/assets/images/plants/bamboo.png", category: "Indoor", difficulty: "Easy" },
  { id: 23, name: "Succulent", image: "/src/assets/images/plants/succulent.png", category: "Succulent", difficulty: "Easy" },
  { id: 24, name: "Calathea", image: "/src/assets/images/plants/calathea.png", category: "Indoor", difficulty: "Difficult" },
  { id: 25, name: "Dracaena", image: "/src/assets/images/plants/dracaena.png", category: "Indoor", difficulty: "Easy" },
  { id: 26, name: "English Ivy", image: "/src/assets/images/plants/english-ivy.png", category: "Indoor", difficulty: "Easy" },
  { id: 27, name: "Jade Plant", image: "/src/assets/images/plants/jade-plant.png", category: "Succulent", difficulty: "Easy" },
  { id: 28, name: "African Violet", image: "/src/assets/images/plants/african-violet.png", category: "Indoor", difficulty: "Moderate" },
  { id: 29, name: "Boston Fern", image: "/src/assets/images/plants/boston-fern.png", category: "Indoor", difficulty: "Moderate" },
  { id: 30, name: "Chinese Money Plant", image: "/src/assets/images/plants/chinese-money-plant.png", category: "Indoor", difficulty: "Easy" },
  { id: 31, name: "String of Pearls", image: "/src/assets/images/plants/string-of-pearls.png", category: "Succulent", difficulty: "Moderate" },
  { id: 32, name: "Bird of Paradise", image: "/src/assets/images/plants/bird-of-paradise.png", category: "Indoor", difficulty: "Moderate" },
]

const PlantsWiki = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const plantsPerPage = 8

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || plant.category === filter)
  )

  const indexOfLastPlant = currentPage * plantsPerPage
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-4xl font-bold text-green-800 mb-8">Plants Wiki</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search plants..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex space-x-2">
          {["All", "Indoor", "Outdoor", "Succulent", "Herb"].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${filter === category ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPlants.length === 0 && (
          <div className="col-span-4">
            <Sprout size={128} className="mx-auto mb-4 text-slate-800" />
            <p className="text-center text-gray-600 text-xl">No plants found.</p>
          </div>
        )}

        {currentPlants.map(plant => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-all duration-300"
          >
            <Link to={`/plants-wiki/${plant.id}`}>
              <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800 mb-2">{plant.name}</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{plant.category}</span>
                  <span className={`font-medium ${
                    plant.difficulty === 'Easy' ? 'text-green-700' :
                    plant.difficulty === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {plant.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {[...Array(Math.ceil(filteredPlants.length / plantsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${currentPage === number + 1
                  ? 'z-10 bg-green-100 border-green-500 text-green-700'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredPlants.length / plantsPerPage)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default PlantsWiki