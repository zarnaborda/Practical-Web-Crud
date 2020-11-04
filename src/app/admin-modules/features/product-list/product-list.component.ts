import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MsgConstant } from '../../../shared/config/constants/msg-constants';
import { MockService } from '../../../core/services/mock.service';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productsDetailHeader: any = [];
  productsDetails: any = [];
  displayPopup: Boolean = false;
  productFormDetail: any;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.productsDetailHeader = [
      { field: 'id', header: '#' },
      { field: 'name', header: 'Product Name' },
      { field: 'type', header: 'Product Type' },
      { field: 'manufacture_date', header: 'Mfg Date' },
      { field: 'price', header: 'Price' },
      { field: 'description', header: 'Description' },
    ];
    this.getProductsDetail();
  }

  getProductsDetail() {
    const urlId = `${environment.url}/products/v1`;
    this.mockService.loadGetJSON(urlId, this.successGetProducts);
  }

  successGetProducts = (res) => {
    this.productsDetails = [];
    if (!res.error_status && res.code === MsgConstant.CODE_GET_PRODUCT_DETAIL_200 && res.data) {
      this.productsDetails = res.data;
    }
  }

  openProductFormModel(productData?: any) {
    this.productFormDetail = {
      id: productData._id ? productData._id : 0,
      name: productData.name ? productData.name : null,
      type: productData.type ? productData.type : null,
      manufacture_date: productData.manufacture_date ? new Date(productData.manufacture_date).toISOString().substring(0, 10) : null,
      price: productData.price ? productData.price : null,
      image: productData.image ? productData.image : null,
      description: productData.description ? productData.description : null,
    };
    this.displayPopup = true;
  }

  closeDialog() {
    this.productFormDetail = null;
    this.displayPopup = false;
    $("#productModal").modal("hide");
  }

  updateProductData(value) {
    if(value) {
      this.getProductsDetail();
      this.closeDialog();
      alert('Product Updated Successfully');
    }
  }

  deleteProduct(id) {
    const urlId = `${environment.url}/products/v1/${id}`;
    this.mockService.loadDeleteJSON(urlId, this.successDeleteProduct);
  }

  successDeleteProduct = (res) => {
    if (!res.error_status && res.code === MsgConstant.CODE_DELETE_PRODUCT_DETAIL_200) {
      this.getProductsDetail();
      alert('Product Deleted Successfully');
    } else {
      alert('Error: ' + res.message);
    }
  }
}
