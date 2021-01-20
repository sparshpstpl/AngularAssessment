import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submited:boolean;
  processing:boolean;
  loginForm:FormGroup;
  loginErr='';
  
  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }

  submit()
  {
    this.processing= true;
    this.submited = true;
    this.loginErr='';
    if(!this.loginForm.valid)
    {
      this.processing =false;
      this.loginForm.markAllAsTouched();
      return false;
    }

    this.auth.signIn(this.loginForm.value).subscribe((res:any)=>{
      this.processing =false;
      if(res)
      {
        this.router.navigate(['/']);
      }
    },(error)=>{
      this.processing =false;
      this.loginErr = error.error?.error;
      console.log(' loginErr',this.loginErr)
    })
 
  }

  get getControls() {
    return this.loginForm.controls;
  }
}
