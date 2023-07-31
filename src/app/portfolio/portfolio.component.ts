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
        this.listthimg[i] = response
        this.flag[i] = false
      });
    }

  }


  getCatImages(ct: any) {
    this.flagallimg = true;
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    this.http.get<any[]>('https://photo-bt.onrender.com/upload/getimages/' + ct, { headers }).subscribe((response) => {
      this.list = response;
      this.flagallimg = false
    });
  }



  convertBufferToImage(data:any) {
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



