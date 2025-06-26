import { Component } from '@angular/core';
import { ApiResponse, ColorTela, DetalleColores, DetalleRollos, DetalleTipos, RolloTela, TipoTela } from 'src/app/Models';
import { ColorTelaService } from 'src/app/Services/color-tela.service';
import { TelasService } from 'src/app/Services/telas.service';
import { TipoTelaService } from 'src/app/Services/tipo-tela.service';

@Component({
  selector: 'app-listar-telas',
  templateUrl: './listar-telas.component.html',
  styleUrls: ['./listar-telas.component.css']
})
export class ListarTelasComponent {
  telas: RolloTela[] | undefined
  coloresTela: ColorTela[] = []
  tiposTela: TipoTela[] = []
  isLoading: boolean = true
  criterio_tela: string = ""
  criterio_color: string = ""

  constructor(
    private telaService: TelasService,
    private coloresTelaService: ColorTelaService,
    private tiposTelaService: TipoTelaService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.getTelas()
    this.getColores()
    this.getTipos()
  }

  getTelas() {
    setTimeout(() => { }, 1000)
    this.telaService.getAlltelas()
      .pipe()
      .subscribe((data: ApiResponse<DetalleRollos>) => {
        this.telas = data.detalle.rollos
      })
  }

  getColores() {
    this.coloresTelaService.getAllColores()
      .pipe().subscribe((data: ApiResponse<DetalleColores>) => {
        this.coloresTela = data.detalle.colores
      })
  }

  getTipos() {
    this.tiposTelaService.getAllTiposTelas()
      .pipe().subscribe((data: ApiResponse<DetalleTipos>) => {
        this.tiposTela = data.detalle.telas
        this.isLoading = false
      })
  }

  filterTelas(
    telas: RolloTela[] | undefined,
    tipoTela: string,
    colorTela: string
  ): RolloTela[] {
    if (telas && (tipoTela.trim().length >= 3 || colorTela.trim().length >= 3)) {
      return telas.filter((tela) =>
        tela.tipo_tela.nb_tipo_tela.toLowerCase().includes(tipoTela.toLowerCase()) &&
        tela.color.nb_color_tela.toLowerCase().includes(colorTela.toLowerCase())
      );
    } else if (telas) {
      return telas;
    }

    return [];
  }

}
