import { Product } from '../product.module';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})

export class ProductDeleteComponent implements OnInit{

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id ?? '').subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.delete(id ?? '').subscribe( () => {
      this.productService.showMessage('Produto apagado com sucesso!')
      this.cancel()
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
