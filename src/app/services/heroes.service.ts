import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IApiResponseHeroes } from '../models/heroes.interface';
import { HEROES_ENDPOINT } from '../constants/url.api';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly BASE_URL = environment.API_URL;

  private _http = inject(HttpClient);

  getHereos(): Observable<IApiResponseHeroes[]> {
    return this._http.get<IApiResponseHeroes[]>(
      `${this.BASE_URL}/${HEROES_ENDPOINT}`,
    );
  }

  getHeroById(id: string): Observable<IApiResponseHeroes | undefined> {
    return this._http
      .get<IApiResponseHeroes>(`${this.BASE_URL}/${HEROES_ENDPOINT}/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addHero(hero: IApiResponseHeroes): Observable<IApiResponseHeroes> {
    return this._http.post<IApiResponseHeroes>(
      `${this.BASE_URL}/${HEROES_ENDPOINT}`,
      hero,
    );
  }

  updateHero(hero: IApiResponseHeroes): Observable<IApiResponseHeroes> {
    if (!hero.id) {
      throw Error('Error id is requerid');
    }
    return this._http.patch<IApiResponseHeroes>(
      `${this.BASE_URL}/${HEROES_ENDPOINT}/${hero.id}`,
      hero,
    );
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this._http.delete(`${this.BASE_URL}/${HEROES_ENDPOINT}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  getSuggesions(query: string): Observable<IApiResponseHeroes[]> {
    return this._http.get<IApiResponseHeroes[]>(
      `${this.BASE_URL}/heroes?q=${query}&_limit6`,
    );
  }
}
