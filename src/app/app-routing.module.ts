import { ReparationsComponent } from './components/reparations/reparations.component';

import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { MechanicComponent } from './components/mechanic/mechanic.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { RegisterComponent } from './components/users/register/register.component';
import { NewCarComponent } from './components/administration/new-car/new-car.component';
import { NewReparationComponent } from './components/administration/new-reparation/new-reparation.component';
import { NewClientComponent } from './components/administration/new-client/new-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CarsComponent } from './components/cars/cars.component';
import { CardCarComponent } from './components/card-car/card-car.component';
import { CardClientComponent } from './components/card-client/card-client.component';
import { CardReparationComponent } from './components/card-reparation/card-reparation.component';
import { MechanicsComponent } from './components/mechanics/mechanics.component';
import { CardMechanicComponent } from './components/card-mechanic/card-mechanic.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CardEmployeeComponent } from './components/card-employee/card-employee.component';
import { EditReparationComponent } from './components/administration/edit-reparation/edit-reparation.component';
import { EditAdminComponent } from './components/administration/edit-admin/edit-admin.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { UpdateCarComponent } from './components/administration/update-car/update-car.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo: "home"
  },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent , canActivate: [
    () => inject(LoginGuard).canActivate()
  ]},
  {
    path: "administration", component: AdministrationComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "admins", component: EmployeesComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "admins/:id", component: CardEmployeeComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "users/edit/:id", component: EditAdminComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "mechanic", component: MechanicComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "clients/new", component: NewClientComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
    
  {
    path: "clients", component: ClientsComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "clients/update/:id", component: EditClientComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "mechanics", component: MechanicsComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "mechanics/:id", component: CardMechanicComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "reparations/new", component: NewReparationComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "reparations", component: ReparationsComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "reparations/:id", component: CardReparationComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "reparations/edit/:id", component: EditReparationComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "clients/new", component: NewClientComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "clients", component: ClientsComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "clients/:id", component: CardClientComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "cars/new", component: NewCarComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ] },
  {
    path: "cars", component: CarsComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "cars/:id", component: CardCarComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
},
  {
    path: "cars/update/:id", component: UpdateCarComponent, canActivate: [
      () => inject(LoginGuard).canActivate()
    ]
  },
    
  
  { path: "**", redirectTo: "/home" },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
