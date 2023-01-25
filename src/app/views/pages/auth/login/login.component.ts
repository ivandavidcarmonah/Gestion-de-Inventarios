import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthInterface } from 'src/app/interfaces/auth-class';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public login: AuthInterface;
  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService) { 
    this.formGroup = this.formBuilder.group({
      emailOrUserName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
     const { emailOrUserName, password} = this.formGroup.value;
     this.authService.login(emailOrUserName, password)
      .subscribe(res => {
        localStorage.setItem('isLoggedin', 'true');
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate(['dashboard']);
        }
      });
     
   
  }

}
