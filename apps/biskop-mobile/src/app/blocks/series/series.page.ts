import {Component, inject, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel, IonCol, IonRow, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {CustomPipe} from '@biskop-monorepo/custom-pipe';

interface SeriesResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

// Update the property type


@Component({
  selector: 'app-series',
  templateUrl: 'series.page.html',
  styleUrls: ['series.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSegment, IonSegmentButton, IonLabel, IonCol, IonRow, FormsModule, NgSwitch, NgSwitchCase, NgForOf, CustomPipe, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner],
  standalone: true
})
export class SeriesPage implements OnInit{
  segment: any;
  seriesResponse: SeriesResponse = {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0
  };
  fullDate = new Date();
  currentDate: any;
  nextDate: any;
  pageSize: number = 1;
  isLoading = false;
  constructor() {
    this.segment = 'airing_today'
    this.currentDate =  new Date().toISOString().split('T')[0];
    this.fullDate.setDate(this.fullDate.getDate() + 1);
    this.nextDate = this.fullDate.toISOString().split('T')[0];

  }


  http = inject(HttpClient)

  ngOnInit(): void {
    this.getSeries()
  }

  getSeries(page: number = 1) {
    let url: string;

    if (this.segment === 'first_air_date') {
      url = `https://api.themoviedb.org/3/discover/tv?first_air_date_year=${this.fullDate.getFullYear()}&sort_by=popularity.asc&with_original_language=en&api_key=73b2fc9fab947354d61cb3faa1a40405&with_original_language=en&sort_by=popularity.desc&page=${page}`;
    } else if (this.segment === 'airing_today') {
      url = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}&sort_by=popularity.desc&api_key=73b2fc9fab947354d61cb3faa1a40405&with_original_language=en&include_adult=false&air_date.lte=${this.nextDate}&air_date.gte=${this.currentDate}`;
    } else if (this.segment === 'popular') {
      url = `https://api.themoviedb.org/3/tv/${this.segment}?api_key=73b2fc9fab947354d61cb3faa1a40405&language=en-US&page=${page}`;
    } else {
      throw new Error('Invalid segment value'); // Handle unexpected segment values
    }

    this.http.get(url).subscribe((value: any) => {
      if (page === 1) {
        this.seriesResponse = value; // Replace data for the first page
      } else {
        this.seriesResponse.results = [...this.seriesResponse.results, ...value.results]; // Append new data
      }
    });
  }


  loadMoreData(event: any) {
    this.pageSize++; // Increment the page number
    this.getSeries(this.pageSize);

    // Complete the infinite scroll event
    setTimeout(() => {
      event.target.complete();

      // Disable infinite scroll if no more data is available
      if (this.pageSize >= this.seriesResponse.total_pages) {
        event.target.disabled = true;
      }
    }, 1000);
  }
}
