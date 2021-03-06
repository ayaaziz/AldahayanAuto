import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { ChatpagePage } from '../chatpage/chatpage';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
phone:AbstractControl;
data:FormGroup;
table:any=true
phonee:any
number:any
fixedtime:any
alldata:any=[]
car_number:AbstractControl
accestoken:any
  constructor(public mainservice:MainservicesProvider,public storage:Storage,public toastCtrl:ToastController,public Alert:AlertController,public formBuilder:FormBuilder,public mainsrvice:MainservicesProvider,public cent:CentralProvider,public ViewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.storage.get("phone").then(val=>{
      if(!(val==null))
      {
        this.phone.setValue(val)
      }
    })
    this.storage.get('number').then(val=>{
      if(!(val==null))
      {
        this.car_number.setValue(val)
      }
    })
    this.data = this.formBuilder.group({
      phone: ['',Validators.required,],
      car_number: ['',Validators.required,],
    })
    this.phone=this.data.controls['phone'];
    this.car_number=this.data.controls['car_number'];
  }


  LogInSuccessCallback(data)
  {
    
    console.log("lllllllllllllll"+JSON.stringify(this.alldata))
    this.storage.set("phone",this.phone.value)
    this.storage.set("number",this.car_number.value)

    if(data.length==0)
    {
 this.presentoast1()
    }
   else if (data.status==false)
   {
     this.presentoast()
   }
else{
  this.alldata=data
}
  }
  LogInFailuerCallback(data)
  {
this.presentToast()
  }
  confirm()
  {

    let num=this.phone.value + ""
    let car=this.car_number.value + ""
    if(this.phone.value=="" || this.car_number.value==""  )
    {
this.presentConfirm4()
if(this.phone.value=="")
{
  this.phonee='true'
}
if(this.car_number.value=="")
{
  this.number='true'
}
    }
    else if (!(num.length ==10)  )
    {
      this.presentConfirm5()
    }
  
    else if (car.length < 7)
    {
      this.presentConfirm2()
    }
    else{
    this.table=false
   
    this.mainsrvice.LogIn(this.accestoken,this.cent.DeviceId,this.phone.value,this.car_number.value,(data)=>this.LogInSuccessCallback(data),(data)=> this.LogInFailuerCallback(data))
    }
  }
  presentConfirm2() {
    let alert = this.toastCtrl.create({
      message: 'رقم السياره غير صحيح',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }
  presentConfirm5() {
    let alert = this.toastCtrl.create({
      message: 'رقم الجوال غير صحيح',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }
  delphone()
  {
    this.phonee='false'
  }
  delnumber()
  {
    this.number='false'
  }
  deldata()
  {
   this.table=true
  }
  presentConfirm4() {
    let alert = this.toastCtrl.create({
      message: 'من فضلك ادخل البيانات كامله',
      duration: 3000,
        position: 'bottom'
    });
    alert.present();
  }
  presentoast()
  {
    
      let toast = this.toastCtrl.create({
          message: 'البيانات غير صحيحه',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      
  }
  presentoast1()
  {
    
      let toast = this.toastCtrl.create({
          message: 'لا توجد بيانات لهذه السيارة',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
  authSuccessCallback(data) {

   
    this.cent.appAccess=data.access_token;
    console.log(data.access_token)
  
  }
  authFailureCallback(data)
  {
    this.presentToast()
  }
 
  ionViewDidLoad()
      {
    
      }
}

