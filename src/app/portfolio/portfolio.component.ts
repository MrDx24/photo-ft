import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  title = 'poc';
  listcat=["Baby","Marriage","Maternity","Pre-wedding","Birthday","Function","Extra"];
  listcat1=["Baby","Marriage"];
  test:any = null
  list: any[] = [];
  listthimg: any[] = [];
  flag = [false,false,false,false,false,false,false]
  flagallimg:any = false
  constructor(private http: HttpClient){
      for(let i=0; i<this.listcat.length; i++) {
        this.flag[i] = true
        this.http.get<any>('https://photo-bt.onrender.com/upload/getimage/' + this.listcat[i]).subscribe((response) => {
        //console.log("response:", response);
        // data = response;
        this.listthimg[i] = response
        this.flag[i] = false
      });
    }

  }


  getCatImages(ct: any) {
    this.flagallimg = true;
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    this.http.get<any[]>('https://photo-bt.onrender.com/upload/getimages/' + ct, { headers }).subscribe((response) => {

      // console.log("response:", response[0].category);
      // console.log("response:", response.length);
      // console.log("response:", response[2].imagefile.data.data)/;
      this.list = response; // Since the API response is an object with a 'result' property containing the array
      this.flagallimg = false
      //console.log("response:", this.list);
      //this.listthimg=response[0];
    });
  }

  // getList(c:any){
  //   this.getCatImages(c);
  // }

  // getthImages(ct: any, listthval:any) {
  //   const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
  //   let data;
  //   return this.http.get<any>('http://localhost:3000/upload/getimage/' + ct, { headers }).subscribe((response) => {
  //     console.log("response:", response);
  //     // data = response;
  //     listthval = response
  //     //..,,//this.ngOnInit()
  //   });

  //     //console.log(data)

  // }

//   scrollToSection(sectionId: any) {
//     const targetElement = document.getElementById(sectionId);
//     if (targetElement) {
//         targetElement.scrollIntoView({ behavior: 'smooth' });
//     }
// }



  convertBufferToImage(data:any) {
    // /console.log(`data:image/png;base64,${this.bufferToBase64(data)}`)

    return this.bufferToBase64(data);
  }


  bufferToBase64(buffer: ArrayBuffer): string {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary.push(String.fromCharCode(bytes[i]));
    }
    return btoa(binary.join(''));
  }
}
