import { Component, Input, OnInit } from '@angular/core';
import { IApiResponseHeroes } from '../../../../models/heroes.interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HeroImagePipe } from '../../../../shared/pipes/hero-image.pipe';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-card-heroe',
  standalone: true,
  imports: [
    NzCardModule,
    NzGridModule,
    HeroImagePipe,
    RouterLink,
    NzIconModule,
  ],
  templateUrl: './card-heroe.component.html',
})
export class CardHeroeComponent implements OnInit {
  @Input()
  public hero!: IApiResponseHeroes;

  ngOnInit() {
    if (!this.hero) {
      throw Error('HEro Property doenst');
    }
  }
}
