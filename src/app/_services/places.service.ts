import { Injectable } from '@angular/core';
import { Place } from '../_models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places : Place []=[

    new Place(
      'p1',
      'Tower Mansion',
      'In the heart of Dubrovnik',
      'https://media.istockphoto.com/id/1366743339/photo/view-of-the-city-wall-of-dubrovnik-croatia.jpg?s=2048x2048&w=is&k=20&c=2N8O0T7sP_DarlHszvEPAZlkxmg4sjUBdYC9lb9jfoQ=',
      149.99
      ),
    new Place(
      'p2',
      'L\'Amour Kvarner',
      'A romantic place in Rijeka!',
      'https://media.istockphoto.com/id/1339765721/photo/trsat-and-rijeka-aerial-panoramic-view-historic-old-town.jpg?s=2048x2048&w=is&k=20&c=jIsdnLTzmWcMn2U0sggLzzSJ_uFfqnYNBqkP3zrx5fI=',
      189.99
      ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://media.istockphoto.com/id/1406065864/photo/lonely-hut-in-the-forest-lonely-wooden-house-in-the-mountains-gloomy-house-with-luminous.jpg?s=2048x2048&w=is&k=20&c=h-_anQqppo6ATXDQe3PYJuvT3UAMFFmbbUfu78iu7Q0=',
      99.99
      ),
      new Place(
        'p4',
        'Slunjčica River',
        'National Park Plitvice Lakes',
        'https://media.istockphoto.com/id/1504319706/photo/waters-of-the-picturesque-rastoke-village-croatia.jpg?s=2048x2048&w=is&k=20&c=DR-faFu0u3_bfc-xLG7OGnz0DbfRlB-5CgxRvn1S30w=',
        250.99
        ),
      new Place(
        'p5',
        'Zlatni Rat Beach',
        'Island of Brač',
        'https://media.istockphoto.com/id/1094604290/photo/aerial-view-of-beach-on-peninsula-in-croatia-bol-zlatni-rat.jpg?s=2048x2048&w=is&k=20&c=HkkC3UBg9LHnFBqhpLMn0e-SzwT-4Tx6Uv1ztUX3axE=',
        189.99
        ),
      new Place(
        'p6',
        'Vineyard Ilok Castle',
        'Drinking wine in the vineyard',
        'https://media.istockphoto.com/id/836180432/photo/vineyard.jpg?s=2048x2048&w=is&k=20&c=VMVSwoysCIKpm82pgkjYRC0zSpWD011F1BW9W_SN4fU=',
        99.99
        )
  ]

  constructor() { }

  get places() {
    return [...this._places];
  }
  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
