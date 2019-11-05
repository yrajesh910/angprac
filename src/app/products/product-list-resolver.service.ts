import { Resolve } from '@angular/router';
import { Product } from './product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductListResolver implements Resolve<Product[]> {
    constructor(private productService: ProductService) { }

    resolve(): Observable<Product[]> {
        return this.productService.getProducts();
    }
}