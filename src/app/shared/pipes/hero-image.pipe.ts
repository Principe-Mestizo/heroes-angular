import { Pipe, PipeTransform } from '@angular/core';
import { IApiResponseHeroes } from '../../models/heroes.interface';

@Pipe({
  name: 'heroImage',
  standalone: true,
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: IApiResponseHeroes): string {
    if (!hero.id && hero.alt_img) {
      return 'assets/no-image.png';
    }
    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }
}
