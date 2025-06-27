export interface ApiResponse<T> {
  code: number;
  message: string;
  detalle: T;
}

export interface ColorTela {
  id: number;
  nb_color_tela: string;
}

export interface TipoTela {
  id: number;
  nb_tipo_tela: string;
}

export interface RolloTela {
  id: number;
  cantidad: number;
  fecha_ingreso: string;
  precio?: number;
  color: ColorTela;
  tipo_tela: TipoTela;
}

export interface DetalleRollos {
  rollos: RolloTela[];
}

export interface DetalleColores {
    colores: ColorTela[]
}

export interface DetalleTipos {
    telas: TipoTela[]
}

export interface Venta {
  total_venta: number;
  cantidad_vendida: number;
  fecha_venta: string;
  rollo: {
    tipo_tela: string;
    color_tela: string
  }
}