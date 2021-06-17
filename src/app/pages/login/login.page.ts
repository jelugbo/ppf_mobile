import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../auth/auth.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitAttempt = false;

  constructor(private apiCall: DataService , private toastCtrl: ToastController,
              private authCall: AuthService , public formBuilder: FormBuilder, private router: Router) { }

  login(){
    this.submitAttempt = true;
    if (!this.loginForm.valid){
      console.log('INVALID PRAYER FORM!');
    }else {
      console.log(this.loginForm.value);
      const postData = this.loginForm.value;
      this.authCall.login(postData).subscribe(
          data => {
            console.log(data);
            if (data.status){
              this.presentToast( 'Login Successful').then(() => {
                this.router.navigateByUrl('/menu/tabs');
              });
            }else{
              this.presentToast('There was a problem logging you in ');
            }
          },
          err => this.presentToast('There was an error with your log on request ' + err),
          () => console.log('User login Completed')
      );
    }
  }

  async presentToast(msg) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed');
    });
  }

  ngOnInit() {
    this.authCall.logout();
    this.loginForm = this.formBuilder.group({
      Password: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.required])),
      Email: new FormControl('', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required]))
    });
  }

}

