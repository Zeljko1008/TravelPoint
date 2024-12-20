import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  isLoading = false;
  isLogin = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl:  LoadingController

  ) { }

  ngOnInit() {
    console.log('auth page');
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging in...'})
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      },1500);
    });


  }
  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }


  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if(this.isLogin){
      //send request to login servers
    }
    else{
      //send request to signup servers
    }
  }

  onLogout(){
    this.authService.logout();
  }

}
