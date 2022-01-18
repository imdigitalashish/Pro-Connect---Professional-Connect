import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppControllerService } from 'src/app/app-controller.service';
import { CommentService } from 'src/app/comment.service';
import { ProfileServiceService } from 'src/app/profile-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() commentInput:any;

  constructor(public appController: AppControllerService,public profileService: ProfileServiceService,public commentService: CommentService, private diagRef: MatDialogRef<CommentsComponent>, @Inject(MAT_DIALOG_DATA) public data: {"post_id": any}) { 
      console.log(data.post_id);
      this.appController.checkWheatherUserIsActive();

  }

  ngOnInit(): void {
    this.commentService.getListOfComments(this.data.post_id);
  }

  closeDialog() {
    this.diagRef.close();
  }

  addACommentToPosts() {
    console.log("EF");
    this.commentService.addAComment(this.data.post_id, this.commentInput);
    this.commentInput = "";
  }

  

}
