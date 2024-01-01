import { Component, Input, OnInit } from '@angular/core';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit{

  @Input() loginData = {username: '', password: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }
  
    ngOnInit(): void {
        
    }

    /**
 * This is the function responsible for sending the form inputs to the backend
 * @returns user logged in
 * @returns user navigated to movies view
 * @returns user token and user details saved to local storage
 * @returns user notified of success
 * @returns user notified of error
 */
    // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('Logged in', 'OK', {
        duration: 2000
      });
      // Successfully login done
      
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
