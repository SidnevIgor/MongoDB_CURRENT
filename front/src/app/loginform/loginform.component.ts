import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//POST service
import { PostService } from '../services/post.service';
//error services
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent{
  constructor(private service: PostService){}
  errorMessage:string;
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
      localStorage.setItem('token', responce._body);
      this.errorMessage = null;
    },(error: AppError)=>{
      if(error instanceof BadRequestError) this.errorMessage = "Invalid Email or Password";
      else{
        if(error instanceof NotFoundError) alert('Not found error');
        else{
          alert('Some error has happened');
        }
      }
    });
  }
}
