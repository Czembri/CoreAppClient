import { IProduct } from './../../_models/product.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil, BehaviorSubject, forkJoin } from 'rxjs';
import { ProductsService } from 'src/app/_services/products.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  public JSONValue: string;
  public product: IProduct;
  public imagePath$ = new BehaviorSubject<string>('');

  private destroyed$ = new Subject<void>();
  private routeId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.routeId = Number(this.route.snapshot.paramMap.get('id') ?? this.data.data.id);
    forkJoin([this.productsService.getProduct(this.routeId), this.productsService.getProductImage(this.routeId)])
      .pipe(takeUntil(this.destroyed$)).subscribe(([product, image]) => {
        this.JSONValue = JSON.stringify(product);
        this.product = product;
        var base64 = this._arrayBufferToBase64(image);
        // TODO displaying an image
        this.imagePath$.next('data:image/jpg;base64, ' + base64);
      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public accept() {
     const product: IProduct = JSON.parse(this.JSONValue);
      this.productsService.updateProduct(product).pipe(takeUntil(this.destroyed$)).subscribe()
  }

  public generateDescription() {
    this.productsService.patchProductDescription(1).pipe(takeUntil(this.destroyed$))
      .subscribe(descr => {
        const product: IProduct = JSON.parse(this.JSONValue);
        product.description = descr;
        this.cdr.detectChanges();
      })
  }

  public generateImage() {
    this.productsService.patchProductImage(this.routeId).pipe(takeUntil(this.destroyed$))
      .subscribe(img => {
        const product: IProduct = JSON.parse(this.JSONValue);
        var base64 = this._arrayBufferToBase64(img);
        product.image = base64;
        this.imagePath$.next('data:image/jpg;base64, ' + base64);
        this.cdr.detectChanges();
      })
  }

  private _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
