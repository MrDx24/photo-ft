import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  imgLinkForm!: FormGroup;

  selCat : any;
  imgSrc = "../../assets/images/download.jpg";
  selImgPrv = null;
  imgName:any;
  flag:any = false
  date = new Date();
  disable = true;
  list: any[] = [];
  selectedImage: any;
  delCat: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient){}

  ngOnInit(): void {
    this.imgLinkForm = this.fb.group({
      imgLink: ['', Validators.required],
      imgCat: [''],
      imgname: [''],
      th: this.fb.control('no')
    });

  }


  onFileSelected(event: any) {
    this.showPreview(event);
    this.selectedImage = event.target.files[0] as File;
  }

  submitImage(){

    if (!this.selectedImage) {
      console.log('Please select an image before submitting.');
      return;
    }

    const imageFormData = new FormData();

    imageFormData.append('imageName', this.imgName);
    imageFormData.append('category', this.selCat);
    imageFormData.append('th', this.th?.value);
    imageFormData.append('image', this.selectedImage);

    this.http.post('https://photo-bt.onrender.com/upload/image', imageFormData).subscribe(
      (response) => {
        this.getCatImages(this.selCat);
        this.resetForm();
      });
  }

  getCatImages(cat:any){

    this.list = [];
    this.flag = true;
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    this.http.get<any[]>('https://photo-bt.onrender.com/upload/getimages/' + cat, { headers }).subscribe((response) => {
      this.flag = false;
      this.list = response;
    },(error) => {
      this.flag = false;
      console.log("error:", error);
    } );
  }

  deleteImgDetails(id:any, cat:any){
    this.http.delete('https://photo-bt.onrender.com/upload/deleteimage/' + id).subscribe((response) => {
      this.flag = false;
      console.log("response:", response);
      this.getCatImages(cat);
    },(error) => {
      this.flag = false;
      console.log("error:", error);
    } );

  }

  get imgLink() {
    return this.imgLinkForm.get('imgLink');
  }

  get imgCat() {
    return this.imgLinkForm.get('imgCat');
  }

  get imgname() {
    return this.imgLinkForm.get('imgname');
  }

  get th() {
    return this.imgLinkForm.get('th');
  }

  onSelected(value:string): void {
		this.selCat = value;
    this.delCat = value;
    this.getCatImages(value);

	}

  setCat(valueCat:any){
    this.imgLinkForm.get('imgCat')?.setValue(this.selCat);
  }


  setName(){
    this.imgLinkForm.get('imgname')?.setValue(this.imgName);
  }

  showPreview(event:any){

    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selImgPrv = event.target.files[0];
      this.imgName = event.target.files[0].name;
      // this.getname(this.imgName);
    }
    else{
      this.imgSrc = "../../assets/images/download.jpg";
      this.selImgPrv = null;
      this.imgName = null;
    }
  }

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

  resetForm(){

    this.imgName="";
    this.imgSrc = "../../assets/images/download.jpg";
  }


}
