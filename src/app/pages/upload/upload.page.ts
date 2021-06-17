import {Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import {ActionSheetController, ToastController, Platform, LoadingController, ModalController} from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  images = [];
  currImage;
  assetForm: FormGroup;
  submitAttempt = false;
  postData;
  @Input() item; // : { Id: number, Title: string; Description: string; Images: string};

  constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
              private actionSheetController: ActionSheetController, private toastController: ToastController,
              private storage: Storage, private plt: Platform, private loadingController: LoadingController,
              private modalCtrl: ModalController, private ref: ChangeDetectorRef, private apiCall: DataService,
              private filePath: FilePath, private formBuilder: FormBuilder) {
    console.log('in construct');
  }

  ngOnInit() {
    console.log('in init');
    this.item = (this.item == null) ? {Id: 0, Title: '', Description: '', Images: '', ExpiryDate: ''} : this.item;
    console.log(this.item);
    this.assetForm = this.formBuilder.group({
      Title: new FormControl(this.item.Title, Validators.compose([Validators.maxLength(30), Validators.required])),
      Description: new FormControl(this.item.Description, Validators.compose([Validators.required])),
      Images: new FormControl(this.item.Images, Validators.compose([Validators.maxLength(200)])),
      ExpiryDate: new FormControl(this.item.ExpiryDate, Validators.compose([Validators.required])),
      Id: new FormControl(this.item.Id, Validators.compose([Validators.maxLength(5)]))
    });

    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }

  IonViewDidLeave(){
    console.log('leaving');
    this.storage.remove('STORAGE_KEY');
  }
  dbSave() {
    this.submitAttempt = true;

    if (!this.assetForm.valid) {
      console.log('INVALID GIVE AWAY FORM!');
      console.log(this.assetForm.value);
    } else {
      console.log('success!');
      console.log(this.assetForm.value);
      this.postData = this.assetForm.value;
    }
  }

  dismiss() {
    console.log('in dismiss');
    this.storage.remove('STORAGE_KEY');
    this.modalCtrl.dismiss({
      dismissed: true,
      item: this.postData
    });
  }

  loadStoredImages() {
    console.log('in loadStoredImages');
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        const arr = JSON.parse(images);
        this.images = [];
        this.currImage = {};
        for (const img of arr) {
          console.log(img);
          if ('' !== img){
            const fPath = this.file.dataDirectory + img;
            const resPath = this.pathForImage(fPath);
            this.images.push({ name: img, path: resPath, filePath: fPath });
            this.currImage =  {name: img, path: resPath, filePath: fPath };
          }

        }
      }
    });
  }

  pathForImage(img) {
    console.log('in pathForImage');
    const converted = this.webview.convertFileSrc( img );
    return (img === null) ? '' : converted.replace('ionic://localhost', '');
  }

  async presentToast(text) {
    console.log('in presentToast');
    const toast = await this.toastController.create({
      message: text,
      position: 'middle',
      duration: 3000
    });
    toast.present();
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
    const newFileName = n + '.jpg';
    return newFileName;
  }

  deleteImage(imgEntry, position) {
    console.log('in deleteImage');
    this.currImage = {};
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      const arr = JSON.parse(images);
      const filtered = arr.filter(name => name !== imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      const correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File removed.');
      });
    });
  }

  startUpload(imgEntry) {
    console.log(typeof this.currImage);
    this.submitAttempt = true;
    if (typeof this.currImage === 'undefined'){
      console.log('INVALID GIVE AWAY FORM!');
      this.presentToast('Please upload a picture');
    }else if (!this.assetForm.valid || (Object.keys(this.currImage).length < 1)) {
      console.log(this.currImage);
      console.log('INVALID GIVE AWAY FORM!');
      this.presentToast('Please enter all required information and upload a picture');
    }else{
      console.log(this.currImage);
      this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
          .then(entry => {
            ( entry as FileEntry).file(file => this.readFile(file));
          })
          .catch(err => {
            this.presentToast('Error while reading file.');
          });
    }
  }

  readFile(file: any) {
    console.log('in readFile');
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      console.log(file.name);
      Object.entries(this.assetForm.value).forEach(([key, value]) => {
        console.log(key, value);
        formData.append(key, '' + value);
      });

      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    console.log('in uploadImageData');
    const loading = await this.loadingController.create({
      message: 'Uploading image...',
    });
    await loading.present();
    this.storage.get('USER_ID').then(id => {
      formData.append('UserId', id);
      this.apiCall.sendData('upload/giveaway/Images' , formData, true).subscribe(
          data => {
            console.log(data);
            loading.dismiss();
            const msg = (data.status) ? 'Give away item successfully updated' : 'There was a problem with your submission';
            if (data.status) { this.postData = data.info; }
            this.presentToast(msg).then(() => {
              this.dismiss();
            });
          },
          err => this.presentToast('There was an error with your submission: ' + err),
          () => console.log('Give away item submission Completed')
      );

    });

    /*this.http.post('https://rccgnappf.org/upload/Giveaway/Images', formData)
        .pipe(
            finalize(() => {
              loading.dismiss();
            })
        )
        .subscribe(res => {
          res ? this.presentToast('Give Away Item creation successful.'):
            this.presentToast('Give Away Item creation failed');
          }
        });*/

  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log('in copyFileToLocalDir');
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
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

      const fPath = this.file.dataDirectory + fname;
      const resPath = this.pathForImage(fPath);

      this.currImage = {
        name: fname,
        path: resPath,
        filePath: fPath
      };

      this.images = [this.currImage];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
}
