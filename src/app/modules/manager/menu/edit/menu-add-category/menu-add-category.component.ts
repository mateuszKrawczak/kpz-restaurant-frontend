import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { MenuCategory } from "../../../../../models/menu-category";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: "app-menu-add-category",
  templateUrl: "./menu-add-category.component.html",
  styleUrls: ["./menu-add-category.component.scss"]
})
export class MenuAddCategoryComponent implements OnInit, OnDestroy {
  
  acceptIcon = faCheck;
  cancelIcon = faTimes;

  public categoryForm: FormGroup;
  private category: MenuCategory;

  categorySubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private storageService:LocalStorageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.newCategoryForm();
  }

  newCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required]
      //icon: [null, Validators.required]
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {

      this.category = this.categoryForm.value;
      this.category.name = this.category.name.toUpperCase();
      this.category.restaurantId = +this.storageService.getRestaurantId();
      this.categorySubscription = this.categoryService.addCategory(this.category).subscribe(data => {
        this.toastrService.success("Category has been added!");
        this.resetForm();
        this.router.navigateByUrl('/manager/statistics', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/manager/menu']);
        }); 
      }, err => {
        this.toastrService.error("Error!");
      });

    }

  }

  resetForm() {
    this.categoryForm.reset();
  }

  handleUpload(e): void {
    //próba odczytania ścieżki z pliku
  }

  ngOnDestroy(){
    if(this.categorySubscription) this.categorySubscription.unsubscribe();
  }

}
