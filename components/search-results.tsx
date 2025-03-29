"use client"

import { DoorOpenIcon as Door, Building, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Room } from "@/types/room"

interface SearchResultsProps {
  results: Room[]
  onRoomSelect: (room: Room) => void
  searchQuery: string
}

export default function SearchResults({ results, onRoomSelect, searchQuery }: SearchResultsProps) {
  if (!searchQuery || searchQuery.length === 0) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="glass-effect p-3 sm:p-4 rounded-lg text-center text-gray-400 text-sm sm:text-base shadow-lg border border-gray-700/30">
        No rooms match "{searchQuery}"
      </div>
    )
  }

  return (
    <div className="glass-effect p-3 sm:p-4 rounded-lg border border-gray-700/30 animate-in fade-in-50 duration-300 max-h-[300px] sm:max-h-[400px] overflow-y-auto shadow-lg">
      <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 px-2">
        {results.length} result{results.length !== 1 ? "s" : ""} found
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
        {results.map((room) => (
          <Button
            key={room.id}
            variant="ghost"
            className="w-full flex items-center justify-between p-2 sm:p-3 text-left rounded-md bg-gray-800/50 hover:bg-purple-900/20 text-gray-200 transition-all text-xs sm:text-sm"
            onClick={() => onRoomSelect(room)}
          >
            <div className="flex items-center">
              <div className="bg-amber-900/30 p-1 sm:p-1.5 rounded-full mr-1 sm:mr-2">
                <Door className="h-3 w-3 sm:h-4 sm:w-4 text-amber-300" />
              </div>
              <div>
                <div className="font-medium">{room.id}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{room.type}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-[10px] sm:text-xs bg-gray-700/70 px-1 sm:px-2 py-0.5 rounded-full mb-1">
                <Building className="h-2 w-2 sm:h-3 sm:w-3 mr-1 text-purple-300" />
                <span>{room.building}</span>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-gray-400">
                <Layers className="h-2 w-2 sm:h-3 sm:w-3 mr-1 text-teal-300" />
                <span>{room.floor}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

