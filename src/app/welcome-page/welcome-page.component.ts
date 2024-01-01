import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
      
  }

  /**
 * This method will open the user registration dialog when the register button is clicked
 * @returns user registration dialog
 */
  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
  });
}

/**
 * This method will open the user login dialog when the login button is clicked
 * @returns user login dialog
 */
  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width 
      width: '280px'
    })
  }
}
