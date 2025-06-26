import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ColorTela, DetalleColores, endpoint } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorTelaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllColores(): Observable <ApiResponse<DetalleColores>>{
      return this.http.get<ApiResponse<DetalleColores>>(endpoint + 'showAllColors')
  }

  deleteColorTela(cd_color: number){
    return this.http.delete(endpoint + 'dropColor/' + cd_color)
  }

  createColorTela(color: any) {
    return this.http.post(endpoint + 'createColor', color)
  }
}
