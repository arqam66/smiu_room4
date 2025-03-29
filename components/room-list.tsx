"use client"

import { useState } from "react"
import { DoorOpenIcon as Door, ChevronRight, Search, Building, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Import the Room type and RoomListProps interface
import type { RoomListProps } from "@/types/room"

// Update the component definition with proper typing
export default function RoomList({ rooms, onRoomSelect, selectedBuilding }: RoomListProps) {
  const [expandedBuilding, setExpandedBuilding] = useState(selectedBuilding || null)

  // Group rooms by building and floor
  const groupedRooms = rooms.reduce((acc, room) => {
    if (!acc[room.building]) {
      acc[room.building] = {}
    }

    if (!acc[room.building][room.floor]) {
      acc[room.building][room.floor] = []
    }

    acc[room.building][room.floor].push(room)
    return acc
  }, {})

  // Update expanded building when selectedBuilding changes
  if (selectedBuilding && selectedBuilding !== expandedBuilding) {
    setExpandedBuilding(selectedBuilding)
  }

  const toggleBuilding = (building) => {
    setExpandedBuilding(expandedBuilding === building ? null : building)
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Search className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-gray-600" />
        <p className="text-center">No rooms match your search criteria</p>
        <p className="text-center text-sm text-gray-500 mt-1">Try a different search term or clear filters</p>
        <Button
          variant="default"
          className="mt-4 bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => {
            // Reset filters logic would go here
          }}
        >
          Reset Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 overflow-auto max-h-[300px] sm:max-h-[400px] pr-2 custom-scrollbar">
      {Object.keys(groupedRooms).map((building) => (
        <div
          key={building}
          className="border border-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-800/50 shadow-md"
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center justify-between p-2 sm:p-3 text-left rounded-none transition-colors text-sm sm:text-base",
              expandedBuilding === building ? "bg-gray-800/70" : "bg-gray-900/50 hover:bg-gray-800/50",
            )}
            onClick={() => toggleBuilding(building)}
          >
            <div className="flex items-center">
              <div className="bg-purple-900/30 p-1 sm:p-1.5 rounded-full mr-1 sm:mr-2 shadow-inner">
                <Building className="h-3 w-3 sm:h-4 sm:w-4 text-purple-300" />
              </div>
              <span className="font-medium">{building}</span>
              <span className="ml-1 sm:ml-2 text-xs bg-gray-800/80 px-1 sm:px-2 py-0.5 rounded-full text-gray-300 shadow-inner">
                {Object.values(groupedRooms[building]).flat().length} rooms
              </span>
            </div>
            <ChevronRight
              className={cn(
                "h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300",
                expandedBuilding === building ? "rotate-90" : "",
              )}
            />
          </Button>

          {expandedBuilding === building && (
            <div className="bg-gray-950/70 p-2 sm:p-3 animate-in fade-in-50 duration-300">
              {Object.keys(groupedRooms[building]).map((floor) => (
                <div key={floor} className="mb-2 sm:mb-3 last:mb-0">
                  <div className="flex items-center px-2 py-1 text-xs sm:text-sm text-gray-400">
                    <div className="bg-teal-900/30 p-1 rounded-full mr-1 sm:mr-1.5 shadow-inner">
                      <Layers className="h-2 w-2 sm:h-3 sm:w-3 text-teal-300" />
                    </div>
                    <span className="font-medium">{floor}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mt-1 sm:mt-2">
                    {groupedRooms[building][floor].map((room) => (
                      <Button
                        key={room.id}
                        variant="ghost"
                        className="flex items-center justify-start h-auto py-1 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm bg-gray-900/50 hover:bg-purple-900/30 text-gray-300 transition-all rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
                        onClick={() => onRoomSelect(room)}
                      >
                        <div className="bg-amber-900/30 p-1 rounded-full mr-1 sm:mr-2 shadow-inner">
                          <Door className="h-2 w-2 sm:h-3 sm:w-3 text-amber-300" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{room.id}</div>
                          <div className="text-xs text-gray-500">{room.type}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

