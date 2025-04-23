import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MainService } from '@biskop-monorepo/main';

@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit{
  title = 'biskop-web';

   movieService = inject(MainService);

  getData(){
    this.movieService.getPopularMovies(1).subscribe(value => {
      console.log(value)
    })
  }

  ngOnInit(): void {
    this.getData()
  }
}
