import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from 'src/app/_models/place';
import { PlacesService } from 'src/app/_services/places.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy{

  loadedPlaces?: Place[];
  listedLoadedPlaces?: Place[];
  private placesSub: Subscription = new Subscription();

  constructor(

    private placesService: PlacesService
  ) { }


  ngOnInit() {

    this.placesSub= this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    })
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
  }

}

}
