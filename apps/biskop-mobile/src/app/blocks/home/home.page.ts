import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA, OnInit, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonLabel,
  IonCol,
  IonRow
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {addIcons} from "ionicons";
import {chevronForward} from "ionicons/icons";
import SwiperCore from 'swiper';
import {SwiperOptions} from "swiper/types";
import {HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {Router} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {Grid} from "swiper/types/modules";
import {getGenreById} from '@biskop-monorepo/util';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CustomPipe,} from '@biskop-monorepo/custom-pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonLabel, IonCol, IonRow, NgFor, DatePipe, CustomPipe, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  standalone: true
})
export class HomePage implements OnInit {
  trendingMoviesResponse: any; //response from api
  trendingTvShowResponse: any; //response from api:
  showVideo: boolean = false;
  videoUrl: SafeResourceUrl = '';
  currentIndex: number = 0;

  videoPlayed: boolean = false; // Flag to ensure the video only plays once
  timer: any; // Timer to delay video show after user stops sliding
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) {
    addIcons({chevronForward})
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  swiperSlideChange($event: any) {

  }

  ngOnInit(): void {
    this.getTrending('movie','tv').subscribe(([response1, response2]) => {
      console.log(response1);
      console.log(response2);
      this.trendingMoviesResponse = response1.results;
      this.trendingTvShowResponse = response2.results
    })
  }

  getTrending(movie: any, tv: any): Observable<any> {
    return forkJoin([
      this.http.get<any>(`https://api.themoviedb.org/3/trending/${movie}/day?api_key=73b2fc9fab947354d61cb3faa1a40405`),
      //https://api.themoviedb.org/3/trending/movie/day?api_key=73b2fc9fab947354d61cb3faa1a40405
      this.http.get<any>(`https://api.themoviedb.org/3/trending/${tv}/day?api_key=73b2fc9fab947354d61cb3faa1a40405`),
    ]);
  }

  onSlideChange(event: any): void {
    console.log(event)
    // const index = event.realIndex;
    // this.currentIndex = index;
    this.currentIndex = this.swiperRef?.nativeElement.swiper.activeIndex;

    console.log('current index', this.currentIndex)

    // After a delay, show the video related to the slide.

      //this.loadVideo(index);

    this.loadVideoIfNecessary(this.currentIndex);
  }

  loadVideoIfNecessary(index: number): void {
    if (this.timer) {
      clearTimeout(this.timer); // Clear any previous timers
    }

    // After 2 seconds, show the video if the user hasn't moved to the next slide
    this.timer = setTimeout(() => {
      this.loadVideo(index);
    }, 2000); // Adjust this delay as necessary
  }


  // loadVideo(index?: number): void {
  //   const videoKey = '1kmjAnvFw3I';
  //   const url = `https://www.youtube.com/v/${videoKey}?version=3&autohide=1&autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`;
  //   this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   console.log(this.videoUrl)
  // }

  loadVideo(index: number): void {
    if (this.videoPlayed) return; // Ensure the video is only played once per slide

    const videoKey = '1kmjAnvFw3I'; // Example video key
    const url = `https://www.youtube.com/v/${videoKey}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`;

    // Show the video when it's time (e.g., index 2 or any condition you want)
    if (index === 2) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.showVideo = true; // Show the video
      this.videoPlayed = true; // Mark the video as played
    } else {
      this.showVideo = false; // Hide the video if it's not the right slide
      this.videoPlayed = false; // Reset the video state for the next slide
    }
  }



  protected readonly getGenreById = getGenreById;
}
