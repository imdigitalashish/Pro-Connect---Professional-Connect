import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppControllerService } from '../app-controller.service';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public profileService: ProfileServiceService,public _appController: AppControllerService, private router: Router) {
    this._appController.checkWheatherUserIsActive();

   }

  ngOnInit(): void {
  }
  logout() {
    this._appController.userLoggedIn = false
    this.router.navigateByUrl("");
  }
}
