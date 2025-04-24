import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
  selector: 'app-series',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true
})
export class SearchPage {
  constructor() {}
}
