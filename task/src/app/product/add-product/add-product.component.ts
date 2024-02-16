import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDataService } from '../../services/product-data.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnChanges, AfterViewInit {
  @Input() isDisplay = '';
  isFormDisplay: any;
  profileForm: any;
  productObj: any;
  id: any;
  isUpdate: boolean = false;
  constructor(private formBuilder: FormBuilder, private productDataService: ProductDataService) {
    this.profileForm = this.formBuilder.group({
      name: [''],
      Quantity: [''],
      price: [''],
      Description: [''],
      id: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.isFormDisplay = this.isDisplay;
      this.productDataService.subject.subscribe(res => {
        this.isUpdate = true;
        // console.log("res", res);
        this.id = res.id;
        this.productObj = this.profileForm.setValue({
          id:res.id,
          name: res.name,
          Quantity: res.Quantity,
          price: res.price,
          Description: res.Description,
        });

      })
    }
  }

  ngAfterViewInit(): void {
    this.isFormDisplay = this.isDisplay
  }

  ngOnInit() {
  }



  onSubmit() {
    if (this.profileForm.valid) {
      if (this.isUpdate) {
        // this.productDataService.editPrduct(this.productObj,this.id).subscribe(res => {
        //   alert("product update successfull")
        // })
      } else {
        this.productDataService.addProduct(this.profileForm.value).subscribe(res => {
          alert("product added successfull")
        })
      }

    }
    else {
      console.log("form is not valid");
    }
  }
}
