import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { ModalController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { DISABLED } from '@angular/forms/src/model';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { APP_BOOTSTRAP_LISTENER } from '@angular/core/src/application_tokens';
import { DatePicker } from '@ionic-native/date-picker';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular/platform/platform';
@Component({
  selector: 'page-maintainance',
  templateUrl: 'maintainance.html',
  providers: [WheelSelector]
})
export class MaintainancePage {
  da: string;
  datep: string;
  yeardata:any=[]
  modeldata:any=[]
  today:any
  
  htmlContent: any;
  brandtype: any;
  adres:any=[]
  adres1:any=[]
  isenabled:any=true
  val:any;
  slideTwoForm:FormGroup
  part:string="time";
  data:FormGroup
  data2:FormGroup
  name:AbstractControl
  remarks:AbstractControl
  phone:AbstractControl
  car_model:AbstractControl
  workHour;
  car_number:AbstractControl
  email:AbstractControl
  address:any
  address1:any
  receive_place:AbstractControl
  deliver_place:AbstractControl
  date:AbstractControl
  branch_name:AbstractControl
  mark:AbstractControl
  year:AbstractControl
  mintype:AbstractControl
  user_id:any;
  brand_data:any=[];
  branch_data:any=[]
  branch_id:any;
  dates:any=[]
 receive_place_lat :any
  receive_place_long:any
deliver_place_lat:any
 deliver_place_long:any
  lat:any;
  lng:any=[]
  phonee:any
  carnum:any
  datee:any
  typee:any
  emaill:any
  markk:any
  yearr:any
  branchh:any
  carmodel:any
  phonee1:any
  carnum1:any
  datee1:any
  typee1:any
  appear:any
  markk1:any
  yearr1:any
  branchh1:any
  carmodel1:any
  price:any
  show:any=true
  distance:any=true
  maufacturetype:any=[]
  page:any
  receive_date:any
  markvalue:any
  emaill1:any
  namee1:any
  modelval:any
  fixedtime:any
  yearval:any
  typeval:any
  markid:any
  prices:any
  modelid:any
  namee:any
  yearid:any
  alldata:any=[]
  typeid:any
  detail:any=true
  disable:any=false
  disable1:any=false
  butDisabled:any=true
  butDisabled1:any=true
  butDisabled2:any=true
  check:any
accestoken:any

workHours = [];
selectedData;  
time;
recieve;
deliver;


  constructor(public plt:Platform,public storage:Storage,public Alert:AlertController,public datePicker:DatePicker,public selector:WheelSelector,public nativeGeocoder: NativeGeocoder,public toastCtrl:ToastController,public navCtrl: NavController,public modalCtrl: ModalController,public formBuilder:FormBuilder, public navParams: NavParams,public cent:CentralProvider,public viewCtrl:ViewController,public mainservice:MainservicesProvider) {

    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.mainservice.manufactureyear(this.accestoken,(data) => this.manufactureyearSuccessCallback(data),(data) => this.manufactureyearFailureCallback(data))
    this.mainservice.maintenancetype(this.accestoken,(data) => this.maintenancetypeSuccessCallback(data),(data) => this.maintenancetypeFailureCallback(data))
    this.mainservice.branch(1,this.accestoken,(data) => this.branchSuccessCallback(data),(data) => this.branchFailureCallback(data))

    this.storage.get('number').then(val=>{
      if(!(val==null))
      {
        this.car_number.setValue(val)
      }
    })
    this.storage.get('name').then(val=>{
      if(!(val==null))
      {
        this.name.setValue(val)
      }
    })
   
    this.storage.get('phone').then(val=>{
      if(!(val==null))
      {
        this.phone.setValue(val)
      }
    })
    this.storage.get('email').then(val=>{
      if(!(val==null))
      {
        this.email.setValue(val)
      }
    })
    this.page=this.navParams.get("Page")
   if(this.page=="car")
   {
     
    this.markvalue=this.navParams.get("markname")
   this.modelval=this.navParams.get("modelname")
   this.yearval=this.navParams.get("yearname")
   this.typeval=this.navParams.get("typename")
   this.markid=this.navParams.get("markid")
   this.modelid=this.navParams.get("modelid")
   this.yearid=this.navParams.get("yearid")
   this.typeid=this.navParams.get("mintype")

   console.log(this.markvalue, this.modelval,this.yearval,this.typeval)
   }
   if(!(this.page == "car"))
{
    this.storage.get('mark').then(val=>{
      if(!(val==null))
      {
        this.mark.setValue(val)
        this.mainservice.brandtype(1,this.accestoken,this.mark.value,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))

      }
    })
    this.storage.get('model').then(val=>{
      if(!(val==null))
      {
        this.car_model.setValue(val)
        

      }
    })
    this.storage.get('year').then(val=>{
      if(!(val==null))
      {
        this.year.setValue(val)
      }
    })
  }
    this.mainservice.brands(1,this.accestoken,(data) => this.brandsSuccessCallback(data),(data) => this.brandsFailureCallback(data))
    this.today = new Date().getDate()

     this.data = this.formBuilder.group({
      name: ['',Validators.required],
      phone: ['',Validators.required],
      remarks: ['',],
      mark: ['',Validators.required],
      year: ['',Validators.required],
      car_model: ['',Validators.required,],
      car_number: ['',Validators.required],
      receive_place: ['',Validators.required],
      deliver_place: ['',Validators.required],
      date: ['',Validators.required,],
      branch_name: ['',Validators.required,],
      mintype: ['',Validators.required,],
      email: ['',Validators.required,],
      workHour:['',Validators.required]
      
    });
  
    this.name=this.data.controls['name'];
    this.phone=this.data.controls['phone'];
    this.car_model=this.data.controls['car_model'];
    this.car_number=this.data.controls['car_number'];
    this.receive_place=this.data.controls['receive_place'];
    this.deliver_place=this.data.controls['deliver_place'];
    this.date=this.data.controls['date'];
    this.branch_name=this.data.controls['branch_name'];
    this.remarks=this.data.controls['remarks'];
    this.mark=this.data.controls['mark'];
    this.year=this.data.controls['year'];
    this.mintype=this.data.controls['mintype'];
    this.email=this.data.controls['email'];
    // this.workHour = this.data.controls['workHour'];


  }
 
 

 delphone()
 {
   this.phonee='false'
   this.phonee1='false'
 }
 optionsFn5()
 {
   this.carmodel1='false'
 }
 delemail()
 {
   this.emaill='false'
   this.emaill1='false'
 }
 delcarnumb()
 {
   this.carnum='false'
   this.carnum1='false'
 }
  optionsFn1()
  {
    
  this.branchh='false'
  this.branchh1='false'
    this.branch_id=this.branch_name.value
    this.isenabled=false

  }


  confirm()
  {
  
  
   
    let num=this.phone.value + ""
    let car=this.car_number.value + ""

    if(this.lat) {
      this.receive_place_lat =this.lat.Lat;
      this. receive_place_long=this.lat.Long;
    }

    if(this.lng) {
      this.deliver_place_lat = this.lng.Lat;
      this. deliver_place_long=this.lng.Long;
    }
   

    console.log(this.car_model.value,"  ,", this.year.value,",",this.mark.value," , ",this.name.value," , ",this.phone.value," , ", this.name.value ," , ",this.car_number.value," , ",this. receive_place_lat,", ",this.receive_place_long, this. deliver_place_long," , ",this.date.value,", ",this.branch_id)
    if(this.car_model.value==""||   this.year.value=="" || this.mark.value==""|| this.phone.value=="" ||  this. receive_place_lat ==""||this.receive_place_long=="" || this.deliver_place_lat==""|| this. deliver_place_long=="" || this.date.value=="" || this.date.value==null || this.date.value==undefined||this.branch_id==""||this.branch_name.value=="" ||this.branch_name.value==null || this. receive_place_lat ==null||this.receive_place_long==null || this.deliver_place_lat==null|| this. deliver_place_long==null ||this. receive_place_lat ==""||this.receive_place_long==undefined || this.deliver_place_lat==undefined|| this. deliver_place_long==undefined)
    {

if( this.date.value=="" || this.date.value==null || this.date.value==undefined)
{
  this.datee1='true'
}

 if(this.car_model.value=="")
 {
this.carmodel1='true'
 }

 if(this.year.value=="")
 {
this.yearr1='true'
 }

 if(this.mark.value=="")
 {
this.markk1='true'
 }
 if(this.branch_name.value=="" || this.branch_id=="")
 {
this.branchh1='true'
 }

 if(this.phone.value=="")
 {
this.phonee1='true'
 }


 if(this.receive_place.value=="" || this.receive_place.value==null || this.receive_place.value==undefined) {
   this.recieve = 'true'
 }

 if(this.deliver_place.value==""|| this.deliver_place.value==null || this.deliver_place.value==null) {
  this.deliver = 'true'
}


 this.presentConfirm()
    }
   
    
    else if (!(num.length ==10)  )
    {
        this.presentConfirm3()
    }
    else if (!((this.email.value==null) ||(this.car_number.value==null) ||(this.car_number.value=="")||(this.email.value=="")))
    {
     
      if(!(this.email.value==null))
      {
     if (!((this.email.value.includes("@")) && (this.email.value.includes(".com")||this.email.value.includes(".net"))))
    {
    
      this.presentConfirm6()
    }
    else{
      if(!(this.car_number.value==null))
  {
    if (car.length <7)
    {
        this.presentConfirm2()
    }
    else{
      
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
  else{
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))
  }
    }
  }
  else if(!(this.car_number.value==null))
  {
    if (car.length <7)
    {
        this.presentConfirm2()
    }
    else{
      
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
} 
    else{
      
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  
  }
  configFailureCallback(data)
  {
this.presentToast1()
  }
  configSuccessCallback(data)
  {
    this.disable1=true
    this.disable=true
    this.alldata.push(data)
    console.log(JSON.stringify(this.alldata))
    if(this.check=="satha")
    {
      
      for(var i=0;i<this.alldata.length;i++)
      {
       this.receive_date=this.alldata[i].date_receive
      }
      this.present2()
  

    }
    else{
    for(var i=0;i<this.alldata.length;i++)
    {
     this.prices=this.alldata[i].maintenance_byplace_price
    }
    this.present()
  }
  }
  optionsFn()
  {
    this.markk='false'
    this.markk1='false'
    this.brandtype=this.mark.value
    this.mainservice.brandtype(1,this.accestoken,this.brandtype,(data) => this.brandtypeSuccessCallback(data),(data) => this.brandtypeFailureCallback(data))
    
  }
  presentConfirm() {
    let alert = this.toastCtrl.create({
      message: 'من فضلك ادخل البيانات كامله',
      duration: 3000,
      position: 'bottom'
    });
    alert.present();
  }

  presentConfirm3() {
    let alert = this.toastCtrl.create({
      message: 'رقم الجوال غير صحيح',
      duration: 3000,
        position: 'bottom'
    });
    alert.present();
  }
  presentConfirm6() {
    let alert = this.toastCtrl.create({
      message: 'البريد الالكتروني غير صحيح',
      duration: 3000,
        position: 'bottom'
    });
    alert.present();
  }
  presentConfirm2() {
    let alert = this.toastCtrl.create({
      message: 'رقم السياره لا يمكن ان يقل عن ٧ ارقام وحروف',
      duration: 3000,
        position: 'bottom'
    });
    alert.present();
  }
  brandtypeSuccessCallback(data)
  {
  this.modeldata=data



}
manufactureyearSuccessCallback(data)
{
  this.yeardata=data

}
manufactureyearFailureCallback(data)
{
this.presentToast1()
}
  
  brandtypeFailureCallback(data)
  {
this.presentToast1()
  }
  modal()
  {

    this.recieve = 'false';

    let mapModal = this.modalCtrl.create(MapPage);
    mapModal.onDidDismiss(data=>{
      this.lat=data
      console.log(JSON.stringify(data))
      this.address = data.Address

    })
    mapModal.present();

  }
  getdate(isTime)
  {
    console.log("isTime: "+isTime);

    this.datee='false'
    this.datee1='false'
    //problem
    var minmDate;
    var maxDate;
    let userLang = this.cent.currentLang;
    if (this.plt.is('ios')) {
      
      minmDate =String(new Date()); 
      let d=new Date()
      let year =d.getFullYear()
      let month=d.getMonth()
      let day=d.getDay()
      maxDate = (new Date(year + 1,month,day)).valueOf();
    }
    else {
      minmDate =(new Date()).valueOf(); 
      let d=new Date()
      let year =d.getFullYear()
      let month=d.getMonth()
      let day=d.getDay()
      maxDate = (new Date(year + 1,month,day)).valueOf();
    }
    let localLang 
    let nowTxt
    let okTxt 
    let cancelTxt 
    
      localLang = 'ar_EG';
      nowTxt = 'اليوم';
      okTxt = 'تم';
      cancelTxt = 'إلغاء'
    
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: minmDate,
      maxDate: maxDate,
      okText: okTxt,
      cancelText: cancelTxt,
      todayText: nowTxt,
      locale: localLang,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date =>{ 
    this.da=date.toLocaleDateString('ar-EG')
    this.da=this.da.replace("/","-").replace("/","-")

    //#region 10-9-2020
    if(isTime && this.da) {
      this.mainservice.getWorkTimeHours(this.da,(data) => this.getWorkTimeHoursSuccessCallback(data), (error) => this.getWorkTimeHoursFailureCallback(error))
    }
    //#endregion
    
  },
      err => console.log('Error occurred while getting date: '+ err)
    );
  }

  checkTimeAvailability() {

    this.time = 'false'

    console.log("this.workHour: "+this.workHour);

   this.selectedData = this.workHours.find(el => {
      return el.id == this.workHour;
    });

    console.log("selectedData Slot_available: "+JSON.stringify(this.selectedData.Slot_available));


    if(this.selectedData.Slot_available == 0) {
      this.presentToastNotavailable();
    }
  }

  presentToastNotavailable() {
    let toast = this.toastCtrl.create({
      message: 'عفواً هذا التوقيت غير متاح من فضلك اختر توقيت آخر',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  getWorkTimeHoursSuccessCallback(data) {
    console.log("success");
    console.log("data 10-9-2020: "+JSON.stringify(data));

    this.workHours = data;
    console.log("this.workHours: "+this.workHours);

  }

  getWorkTimeHoursFailureCallback(error) {
    console.log("error");
    console.log("error 10-9-2020: "+JSON.stringify(error));
  }
   
  reset()
  {  
    this.data.reset()
    // this.mark.setValue("اختر الماركه")
    // this.car_model.setValue("اختر الماركه")
    // this.year.setValue("اختر السنة")
    // this.branch_name.setValue("اختر الفرع")
    // this.mintype.setValue("اختر نوع الصيانه")
  }
  modal1()
  {

    
    let mapModal = this.modalCtrl.create(MapPage);
    mapModal.onDidDismiss(data=>{
      this.lng=data
      this.address1 = data.Address
    
      this.deliver = 'false';

     })
    mapModal.present();

  }
 
  cancel()
  {
    this.data.reset()
    // this.mark.setValue("اختر الماركه")
    // this.car_model.setValue("اختر الماركه")
    // this.year.setValue("اختر السنة")
    // this.branch_name.setValue("اختر الفرع")
    // this.mintype.setValue("اختر نوع الصيانه")
 

  }
  delname()
  {
    this.namee='false'
    this.namee1='false'
  }
  delnum()
  {
    this.carnum='false'
    this.carnum1='false'
  }
  confirm_satha()
  {
  
   console.log(this.branch_name.value)
    let num=this.phone.value + ""
    let car=this.car_number.value + ""
    if(this.page=="car")
    {
    
      if(this.modelval=="" || this.date.value==null || this.date.value==undefined|| this.yearid=="" || this.markid==""||   this.typeid=="" || this.phone.value=="" ||   this.date.value==""||this.branch_id==""||this.branch_name.value=="" ||this.branch_name.value==null)
      {
   this.presentConfirm()
  
   if(this.phone.value=="")
   {
     this.phonee='true'
   }
   
  
   if( this.date.value=="" || this.date.value==null || this.date.value==undefined)
   {
     this.datee='true'
   }

   if( this.workHour=="" || this.workHour==null || this.workHour==undefined)
   {
     this.time ='true'
   }

   if(this.modelval=="")
   {
     this.carmodel='true'
   }
   if(this.yearid=="")
   {
     this.yearr='true'
   }
   if(this.markid=="")
   {
     this.markk='true'
   }
   if(this.typeid=="")
   {
     this.typee='true'
   }
   if(this.branch_id=="")
   {
     this.branchh='true'
   }
   if(this.branch_name.value=="")
   {
     this.branchh='true'
   }
      }
    
      else if (!(num.length ==10))
      {
  this.presentConfirm3()
      }
      else if (!((this.email.value==null) ||(this.car_number.value==null) ||(this.car_number.value=="")||(this.email.value=="")))
      {
      
      if(!(this.email.value==null))
      {
      if (!((this.email.value.includes("@")) && (this.email.value.includes(".com")||this.email.value.includes(".net"))))
      {
      
        this.presentConfirm6()
      }
      else{
      
        if(!(this.car_number.value==null))
        {
          if (car.length <7 )
          {
      this.presentConfirm2()
          }
          else{
          
           
            this.check="satha"
            this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))
    
          }
        }
        else{
        this.check="satha"
        
        this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))
        }
      }
    }
    else if(!(this.car_number.value==null))
    {
      if (car.length <7 )
      {
  this.presentConfirm2()
      }
      else{
      
       
        this.check="satha"
        this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

      }
    }
      else{
      
       
        this.check="satha"
        this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

      }
    }
   
      else{
      
       
        this.check="satha"
        this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

      }
    }
    else{
    
    if(this.car_model.value=="" || this.year.value=="" ||  this.date.value==null || this.date.value==undefined|| this.mark.value==""|| this.mintype.value=="" || this.phone.value=="" ||  this.date.value==""||this.branch_id==""||this.branch_name.value=="" ||this.branch_name.value==null)
    {
 this.presentConfirm()
 

  if(this.phone.value=="")
  {
    this.phonee='true'
  }

  if( this.date.value=="" || this.date.value==null || this.date.value==undefined)
  {
    this.datee='true'
  }

  if( this.workHour=="" || this.workHour==null || this.workHour==undefined)
  {
    this.time ='true'
  }

  if(this.car_model.value=="")
  {
    this.carmodel='true'
  }
  if(this.year.value=="")
  {
    this.yearr='true'
  }
  if(this.mark.value=="")
  {
    this.markk='true'
  }
  if(this.mintype.value=="")
  {
    this.typee='true'
  }
  if(this.branch_id=="")
  {
    this.branchh='true'
  }
  if(this.branch_name.value=="")
  {
    this.branchh='true'
  }
    }
   
    else if (!(num.length ==10))
    {
this.presentConfirm3()
    }
    else if (!((this.email.value==null) ||(this.car_number.value==null) ||(this.car_number.value=="")||(this.email.value=="")))
    {
     
      if(!(this.email.value==null))
      {
    if (!((this.email.value.includes("@")) && (this.email.value.includes(".com")||this.email.value.includes(".net"))))
    {
      
      this.presentConfirm6()
    }
    else{
      if(!(this.car_number.value==null))
  {
     if (car.length <7)
    {
this.presentConfirm2()
    }
    else{
      this.disable=true
      
      this.check="satha"
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
  else{
      this.disable=true
      
      this.check="satha"
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
  }
  else if(!(this.car_number.value==null))
  {
     if (car.length <7)
    {
this.presentConfirm2()
    }
    else{
      this.disable=true
      
      this.check="satha"
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
    else{
      this.disable=true
      
      this.check="satha"
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
    
    else{
      this.disable=true
      
      this.check="satha"
      this.mainservice.config(this.accestoken,(data) => this.configSuccessCallback(data), (data) => this.configFailureCallback(data))

    }
  }
    
  }

  cancel_satha()
  {
        this.data.reset()
    //     this.mark.setValue("اختر الماركه")
    // this.car_model.setValue("اختر الماركه")
    // this.year.setValue("اختر السنة")
    // this.branch_name.setValue("اختر الفرع")
    this.receive_place_lat=""
    this.receive_place_long=""
    this.deliver_place_lat=""
   this.deliver_place_long=""
   this.da=""
    // this.mintype.setValue("اختر نوع الصيانه")

  }
  sathaorderSuccessCallback(data)
  {
    console.log("10-9-2020 satha time response"+JSON.stringify(data))

    console.log("data.available_for_order: "+data.available_for_order);
    console.log("data.available_for_order: "+data.status);


    this.storage.set('name',this.name.value)
    this.storage.set('phone',this.phone.value)
    this.storage.set('email',this.email.value)
    this.storage.set('mark',this.mark.value)
    this.storage.set('model',this.car_model.value)
    this.storage.set('year',this.year.value)
    this.storage.set('number',this.car_number.value)
  

   if(data.available_for_order == 1 && data.status) {

    this.data.reset()
    this.receive_place_lat=""
    this.receive_place_long=""
    this.deliver_place_lat=""
    this.deliver_place_long=""
    this.da=""

    this.workHour = 0;

    this.presentToast()
    this.disable=false
    this.disable1=false
    this.isenabled=true

   } else {
     this.presentToastNotavailable();
   }
    
    
  }
  delnumb()
  {
    this.carnum="false"
    this.carnum1="false"
  }
  sathaorderFailureCallback(data)
  {
    this.disable=false
    this.disable1=true
this.presentToast1()
  }
  presentToast(){
    let toast = this.toastCtrl.create({
        message: 'تم ارسال طلبك ',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
    optionsFn3()
  {
this.yearr='false'
this.yearr1='false'
  }
  optionsFn2()
  {
    this.typee='false'
    this.carmodel='false'
    let namechoosed
    this.maufacturetype.forEach(element => {
      if(this.mintype.value==element.id)
      {
         if(element.name == 'اخري')
         {
          let alert = this.Alert.create({
            title: ' تنويه',
            message:'اكتب المطلوب فى الملاحظات وسيتم الرد عليك بالسعر وموعد التسليم' ,
            buttons: [
              {
                text: 'الغاء',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'موافق',
                handler: () => {
        
                    console.log("ok")        
        
                }
              }
            ]
          });
          alert.present();
         }
      
      }
     
    });
    if( this.mark.value=="" || this.mintype.value=="" || this.car_model.value=="")
    {
        // this.presentConfirm()
    }
    else
    {
this.mainservice.carmaintenance(this.accestoken,this.mark.value,this.car_model.value,this.mintype.value,(data)=>this. carmaintenanceSuccessCallback(data),(data)=>this. carmaintenanceFailureCallback(data))
    }
  }
  showGroup()
  {
    if(this.detail==false)
    {
      this.detail=true
    }
    else{
    this.detail=false
    }
  }
  
 
  carmaintenanceSuccessCallback(data)
 {
   if (data.length==0)
   {
this.show=true
this.detail=true
   }
   else {
  this.show=false
  this.detail=true
    this.distance=false
   let all:any=[];
   all=data

   all.forEach(element => {
     this.price = element.price
    this.htmlContent = element.description;
  
   });
   
  }
 }
 carmaintenanceFailureCallback(data)
 {
this.presentToast1()
 }
 maintenancetypeSuccessCallback(data)
 {
     this.maufacturetype=data
     this.butDisabled2=false
 }
 maintenancetypeFailureCallback(data)
 {
  
 
 }
  maintainanceorderSuccessCallback(data)
  {

    this.presentToast()
    this.storage.set('name',this.name.value)
    this.storage.set('phone',this.phone.value)
    this.storage.set('email',this.email.value)
    this.storage.set('mark',this.mark.value)
    this.storage.set('model',this.car_model.value)
    this.storage.set('year',this.year.value)
    this.storage.set('number',this.car_number.value)
    this.data.reset()
    this.show=true
    // this.mark.setValue("اختر الماركه")
    // this.car_model.setValue("اختر الماركه")
    // this.year.setValue("اختر السنة")
    // this.branch_name.setValue("اختر الفرع")
    // this.mintype.setValue("اختر نوع الصيانه")
    this.isenabled=true
    this.disable1=false
    this.disable=false
  }
  
  present()
  {
  let alert = this.Alert.create({
    title: ' سعر السطحه',
    message:this.prices +" ر . س ." ,
    buttons: [
      {
        text: 'الغاء',
        role: 'cancel',
        handler: () => {
          
          this.cancelmsg()
        }
      },
      {
        text: 'موافق',
        handler: () => {
      this.confmsg()

        }
      }
    ]
  });
  alert.present();
}
confmsg()
{
  if(this.remarks.value==null || this.remarks.value=="")
  {
    
    this.remarks.value==""
  this.mainservice.maintainanceorder(this.accestoken,this.name.value,this.phone.value,this.mark.value,this.car_model.value,this.year.value,this.car_number.value,this.receive_place_lat,this.receive_place_long,this.deliver_place_lat,this.deliver_place_long,this.date.value,this.branch_id,this.remarks.value,this.email.value,this.cent.DeviceId,(data) => this.maintainanceorderSuccessCallback(data), (data) => this.maintainanceorderFailureCallback(data))
  }
else{
this.mainservice.maintainanceorder(this.accestoken,this.name.value,this.phone.value,this.mark.value,this.car_model.value,this.year.value,this.car_number.value,this.receive_place_lat,this.receive_place_long,this.deliver_place_lat,this.deliver_place_long,this.date.value,this.branch_id,this.remarks.value,this.email.value,this.cent.DeviceId,(data) => this.maintainanceorderSuccessCallback(data), (data) => this.maintainanceorderFailureCallback(data))

}
}
cancelmsg()
{

  this.disable=false
  this.disable1=false
}
present2()
  {
  let alert = this.Alert.create({
    title: '  تاريخ الاستلام',
    message:this.receive_date ,
    buttons: [
      {
        text: 'الغاء',
        role: 'cancel',
        handler: () => {
         this.cancelmsg()
        }
      },
      {
        text: 'موافق',
        handler: () => {

          this.confirmorder()


        }
      }
    ]
  });
  alert.present();
}
confirmorder()
{
  this.check=""
  if(this.remarks.value==null || this.remarks.value=="")
          {
            
            this.remarks.value==""
          }
  if(this.page=="car")
  {
    this.mainservice.sathaorder(this.accestoken,this.name.value,this.phone.value,this.markid,this.modelid,this.yearid,this.typeid,this.car_number.value,this.date.value,this.branch_id,this.remarks.value,this.email.value,this.cent.DeviceId,this.workHour,(data) => this.sathaorderSuccessCallback(data),(data) => this.sathaorderFailureCallback(data))

  }
  else{
    
    this.mainservice.sathaorder(this.accestoken,this.name.value,this.phone.value,this.mark.value,this.car_model.value,this.year.value,this.mintype.value,this.car_number.value,this.date.value,this.branch_id,this.remarks.value,this.email.value,this.cent.DeviceId,this.workHour,(data) => this.sathaorderSuccessCallback(data),(data) => this.sathaorderFailureCallback(data))

  }
}


  maintainanceorderFailureCallback(data)
  {
    this.disable1=false
    this.disable=false
  this.presentToast1()

  }
  brandsSuccessCallback(data)
  {

    this.brand_data=data


  }
  brandsFailureCallback(data)
  {
    console.log(JSON.stringify(data))

  }
  branchSuccessCallback(data)
  {

    this.branch_data=data
    console.log(JSON.stringify(data))
    this.branch_data.forEach(element => {
      if(element.address.includes("القادسية"))
      {
this.appear=element.id
this.branch_name.setValue(this.appear)
this.branch_id=this.appear

      }
    });
  }
  branchFailureCallback(data)
  {
this.presentToast1()
    console.log(JSON.stringify(data))

  }
  dateSuccessCallback(data)
  {

    this.dates=data


  }
  dateFailureCallback(data)
  {

this.presentToast1()
  }
  presentToast1() {
    let toast = this.toastCtrl.create({
      message: 'تاكد من اتصالك بالخادم',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

 
  ionViewDidLoad()
      {
    
       
      }
}
