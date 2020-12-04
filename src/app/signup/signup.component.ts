import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from './../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 public signupForm: FormGroup;
  constructor(private appService:AppService,private spinner:NgxSpinnerService,
  private router: Router,private activatedRoute: ActivatedRoute) {
    if(localStorage.getItem('userDetails')){
       this.router.navigate(['/welcome'],{ queryParams: { name: localStorage.getItem('name') }});
    } else {
       //localStorage.removeItem('name');
       localStorage.removeItem('userDetails');
    }
   }

  ngOnInit(): void {
    this.InitiateSignupForm();
  }

public InitiateSignupForm(){
  this.signupForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      passWord: new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      fullName : new FormControl(''),
      mobile : new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required])
    });
 }

 public validateEmailAndMobileNumber(type){
    if(type === 'email'){
       const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
       return re.test(String(this.signupForm.get('email').value).toLowerCase());
    } 

    if(type === 'mobile'){
       const re = /^([+]\d{2})?\d{10}$/;
       return re.test(String(this.signupForm.get('mobile').value));
    }
 }

 public submitUser(){
   console.log(this.signupForm.value);
   //alert("Sorry !\nPage creation is in progress!\n"+ this.validateEmailAndMobileNumber('email'));
   if(!this.validateEmailAndMobileNumber('email')){
      return;
   }
   if(!this.validateEmailAndMobileNumber('mobile')){
      return;
   }
   this.signupForm.value.fullName = this.signupForm.value.firstName + ' ' + this.signupForm.value.lastName;
   const req ={
       created_on : new Date(),
       section : "create",
       userDetails : this.signupForm.value
   };
   this.spinner.show();
   this.appService.submitUser(req).subscribe(res => {
     this.spinner.hide();
     console.log(res);
     if(res.statusCode === 200 && res.statusText === 'OK'){
        this.appService.showNotification('top','right', res.responseMessage ,'success');
        this.router.navigate(['/login']);
        // localStorage.setItem('name',this.signupForm.value.userName);
     }
   }, error=> {
       this.spinner.hide();
       this.appService.showNotification('top','right', error.error.err.detail ,'danger');
   });
 }
}
