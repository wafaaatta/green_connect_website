import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin, Droplet, Sun, Thermometer, Wind } from 'lucide-react'

const PlantDetails = () => {
  const plant = {
    id: 12,
    name: "Cactus (Cactaceae)",
    scientificName: "Cactaceae",
    images: [
      "/src/assets/images/plants/cactus-1.png",
      "/src/assets/images/plants/cactus-2.png",
      "/src/assets/images/plants/cactus-3.png",
      "/src/assets/images/plants/cactus-4.png",
    ],
    description: "Cacti are succulent plants that are well-adapted to hot, dry environments. They are known for their thick, fleshy stems that store water, and their distinctive spines which are modified leaves that help reduce water loss and protect the plant from animals.",
    origin: "The Americas, particularly Mexico and the southwestern United States",
    age: "Varies widely; some species can live for over 200 years",
    habitat: "Deserts, dry forests, and other arid environments",
    careInstructions: [
      { icon: Droplet, text: "Water sparingly; allow soil to dry completely between waterings" },
      { icon: Sun, text: "Provide plenty of bright, direct sunlight" },
      { icon: Thermometer, text: "Prefer warm temperatures; protect from frost" },
      { icon: Wind, text: "Ensure good air circulation to prevent fungal diseases" },
    ],
    uses: [
      "Ornamental plants in gardens and homes",
      "Some species are edible (e.g., prickly pear)",
      "Traditional medicine in some cultures",
      "Source of natural dyes",
    ],
    funFacts: [
      "The tallest cactus, the Saguaro, can grow up to 60 feet tall",
      "Some cacti can survive for up to two years without water",
      "The cactus family includes about 1,750 known species",
    ],
    readTime: "5 min read",
    createdAt: "2023-05-20",
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4">{plant.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{plant.scientificName}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center">
            <Clock size={16} className="mr-1" />
            {plant.readTime}
          </span>
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            Created on {plant.createdAt}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <img src={'/src/assets/images/plants/cactus.png'} alt={plant.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>
          <div className="space-y-6">
            <p className="text-gray-700">{plant.description}</p>
            <div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Origin</h2>
              <p className="flex items-center text-gray-700">
                <MapPin size={20} className="mr-2 text-green-700" />
                {plant.origin}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Age</h2>
              <p className="text-gray-700">{plant.age}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Habitat</h2>
              <p className="text-gray-700">{plant.habitat}</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Care Instructions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plant.careInstructions.map((instruction, index) => (
              <div key={index} className="flex items-center bg-green-50 p-4 rounded-lg">
                <instruction.icon size={24} className="mr-3 text-green-700" />
                <span className="text-gray-700">{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Uses</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {plant.uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Fun Facts</h2>
          <div className="bg-green-100 p-6 rounded-lg">
            <ul className="space-y-4">
              {plant.funFacts.map((fact, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {plant.images.map((image, index) => (
              <img key={index} src={image} alt={`${plant.name} ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PlantDetails