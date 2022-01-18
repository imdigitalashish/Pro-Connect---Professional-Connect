import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppControllerService } from 'src/app/app-controller.service';
import { ProfileServiceService } from 'src/app/profile-service.service';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.css']
})
export class AddEducationModalComponent implements OnInit {

  constructor(private appController: AppControllerService, private http: HttpClient, public profileController: ProfileServiceService, public diagRef: MatDialogRef<AddEducationModalComponent>) { }

  @Input() college: any;
  @Input() degree: any;
  @Input() special: any;
  @Input() start_date: any;
  @Input() end_date: any;

  ngOnInit(): void {
  }

  addEducationHistory() {
    this.http.post("http://localhost:8000/api/accounts/addEducation",
      {
        "user_id": this.profileController.profileData["id"],
        "college_name": this.college,
        "degree": this.degree,
        "specialization": this.special,
        "start_date": this.start_date,
        "end_date": this.end_date

      }).subscribe((res: any) => {
        if (res) {
          this.profileController.getProfileData().subscribe((res:any)=>{
            this.profileController.profileData = res;
            this.diagRef.close();
            this.appController.showSuccessMessage("Education History Added", "");
          })
        } else {
          this.appController.showErrorMessage("Something Went Wrong", "");
        }
      })
  }

}
