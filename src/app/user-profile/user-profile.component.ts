import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public fullName:string;
  public responseData:any;
  public userForm: FormGroup;
  constructor(private appService:AppService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.fullName = JSON.parse(localStorage.getItem('userDetails')).fullname;
    this.initializeForm();
    this.fetchUser();
  }

 public fetchUser(){
   const req = {
      userId: JSON.parse(localStorage.getItem('userDetails')).user_id
   }
   this.spinner.show();
   this.appService.fetchUser(req).subscribe(res => {
       this.spinner.hide();
       if(res['statusText'] === 'OK' && res['statusCode'] === 200){
           this.responseData = res;
           this.userForm.patchValue(res['userDetails'][0]);
           this.fullName = res['userDetails'][0].fullname;
           localStorage.setItem('userDetails',JSON.stringify(res['userDetails'][0]));  
       }
       
   }, error=> {
       this.spinner.hide();
       this.appService.showNotification('top','right', error.error.err.detail ,'danger');
   });
}

 public initializeForm(){
   this.userForm = new FormGroup({
      user_id: new FormControl(0),
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      created_on : new FormControl(new Date()),
      firstname : new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      fullname : new FormControl(''),
      mobile : new FormControl('',[Validators.required]),
    });

    this.userForm.get('user_id').disable();
    this.userForm.get('fullname').disable();
    // this.userForm.get('username').disable();

    this.userForm.get('firstname').valueChanges.subscribe(data => {
        this.userForm.get('fullname').setValue(this.userForm.get('firstname').value + ' ' + this.userForm.get('lastname').value);
    });
     this.userForm.get('lastname').valueChanges.subscribe(data => {
        this.userForm.get('fullname').setValue(this.userForm.get('firstname').value + ' ' + this.userForm.get('lastname').value);
    });
 } 

 public updateUser(){
   //this.userForm.value.username = this.responseData.userDetails[0].username;
   this.userForm.value.fullname = this.userForm.get('fullname').value;
   const req = {
     user_id:this.responseData.userDetails[0].user_id,
     section : "revise",
     userDetails : this.userForm.value
   };
   console.log(req);
   this.spinner.show();
   this.appService.submitUser(req).subscribe(res => {
     this.spinner.hide();
     console.log(res);
     if(res.statusCode === 200 && res.statusText === 'OK'){
        this.appService.showNotification('top','right', res.responseMessage ,'success');
        //this.router.navigate(['/login']);
        // localStorage.setItem('name',this.signupForm.value.userName);
        this.fetchUser();
     }
   }, error=> {
       this.spinner.hide();
       this.appService.showNotification('top','right', error.error.err.detail ,'danger');
   });
 }

}
