import { IProduct } from './../../_models/product.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil, BehaviorSubject, forkJoin } from 'rxjs';
import { ProductsService } from 'src/app/_services/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommandsDataTypeModel } from 'src/app/shared/models/commands-data-type.model';
import { Store } from '@ngxs/store';
import { GetProduct } from '../state/products.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  public JSONValue: string;
  public product: IProduct;
  public imagePath$ = new BehaviorSubject<SafeUrl>(undefined);

  private destroyed$ = new Subject<void>();
  private routeId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICommandsDataTypeModel,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private store: Store,
    domSanitizer: DomSanitizer) {
      this.routeId = Number(this.route.snapshot.paramMap.get('id') ?? this.data.data.id);
      forkJoin([this.productsService.getProduct(this.routeId), this.productsService.getProductImage3(this.routeId)])
        .pipe(takeUntil(this.destroyed$)).subscribe(([product, image]) => {
          this.JSONValue = JSON.stringify(product);
          this.product = product;
          // var base64 = this._arrayBufferToBase64(image);
          // let TYPED_ARRAY = new Uint8Array(image);
          // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          //   return data + String.fromCharCode(byte);
          //   }, '');
          //   let base64String = btoa(STRING_CHAR);
            this.createImageFromBlob(image);
          // this.imagePath$.next(domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '  + base64));
          this.cdr.detectChanges();
      });
    }

  public ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
      description: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(1000)])),
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

  public onSubmit() {
    // TODO
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

  private createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagePath$.next(reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
