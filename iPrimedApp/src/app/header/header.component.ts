import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/sign-up/sign-up.component';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLog: boolean = false;
  signInDialoge: boolean;
  signUpDialoge: boolean;

  @ViewChild('SignInComponent')
  private SignInComponent: SignInComponent;
  @ViewChild('SignUpComponent')
  private SignUpComponent: SignUpComponent;

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    this.api.headerData.subscribe((data) => {
      if (data.data.token != undefined && data.data.token != '') {
        this.signInDialoge = false;
        this.isLog = true;
      } else {
        this.signUpDialoge = false;
      }
    })
  }

  public signInPopup() {
    this.signInDialoge = true;
    this.isLog = false;

  }
  public signUpPopup() {
    this.signUpDialoge = true;
    this.isLog = false;

  }
}
