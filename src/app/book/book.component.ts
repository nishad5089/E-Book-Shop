import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Book } from 'app/_models/book';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BookService } from 'app/services/book.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/_models/category';
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
 isChecked: Boolean = false;
 categories: Category[];
 selectedCategories = [];
 @ViewChild('formDirective') myNgForm;
 @ViewChild('Image') fileInputVariable: ElementRef;
 msg: string;
   createForm: FormGroup;
  constructor(private bookService: BookService, private fb: FormBuilder, private categoryService: CategoryService) {
    this.imageUrl =  '../../assets/img/Default_image.jpg';
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]],
      categoryCheckbox: [false, [Validators.required]],
    });
   }
   ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res as Category[];
    })
  }
   get title() {
    return this.createForm.get('title');
  }

  get author() {
    return this.createForm.get('author');
  }

  get category() {
    return this.createForm.get('isbn');
  }

  get price() {
    return this.createForm.get('price');
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
  showNotification(from, align, type, msg) {
    $.notify({
        icon: 'notifications',
        message: msg
    }, {
        type: type,
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
if (this.isImageChnaged) {
    this.bookService.saveBook(this.book, this.fileToUpload, this.selectedCategories).subscribe(res => {
      this.myNgForm.resetForm();
      this.showNotification('top', 'right', 'success', 'Book Successfully Added');
      this.fileInputVariable.nativeElement.value = '';
      this.imageUrl =  '../../assets/img/Default_image.jpg';
      this.isImageChnaged = false;
    }, error => {
      console.log(error)
    })
} else {
  this.showNotification('top', 'right', 'danger', 'Image Not Added');
}
}
}
  getBook() {
    this.bookService.get().subscribe((res: string) => {
      this.msg = res;
      console.log(this.msg)
    })
  }
  onChange(event, itemId) {
    console.log('onChange event.checked : ' + event.checked + ' item Id: ' + itemId);
    if (event.checked) {
      this.selectedCategories.push(itemId);
    } else {
      const index: number = this.selectedCategories.indexOf(itemId);
      if (index !== -1) {
          this.selectedCategories.splice(index, 1);
      }
    }
    // for (const category of this.selectedCategories) {
    //   console.log(category); // prints values: 10, 20, 30, 40
    // }
  }
}
