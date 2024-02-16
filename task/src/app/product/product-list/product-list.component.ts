import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductDataService } from '../../services/product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, AddProductComponent, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


export class ProductListComponent implements OnInit {
  dataSource: any;
  isDisplay: any = false;
  public productList: any = [];
  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productDataService.getProductList().subscribe((res: any) => {
      this.productList = res;
      this.dataSource = this.productList;
    })
  }

  displayedColumns: string[] = ['name', 'Quantity', 'price', 'Description', "action"];

  public removeProduct(id: any) {
    this.productDataService.removeProduct(id).subscribe((res) => {
      this.getProductList();
    })
  }

  editProduct(productItem: any) {
    this.productDataService.setData(productItem)
    localStorage.setItem("productObj", JSON.stringify(productItem))
  }

  addProduct() {
    this.isDisplay = true;
  }
}
