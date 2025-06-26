import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, DetalleRollos, DetalleTipos, endpoint } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTelaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTiposTelas(): Observable<ApiResponse<DetalleTipos>> {
    return this.http.get<ApiResponse<DetalleTipos>>(endpoint + 'showAllTiposTelas')
  }

  deleteTipoTela(cd_tipo: number) {
    return this.http.delete(endpoint + 'dropTipoTela/' + cd_tipo)
  }

  createTipoTela(tipo: any) {
    return this.http.post(endpoint + 'createTipoTela', tipo)
  }
}
