import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class MoviesPage {

  constructor() {}

}
