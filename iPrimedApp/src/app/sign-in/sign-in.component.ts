import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { requiredTrim } from "src/app/validators";



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userlogin: FormGroup;
  

  constructor(

private router: Router, private api: ApiService,
private formBuilder: FormBuilder, private toaster: ToastrService,  ) {

    this.userlogin = formBuilder.group({
      email: ['', [requiredTrim]],
      password: ['', [requiredTrim]]
  });
   }

  ngOnInit() {
  }
  login() {
    this.api.login(this.userlogin.value).subscribe((res: any) => {
        if (res.code == 200) {
          this.toaster.success(res.message);
          this.api.headerData.emit(res);
        }else{
          this.toaster.error(res.message);
        }
       
    });
}

}


  