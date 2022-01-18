import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppControllerService } from './app-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profront';
  constructor(private appController: AppControllerService, private http: HttpClient) {
    // this.appController.getListOfPosts();
    this.appController.checkWheatherUserIsActive();
    this.http.get("http://localhost:8080/api").subscribe((res:any)=>{
      console.log(res);
    })
  }


}
