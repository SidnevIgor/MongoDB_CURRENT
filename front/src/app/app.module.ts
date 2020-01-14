//Standard libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http'
//Components
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { LoginformComponent } from './loginform/loginform.component';
import { PostsComponent } from './posts/posts.component';
//Services
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    LoginformComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
