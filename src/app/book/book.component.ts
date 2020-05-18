import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'app/_models/book';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BookService } from 'app/services/book.service';
declare var $: any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
 imageUrl: string;
 fileToUpload: File = null;
 isImageChnaged: Boolean;
 book: Book;

 @ViewChild('formDirective') myNgForm;
 createForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.minLength(4)]),
  author: new FormControl('', [Validators.required]),
  isbn: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required]),
});
 msg: string;
  constructor(private bookService: BookService) {
    this.imageUrl =  '../../assets/img/Default_image.jpg';
    this.isImageChnaged = false;
   }

  ngOnInit(): void {

    this.getBook();
  }
  handleFileInput(files: FileList) {
    console.log('change called');
    if (files && files.length) {
       this.isImageChnaged = true;
       this.fileToUpload = files.item(0);
       const reader = new FileReader();
       reader.onload = (event: any) => {
         this.imageUrl = event.target.result
     };
     reader.readAsDataURL(this.fileToUpload);
    }
  }
  showNotification(from, align) {
    const type = ['', 'success'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: 'Successfully Booke Added'

    }, {
        type: type[color],
        timer: 200,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  createBook() {
    if (this.createForm.valid) {
      this.book = Object.assign({}, this.createForm.value);
      console.log(this.book);

    this.bookService.saveBook(this.book, this.fileToUpload).subscribe(res => {
      this.myNgForm.resetForm();
      this.showNotification('top', 'right');
      this.imageUrl =  '../../assets/img/Default_image.jpg';
      this.isImageChnaged = false;
    }, error => {
      console.log(error)
    })
    }
  }
  getBook() {
    this.bookService.get().subscribe((res: string) => {
      this.msg = res;
      console.log(this.msg)
    })
  }
}
