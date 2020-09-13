import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { CentralProvider } from '../central/central';
import { LoadingController, ToastController, Navbar } from 'ionic-angular';
import { elementAt } from 'rxjs/operator/elementAt';
import { Diagnostic } from '@ionic-native/diagnostic';



@Injectable()
export class MainservicesProvider {

  constructor(public diagnostic:Diagnostic,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public http: HttpClient,public cent:CentralProvider) {
  
  }
 
  getAccessToken(authSuccessCallback, authFailureCallback) {


   

            let headers = new HttpHeaders()
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let params = new HttpParams().set('client_id','2').set('client_secret', 'G3RYH2aOWloclC9wmOcuCjNojdCpzA1HNa8dVzMl').set('grant_type', 'password').set('username','admin@aldahayanautosa.com').set('password','Aldahayan@2018');
        let serviceUrl = 'http://www.aldahayanautosa.com/aldahyan/oauth/token';
        this.http.post(serviceUrl, params, { headers: headers }).subscribe(
          data => {
            authSuccessCallback(data)  
          
          },
          err => {
            
            console.log(JSON.stringify(err))

           
            
          }
        )
    
    }
    
     getliscar(access_token,brand_id,brandtype,year,offset,listcarsSuccessCallback,listcarsFailureCallback)
  {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });


   
     
   
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + this.cent.appAccess).set('Accept','application/json');
        
    let plainSearch = 
    {
      'brand_id':brandtype,
      'model':brand_id,
      'manufacture_year_id':year,
      'count':offset
     

  }
 console.log(JSON.stringify(plainSearch))
  let encryptedSearch=JSON.stringify(this.cent.encrypt(plainSearch));
  let params = new HttpParams().set('data', encryptedSearch)
    let serviceUrl = this.cent.serviceurl + 'getCar' ;
    //console.log("params " + serviceUrl)
    this.http.post(serviceUrl, params, { headers: headers }).subscribe(
      data => {
        loading.present();

        let decryptedStores =JSON.parse(this.cent.decrypt(data))     
        listcarsSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        listcarsFailureCallback(err);
        loading.dismiss()
      }
    )
 
}
  
 
  getallliscar(access_token,offset,listcarsSuccessCallback,listcarsFailureCallback)
  { 
     
    
      
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + this.cent.appAccess).set('Accept','application/json');;
        
    let plainSearch = 
    {
  }
  let encryptedSearch=JSON.stringify(this.cent.encrypt(plainSearch));
  let params = new HttpParams().set('data', encryptedSearch)
    let serviceUrl = this.cent.serviceurl + 'cars?count='+offset ;
    //console.log("params " + serviceUrl)
    this.http.get(serviceUrl,  { headers: headers }).subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))   
  
        listcarsSuccessCallback(decryptedStores)
      },
      err => {

        listcarsFailureCallback(err);
      }
    )
 
  }
 
  



  
  //طلب صيانه من مكاني ( طلب ساطحه 
  sathaorder(access_token,name,phone,brand,car_model,manufact,mid,car_number,date,branch_id,remarks,email,device,delivery_time_id,sathaorderSuccessCallback,sathaorderFailureCallback) {
    
       
     
    
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      'customer_name' : name ,
      'mobile' : phone ,
      'car_model' : car_model ,
      'car_brand':brand,
      'car_manufacture':manufact,
      'maintenance_type_id':mid,
      'car_number' : car_number ,
      'date':date,
      'branch_id' : branch_id,
      'remarkes' : remarks,
      'email':email,
      'device_id':device,
      'delivery_time_id':delivery_time_id

    }
    console.log(JSON.stringify(params))
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'customermaintenanceorders';
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {

        let decryptedStores =JSON.parse(this.cent.decrypt(data))
            

        sathaorderSuccessCallback(decryptedStores)
       
      },
      err => {
       

        sathaorderFailureCallback(err)
        
      }
    )
  
}

  //customer maintainence order
  maintainanceorder(access_token,name,phone,brand,car_model,manufact,car_number,receive_place_lat,receive_place_long,deliver_place_lat,deliver_place_long,date,branch_id,remarks,email,device,maintainanceSuccessCallback,maintainanceFailureCallback) {

      
    
    
    let headers = new HttpHeaders();
    let params={
      'customer_name' : name ,
      'mobile' : phone ,
      'car_model' : car_model ,
      'car_brand':brand,
      'car_manufacture':manufact,
      'car_number' : car_number ,
      'recieve_place_lat' :receive_place_lat,
      'recieve_place_long' : receive_place_long,
      'deliver_place_lat' : deliver_place_lat,
      'deliver_place_long' : deliver_place_long,
      'date':date,
      'branch_id' : branch_id,
      'remarkes' : remarks,
      'email':email,
      'device_id':device
    }
    console.log(JSON.stringify(params))
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer '+access_token ).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'maintenanceordermyplace  ';
    console.log(headers)
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        

        maintainanceSuccessCallback(decryptedStores)
       
      },
      err => {
      

        maintainanceFailureCallback(err)
        
      }
    )
  
}

  //طلب تمويل
  financeorder(access_token,device,status,car_id,customer_name,mobile,salary,bank,paid,have,period,remarks,id,email,monthlypaid,eltezam,financeorderSuccessCallback,financeorderFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
 
        
   
  
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      'car_id':car_id,
      'status':status,
      'customer_name':customer_name,
      'mobile':mobile,
      'paid_money':paid,
      'salary':salary,
      'rate':have,
      'bank_id':bank,
      'payment_period':period,
      'remarks':remarks,
      'id_number':id,
      'email':email,
      'month_payment':monthlypaid,
      'device_id':device,
      'commitments':eltezam
    }
    console.log(JSON.stringify(params))
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token);
    let serviceUrl = this.cent.serviceurl + 'carfinanceorder';
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        financeorderSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        financeorderFailureCallback(err)
        loading.dismiss()
      }
    )
  
}


//طلب قطع غيار
  sparepartsorder(access_token,name,mobile,car_model,brand_id,area,spare,branch_id,remarkes,sparepartsorderSuccessCallback,sparepartsorderFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
     
     
    
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      'customer_name':name,
      'mobile':mobile,
      'car_model':car_model,
      'brand_id':brand_id,
      'area': area,
      'sparepartname':spare,
      'branch_id':branch_id,
      'remarkes':remarkes

    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token);
    let serviceUrl = this.cent.serviceurl + 'sparepartorders';
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        sparepartsorderSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        sparepartsorderFailureCallback(err)
        loading.dismiss()
      }
    )
  
}
 

  brands(maintainance,access_token,brandsSuccessCallback,brandsFailureCallback) {
   
    
       
      
    
    let headers = new HttpHeaders();
    let params={
      'maintanince_view':maintainance
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'brands?maintanince_view='+maintainance;



    // headers.append('Access-Control-Allow-Origin' , '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept','application/json');
    // headers.append('content-type','application/json');
    // let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    // let parameter = new HttpParams().set('data', encryptedSearch)
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');





    this.http.get(serviceUrl, { headers: headers })
    // this.http.post(serviceUrl,params ,{ headers: headers })
    
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        brandsSuccessCallback(decryptedStores)
      },
      err => {

        brandsFailureCallback(err)
      }
    )
  
}
  
  brandtype(maintainance,access_token,branch_id,brandtypeSuccessCallback,brandtypeFailureCallback) {
  
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      'brand_id':branch_id,
      'maintanince_view':maintainance
    }
    

    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'brandType';
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))  
       
     
        brandtypeSuccessCallback(decryptedStores)
      
      },
      err => {
     

        brandtypeFailureCallback(err)
       
      }
    )
  
}
  

  branch(maintainance,access_token,branchSuccessCallback,branchFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    
    });
  
     
     
    
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token);
    let serviceUrl = this.cent.serviceurl + 'branches?maintanince_view='+maintainance;
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        loading.present();

        let decryptedStores =JSON.parse(this.cent.decrypt(data))
       
        branchSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        branchFailureCallback(err)
        loading.dismiss()
      }
    )
 
}

 WarningSign(access_token, WarningSignSuccessCallback, WarningSignFailureCallback) {
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
  });
 
       
  
  
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
    let serviceUrl = this.cent.serviceurl + 'warnsigns';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        WarningSignSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        WarningSignFailureCallback(err)
        loading.dismiss()
      }
    )
  
}

 Advaices(access_token, AdvaicesSuccessCallback, AdvaicesFailureCallback) {
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
  
 });

  
   
  
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
    let serviceUrl = this.cent.serviceurl + 'advices';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        AdvaicesSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        AdvaicesFailureCallback(err)
        loading.dismiss()
      }
    )
  
}
 

  CarAdvice(access_token,car_id,CarAdviceSuccessCallback,CarAdviceFailureCallback) {
   
    
     
     
    
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      'car_id' :car_id,
    
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
    let serviceUrl = this.cent.serviceurl + 'caradvice';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        CarAdviceSuccessCallback(decryptedStores)
      },
      err => {

        CarAdviceFailureCallback(err)
      }
    )
  
}
  

  CarOffer(access_token,offset, CarOfferSuccessCallback, CarOfferFailureCallback) {
   
   
     
    
    
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      
    
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
    let serviceUrl = this.cent.serviceurl + 'caroffers?count='+offset;
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        CarOfferSuccessCallback(decryptedStores)
      },
      err => {

        CarOfferFailureCallback(err)
      }
    )
  
}


CarOfferbyid(access_token,car_id, CarOfferbyidSuccessCallback, CarOfferbyidFailureCallback) {
 

   
   
  
  let headers = new HttpHeaders();
  this.cent.appAccess=access_token;
  let params={
    'offer_id':car_id
  
  }
  
  let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
  let parameter = new HttpParams().set('data', encryptedSearch)
  headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
  let serviceUrl = this.cent.serviceurl + 'carOffersById';
  this.http.post(serviceUrl,parameter, { headers: headers })
   
   .subscribe(
    data => {
      let decryptedStores =JSON.parse(this.cent.decrypt(data))
     

      CarOfferbyidSuccessCallback(decryptedStores)
      
    },
    err => {
     

      CarOfferbyidFailureCallback(err)
      
    }
  )



}


getCarbyid(access_token,car_id, getCarbyidSuccessCallback, getCarbyidFailureCallback) {
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
  });

   
   
  
  let headers = new HttpHeaders();
  this.cent.appAccess=access_token;
  let params={
    'id':car_id
  
  }
  
  let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
  let parameter = new HttpParams().set('data', encryptedSearch)
  headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
  let serviceUrl = this.cent.serviceurl + 'getCarById';
  this.http.post(serviceUrl,parameter, { headers: headers })
   
   .subscribe(
    data => {
      let decryptedStores =JSON.parse(this.cent.decrypt(data))
      loading.present();

      getCarbyidSuccessCallback(decryptedStores)
      loading.dismiss()
    },
    err => {
      loading.present();

      getCarbyidFailureCallback(err)
      loading.dismiss()
    }
  )



}
 mainOffer(access_token, mainOfferSuccessCallback, mainOfferFailureCallback) {
  
 
   
   
  
    let headers = new HttpHeaders();
    this.cent.appAccess=access_token;
    let params={
      
    
    }
    
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');;
    let serviceUrl = this.cent.serviceurl + 'maintenanceoffer';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
       

        mainOfferSuccessCallback(decryptedStores)
       
      },
      err => {
      

        mainOfferFailureCallback(err)
       
      }
    )



}
  MaintainanceDate(access_token,MaintainanceDateSuccessCallback,MaintainanceDateFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
   
      
      
    
    let headers = new HttpHeaders();
    let params={
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'maintenancedates';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        MaintainanceDateSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        MaintainanceDateFailureCallback(err)
        loading.dismiss()
      }
    )
  


  }
  Maintainancedvice(access_token,MaintainancedviceSuccessCallback,MaintainancedviceFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
    
    let headers = new HttpHeaders();
    let params={
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'maintenanceadvices';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        MaintainancedviceSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        MaintainancedviceFailureCallback(err)
        loading.dismiss()
      }
    )



}


  contact(access_token,user_msg,user_mail,mobile, contactSuccessCallback, contactFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
 
      
     
    
    let headers = new HttpHeaders();
    let params={
      'email':user_mail,
      'text':user_msg,
      'mobile':mobile
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'contact';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        contactSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        contactFailureCallback(err)
        loading.dismiss()
      }
    )
 


}

 
  searchcar(access_token,car_name, searchcarSuccessCallback, searchcarFailureCallback) {
  
  
      
     
    
    
    let headers = new HttpHeaders();
    let params={
      'name':car_name,
     
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'carSearch';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
      
        searchcarSuccessCallback(decryptedStores)
       
      },
      err => {
       
        searchcarFailureCallback(err)
      
      }
    )

    

  }  

  carrier(access_token,name,mobile,jop,cv,ext,qualification,skills,remarks, device,carrierSuccessCallback, carrierFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    }); 
  
      
       
      loading.present();

    let headers = new HttpHeaders();
    let params={
      'name':name,
      'mobile':mobile,
      'job_id':jop,
      'qualification': qualification,
      'skills':skills,
      'remarks':remarks,
      'device_id':device
    }
   
     console.log(JSON.stringify(params))
    
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    
   
    let parameter 
    if(cv != null)
    {
     
      let cv_strip = cv.split(',')[1]
      parameter = new HttpParams().set('data', encryptedSearch).set('cv',cv_strip.replace(/\+/g,",")).set('ext', ext)

    }
  else{
   
     parameter = new HttpParams().set('data', encryptedSearch).set('cv',"").set('ext', "")

  }
 
    console.log(JSON.stringify(parameter))
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'carriersorders';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        carrierSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {

        carrierFailureCallback(err)
        loading.dismiss()
      }
    )
 

  

  }
  Notification(access_token, device_id, reg_id,type, NotificationSuccessCallback,   NotificationFailureCallback) {
  
    
      
      
    
    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
      'firebase_id':reg_id,
      'type':type
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'device';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

       NotificationSuccessCallback(decryptedStores)
      },
      err => {

        NotificationFailureCallback(err)
      }
    )


 

}
  

  UpdateNotification(access_token, id, read, UpdateNotificationSuccessCallback,  UpdateNotificationFailureCallback) {
   
   
      
      
    
    let headers = new HttpHeaders();
    let params={
      'id':id,
      'read':read
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'updatenotificationread';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        UpdateNotificationSuccessCallback(decryptedStores)
      },
      err => {

        UpdateNotificationFailureCallback(err)
      }
    )
 

 

}
  LogIn(access_token, device_id,phone, car_number,LogInSuccessCallback,LogInFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
      
      
    
    let headers = new HttpHeaders();
    let params={
      'mobile':phone,
      'car_number':car_number,
      "device_id":device_id
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'customerdate';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

       LogInSuccessCallback(decryptedStores)
       loading.dismiss()
      },
      err => {
        loading.present();

        LogInFailureCallback(err)
        loading.dismiss()
      }
    )



  }

  itemcode(access_token, code,itemcodeSuccessCallback,itemcodeFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
      
     
    
    let headers = new HttpHeaders();
    let params={
      'code':code,
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'getcode';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        itemcodeSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        itemcodeFailureCallback(err)
        loading.dismiss()
      }
    )
  

 
  }
  

  shownotification(access_token,device_id,read, count,shownotificationSuccessCallback,shownotificationFailureCallback) {

        

    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
      'read':read,
      'count':count
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'notification';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        shownotificationSuccessCallback(decryptedStores)
        // loading.dismiss()
      },
      err => {
        shownotificationFailureCallback(err)
        // loading.dismiss()
      }
    )
  


  }
  

  choosebank(access_token,shownotificationSuccessCallback,shownotificationFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
   
      
     
    
    let headers = new HttpHeaders();
    let params={
     
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'banks';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        shownotificationSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        shownotificationFailureCallback(err)
        loading.dismiss()
      }
    )

}
  



  financerate(access_token,device,financeSuccessCallback,financeFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
      
     
    
    let headers = new HttpHeaders();
    let params={
     'device_id':device
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'financeRate';
    this.http.post(serviceUrl, parameter,{ headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        financeSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        financeFailureCallback(err)
        loading.dismiss()
      }
    )
  
}
  



  manufactureyear(access_token,manufactureyearSuccessCallback,manufactureyearFailureCallback) {
   
   
      
      
    
    let headers = new HttpHeaders();
    let params={
     
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'manufactureyear';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
       

        manufactureyearSuccessCallback(decryptedStores)
     

      },
      err => {
       
      

        manufactureyearFailureCallback(err)
       

      }
    )
 
}





  maintenancetype(access_token,maintenancetypeSuccessCallback,maintenancetypeFailureCallback) {
  
      
    
    
    let headers = new HttpHeaders();
    let params={
     
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'maintenancetype';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
       

        maintenancetypeSuccessCallback(decryptedStores)
        
      },
      err => {
       

        maintenancetypeFailureCallback(err)
       
      }
    )

}




  carmaintenance(access_token, car_id,model_id, main_id, carmaintenanceSuccessCallback, carmaintenanceFailureCallback) {
  
   
      
     
    
    let headers = new HttpHeaders();
    let params={
      'brand_id':car_id,
      'model_id' :model_id,
      'maintenance_type_id':main_id
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'carmaintenance';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
         console.log("emannnn"+ decryptedStores)

        carmaintenanceSuccessCallback(decryptedStores)
      
      },
      err => {
        

        carmaintenanceFailureCallback(err)
        
      }
    )

}
 

  changeAllStatusNotification(access_token,device_id,status,changeAllStatusNotificationSuccessCallback,changeAllStatusNotificationFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
      
    
    
    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
      'status':status,
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'changeAllStatusNotification';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        changeAllStatusNotificationSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        changeAllStatusNotificationFailureCallback(err)
        loading.dismiss()
      }
    )
 
}
 
  

  changeStatusNotification(access_token,device_id,status,type, changeStatusNotificationSuccessCallback, changeStatusNotificationFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
  
      
     
    
    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
      'status':status,
      'type':type
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'changeStatusNotification';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        changeStatusNotificationSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        changeStatusNotificationFailureCallback(err)
        loading.dismiss()
      }
    )
 
}
 



  chat(access_token,brand_id,model_id,manufacture_id,name,device, chatSuccessCallback, chatFailureCallback) {
  
      
      // let loading = this.loadingCtrl.create({
      // });
    
      // loading.present();
    let headers = new HttpHeaders();
    let params={
      'brand_id':brand_id,
      'model_id':model_id,
      'manufacture_id':manufacture_id,
      'customer_name':name,
      'device_id':device
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'chatUsers';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        chatSuccessCallback(decryptedStores)
      },
      err => {
        chatFailureCallback(err)
      }
    )
  
}
  
  jobs(access_token,jobsSuccessCallback,jobsFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
 
      
   
    
    let headers = new HttpHeaders();
    let params={
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'jobs';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        jobsSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        jobsFailureCallback(err)
        loading.dismiss()
      }
    )

}
 

  config(access_token,configSuccessCallback,configFailureCallback) {
  
    let headers = new HttpHeaders();
    let params={
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'configration';
    this.http.get(serviceUrl, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
     

        configSuccessCallback(decryptedStores)
      
      },
      err => {
       

        configFailureCallback(err)
        
      }
    )

}
  
  devicestatus(access_token,device_id , devicestatusSuccessCallback,  devicestatusFailureCallback) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
   
      
     
    
    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
    
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'deviceStatus';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))
        loading.present();

        devicestatusSuccessCallback(decryptedStores)
        loading.dismiss()
      },
      err => {
        loading.present();

        devicestatusFailureCallback(err)
        loading.dismiss()
      }
    )
 
}
 
  devicestatustype(access_token,device_id, devicestatustypeSuccessCallback,  devicestatustypeFailureCallback) {
  
  
      

    
    let headers = new HttpHeaders();
    let params={
      'device_id':device_id,
     
      
    }
    console.log(access_token)
    let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
    let parameter = new HttpParams().set('data', encryptedSearch)
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
    let serviceUrl = this.cent.serviceurl + 'deviceStatusType';
    this.http.post(serviceUrl,parameter, { headers: headers })
     
     .subscribe(
      data => {
        let decryptedStores =JSON.parse(this.cent.decrypt(data))

        devicestatustypeSuccessCallback(decryptedStores)
      },
      err => {

        devicestatustypeFailureCallback(err)
      }
    )
 
}

//#region 10-9-2020
getWorkTimeHours(selected_date,configSuccessCallback,configFailureCallback) {
  
  console.log("selected_date from api: "+selected_date)
  let headers = new HttpHeaders();
  let params={
    "selected_date":selected_date
  }
  // console.log(access_token)
  let encryptedSearch=JSON.stringify(this.cent.encrypt(params));
  let parameter = new HttpParams().set('data', encryptedSearch)
  headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
  // .set('Authorization', 'Bearer ' + access_token).set('Accept','application/json');
  let serviceUrl = this.cent.serviceurl + 'worktimehours';
  // this.http.get(serviceUrl, { headers: headers })
  this.http.get(serviceUrl,{ headers: headers,params: parameter})
   
   .subscribe(
    data => {
      let decryptedStores =JSON.parse(this.cent.decrypt(data))
   

      configSuccessCallback(decryptedStores)
      // configSuccessCallback(data)

    
    },
    err => {
     

      configFailureCallback(err)
      
    }
  )

}
//#endregion



}
