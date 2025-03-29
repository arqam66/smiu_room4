"use client"

import { MapPin, Info, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Import the Room type and RoomDetailModalProps interface
import type { RoomDetailModalProps } from "@/types/room"

// Update the component definition with proper typing
export default function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  if (!room) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect backdrop-blur-md border-gray-700/50 text-white max-w-md rounded-xl shadow-xl mx-4 sm:mx-auto animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">
            <span className="gradient-text text-xl sm:text-2xl font-bold">{room.id}</span>
          </DialogTitle>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full hover:bg-gray-800/70 transition-colors"
            onClick={() => onClose()}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-2">
          <div className="bg-gray-800/50 p-3 sm:p-5 rounded-xl border border-gray-700/30 transition-all hover:bg-gray-800/70 shadow-md hover:shadow-lg duration-300">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-purple-900/30 p-2 sm:p-3 rounded-full shadow-inner">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-300 mb-1 text-sm sm:text-base">Location</h3>
                <p className="text-white text-base sm:text-lg">{room.building}</p>
                <p className="text-gray-400 text-sm">{room.floor}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-3 sm:p-5 rounded-xl border border-gray-700/30 transition-all hover:bg-gray-800/70 shadow-md hover:shadow-lg duration-300">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-teal-900/30 p-2 sm:p-3 rounded-full shadow-inner">
                <Info className="h-5 w-5 sm:h-6 sm:w-6 text-teal-300" />
              </div>
              <div>
                <h3 className="font-medium text-gray-300 mb-1 text-sm sm:text-base">Room Details</h3>
                <p className="text-white text-base sm:text-lg">{room.type}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

