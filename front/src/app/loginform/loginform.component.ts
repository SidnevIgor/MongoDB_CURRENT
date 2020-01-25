import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent{
  constructor(private service: PostService){}
  url = "http://localhost:3000/api/auth";
  form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ])
  });
  enterUser(email:HTMLInputElement, password:HTMLInputElement){
    let user = {
      "email": email.value,
      "password": password.value
    };
    this.service.addPost(user,this.url)
    .subscribe((responce)=>{
      console.log(responce);
    });
  }
}
