import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileServiceService } from 'src/app/profile-service.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css']
})
export class EditProfileModalComponent implements OnInit {

  constructor(public profileController: ProfileServiceService, private http: HttpClient, private dialogueReference: MatDialogRef<EditProfileModalComponent>) { }
  @Input() firstname: any;
  @Input() lastname: any;
  @Input() email: any;
  @Input() mobile: any;
  @Input() dob: any;
  @Input() country: any;
  @Input() tagline:any;
  uploadPhotos: any[] = [];
  updateUIofProfile() {
    this.profileController.getProfileData().subscribe((res: any) => {
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

  addFileToProfileList(event: any) {
    this.uploadPhotos = event.target.files;
    console.log(this.uploadPhotos);
  }

  ngOnInit(): void {
    this.updateUIofProfile();
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
                this.dialogueReference.close()
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
            this.dialogueReference.close()

          })
        }
      })

    }
  }

}
