import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { AppControllerService } from './app-controller.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {


  isProfilefetched = false;
  profileData: any
  // isProfilefetched = true
  // profileData:any = {
  //   activate: 1,
  //   country: "Angola",
  //   created_at: "2021-12-24T06:51:04.000000Z",
  //   dob: "2021-12-16",
  //   email: "imdigitalashish@gmail.com",
  //   firstname: "Ashish Kumar",
  //   id: 1,
  //   lastname: "Verma",
  //   mobile: "9920193246",
  //   password: "$2y$10$v8L3O5FbuKrYBOJFb1IkxupEAZ3tlqki0toXSXlbuqH4Pc6cCbMzi",
  //   remember_token: "3i1y9RhtIqhe",
  //   updated_at: "2021-12-24T10:27:04.000000Z",
  // }

  constructor(private http: HttpClient, private appController: AppControllerService, public errorService: ErrorService) { }


  // getProfileData() {
    // this.http.get("http://localhost:8000/api/accounts/getprofile?user_id=" + this.appController.CurrentUser["id"]).subscribe(res => {
    //   console.log(res);
    //   this.isProfilefetched = true;
    //   this.profileData = res;
    //   return true;

    // });
    
  // }
  getProfileData() {
   return this.http.get("http://localhost:8000/api/accounts/getprofile?user_id=" + this.appController.CurrentUser["id"]).pipe(retry(3), catchError(this.errorService.handleError));

  }
}
