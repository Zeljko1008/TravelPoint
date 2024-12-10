import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/_models/place';
import { PlacesService } from 'src/app/_services/places.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentChangeEventDetail } from '@ionic/angular';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces?: Place[];
  listedLoadedPlaces?: Place[];

  constructor(

    private placesService: PlacesService
  ) { }

  ngOnInit() {

    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}
