import { Component, OnInit, inject } from '@angular/core';
import { IApiResponseHeroes } from '../../../../models/heroes.interface';
import { HeroesService } from '../../../../services/heroes.service';
import { CardHeroeComponent } from '../../components/card-heroe/card-heroe.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CardHeroeComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export default class ListPageComponent implements OnInit {
  public heroes: IApiResponseHeroes[] = [];

  private _heroesService = inject(HeroesService);

  ngOnInit(): void {
    this._heroesService.getHereos().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
