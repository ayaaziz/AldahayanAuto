import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MainservicesProvider } from '../../providers/mainservices/mainservices';
import { CentralProvider } from '../../providers/central/central';
import { SearchPage } from '../search/search';
import { PaidPage } from '../paid/paid';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GESTURE_PRIORITY_MENU_SWIPE } from 'ionic-angular/gestures/gesture-controller';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer'
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer } from '@ionic-native/file-transfer';

import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { PdfPopupPage } from '../pdf-popup/pdf-popup';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  

  price_after:any=null
  type: any;
  data3: any=true;
  data2: any=true;
  data1: any=true;
  done:any=true
  shownGroup: any;
name:any;
alldata:any=[]
maindata:any=[]
slide:any
Sliders:any=[]
show:any=true;
show1:any=true;
show2:any=true;
show3:any=true;
image:any
data:any=true
id:any
getdata:any=[]
page:any
carid:any
defaultimage:any
fixedtime:any
details:any="detail"
tecno:any=[]
accestoken:any
  constructor(public plt:Platform,
              public storage:Storage,
              public toastCtrl:ToastController,
              public social :SocialSharing,
              public navCtrl: NavController, 
              public cent:CentralProvider,
              public mainservice:MainservicesProvider,
              public navParams: NavParams,
              public ViewCtrl:ViewController,
              public popoverCtrl:PopoverController,
              private document: DocumentViewer,
              private fileOpener:FileOpener,
              private transfer:FileTransfer,
              private file:File,
              private platform:Platform,
              private iab:InAppBrowser) {

    this.accestoken= localStorage.getItem('adftrmee')
    this.cent.status=0
    this.id=this.navParams.get("Item")
    this.carid=this.navParams.get("car")
    this.name=this.navParams.get("Name")
    this.page=this.navParams.get("PageName")
    this.type=this.navParams.get("Type")
    this.defaultimage=this.cent.default
    this.image=this.cent.imgUrl
    if(this.page=="listcars")
    {
      this.mainservice.getCarbyid(this.accestoken,this.carid,(data)=> this.getcarbyidSuccessCallback(data),(data)=> this.getcarbyidFailureCallback(data))


    }
    else 
    {
   
      this.mainservice.CarOfferbyid(this.accestoken,this.carid,(data)=> this.CarOfferSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))

    }
  }


  getcarbyidSuccessCallback(data)
  {
    console.log("list car"+JSON.stringify(data))

      this.alldata.push(data.carDetails)
      this.alldata.forEach(item => {
        if((item.length==null) && (item.width==null) && (item.height==null)&& (item.wheelbase==null) && (item.car_trunk==null))
    {
      this.done=true
    }
    else{
      this.done=false
    }
      });
      this.Sliders=data.images
      this.Sliders.forEach(element => {
        this.slide=element.image_name
        
      });
    
      this.maindata=data.advices
  this.tecno=data.luxuryTechnology
   console.log(JSON.stringify(this.alldata))

 
 
    
  
  }
  getcarbyidFailureCallback(data)
  {
this.presentToast()
  }
  search()
  {
    this.navCtrl.push(SearchPage)
  }
  openpaid(id,price,name)
  {

this.navCtrl.push(PaidPage,{Id:id,CarName:name,Price:price})
  }
  hidedata()
  {
    this.show=true
    this.data=true
  }
  hidedata1()
  {
    this.show1=true
    this.data1=true
  }
  hidedata2()
  {
    this.show2=true
    this.data2=true
  }
  hidedata3()
  {
    this.show3=true
    this.data3=true
  }
  
  CarOfferSuccessCallback(data)
  {
     this.alldata=data
     
     this.alldata.forEach(item => {
      if((item.length==null) && (item.width==null) && (item.height==null)&& (item.wheelbase==null)&& (item.car_trunk==null))
  {
    this.done=true
  }
  else{
    this.done=false
  }
     })
     console.log(JSON.stringify(this.alldata))
    for(var j=0;j<this.alldata.length;j++)
    {
      this.Sliders=this.alldata[j].images
      this.tecno=this.alldata[j].luxuryTechnology

  }
  this.Sliders.forEach(element => {
    this.slide=element.image_name
    
  });
 

    this.mainservice.CarAdvice(this.accestoken,this.id,(data)=> this.CaradviceSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))

  }
  
CaradviceSuccessCallback(data)
{
  this.getdata=data
  console.log(JSON.stringify(this.getdata))
 
  for(var i=0;i<this.getdata.length;i++)
    {
      if(this.getdata[i].car_id==this.id)
      {
         this.maindata.push(this.getdata[i])
         console.log(JSON.stringify(this.maindata))

      }
    }
}
  CarOfferFailureCallback(data)
  {
    this.presentToast()
  }

  shareoffer(dis,img)
  {
    if (this.plt.is('ios')) {
    console.log(this.name+dis+img)
    this.social.share(this.name , dis ,img ,"https://itunes.apple.com/us/app/%D8%A7%D9%84%D8%B6%D8%AD%D9%8A%D8%A7%D9%86-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1421240637?ls=1&mt=8").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  else{
    this.social.share(this.name , dis ,img ,"https://play.google.com/store/apps/details?id=com.ITRoots.AldahayanAuto&ah=51fJvaVo7chCzf2mS2Fykmh_EBs").then(() => {
      console.log("success")
    }).catch(() => {
      console.log("not available")
    });
  }
  }

showdata() {
  this.data=false
  this.show=false
  this.data1=true
  this.show1=true
  this.data2=true
  this.show2=true
  this.data3=true
  this.show3=true
}
showdata1() {
  this.data1=false
  this.show1=false
  this.data2=true
  this.show2=true
  this.data3=true
  this.show3=true
  this.data=true
  this.show=true
}
showdata2() {
  this.data2=false
  this.show2=false
  this.data3=true
  this.show3=true
  this.data=true
  this.show=true
  this.data1=true
  this.show1=true
}
showdata3() {
  this.data3=false
  this.show3=false
  this.data=true
  this.show=true
  this.data1=true
  this.show1=true
   this.data2=true
  this.show2=true
}
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'تاكد من اتصالك بالخادم',
    duration: 4000,
    position: 'bottom'
  });
  toast.present();
}
// authSuccessCallback(data) {

//   let date =new Date();
//   let hours=date.getHours();
//   let minutes=date.getMinutes();
//   let seconds=date.getSeconds();
//   let time=((hours*3600) +( minutes*60) +seconds)
//   this.storage.set('time',time)
//   this.storage.set('fixedtime',data.expires_in)
//   this.storage.set('access_token', data.access_token);        
//   this.cent.time=data.expires_in;
//   this.cent.appAccess=data.access_token;
//   console.log(data.access_token)
 

// }
// authFailureCallback(data)
// {
//   this.presentToast()
// }
ionViewDidLoad()
    {
  
      // this.storage.get('access_token').then((val) => {
      //   console.log(val)
      //   if(!(val==null) ){
      //     let date =new Date();
      //     let hours=date.getHours();
      //     let minutes=date.getMinutes();
      //     let seconds=date.getSeconds();
      //     let time2=((hours*3600) +( minutes*60) +seconds)
      //     this.storage.get('fixedtime').then((ftime) => {
      //       this. fixedtime=ftime;
      //     });
      //     this.storage.get('time').then((gettime) => {
      //            let alltime=time2-gettime;
      //            console.log('this.cent.appAccess' , alltime)
  
      //             if(alltime>=this.fixedtime || alltime<0){
      //               this.mainservice.getAccessToken((data) => this.authSuccessCallback(data), (data) => this.authFailureCallback(data));
                    
      //             }
      //             else{
      //               this.cent.appAccess=val
      //               if(this.page=="listcars")
      //               {
      //               this.mainservice.getCarbyid(this.cent.appAccess,this.carid,(data)=> this.getcarbyidSuccessCallback(data),(data)=> this.getcarbyidFailureCallback(data))
      //               }
      //               else{
      //               this.mainservice.CarOfferbyid(this.cent.appAccess,this.carid,(data)=> this.CarOfferSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))
              
      //               }
      //       }
      //     });
      //   }
      //   else{
      //     this.mainservice.getAccessToken((data) => this.authSuccessCallback(data), (data) => this.authFailureCallback(data));
      //   }
      // });
    }
    doRefresh(ev)
    {
      this.alldata=[]
      ev.complete()
      if(this.page=="listcars")
      {

        this.mainservice.getCarbyid(this.accestoken,this.carid,(data)=> this.getcarbyidSuccessCallback(data),(data)=> this.getcarbyidFailureCallback(data))
  
  
      }
      else 
      {
     
        this.mainservice.CarOfferbyid(this.accestoken,this.carid,(data)=> this.CarOfferSuccessCallback(data),(data)=> this.CarOfferFailureCallback(data))
  
      }
    }

    downloadAndOpenPdf(pdf_file) {

      console.log("pdf_file "+pdf_file);

      let path = null;
  
      if(this.platform.is('ios')) {
        path = this.file.documentsDirectory;
      } else {
        path = this.file.externalApplicationStorageDirectory;
      }
  
      const fileTransfer = this.transfer.create();
  
      // fileTransfer.download('https://motivationletter.net/wp-content/uploads/2018/09/Motivation-Letter-For-Master-Degree-Sample-PDF.pdf',path + 'CarFeatures.pdf').then(entry => {
      fileTransfer.download(pdf_file?pdf_file:"",path + 'CarFeatures.pdf').then(entry => {
        
        let url = entry.toURL();
  
        console.log(url);
        // this.document.viewDocument(url, 'application/pdf',{});
        this.fileOpener.open(url, 'application/pdf');
        // const browser = this.iab.create("chrome-extension://gphandlahdpffmccakmbngmbjnjiiahp/"+pdf_file);

        // browser.show();
        

        // //         browser.executeScript();

        // // browser.insertCSS(...);
        // browser.on('loadstop').subscribe(event => {
        //   browser.insertCSS({ code: "body{color: red;" });
        // });

        // browser.close();
      })
    }
  
    openPdf(pdf_file) {
      this.downloadAndOpenPdf(pdf_file);

      // let popup = this.popoverCtrl.create(PdfPopupPage,{pdfFile:pdf_file});
      // popup.present();

    }



    // openPdf(data) {
    //   let popover = this.popoverCtrl.create(PdfPopupPage,{
    
    //   });
  

    //   // const options: DocumentViewerOptions = {
    //   //   title: 'My PDF'
    //   // }
      
    //   // this.document.viewDocument('file:///android_asset/www/assets/1a.pdf', 'application/pdf', options)
    // }
}
