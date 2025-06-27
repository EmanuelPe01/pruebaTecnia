import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, DetalleRollos, Venta } from '../Models/ModelResponseTelas';
import { Observable } from 'rxjs';
import { endpoint } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class TelasService {

  constructor(
    private http: HttpClient
  ) { }

  getAlltelas(): Observable <ApiResponse<DetalleRollos>>{
    return this.http.get<ApiResponse<DetalleRollos>>(endpoint + 'showAllRolloTelas')
  }

  deleteRolloTela(id: number){
    return this.http.delete(endpoint + 'dropColor/' + id)
  }

  createRolloTela(tela: any) {
    return this.http.post(endpoint + 'createRolloTela', tela)
  }

  updateRolloTela(tela: any, id: number) {
    return this.http.put(endpoint + 'updateRolloTela/' + id, tela)
  }

  storeVenta(ventaTela: any) {
    return this.http.post(endpoint + 'storeVenta', ventaTela)
  }

  getVentas(): Observable<ApiResponse<Venta[]>> {
    return this.http.get<ApiResponse<Venta[]>>(endpoint + 'showAllVentas')
  }
}
