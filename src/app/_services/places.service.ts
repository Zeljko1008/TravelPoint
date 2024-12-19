import { Injectable } from '@angular/core';
import { Place } from '../_models/place';
import { AuthService } from './auth.service';
import { BehaviorSubject, delay, map, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlaceData } from '../_models/placeData';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }
  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://travelpoint-f88e5-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json'
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }
  getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://travelpoint-f88e5-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${id}.json`
      )
      .pipe(
        map((placeData) => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>(
        'https://travelpoint-f88e5-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json',
        {
          ...newPlace,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        }else{
          return of(places);
        }

      }),
      switchMap( places => {

        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        updatedPlaces = [...places];
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
        return this.http.put(
          `https://travelpoint-f88e5-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );

      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

// [
//   new Place(
//     'p1',
//     'Tower Mansion',
//     'In the heart of Dubrovnik',
//     'https://media.istockphoto.com/id/1366743339/photo/view-of-the-city-wall-of-dubrovnik-croatia.jpg?s=2048x2048&w=is&k=20&c=2N8O0T7sP_DarlHszvEPAZlkxmg4sjUBdYC9lb9jfoQ=',
//     149.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p2',
//     "L'Amour Kvarner",
//     'A romantic place in Rijeka!',
//     'https://media.istockphoto.com/id/1339765721/photo/trsat-and-rijeka-aerial-panoramic-view-historic-old-town.jpg?s=2048x2048&w=is&k=20&c=jIsdnLTzmWcMn2U0sggLzzSJ_uFfqnYNBqkP3zrx5fI=',
//     189.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p3',
//     'The Foggy Palace',
//     'Not your average city trip!',
//     'https://media.istockphoto.com/id/1406065864/photo/lonely-hut-in-the-forest-lonely-wooden-house-in-the-mountains-gloomy-house-with-luminous.jpg?s=2048x2048&w=is&k=20&c=h-_anQqppo6ATXDQe3PYJuvT3UAMFFmbbUfu78iu7Q0=',
//     99.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p4',
//     'Slunjčica River',
//     'National Park Plitvice Lakes',
//     'https://media.istockphoto.com/id/1504319706/photo/waters-of-the-picturesque-rastoke-village-croatia.jpg?s=2048x2048&w=is&k=20&c=DR-faFu0u3_bfc-xLG7OGnz0DbfRlB-5CgxRvn1S30w=',
//     250.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p5',
//     'Zlatni Rat Beach',
//     'Island of Brač',
//     'https://media.istockphoto.com/id/1094604290/photo/aerial-view-of-beach-on-peninsula-in-croatia-bol-zlatni-rat.jpg?s=2048x2048&w=is&k=20&c=HkkC3UBg9LHnFBqhpLMn0e-SzwT-4Tx6Uv1ztUX3axE=',
//     189.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p6',
//     'Vineyard Ilok Castle',
//     'Drinking wine in the vineyard',
//     'https://media.istockphoto.com/id/836180432/photo/vineyard.jpg?s=2048x2048&w=is&k=20&c=VMVSwoysCIKpm82pgkjYRC0zSpWD011F1BW9W_SN4fU=',
//     99.99,
//     new Date('2024-01-01'),
//     new Date('2024-12-31'),
//     'abc'
//   ),
// ]
