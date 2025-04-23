import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MainService } from '@biskop-monorepo/main';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Tab1Page implements OnInit{
  mainService = inject( MainService);

  ngOnInit(): void {
    this.mainService.getPopularMovies(1).subscribe(value => {
      console.log(value)
    })
  }
}
