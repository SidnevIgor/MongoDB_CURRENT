//Basic libraries
import { Component } from '@angular/core';
//POST service
import { PostService } from '../services/post.service';
//Error services
import {AppError} from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent{
  constructor(private service: PostService){ }
  url = "http://localhost:3000/api/users";
  addUser(name:HTMLInputElement, email:HTMLInputElement, password:HTMLInputElement, isAdmin:boolean){
    let newItem = {
      "name": name.value,
      "email": email.value,
      "password": password.value,
      "isAdmin": isAdmin
    };
    this.service.addPost(newItem, this.url)
    .subscribe(responce=>{
      console.log(responce.json());
    },(error:AppError)=>{
      if(error instanceof NotFoundError) alert('404 Not Found error');
      else{
        if(error instanceof BadRequestError) alert('400 Bad Request Error');
        else{
          alert('Some error occured');
        }
      }
    });
  }
}
