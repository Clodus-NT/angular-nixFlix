import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  ngOnInit(): void {
  }

  /**
   * Logs in the user.
   * Displays message indicating that user has logged in.
   * Redirects to the main movies page on login.
   * @function loginUser
   */
  loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success
      console.log(result);
      //Put token and user in local storage so they can be used through the rest of the app
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      //Redirect to the movies view
      this.router.navigate(['movies']);
      this.snackBar.open('You are logged in.', 'OK', {
          duration: 2000
      });
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }