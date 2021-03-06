import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerMainComponent} from './manager-main/manager-main.component';
import { StatisticsMainComponent} from './statistics/statistics-main/statistics-main.component';
import { MenuMainComponent } from './menu/menu-main/menu-main.component';
import { ManagerGuard } from 'src/app/guards/manager.guard';
import { PersonnelDatabaseComponent } from './personnel/personnel-database/personnel-database.component';
import { PersonnelRegistrationComponent } from './personnel/personnel-registration/personnel-registration.component';
import { RoomEditorMainComponent } from './room-editor/room-editor-main/room-editor-main.component';
import { IncomeComponent } from './statistics/income/income.component';
import { ProductsComponent } from './statistics/products/products.component';
import { CustomersComponent } from './statistics/customers/customers.component';

const routes: Routes = [
  {
    path: '', 
    canActivate: [ManagerGuard],
    component: ManagerMainComponent, 
    children: [ 
    { 
      path: '', 
      redirectTo: 'statistics', 
      pathMatch:'full' 
    },
    { 
      path: 'statistics', 
      canActivate: [ManagerGuard],
      component: StatisticsMainComponent,
      children: [
        { 
          path: '', 
          redirectTo: 'customers', 
          pathMatch:'full' 
        },
        {
          path: 'income',
          component: IncomeComponent,
          canActivate: [ManagerGuard]
        },
        {
          path: 'products',
          component: ProductsComponent,
          canActivate: [ManagerGuard]
        },
        {
          path: 'customers',
          component: CustomersComponent,
          canActivate: [ManagerGuard]
        }
      ] 
    },
    { 
      path: 'menu', 
      canActivate: [ManagerGuard],
      component: MenuMainComponent 
    },
    { 
      path: 'personnel/database',
      canActivate: [ManagerGuard],
      component: PersonnelDatabaseComponent 
    },
    { 
      path: 'personnel/registration', 
      canActivate: [ManagerGuard],
      component: PersonnelRegistrationComponent 
    },
    { 
      path: 'room-editor', 
      canActivate: [ManagerGuard],
      component: RoomEditorMainComponent 
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
