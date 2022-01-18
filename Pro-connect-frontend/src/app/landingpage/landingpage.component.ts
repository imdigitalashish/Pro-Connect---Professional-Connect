import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppControllerService } from '../app-controller.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(public appController: AppControllerService, private route: Router) { }

  ngOnInit(): void {
    if (this.appController.userLoggedIn == true) {
      this.route.navigate(["main"])
    }

  }

  gotoRegisterPage(email:any, firstName:any, lastName:any) {
    console.log(email.value);
    this.appController.registerPage.email = email.value;
    this.appController.registerPage.firstName = firstName.value;
    this.appController.registerPage.lastName = lastName.value;
    this.route.navigate(["register"]);
  }

}
