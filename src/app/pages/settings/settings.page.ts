import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {AuthService} from '../../auth/auth.service';
import {ActionSheetController, LoadingController, ModalController, Platform, ToastController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {HttpClient} from '@angular/common/http';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  profileForm: FormGroup;
  submitAttempt = false;
  postData = new FormData();
  Picture;
  images = [];
  currImage;
  constructor(private formBuilder: FormBuilder, private storage: Storage, private apiCall: AuthService,
              private toastCtrl: ToastController, private datacall: DataService, private camera: Camera,
              private dFile: File, private http: HttpClient, private webview: WebView,
              private actionSheetController: ActionSheetController, private toastController: ToastController,
              private plt: Platform, private loadingController: LoadingController,
              private modalCtrl: ModalController, private ref: ChangeDetectorRef, private dataCall: DataService,
              private filePath: FilePath, private sanitizer: DomSanitizer) { }



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

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  getImage(url) {
   /* const a = document.createElement('a');
    a.href = url;
    console.log(url, a.host);
    console.log(window.location.host);*/
    console.log(url, url.length);
    return (url.length > 5) ? url : 'assets/img/rccg_logo.png';
  }

  isURL(str){
    try {
      const a = new URL(str);
    } catch (_) {
      return false;
    }
    return true;
  }

  async selectImage() {
    console.log('in selectImage');
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    console.log('in takePicture');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

  createFileName() {
    console.log('in createFileName');
    const d = new Date();
    const n = d.getTime();
    return n + '.jpg';
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log('in copyFileToLocalDir');
    this.dFile.copyFile(namePath, currentName, this.dFile.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  updateStoredImages(fname) {
    console.log('in updateStoredImages');
    this.storage.get(STORAGE_KEY).then(images => {
      // const arr = JSON.parse(images);
      const newImages = [name];
      this.storage.set(STORAGE_KEY, JSON.stringify(newImages));

      const fPath = this.dFile.dataDirectory + fname;
      const resPath =  this.pathForImage(fPath);
      console.log('fPath');
      this.currImage = {
        name: fname,
        path: resPath,
        filePath: fPath
      };

      this.images = [this.currImage];
      this.Picture = this.currImage.path;
      this.ref.detectChanges(); // trigger change detection cycle
      if (typeof this.currImage !== 'undefined'){
        if (Object.keys(this.currImage).length > 1){
          console.log('Going to resolve file');
          this.dFile.resolveLocalFilesystemUrl(this.currImage.filePath)
              .then(entry => {
                ( entry as FileEntry).file(file => {
                  const reader = new FileReader();
                  console.log('File reading started');
                  reader.onload = () => {
                    const imgBlob = new Blob([reader.result], {
                      type: file.type
                    });
                    console.log('File reading completed');
                    this.postData.append('file', imgBlob, file.name);
                    console.log('Appending file');
                  };
                  reader.readAsArrayBuffer(file);
                });
              })
              .catch(err => {
                this.presentToast('Error while reading file.');
              });
        }
      }
    });
  }

  pathForImage(img) {
    const converted = this.webview.convertFileSrc( img );
    return (img === null) ? '' : converted.replace('ionic://localhost', '');
  }

  update(imgEntry){
    console.log(this.profileForm.value);
    console.log('Save Picture started');
    this.submitAttempt = true;
    if (!this.profileForm.valid) {
      console.log('INVALID PROFILE FORM!');
      if (this.profileForm.errors.passwordNotMatch){this.presentToast('Password does not match, please try again'); }
    } else {
      console.log('success!');
      console.log(this.currImage);
      Object.entries(this.profileForm.value).forEach(([key, value]) => {
        console.log(key, value);
        this.postData.append(key, '' + value);
      });

      this.uploadImageData(this.postData);

    }
  }

  async uploadImageData(formData: FormData) {
    console.log('in uploadImageData');
    console.log(formData);
    this.datacall.sendData('upload/users/Picture?XDEBUG_SESSION_START=PHPSTORM', this.postData, true).subscribe(
        data => {
          console.log(data);
          let msg = (data.status) ? 'Profile successfully updated' : 'There was a problem with your submission';
          if (data.error_msg) { msg = data.error_msg; }
          this.presentToast(msg);

        },
        err => {
          console.log(err);
          this.presentToast('There was an error with your Profile update submission' );
        },
        () => console.log('Profile update submission Completed')
    );
  }

  dismiss() {
    console.log('in dismiss');
    this.storage.remove('STORAGE_KEY');
    this.modalCtrl.dismiss({
      dismissed: true,
      item: this.postData
    });
  }

  ngOnInit() {
    this.storage.get('USER_ID').then((id) => {
      console.log(id);
      this.apiCall.load('/pluck/users/' + id).subscribe((data) => {
        console.log(data.info);
        this.Picture = data.info.Picture;
        this.profileForm = this.formBuilder.group({
          FirstName: new FormControl(data.info.FirstName, Validators.compose([Validators.maxLength(30),
            Validators.pattern('[a-zA-Z ]*'), Validators.required])),
          LastName: new FormControl(data.info.LastName, Validators.compose([Validators.maxLength(30),
            Validators.pattern('[a-zA-Z ]*'), Validators.required])),
          Email: new FormControl(data.info.Email,  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])),
          Phone: new FormControl(data.info.Phone, Validators.compose([Validators.required])),
          Password: new FormControl(data.info.Password, Validators.compose([Validators.minLength(5), Validators.maxLength(50)])),
          ConfirmPassword: new FormControl(data.info.Password, Validators.compose([Validators.minLength(5), Validators.maxLength(50)])),
          Dob: new FormControl(data.info.Dob,  Validators.compose([Validators.maxLength(30)])),
          Wedding: new FormControl(data.info.Wedding, Validators.compose([Validators.maxLength(30)])),
          Address: new FormControl(data.info.Address, Validators.compose([ Validators.maxLength(300),
            Validators.required])),
          City: new FormControl(data.info.City, Validators.compose([Validators.maxLength(30),
            Validators.pattern('[a-zA-Z ]*'), Validators.required])),
          State: new FormControl(data.info.State, Validators.compose([Validators.maxLength(100), Validators.required])),
          Region: new FormControl(data.info.Region, Validators.compose([Validators.maxLength(100)])),
          Parish: new FormControl(data.info.Parish, Validators.compose([Validators.maxLength(200)])),
          Id: new FormControl(data.info.Id, Validators.compose([Validators.maxLength(5)]))
        }, {validators: this.password.bind(this)
        });
      });
    });

  }

}
