import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppControllerService } from 'src/app/app-controller.service';
import { ProfileServiceService } from 'src/app/profile-service.service';

@Component({
  selector: 'app-add-work-modal',
  templateUrl: './add-work-modal.component.html',
  styleUrls: ['./add-work-modal.component.css']
})
export class AddWorkModalComponent implements OnInit {

  constructor(public modal: MatDialogRef<AddWorkModalComponent>,private http: HttpClient, private profileController: ProfileServiceService, private appController: AppControllerService) { }

  @Input() company_name: any;
  @Input() position: any;
  @Input() start_date: any;
  @Input() end_date: any = "";
  ngOnInit(): void {
  }
  addWorkExperience() {
    this.http.post("http://localhost:8000/api/acounts/addWork", {
      "user_id": this.profileController.profileData['id'],
      "company_name": this.company_name,
      "position": this.position,
      "start_date": this.start_date,
      "end_date": this.end_date
    }).subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.appController.showSuccessMessage("Successfully Added", "");
        this.profileController.getProfileData().subscribe((res:any)=>{
          this.profileController.profileData = res;
          this.modal.close();
        });
      }
      else {
          this.appController.showErrorMessage("Something went wrong", "");
      }
    })

  }
}
