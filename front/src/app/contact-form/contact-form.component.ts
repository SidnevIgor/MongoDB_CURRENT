import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

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
    console.log(isAdmin);
    this.service.addPost(newItem, this.url)
    .subscribe(responce=>{
      console.log(responce.json());
    });
  }
}
