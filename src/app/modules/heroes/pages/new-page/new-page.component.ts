import { switchMap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IApiResponseHeroes,
  Publisher,
} from '../../../../models/heroes.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../../../services/heroes.service';
import { ToastrService } from 'ngx-toastr';
import { HeroImagePipe } from '../../../../shared/pipes/hero-image.pipe';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    ReactiveFormsModule,
    HeroImagePipe,
    NzModalModule,
    NzInputModule,
  ],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export default class NewPageComponent implements OnInit {
  private _router = inject(Router);
  private _heroeService = inject(HeroesService);
  private _activatedRoutes = inject(ActivatedRoute);
  private _toastr = inject(ToastrService);
  private _modalService = inject(NzModalService);
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(),
    first_appearance: new FormControl(),
    characters: new FormControl(),
    alt_img: new FormControl(),
  });
  public publishers = [
    { label: 'DC Comics', value: 'DC - Comics' },
    { label: 'Marvel Comics', value: 'Marlel - Comics' },
  ];

  get currentHero(): IApiResponseHeroes {
    const hero = this.heroForm.value as IApiResponseHeroes;
    return hero;
  }

  ngOnInit(): void {
    if (!this._router.url.includes('edit')) return;

    this._activatedRoutes.params
      .pipe(switchMap(({ id }) => this._heroeService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this._router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      return;
    }

    if (this.currentHero.id) {
      this._heroeService.updateHero(this.currentHero).subscribe((hero) => {
        // TODO: mostrar mensaje
        this._router.navigate(['/admin/heroes/list', hero]);
        this._toastr.info('Hero actualizado correctamente', 'Éxito');
      });

      return;
    }

    this._heroeService.addHero(this.currentHero).subscribe((heroe) => {
      // TODO: Mostrar mensaje y navegar al heroes/list/ heroe.id
      this._router.navigate(['/admin/heroes/list', heroe.id]);
      this._toastr.success('Heroe guardado correctamente', 'Éxito');
    });
  }

  showDeleteConfirm() {
    this._modalService.confirm({
      nzTitle: 'Esta seguro de eliminar el Heroe?',
      nzContent: `<b style="color: red;"> HEROE : ${this.currentHero.superhero} </b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._heroeService.deleteHeroById(this.currentHero.id).subscribe({
          next: () => {
            this._toastr.error('Héroe eliminado exitosamente.', 'Éxito');
            this._router.navigate(['/admin/heroes/list']);
          },
          error: () => {
            this._toastr.warning(
              'Ocurrió un error al eliminar el héroe.',
              'Error',
            );
          },
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  // Otra manera  de eliminar
  // deleteHero(): void {
  //   const heroId = this.currentHero.id;

  //   if (!heroId) {
  //     console.error('Hero ID not found for deletion.');
  //     return;
  //   }

  //   this._heroeService.deleteHeroById(heroId)
  //     .subscribe({
  //       next: () => {
  //         this._toastr.success('Héroe eliminado exitosamente.', 'Éxito');
  //         this._router.navigate(['/admin/heroes/list']); // Navigate back to list
  //       },
  //       error: (error) => {
  //         console.error('Error deleting hero:', error);
  //         this._toastr.error('Ocurrió un error al eliminar el héroe.', 'Error');
  //       }
  //     });
  // }
}
