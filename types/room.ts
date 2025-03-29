// Add type definitions for better type safety

export interface Room {
  id: string
  building: string
  floor: string
  type: string
  capacity?: number
}

export interface RoomListProps {
  rooms: Room[]
  onRoomSelect: (room: Room) => void
  selectedBuilding: string
}

export interface CampusMapProps {
  buildings: string[]
  selectedBuilding: string
  onBuildingSelect: (building: string) => void
  filteredRooms: Room[]
}

export interface RoomDetailModalProps {
  room: Room | null
  isOpen: boolean
  onClose: () => void
}

