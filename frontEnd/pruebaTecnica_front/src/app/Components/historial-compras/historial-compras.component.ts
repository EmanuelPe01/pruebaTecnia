import { Component } from '@angular/core';
import { ApiResponse, Venta } from 'src/app/Models';
import { TelasService } from 'src/app/Services/telas.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent {
  ventas: Venta[] = []
  isLoading: boolean = true
  criterio_tela: string = ""
  criterio_color: string = ""

  constructor(
    private telaService: TelasService
  ) {}

  ngOnInit(){
    this.getVentas()
  }

  getVentas() {
    this.telaService.getVentas().pipe().subscribe((data: ApiResponse<Venta[]>) => {
      this.ventas = data.detalle
      console.log(this.ventas)
      this.isLoading = false
    })
  }

  filterVentas(ventas: Venta[], tela: string, color: string) : Venta[] {
    if (ventas && (tela.trim().length >= 3 || color.trim().length >= 3)) {
      return ventas.filter((venta) =>
        venta.rollo.tipo_tela.toLowerCase().includes(tela.toLowerCase()) &&
        venta.rollo.color_tela.toLowerCase().includes(color.toLowerCase())
      );
    } else if (ventas) {
      return ventas;
    }

    return [];
  }
}
