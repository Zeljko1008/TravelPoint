import { Injectable } from '@angular/core';
import { Place } from '../_models/place';
import { AuthService } from './auth.service';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>([

    new Place(
      'p1',
      'Tower Mansion',
      'In the heart of Dubrovnik',
      'https://media.istockphoto.com/id/1366743339/photo/view-of-the-city-wall-of-dubrovnik-croatia.jpg?s=2048x2048&w=is&k=20&c=2N8O0T7sP_DarlHszvEPAZlkxmg4sjUBdYC9lb9jfoQ=',
      149.99,
      new Date('2024-01-01'),
      new Date('2024-12-31'),
      'abc'



      ),
    new Place(
      'p2',
      'L\'Amour Kvarner',
      'A romantic place in Rijeka!',
      'https://media.istockphoto.com/id/1339765721/photo/trsat-and-rijeka-aerial-panoramic-view-historic-old-town.jpg?s=2048x2048&w=is&k=20&c=jIsdnLTzmWcMn2U0sggLzzSJ_uFfqnYNBqkP3zrx5fI=',
      189.99,
      new Date('2024-01-01'),
      new Date('2024-12-31'),
      'abc'

      ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://media.istockphoto.com/id/1406065864/photo/lonely-hut-in-the-forest-lonely-wooden-house-in-the-mountains-gloomy-house-with-luminous.jpg?s=2048x2048&w=is&k=20&c=h-_anQqppo6ATXDQe3PYJuvT3UAMFFmbbUfu78iu7Q0=',
      99.99,
      new Date('2024-01-01'),
      new Date('2024-12-31'),
      'abc'
      ),
      new Place(
        'p4',
        'Slunjčica River',
        'National Park Plitvice Lakes',
        'https://media.istockphoto.com/id/1504319706/photo/waters-of-the-picturesque-rastoke-village-croatia.jpg?s=2048x2048&w=is&k=20&c=DR-faFu0u3_bfc-xLG7OGnz0DbfRlB-5CgxRvn1S30w=',
        250.99,
        new Date('2024-01-01'),
      new Date('2024-12-31'),
        'abc'
        ),
      new Place(
        'p5',
        'Zlatni Rat Beach',
        'Island of Brač',
        'https://media.istockphoto.com/id/1094604290/photo/aerial-view-of-beach-on-peninsula-in-croatia-bol-zlatni-rat.jpg?s=2048x2048&w=is&k=20&c=HkkC3UBg9LHnFBqhpLMn0e-SzwT-4Tx6Uv1ztUX3axE=',
        189.99,
        new Date('2024-01-01'),
      new Date('2024-12-31'),
        'abc'
        ),
      new Place(
        'p6',
        'Vineyard Ilok Castle',
        'Drinking wine in the vineyard',
        'https://media.istockphoto.com/id/836180432/photo/vineyard.jpg?s=2048x2048&w=is&k=20&c=VMVSwoysCIKpm82pgkjYRC0zSpWD011F1BW9W_SN4fU=',
        99.99,
        new Date('2024-01-01'),
      new Date('2024-12-31'),
        'abc'
        )]);


  constructor( private authService: AuthService ) { }

  get places() {
    return this._places.asObservable();
  }
  getPlace(id: string) {
    return this.places.pipe(
       take(1),
        map(places => {
      return { ...places.find(p => p.id === id) };

    })
    );

  }
  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://media.istockphoto.com/id/1366743339/photo/view-of-the-city-wall-of-dubrovnik-croatia.jpg?s=2048x2048&w=is&k=20&c=2N8O0T7sP_DarlHszvEPAZlkxmg4sjUBdYC9lb9jfoQ=',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe(places => {
      setTimeout(() => {
        this._places.next(places.concat(newPlace));
      }, 1000);
    });

}
updatePlace(placeId: string, title: string, description: string) {
  return this.places.pipe(
    take(1),
    delay(1000),
    tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
      );
      this._places.next(updatedPlaces);
    })
  );
}
}
