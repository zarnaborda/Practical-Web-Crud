import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { MsgConstant } from '../../../shared/config/constants/msg-constants';
import { MockService } from '../../../core/services/mock.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() productData: any;
  @Output() updateProductData: any = new EventEmitter<Boolean>();

  productForm: FormGroup;
  isSubmitted: Boolean = false;
  isImageAdded: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    if (this.productData.image) {
      this.productData.new_image = this.productData.image;
      this.productData.image = null;
    }
    this.buildForm(this.productData)
  }

  buildForm(prodFormData) {
    this.isSubmitted = false;
    const data = prodFormData;
    this.productForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      type: [data.type, Validators.required],
      manufacture_date: [data.manufacture_date, Validators.required],
      price: [data.price, Validators.required],
      image: [data.image],
      description: [data.description, Validators.required],
    });
  }

  clearForm() {
    this.isSubmitted = false;
    this.productForm.reset();
    this.isImageAdded = false;
    this.productData = null;
  }

  saveProductDetail() {
    this.isSubmitted = true;
    if (this.productForm.invalid || !this.productData.new_image) {
      return;
    } else {
      const body = this.productForm.value;
      if (this.productData.new_image) {
        body.image = this.productData.new_image;
      }
      body.price = parseFloat(body.price);
      if (this.productData.id == 0) {
        this.addProduct(body);
      } else {
        this.updateProduct(body);
      }
    }
  }

  addProduct(body) {
    const urlId = `${environment.url}/products/v1`;
    this.mockService.loadPostJSON(urlId, body, this.successAddProduct);
  }

  successAddProduct = (res) => {
    if (!res.error_status && res.code === MsgConstant.CODE_SAVE_PRODUCT_DETAIL_200) {
      this.clearForm();
      this.updateProductData.emit(true);
    } else {
      alert('Error' + res.message)
    }
  }

  updateProduct(body) {
    const urlId = `${environment.url}/products/v1/${this.productData.id}`;
    this.mockService.loadPutJSON(urlId, body, this.successUpdateProduct);
  }

  successUpdateProduct = (res) => {
    if (!res.error_status && res.code === MsgConstant.CODE_UPDATE_PRODUCT_DETAIL_200) {
      this.clearForm();
      this.updateProductData.emit(true);
    } else {
      alert('Error' + res.message)
    }
  }

  selectImage(event) {
    this.isImageAdded = true;
    this.manageFileUploaded(event);
  }

  manageFileUploaded(event) {
    const extArray = ['jpeg', 'jpg', 'png'];
    const fileList: FileList = event.target.files || event.srcElement.files;
    const fileExt = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1).toLowerCase();
    if (extArray.indexOf(fileExt) === -1) {
      this.isImageAdded = false;
      console.error('ALLOWED_FILE_EXTENSION_UPLOAD');
      alert(`File extension not allowed to upload`)
    } else if (fileList[0].size > 20000000) {
      this.isImageAdded = false;
      console.error('MAX_FILE_LIMIT');
      alert(`File size limit exceeds`)
    } else if (fileList[0].size === 0) {
      this.isImageAdded = false;
      console.error('0_BYTE_FILE_SIZE');
      alert(`File with size 0 not allowed`)
    } else {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(fileList[0]);
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.productData.new_image = btoa(binaryString);
  }

  isNumber(event: any) {
    event = (event) ? event : window.event;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateDecimalInputs(event, beforeDecimal, afterDecimal) {
    let value = event.srcElement.value;
    event.srcElement.value = value.replace(/[^\d.]/g, '')
      .replace(new RegExp("(^[\\d]{" + beforeDecimal + "})[\\d]", "g"), '$1')
      .replace(/(\..*)\./g, '$1')
      .replace(new RegExp("(\\.[\\d]{" + afterDecimal + "}).", "g"), '$1');
  }

  get f() {
    return this.productForm.controls;
  }

}
