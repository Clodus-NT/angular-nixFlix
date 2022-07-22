import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Navigates to the main movies page.
   * @function goHome
   */
  goHome(): void {
    this.router.navigate(['movies'])
  }

  /**
   * Navigates to user profile page.
   * @function goToProfile
   */
  goToProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * Logs out the user.
   * @function logout
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
