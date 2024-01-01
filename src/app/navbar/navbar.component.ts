import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor (
    public fetchApiData: FetchApiDataService,
    public router : Router,
  ) {}
  
  /**
   * This is navigation bar link and is responsible for navigating movies
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  /**
   * This is navigation bar link and is responsible for navigating profile
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }
  /**
 * This is the function responsible for logging out the user
 * @returns user and token removed from local storage
 * @returns user navigated to welcome page
 */
    logoutUser(): void{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    }

}
