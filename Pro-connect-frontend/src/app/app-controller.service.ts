import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, last, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { Post } from './models/postModel';

@Injectable({
  providedIn: 'root'
})
export class AppControllerService {

  fileServerUrl = "http://localhost:9090";

  errorMessage = "";

  registerPage = {
    email: "",
    firstName: "",
    lastName: "",
  }

  userLoggedIn: any;
  CurrentUser: any = {
    activate: 1,
    country: "Angola",
    created_at: "2021-12-24T06:51:04.000000Z",
    dob: "2021-12-16",
    email: "imdigitalashish@gmail.com",
    firstname: "Ashish Kumar",
    id: 1,
    lastname: "Verma",
    mobile: "9920193246",
    password: "$2y$10$v8L3O5FbuKrYBOJFb1IkxupEAZ3tlqki0toXSXlbuqH4Pc6cCbMzi",
    remember_token: "3i1y9RhtIqhe",
    updated_at: "2021-12-24T10:27:04.000000Z"
  };
  isListOfPostFetched = false;
  listOfPosts:any;

  data:Post[] = [];

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  listOfPostUrl = "http://localhost:8000/api/listOfPosts"

  getListOfPosts() {
    const headers = { 'content-type': 'application/json' }

    this.http.get(this.listOfPostUrl).pipe(retry(3), catchError(this.errorService.handleError)).subscribe(res => {
      this.listOfPosts = res;
      console.log(this.listOfPostUrl);
      // console.log(res);
      // console.log(this.listOfPosts[0]["media"]);
      this.isListOfPostFetched = true;
      this.addListToPost();
    });
  }

  checkWheatherUserIsActive() {
    if(this.userLoggedIn) {
      this.http.get(`${environment.LARAVEL_URL}/api/accounts/checkActive?id=${this.CurrentUser['id']}`).subscribe((res:any)=>{
        if(res["result"]!=1) {
          this.showErrorMessage("YOU ARE DEACTIVATED", "DON'T CRY");
          this.userLoggedIn = false;
          this.router.navigate(['']); 
        }
      })
    }
  
  }

  addListToPost() {
    let arr = [];
    // if(this.listOfPosts["data"])
    // this.data.push(...this.listOfPosts["data"]);
    // console.log(this.data);
    // console.log(this.listOfPosts["data"]);
    // console.log(this.data);
    // this.data.find((innerPost:any)=>{
    //   console.log(innerPost);
    // })

    // console.info(JSON.parse(`${this.listOfPosts["data"][0]}`));
    for(let i = 0;i < this.listOfPosts['data'].length;i++) {
      if (!this.data.find((innerPost:Post)=>innerPost.id === this.listOfPosts['data'][i].id)) {
        this.data.push(<Post>this.listOfPosts['data'][i]);
      }
    }
    console.log(this.data);
  }

  showSuccessMessage(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: "top", horizontalPosition: "right", duration: 2000, panelClass: ["successMessage"] })
  }

  showErrorMessage(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: "top", horizontalPosition: "right", duration: 2000, panelClass: ["errorMessage"] })
  }


}
