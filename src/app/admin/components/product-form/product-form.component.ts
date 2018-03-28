import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProduct } from '../../../shared/models/app-product';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form;
  id: string;
  product: AppProduct = {
    id: null,
    title: null,
    price: null,
    category: null,
    imageUrl: null
  };
  categories$: Observable<any[]>;

  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.getAll();
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id)
          .take(1)
          .subscribe(value => {
            this.product = value;
          });
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigateByUrl('/admin/products');
  }

  delete(id) {
    if (!confirm('Do you want to delete this product?')) {return;}

    this.productService.delete(id);
  }

  get titleControl() {
    return this.form.get('title');
  }

  get priceControl() {
    return this.form.get('price');
  }

  get categoryControl() {
    return this.form.get('category');
  }

  get imageUrlControl() {
    return this.form.get('imageUrl');
  }


}
