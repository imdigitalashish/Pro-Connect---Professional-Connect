import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppControllerService } from 'src/app/app-controller.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileServiceService } from 'src/app/profile-service.service';
import { LogService } from 'src/shared/log.service';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  constructor(private commentModal: MatDialog,public profileController: ProfileServiceService,public dialogBox: MatDialog, private logService: LogService, private errorService: ErrorService, public appController: AppControllerService, private router: Router, private http: HttpClient) {
    this.appController.checkWheatherUserIsActive();

   }

  files: any[] = [];

  ngOnInit(): void {
    this.appController.getListOfPosts();

    console.log(this.appController.userLoggedIn);
    console.log(this.appController.CurrentUser);

    // if(this.appController.userLoggedIn!=true) {
      // this.router.navigate([""]);
    // }
  }

  @Input() postText: any;

  addFileToFileList(event: any) {
    this.files = event.target.files;
  }

  deletePost(id: any, index: number) {
    this.http.post("http://localhost:8000/api/accounts/deletePost", { "id": id }).subscribe((res: any) => {
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

  updateLike(likeId: any, index: any) {
    this.http.post("http://localhost:8000/api/updateLikes", { "id": likeId }).subscribe(res => {
      if (res) {
        this.appController.data[index]["likes"] = this.appController.data[index]["likes"] + 1;

      } else {
        alert("something went wrong");
      }
    })
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    // console.log(window.innerHeight, window.scrollY, document.body.scrollHeight)
    // if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    //   this.logService.logData("BOTTOM");
    // }

    if (document.documentElement.scrollTop + document.documentElement.offsetHeight >= document.documentElement.scrollHeight) {
      this.logService.logData("REACHED BUDDY");
      // console.log(this.appController.listOfPosts["current_page"]);
      console.log(this.appController.listOfPosts["next_page_url"]);
      if(this.appController.listOfPosts['next_page_url']!=null) {
        this.appController.listOfPostUrl = this.appController.listOfPosts["next_page_url"];
        this.appController.getListOfPosts();
      } else {
        this.appController.showSuccessMessage("You have reached the end", "OK");
      }
 
      
    }
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


  openCommentModal(id:any) {
    this.commentModal.open(CommentsComponent, {data: {"post_id": id}});
  }




}
