import { RoomAvailabilityService } from 'src/app/shared/services/room-availability/room-availability.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.scss']
})
export class AvailableRoomComponent implements OnInit {
  availableRooms: any[] = []
  constructor(private roomAvailabilityService: RoomAvailabilityService) {}

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.roomAvailabilityService.getAvailableRooms().subscribe((result) => {
      this.availableRooms = result.data
    })
  }
}
