import { useState, useEffect } from 'react'

const CHUNK_SIZE = 50 // Number of icons to load at once

export function useLucideIcons() {
  const [icons, setIcons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleIcons, setVisibleIcons] = useState<string[]>([])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/lucide-static/tags.json')
      .then(res => res.json())
      .then(data => {
        const iconList = Object.keys(data)
        setIcons(iconList)
        setVisibleIcons(iconList.slice(0, CHUNK_SIZE))
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  const loadMoreIcons = () => {
    const currentLength = visibleIcons.length
    const nextChunk = icons
      .filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(currentLength, currentLength + CHUNK_SIZE)
    setVisibleIcons(prev => [...prev, ...nextChunk])
  }

  const filterIcons = (term: string) => {
    setSearchTerm(term)
    const filtered = icons
      .filter(icon => icon.toLowerCase().includes(term.toLowerCase()))
      .slice(0, CHUNK_SIZE)
    setVisibleIcons(filtered)
  }

  return { 
    icons: visibleIcons, 
    loading, 
    error,
    hasMore: visibleIcons.length < icons.length,
    loadMoreIcons,
    filterIcons
  }
} 