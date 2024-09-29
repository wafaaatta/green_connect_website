import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import debounce from 'lodash/debounce'

interface AutocompleteInputProps {
  items: Array<{
    name: string,
    postal_code: string
  }>
  placeholder?: string
  onSelect: (item: { name: string, postal_code: string }) => void
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  items,
  placeholder = 'Search...',
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredItems, setFilteredItems] = useState<Array<{ name: string, postal_code: string }>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const searchIndex = useMemo(() => {
    return items.reduce((acc, item, index) => {
      const lowerName = item.name.toLowerCase()
      for (let i = 1; i <= lowerName.length; i++) {
        const prefix = lowerName.slice(0, i)
        if (!acc[prefix]) {
          acc[prefix] = []
        }
        acc[prefix].push(index)
      }
      return acc
    }, {} as Record<string, number[]>)
  }, [items])

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length === 0) {
        setFilteredItems([])
        setIsOpen(false)
        return
      }

      const lowerSearchTerm = searchTerm.toLowerCase()
      const matchingIndexes = searchIndex[lowerSearchTerm] || []
      const results = matchingIndexes.map(index => items[index]).slice(0, 100)

      setFilteredItems(results)
      setIsOpen(results.length > 0)
    }, 300),
    [items, searchIndex]
  )

  useEffect(() => {
    debouncedSearch(inputValue)
  }, [inputValue, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleItemClick = (item: { name: string, postal_code: string }) => {
    setInputValue(`${item.name} (${item.postal_code})`)
    onSelect(item)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1))
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      handleItemClick(filteredItems[highlightedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const clearInput = () => {
    setInputValue('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (highlightedIndex !== -1 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement
      highlightedElement.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(inputValue.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex !== -1 ? `item-${highlightedIndex}` : undefined
          }
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {inputValue ? (
            <button
              onClick={clearInput}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          ) : (
            <Search size={18} className="text-gray-400" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {filteredItems.map((item, index) => (
              <motion.li
                key={item.postal_code}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.03 }}
                onClick={() => handleItemClick(item)}
                className={`px-4 py-2 cursor-pointer ${
                  index === highlightedIndex
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="option"
                aria-selected={index === highlightedIndex}
                id={`item-${index}`}
              >
                {item.name} ({item.postal_code})
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}