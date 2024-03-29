import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//POST service
import { PostService } from '../services/post.service';
//services
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent{
  constructor(private service: PostService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute){}
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
      this.auth.logIn(responce);
      this.errorMessage = null;
      //let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate(['/']);
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
