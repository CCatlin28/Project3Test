import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReadlistComponent } from './components/readlist/readlist.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { AdvSearchComponent } from './components/adv-search/adv-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/:search/:searchType/:pageNumber', component: ProductsComponent},
  { path: 'products/:search/:searchType', component: ProductsComponent},
  { path: 'products/:ISBN', component: BookDetailComponent},
  // { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  // { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  // { path: 'products/:catName/:catId', component: SubCategoryComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'readlist', component: ReadlistComponent },
  { path: "advancesearch", component: AdvSearchComponent },
  // { path: '**', component: PageNotFoundComponent }
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
