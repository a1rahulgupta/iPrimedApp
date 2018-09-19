import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { requiredTrim } from "src/app/validators";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userSignUp: FormGroup;

  constructor(

    private router: Router, private api: ApiService, private formBuilder: FormBuilder, private toaster: ToastrService, ) {

    this.userSignUp = formBuilder.group({
      firstName: ['', [requiredTrim]],
      lastName: ['', [requiredTrim]],
      email: ['', [requiredTrim]],
      password: ['', [requiredTrim]]
    });
  }

  ngOnInit() {
  }
  signUp() {
    this.api.signUp(this.userSignUp.value).subscribe((res: any) => {
      if (res.code == 200) {
        this.toaster.success(res.message);
        this.api.headerData.emit(res);
      }else{
        this.toaster.error(res.message);
      }

    });
  }

}
