import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class CustomPipe implements PipeTransform {
  transform(backdropPath: string): string {
    return `https://image.tmdb.org/t/p/w780${backdropPath}`;
  }
}

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    } else {
      return value;
    }
  }
}

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  /**
   * Pipe Constructor
   *
   * @param sanitizer
   */
  // tslint:disable-next-line
  constructor(protected sanitizer: DomSanitizer) {}

  /**
   * Transform
   *
   * @param value: string
   * @param type: string
   */
  transform(
    value: string,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}

// @Pipe({
//   name: 'search',
//   pure: false
// })

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  constructor() {}

  transform(value: string, url: string): any {
    if (!value || value === '') {
      return of([]);
    }

    return of(value).pipe(
      debounceTime(300), // Debounce for 300ms
      distinctUntilChanged(), // Only emit if the value has changed
      switchMap(
        (searchTerm) =>
          //const apiUrl = `${url}?q=${searchTerm}`

          ''
      )
    );
  }
}

