import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

const GreenSection: React.FC<{ title: string; icon: React.ReactNode; content: string[] }> = ({ title, icon, content }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-green-100 shadow rounded p-4"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-bold text-green-800 ml-4 heading-font">{title}</h2>
      </div>
      <ul className="space-y-4">
        {content.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start"
          >
            <FaLeaf className="w-5 h-5 text-green-800 mr-3 mt-1 flex-shrink-0" />
            <span className="text-green-800 body-font">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )

export default GreenSection