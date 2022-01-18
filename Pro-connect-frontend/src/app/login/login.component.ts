import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppControllerService } from '../app-controller.service';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private profileService: ProfileServiceService,public appController: AppControllerService, private http: HttpClient, private router: Router) { }

  @Input() email: string = "";
  @Input() password: string = "";


  errorMessage = "";

  ngOnInit(): void {
  }

  toggleLogin() {
    if (this.email.trim()!="" && this.password.trim()!="") {
      this.http.post("http://localhost:8000/api/login", { "email": this.email, "password": this.password }).subscribe(
        (res:any) => {
          console.log(res);
          if (res==1) {
            this.appController.userLoggedIn = true;
            this.http.get("http://localhost:8000/api/getUser?email=" + this.email).subscribe(res => {
              this.appController.CurrentUser = res;
              this.profileService.getProfileData().subscribe((res: any) => {
                this.profileService.profileData = res;
                this.profileService.isProfilefetched = true;
         
                console.log(res);
              })         
              this.router.navigate([""]);
              this.appController.showSuccessMessage("You are successfully Logged in", "OK");
  
            })
          } else {
            this.appController.userLoggedIn = false;
            this.errorMessage = res["message"];
            this.appController.showErrorMessage(res["message"], "Dismiss")

          }
        }
      )
    } else {
      this.errorMessage = "Please fill all the fields";
      this.appController.showErrorMessage(this.errorMessage, "Dismiss");
    }
    
  }

}
