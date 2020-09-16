import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { HomePage } from '../pages/home/home';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TabsPage } from '../pages/tabs/tabs';
import { PaidPage } from '../pages/paid/paid';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MaintainancePage } from '../pages/maintainance/maintainance';
import { Device } from '@ionic-native/device';
import { CarsPage } from '../pages/cars/cars';
import { Diagnostic } from '@ionic-native/diagnostic';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NotidetailsPage } from '../pages/notidetails/notidetails';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from '../providers/mainservices/refresh-token.interceptor';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MainservicesProvider } from '../providers/mainservices/mainservices';
import { CentralProvider } from '../providers/central/central';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ListcarsPage } from '../pages/listcars/listcars';
import { AppRate } from '@ionic-native/app-rate';
import { MapPage } from '../pages/map/map';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailsPage } from '../pages/details/details';
import { File } from '@ionic-native/file';
import { BranchesPage } from '../pages/branches/branches';
import { AdvicesPage } from '../pages/advices/advices';
import { WarningPage } from '../pages/warning/warning';
import { IonicStorageModule } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot';
import{GoogleMaps} from '@ionic-native/google-maps';
import { DatePicker } from '@ionic-native/date-picker';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { Transfer} from '@ionic-native/transfer';
import { CallNumber } from '@ionic-native/call-number';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {AdvicedetailsPage} from '../pages/advicedetails/advicedetails';
import {JopPage} from '../pages/jop/jop';
import {SearchPage} from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { ChatpagePage } from '../pages/chatpage/chatpage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { CarmaintainPage } from '../pages/carmaintain/carmaintain';
import { setupEvents } from 'ionic-angular/util/events';
import { SettingPage } from '../pages/setting/setting';
import { MaindetailPage } from '../pages/maindetail/maindetail';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera } from '@ionic-native/camera';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer'

import { FileOpener } from '@ionic-native/file-opener';
import { PdfPopupPage } from '../pages/pdf-popup/pdf-popup';

import { CalendarModule } from 'ionic3-calendar-en';


// import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { PdfPopupPage } from '../pages/pdf-popup/pdf-popup';
// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
 

@NgModule({
  declarations: [
    ChatPage,
    ChatpagePage,
    CarmaintainPage,
    MyApp,
    MaindetailPage,
    AboutPage,
    NotidetailsPage,
    HomePage,
    JopPage,
    TabsPage,
    PaidPage,
    MaintainancePage ,
    CarsPage,
    ListcarsPage,
    AdvicesPage,
    BranchesPage,
    WarningPage,
    MapPage,
    DetailsPage,
    SearchPage,
    AdvicedetailsPage,
    LoginPage,
    SettingPage,
    PdfPopupPage

  ],
  imports: [
    
    IonicStorageModule.forRoot(),    
    HttpClientModule,
    BrowserModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp),
    CalendarModule
    // PdfViewerModule
    // SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  
  entryComponents: [
    ChatPage,
    ChatpagePage,
    CarmaintainPage,
    MyApp,
    MaindetailPage,
    DetailsPage,
    AboutPage,
    NotidetailsPage,
    MapPage,
    HomePage,
    TabsPage,
    PaidPage,
    MaintainancePage,
    CarsPage,
    JopPage,
    SearchPage,
    ListcarsPage,
    AdvicesPage,
    BranchesPage,
    WarningPage,
    AdvicedetailsPage,
    LoginPage,
    SettingPage,
    PdfPopupPage
  ],
  providers: [
    InAppBrowser,
    Diagnostic,
    IOSFilePicker,
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    Base64,
    FilePath,
    LaunchNavigator,
    Geolocation,
    File,
    DatePicker,
    NativeGeocoder,
    WheelSelector,
    Device,
    ScreenOrientation,
    CallNumber,
    FileChooser,
    AppRate,
    Push,
    SocialSharing,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainservicesProvider,
    CentralProvider,
    HttpClient,
    Screenshot,
    GoogleMaps,
    FileTransfer,
    Transfer,
    Camera,
    DocumentViewer,
    FileOpener
  ]
})
export class AppModule {}
