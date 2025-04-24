import { Component, inject, Input, OnInit } from '@angular/core';
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

   @Input() username! : string;
   @Input() age! : number;

  getData(){
    this.movieService.getPopularMovies(1).subscribe(value => {
      console.log(value)
    })
  }

  ngOnInit(): void {
    this.getData()
  }
}
