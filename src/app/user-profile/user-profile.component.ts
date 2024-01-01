import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  // userinfo: User = {};
  user: any = {};
  favorite_movies: any[] = [];

  @Input() userData = { username: '', password: '', email: '', birth_date: '',}

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog : MatDialog,
  ) {}
  ngOnInit(): void {
    this.getUser();
     
      }
      
  /**
 * Username and token will be taken from localstorage to send a request to the api for the users information
 * User profile page will then be able to display the users favorite movies list and their username, name, email, etc.
   * @returns user's data
   */
 
  // Gets the users info to display or change
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.username = this.user.username;
      this.userData.email = this.user.email;
      this.user.birth_date = formatDate(this.user.birth_date, 'mm-dd-yyyy', 'en-US', 'UTC+0');
      
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favorite_movies = response.filter((m: { _id: any }) => this.user.favorite_movies.indexOf(m._id) >= 0);
      })
    })
  }

  /**
 * This method will update the user's data
 * @returns user's data
 * @returns updated user's data saved to local storage
 * @returns user notified of success
 * @returns user notified of error
 */
  // logic for edit user profile
  updateUser() : void{
    this.fetchApiData.editUser(this.userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('user', data.username);
      console.log(data);
      this.snackBar.open('Your profile has been updated', 'OK',{
        duration: 3000
      });
      window.location.reload();
    },(result) =>{
      this.snackBar.open('Something went wrong', 'OK',{
        duration: 3000
      });
    })
  }

  // calls the deleteUser API and removes the user in the database

  /**
 * This method will delete the user's account
 * @returns confirmation prompt
 * @returns user's account deleted
 * @returns user navigated to welcome page
 * @returns user notified of success
 * @returns user notified of error
 * @returns user token and user details removed from local storage
 */
  deleteUser(): void {
      if(confirm('Do you want to delete your account permanently?')) {
        this.router.navigate(['welcome']).then(() => {
          localStorage.clear();
          this.snackBar.open('Your account has been deleted', 'OK', {
            duration: 3000
          });
        })
        this.fetchApiData.deleteOneUser().subscribe((result) => {
          console.log(result);
        });
      }
    }
   
  }
















































































