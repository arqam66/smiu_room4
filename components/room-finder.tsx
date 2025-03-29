"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Building, Layers, Menu, X, Github } from "lucide-react"
import CampusMap from "./campus-map"
import RoomList from "./room-list"
import { roomData } from "@/lib/room-data"
import { Input } from "@/components/ui/input"
import RoomDetailModal from "./room-detail-modal"
// Import the Room type
import type { Room } from "@/types/room"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function RoomFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Room[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get unique buildings
  const buildings = [...new Set(roomData.map((room) => room.building))]

  // Filter rooms based on building selection
  const filteredRooms = roomData.filter((room) => {
    return selectedBuilding === "" || room.building === selectedBuilding
  })

  // Update search results whenever search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = roomData.filter(
      (room) =>
        room.id.toLowerCase().includes(query) ||
        room.building.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.floor.toLowerCase().includes(query),
    )

    setSearchResults(results)
  }, [searchQuery])

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
    setMobileMenuOpen(false)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building === selectedBuilding ? "" : building)
  }

  const searchRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header with university image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
        <Image src="/images/university-building.png" alt="University Building" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90 flex flex-col justify-end">
          <header className="glass-effect backdrop-blur-md py-3 sm:py-4 px-4 sm:px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text tracking-tight">Room Finder</h1>
                <button
                  className="md:hidden bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors shadow-lg"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col">
        <div className="glass-effect backdrop-blur-md rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg relative z-50 border border-gray-800/50 hover:border-purple-500/30 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center text-white">
            <div className="bg-purple-900/50 p-2 rounded-full mr-3 shadow-inner">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
            </div>
            Find a Room
          </h2>

          <div ref={searchRef} className="relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for rooms, buildings, or room types..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(true)
                }}
                className="bg-gray-800/70 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition-all pr-10 py-4 sm:py-5 text-base sm:text-lg shadow-inner"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    handleRoomSelect(searchResults[0])
                  }
                }}
                onFocus={() => setShowSearchResults(true)}
              />
              <Button
                className="absolute right-0 top-0 h-full rounded-l-none bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md"
                onClick={() => {
                  if (searchResults.length > 0) {
                    handleRoomSelect(searchResults[0])
                  }
                }}
                type="button"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Results */}
            {showSearchResults && searchQuery.trim() !== "" && (
              <div
                className="fixed inset-x-4 sm:absolute sm:inset-x-0 top-full mt-2 bg-gray-900/95 backdrop-blur-md border-2 border-purple-500/50 rounded-lg shadow-xl overflow-y-auto animate-in fade-in-50 slide-in-from-top-5 duration-300"
                style={{ zIndex: 9999, maxHeight: "60vh" }}
              >
                {searchResults.length === 0 ? (
                  <div className="p-6 text-gray-400 text-center">
                    <div className="flex justify-center mb-3">
                      <Search className="h-10 w-10 text-gray-600" />
                    </div>
                    <p className="text-lg">No rooms match "{searchQuery}"</p>
                    <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="text-sm text-gray-400 mb-3 px-2 border-b border-gray-800 pb-2">
                      {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {searchResults.map((room) => (
                        <button
                          key={room.id}
                          className="w-full flex items-center justify-between p-3 text-left rounded-md bg-gray-800/80 hover:bg-purple-900/50 text-gray-200 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
                          onClick={() => handleRoomSelect(room)}
                        >
                          <div className="flex items-center">
                            <div className="bg-amber-900/50 p-2 rounded-full mr-3 shadow-inner">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-amber-300"
                              >
                                <path d="M13 4h3a2 2 0 0 1 2 2v14"></path>
                                <path d="M2 20h3"></path>
                                <path d="M13 20h9"></path>
                                <path d="M10 12v.01"></path>
                                <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{room.id}</div>
                              <div className="text-xs text-gray-400">{room.type}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center text-xs bg-gray-700 px-2 py-0.5 rounded-full mb-1 shadow-inner">
                              <span>{room.building}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                              <span>{room.floor}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 flex-1 relative z-10">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="glass-effect backdrop-blur-md rounded-xl p-4 sm:p-6 h-full shadow-lg card-hover border border-gray-800/50 hover:border-teal-500/30 transition-colors duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center text-white">
                <div className="bg-teal-900/50 p-2 rounded-full mr-3 shadow-inner">
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 text-teal-300" />
                </div>
                Room List
              </h2>
              <RoomList rooms={filteredRooms} onRoomSelect={handleRoomSelect} selectedBuilding={selectedBuilding} />
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="glass-effect backdrop-blur-md rounded-xl p-4 sm:p-6 h-full shadow-lg card-hover border border-gray-800/50 hover:border-amber-500/30 transition-colors duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center text-white">
                <div className="bg-amber-900/50 p-2 rounded-full mr-3 shadow-inner">
                  <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-amber-300" />
                </div>
                Campus Map
              </h2>
              <CampusMap
                buildings={buildings}
                selectedBuilding={selectedBuilding}
                onBuildingSelect={handleBuildingSelect}
                filteredRooms={filteredRooms}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="glass-effect backdrop-blur-md py-4 sm:py-6 px-4 sm:px-6 text-center text-gray-300 mt-6 sm:mt-8 relative z-10 border-t border-gray-800/50">
        <div className="container mx-auto">
          <p className="text-sm sm:text-base">
            © Room Finder | Designed for easy navigation | Made by
            <a
              href="https://github.com/arqam66"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-purple-300 transition-colors ml-1 group"
            >
              Arqam Hussain
              <Github className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:text-purple-300 transition-colors" />
            </a>
          </p>
        </div>
      </footer>

      {isModalOpen && selectedRoom && (
        <RoomDetailModal room={selectedRoom} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

