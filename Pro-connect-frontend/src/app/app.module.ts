import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HttpClientModule } from "@angular/common/http";
import { CreatePostComponent, MainsiteComponent } from './mainsite/mainsite.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListPostsComponent } from './admin/list-posts/list-posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import { LogService } from 'src/shared/log.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";

import {MatPaginatorModule} from "@angular/material/paginator";
import { PostsComponent } from './mainsite/posts/posts.component';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './mainsite/posts/comments/comments.component';
import { EditProfileModalComponent } from './profile/edit-profile-modal/edit-profile-modal.component';
import { AddWorkModalComponent } from './profile/add-work-modal/add-work-modal.component';
import { AddEducationModalComponent } from './profile/add-education-modal/add-education-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    LandingpageComponent,
    MainsiteComponent,
    ProfileComponent,
    AdminComponent,
    ListUsersComponent,
    ListPostsComponent,
    CreatePostComponent,
    PostsComponent,
    CommentsComponent,
    EditProfileModalComponent,
    AddWorkModalComponent,
    AddEducationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],

  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
