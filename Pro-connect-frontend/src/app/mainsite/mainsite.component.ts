import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs';
import { LogService } from 'src/shared/log.service';
import { AppControllerService } from '../app-controller.service';
import { ErrorService } from '../error.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileServiceService } from '../profile-service.service';
@Component({
  selector: 'app-mainsite',
  templateUrl: './mainsite.component.html',
  styleUrls: ['./mainsite.component.css']
})
export class MainsiteComponent implements OnInit {

  constructor(public profileController: ProfileServiceService,public dialogBox: MatDialog, private logService: LogService, private errorService: ErrorService, public appController: AppControllerService, private router: Router, private http: HttpClient) { 
    this.appController.checkWheatherUserIsActive();

  }

  files: any[] = [];

  ngOnInit(): void {
    this.appController.getListOfPosts();

    console.log(this.appController.userLoggedIn);
    console.log(this.appController.CurrentUser);

    if(this.appController.userLoggedIn!=true) {
      this.router.navigate([""]);
    }
  }

  @Input() postText: any;

  addFileToFileList(event: any) {
    this.files = event.target.files;
  }

  deletePost(id: any, index: number) {
    this.http.post("http://localhost:8000/api/accounts/deletePost", { "id": id }).pipe(retry(3), catchError(this.errorService.handleError)).subscribe((res: any) => {
      if (res == 1) {
        // this.appController.getListOfPosts();
        console.log(index);
        this.appController.data.splice(index, 1);
      } else {
        alert("Something went wrong");
      }
    })
  }

  load() {
    console.log(this.files);
    let file: File = this.files[0];
    let formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("user_id", this.appController.CurrentUser["id"]);
      formData.append("username", this.appController.CurrentUser["firstname"]);
      formData.append("text", this.postText);
      formData.append("file", this.files[i], this.files[i].name);
      this.http.post("http://localhost:8000/api/createpost", formData).subscribe(res => {
        if (res) {
          this.appController.getListOfPosts();
        }
      });
    }

  }

  changeTheListOfPost(newUrl: any) {
    this.appController.listOfPostUrl = newUrl;
    this.appController.getListOfPosts();
  }

  updateLike(likeId: string, index: any) {
    this.http.post("http://localhost:8000/api/updateLikes", { "id": likeId }).subscribe(res => {
      if (res) {
        console.log(this.appController.listOfPosts['data'][index]['likes']);
        this.appController.data[index]["likes"] = this.appController.data[index]["likes"] + 1;

      } else {
        alert("something went wrong");
      }
    })
  }


  @HostListener("click")
  nClick() {
    console.log("hello");
  }

  notANumber(number: any) {
    if (isNaN(number)) {
      return true;
    } else {
      return false;
    }
  }

  openDialog() {
    this.dialogBox.open(CreatePostComponent);
  }


}


@Component({
  selector: "popup-create-post",
  templateUrl: "./create-post.component.html",
})
export class CreatePostComponent {
  @Input() postText: any;

  constructor(private matDialogueRef: MatDialogRef<CreatePostComponent>, private logService: LogService, private errorService: ErrorService, public appController: AppControllerService, private router: Router, private http: HttpClient) {
    this.appController.checkWheatherUserIsActive();

  }


  files: any = [];

  addFileToFileList(event: any) {
    this.files = event.target.files;
  }


  load() {
    console.log(this.files);
    let file: File = this.files[0];
    let formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("user_id", this.appController.CurrentUser["id"]);
      formData.append("username", this.appController.CurrentUser["firstname"]);
      formData.append("text", this.postText);
      formData.append("file", this.files[i], this.files[i].name);
      // let jsonArrayToPush = {"active": 1, id: ""}
      this.http.post("http://localhost:8000/api/createpost", formData).subscribe(res => {
        if (res) {
          this.appController.data = [];
          this.appController.getListOfPosts();
          this.appController.showSuccessMessage("Post Added", "");
          this.matDialogueRef.close();

        } else {
          this.appController.showErrorMessage("Post Added", "");
          this.matDialogueRef.close();

        }
      });
    }

  }
}