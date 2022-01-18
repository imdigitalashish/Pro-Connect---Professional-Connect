import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, last, ReplaySubject, takeUntil } from 'rxjs';
import { AppControllerService } from '../app-controller.service';
import { ProfileServiceService } from '../profile-service.service';
import { AddEducationModalComponent } from './add-education-modal/add-education-modal.component';
import { AddWorkModalComponent } from './add-work-modal/add-work-modal.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './newProfile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private editProfileModal: MatDialog,public appController: AppControllerService, public profileController: ProfileServiceService, private http: HttpClient) { 
    this.appController.checkWheatherUserIsActive();

  }
  
  workExperienceModelOpen = false;
  currentIndex = 0;
  educationModelOpen = false;



  @Input() firstname: any;
  @Input() lastname: any;
  @Input() email: any;
  @Input() mobile: any;
  @Input() dob: any;
  @Input() country: any;
  @Input() tagline:any;


  @Input() company_name: any;
  @Input() position: any;
  @Input() start_date: any;
  @Input() end_date: any = "";

  @Input() college: any;
  @Input() degree: any;
  @Input() special: any;


  uploadPhotos: any[] = [];


  addFileToProfileList(event: any) {
    this.uploadPhotos = event.target.files;
    console.log(this.uploadPhotos);
  }

  clearOutAllFields() {

    this.company_name = "";
    this.position = "";
    this.start_date = "";
    this.end_date = "";
    this.college = "";
    this.degree = "";
    this.special = "";
  }

  openEditProfileModal() {
    this.editProfileModal.open(EditProfileModalComponent);
  }

  openWorkModal() {
    this.editProfileModal.open(AddWorkModalComponent);
  }

  openEducationModal() {
    this.editProfileModal.open(AddEducationModalComponent);
  }

  updateUIofProfile() {
    this.profileController.getProfileData().pipe(takeUntil(this.destroyed$)).subscribe((res: any) => {
      this.profileController.profileData = res;
      this.profileController.isProfilefetched = true;
      this.firstname = res["firstname"];
      this.lastname = res["lastname"];
      this.email = res["email"];
      this.mobile = res["mobile"];
      this.dob = res["dob"];
      this.country = res["country"];
      this.tagline = res["tagline"];
      console.log(res);
    })
  }

  ngOnInit(): void {
    console.log(this.profileController.getProfileData());
    this.updateUIofProfile();

  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
    // throw new Error('Method not implemented.');
  }

  


  addWorkExperience() {
    this.http.post("http://localhost:8000/api/acounts/addWork", {
      "user_id": this.profileController.profileData['id'],
      "company_name": this.company_name,
      "position": this.position,
      "start_date": this.start_date,
      "end_date": this.end_date
    }).subscribe((res: any) => {
      if (res) {
        this.updateUIofProfile();
        this.workExperienceModelOpen = false;
        this.clearOutAllFields()
      } else {
        this.clearOutAllFields()
      }
    })

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
          this.updateUIofProfile();
          this.educationModelOpen = false;
          this.clearOutAllFields();
        } else {
          this.clearOutAllFields();
        }
      })
  }

  deleteWorkExperience(id: any) {
    this.http.post("http://localhost:8000/api/accounts/deleteWork", { "id": id }).subscribe((res: any) => {
      if (res) {
        this.updateUIofProfile();
      }
    })
  }


  deleteEducationHistory(id: any) {
    this.http.post("http://localhost:8000/api/accounts/deleteEducation", { "id": id }).subscribe((res: any) => {
      if (res) {
        this.updateUIofProfile();
      }
    })
  }

  updateProfile() {
    console.log(this.lastname);
    console.log(this.uploadPhotos);
    if (this.uploadPhotos.length != 0) {
      console.log("PROFILE PICTURE CHANGED");


      let file: File = this.uploadPhotos[0];
      let formData = new FormData();

      formData.append("id", this.profileController.profileData['id']);
      formData.append('profilePicture', this.uploadPhotos[0], this.uploadPhotos[0].name);

      this.http.post("http://localhost:8000/api/uploadProfilePicture", formData).subscribe((res: any) => {
        if (res == 1) {
          this.http.post("http://localhost:8000/api/updateProfile", {
            "id": this.profileController.profileData['id'],
            "firstname": this.firstname,
            "lastname": this.lastname,
            "country": this.country,
            "email": this.email,
            "mobile": this.mobile,
            "dob": this.dob,
            "tagline": this.tagline
          }).subscribe((res: any) => {
            if (res) {
              this.profileController.getProfileData().subscribe((res: any) => {
                this.profileController.profileData = res;
                this.profileController.isProfilefetched = true;
                this.firstname = res["firstname"];
                this.lastname = res["lastname"];
                this.email = res["email"];
                this.mobile = res["mobile"];
                this.dob = res["dob"];
                this.country = res["country"];
                console.log(res);
                this.currentIndex = 0;
              })
            }
          })
        } else {
          alert("SOMETHING WENT WRONG");
        }
      })



    } else {
      this.http.post("http://localhost:8000/api/updateProfile", {
        "id": this.profileController.profileData['id'],
        "firstname": this.firstname,
        "lastname": this.lastname,
        "country": this.country,
        "email": this.email,
        "mobile": this.mobile,
        "dob": this.dob,
        "tagline": this.tagline
      }).subscribe((res: any) => {
        if (res) {
          this.profileController.getProfileData().subscribe((res: any) => {
            this.profileController.profileData = res;
            this.profileController.isProfilefetched = true;
            this.firstname = res["firstname"];
            this.lastname = res["lastname"];
            this.email = res["email"];
            this.mobile = res["mobile"];
            this.dob = res["dob"];
            this.country = res["country"];
            console.log(res);
            this.currentIndex = 0;
          })
        }
      })

    }



  }

}
