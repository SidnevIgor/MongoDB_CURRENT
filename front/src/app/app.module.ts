//Standard libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';
//Components
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { LoginformComponent } from './loginform/loginform.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { LeftbarComponent } from './leftbar/leftbar.component';

//Services
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    LoginformComponent,
    PostsComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    CategoryComponent,
    LeftbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path:'selection', component: CategoryComponent, canActivate: [AuthGuard]},
      {path: 'register', component: ContactFormComponent},
      {path: 'login', component: LoginformComponent},
      {path:'**', component: NotFoundComponent}
    ])
  ],
  providers: [PostService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
