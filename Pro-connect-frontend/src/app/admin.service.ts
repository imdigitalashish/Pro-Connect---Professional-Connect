import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { AppControllerService } from './app-controller.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private errorService: ErrorService, private appController: AppControllerService) { }


  allUsers = [];
  listPosts = [];

  getAllUsers() {
    this.http.get("http://localhost:8000/api/admin/listUsers").pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res:any)=>{
      this.allUsers = res;
    })
  }

  getAllPosts() {
    this.http.get("http://localhost:8000/api/admin/listPost").pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res:any)=> {
      this.listPosts = res;
    })
  }

  activate_or_deactivate_account(type: string, id: any){
    if (type=='activate') {
      this.http.post("http://localhost:8000/api/admin/activate", {"id": id}).pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res)=>{
        if(res) {
          this.getAllUsers();
          this.appController.showSuccessMessage("User Activated", "Ok");
        }
      })
    } else if(type=="deactivate") {
      this.http.post("http://localhost:8000/api/admin/deactivate", {"id": id}).pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res)=>{
        if(res) {
          this.getAllUsers();
          this.appController.showErrorMessage("User Deactivated", "Ok");

        }
      })
    }
  }

  activate_or_deactivate_post(type:string, id:any) {
    if (type=="activate") {
      this.http.post("http://localhost:8000/api/admin/activatePost", {"id": id}).pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res)=> {
        if(res) {
          this.getAllPosts();
          this.appController.showSuccessMessage("Post Activated", "Ok");

        }
      })
    } else if (type=="deactivate") {
      this.http.post("http://localhost:8000/api/admin/deactivatePost", {"id": id}).pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res)=>{
        if(res) {
          this.getAllPosts();
          this.appController.showErrorMessage("Post Deactivated", "Ok");

        }
      })
    }
  }
 
}
