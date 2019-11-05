import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = +route.paramMap.get('id');
    return this.productService.getProduct(id)
      .pipe(
        map(product => ({product: product})),
        catchError(error => {
          const msg = `Retrieval error: ${id}`;
          console.log(msg);
          return of({product: null, error: msg});
        })
      );
  }
}
