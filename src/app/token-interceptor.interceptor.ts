import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../app/service.service';
import { environment } from 'src/environments/environment';
var aws4 = require('aws4');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private sharedService: ServiceService;

  testdcp = '/testdcp';
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sharedService = this.injector.get(ServiceService);
    console.log(request)
    request = request.clone({
      setHeaders: {
        'Connection': 'keep-alive',
        'Authorization': '',
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}











//     this.sharedService.getUserData().subscribe((data) => {
//       this.authUserData = data;
//       console.log(data)
//       this.sharedService.getToken().subscribe((data) => {

//         let token = data;
//         if (token) {
//           console.log(request)
//           let signedRequest=this.signedRequest(request)
//           let authData;
//             if (localStorage.getItem("auth")) {
//               authData = JSON.parse(localStorage.getItem("auth"));
//              console.log(authData)
//             }
//           if (request.urlWithParams.indexOf('X-Amz-Credential') > -1 ||
//           request.url.indexOf(this.baseUrl+`/user/v1/GetDCPSTSToken?userId=`) > -1 ) {
//             console.log("if condi")
//             // request = request.clone({
//               // setHeaders: {
//               // 'Authorization': `token ${token}`,
//               // 'Content-Type': 'application/json'
//               // }
//             // });

//           } else if(authData.user && authData.user.accessKeyId != ''){
//             console.log("else condi")


//             if (authData.user && authData.user.accessKeyId != '') {
//               console.log(authData)
//               console.log(signedRequest)

//               request = request.clone({
//                 setHeaders: {
//                   // "accessKey": authData.user.accessKeyId,
//                   // "secretKey": authData.user.secretAccessKey,
//                   // "sessionToken": authData.user.sessionToken,
//                   // "service":'execute-api',
//                   // "region":'ap-south-1'
//                   // sessionToken:authUserData.user.sessionToken,
//                   // "Authorization": `token ${token}`,
//                   // 'Content-Type': 'application/json'
//                   // signedRequest
//                   'Authorization':signedRequest.headers.Authorization,
//                   'X-Amz-Date':signedRequest.headers['X-Amz-Date'],
//                   'X-Amz-Security-Token':signedRequest.headers['X-Amz-Security-Token'],
//                   // 'Host':signedRequest.headers.host,
//                   // 'method':signedRequest.method,
//                   // 'url':signedRequest.url,
//                   // 'path':signedRequest.path


//                 }
//               });
//             } else {
//               request = request.clone({
//                 setHeaders: {
//                   'Authorization': `token ${token}`,
//                   // 'Content-Type': 'application/json'
//                 }
//               });
//             }
//           }
//         }
//       });
//     });



//     return next.handle(request);
//   }

// // 

// // let signedRequest=this.signedRequest(method,url,createdBy);
// // console.log(signedRequest)
// // this.deleteSignedRequest(signedRequest);


// signedRequest(request){
//   // console.log("request==",request)
//   let requestPath=request.urlWithParams
//   var newRequest={}
//   if(request.method=='GET'){
//     newRequest = {
//       host: 'f4pfxt1jn2.execute-api.ap-south-1.amazonaws.com',
//       method: request.method,
//       url: request.urlWithParams,
//       path: requestPath.split('https://f4pfxt1jn2.execute-api.ap-south-1.amazonaws.com')[1]
//       }
//   }else{
//     newRequest = {
//       headers:{
//         'Content-Type': 'application/json'
//       },
//       body: request.body,
//       host: 'f4pfxt1jn2.execute-api.ap-south-1.amazonaws.com',
//       method: request.method,
//       url: request.urlWithParams,
//       path: requestPath.split('https://f4pfxt1jn2.execute-api.ap-south-1.amazonaws.com')[1]
//       }
//   }

//     // console.log("newRequest==",newRequest)
//   let signedRequest = aws4.sign(newRequest, {
//     secretAccessKey:this.authUserData.user.secretAccessKey,
//     accessKeyId:this.authUserData.user.accessKeyId,
//     sessionToken:this.authUserData.user.sessionToken
//   });

//   // console.log("signedRequest==",signedRequest)
// this.deleteSignedRequest(signedRequest);
// return signedRequest;
// }


// deleteSignedRequest(signedRequest){
// delete signedRequest.headers['Host'];
// delete signedRequest.headers['accessKey'];
// delete signedRequest.headers['secretKey'];
// delete signedRequest.headers['sessionToken'];
// }
// }