import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_PRODUCT, GET_PRODUCTS } from '../graphql/graphql.queries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  error: any;

  constructor(private apollo: Apollo, private router: Router) { }

  goCreateProduct() {
    this.router.navigate(['/add-edit-product']);
  }

  editProduct(productId: string) {
    this.router.navigate(['/add-edit-product'], { queryParams: { productId } });
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_PRODUCTS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.products = data.products.edges;
      this.error = error;
    }
    );
  }
}
