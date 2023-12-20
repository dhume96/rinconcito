import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from '../graphql/graphql.queries';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  error: any;
  productForm: FormGroup;
  productId: string;

  constructor(private apollo: Apollo, private router: Router, private route: ActivatedRoute) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      store: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
      pic: new FormControl('')
    });
    this.productId = '';
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (typeof params['productId'] !== 'undefined') {
          this.productId = params['productId'];
          this.apollo.watchQuery({
            query: GET_PRODUCT_BY_ID,
            variables: {
              productId: params['productId']
            }
          }).valueChanges.subscribe(({ data, error }: any) => {
            this.productForm.controls['name'].setValue(data.product.name);
            this.productForm.controls['store'].setValue(data.product.store);
            this.productForm.controls['quantity'].setValue(data.product.quantity);
            this.productForm.controls['unitPrice'].setValue(data.product.unitPrice);
            this.productForm.controls['pic'].setValue(data.product.pic);
            this.error = error;
          }
          );
        }
      });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  editAddProduct() {
    if(this.productId == '')
      this.addProduct();
    else
      this.editProduct();
  }

  editProduct() {
    this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        id: this.productId,
        name: this.productForm.value.name,
        store: this.productForm.value.store,
        quantity: Number(this.productForm.value.quantity),
        unitPrice: Number(this.productForm.value.unitPrice),
        pic: 'testPicURL',
        dateAdded: new Date().getTime().toString(),
      },
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    }).subscribe(({ data }: any) => {
      //this.router.navigate(['/products']);
      //this.productForm.reset();
    }, (error) => {
      this.error = error;
    }
    );
  }

  addProduct() {
    this.apollo.mutate({
      mutation: ADD_PRODUCT,
      variables: {
        name: this.productForm.value.name,
        store: this.productForm.value.store,
        quantity: Number(this.productForm.value.quantity),
        unitPrice: Number(this.productForm.value.unitPrice),
        pic: 'testPicURL',
        dateAdded: new Date().getTime().toString(),
      },
      refetchQueries: [{
        query: GET_PRODUCTS
      }]
    }).subscribe(({ data }: any) => {
      this.router.navigate(['/products']);
      this.productForm.reset();
    }, (error) => {
      this.error = error;
    }
    );
  }
}
