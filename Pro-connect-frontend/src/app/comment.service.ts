import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppControllerService } from './app-controller.service';
import { CommentsModel } from './models/commentModel';
import { ProfileServiceService } from './profile-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private profileService: ProfileServiceService,private http: HttpClient, private appControllerService: AppControllerService) { }

  listOfComments: CommentsModel[] = [];
  isListOfCommentsFetched = false;


  getListOfComments(id: any) {
    this.http.get(`${environment.LARAVEL_URL}/api/post/listOfComments/?post_id=${id}`).subscribe((res: any) => {
      this.listOfComments = res;
      this.isListOfCommentsFetched = true;
      console.log(this.listOfComments[0])
    })
  }

  addAComment(post_id: any, comment:any) {
    this.http.post(`${environment.LARAVEL_URL}/api/post/addComment`, { "post_id": post_id, "username": this.appControllerService.CurrentUser['firstname'], "comment" : comment, "user_picture":  this.profileService.profileData['photo_path']}).subscribe((res:any)=>{
      if(res) {
        this.listOfComments.unshift(res);
      }
    })
  }


}
