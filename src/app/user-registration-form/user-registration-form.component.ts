import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// @component tells Angular the class right below is a component
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit{

  // @Input decorator defines the components input
  @Input() userData = {username: '', password: '', email: '', birth_date: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

    // this method is called once the component has received all its input from the calling component
    ngOnInit(): void {
        
    }

    /**
  * This function registers a new user
  * @returns user registered
  * @returns user logged in
  * @returns user navigated to movies view
  * @returns user token and user details saved to local storage
  * @returns user notified of success
  * @returns user notified of error 
  */
  // This is the function responsible for sending the form inputs to the backend
    registerUser(): void{
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {    
// Logic for a successful user registration goes here! (To be implemented)
    this.dialogRef.close(); // This will close the modal on success!
    console.log(response);
    this.snackBar.open('User registered successfully', 'OK', {
      duration: 2000
   });
  }, (response) => {
    console.log(response);
    
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}
}
