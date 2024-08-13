import { Component, OnInit, inject } from '@angular/core';
import { IApiResponseHeroes } from '../../../../models/heroes.interface';
import { HeroesService } from '../../../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HeroImagePipe } from '../../../../shared/pipes/hero-image.pipe';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    HeroImagePipe,
    NzSpinModule,
    NzIconModule,
  ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export default class HeroPageComponent implements OnInit {
  public hero?: IApiResponseHeroes;
  private _heroService = inject(HeroesService);
  private _activatedRoute = inject(ActivatedRoute);
  private _route = inject(Router);

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this._heroService.getHeroById(id)),
      )
      .subscribe((hero) => {
        if (!hero) {
          return this._route.navigate(['/admin/heroes/list']);
        }
        this.hero = hero;
        return;
      });
  }

  public goBack(): void {
    this._route.navigateByUrl('/admin/heroes/list');
  }
}
