import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
    private sharedCategories: any[] = [];

    setCategories(categories: any[]) {
      this.sharedCategories = categories;
    }
  
    getCategories() {
      return this.sharedCategories;
    }
  
    // Agrega un método que devuelva un observable para los datos de categorías
    getCategoriesObservable(): Observable<any[]> {
      return of(this.sharedCategories);
    }
}
