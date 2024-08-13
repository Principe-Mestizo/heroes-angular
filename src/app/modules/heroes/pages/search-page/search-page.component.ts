import { Component, ViewEncapsulation } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IApiResponseHeroes } from '../../../../models/heroes.interface';
import { HeroesService } from '../../../../services/heroes.service';
import { NgFor, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-page',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NzInputModule,
    NzSelectModule,
    NzAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
    NgIf,
    NzSelectModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export default class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: IApiResponseHeroes[] = [];
  public selectedHero?: IApiResponseHeroes;

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggesions(value).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  onSelectHero(hero: IApiResponseHeroes): void {
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
