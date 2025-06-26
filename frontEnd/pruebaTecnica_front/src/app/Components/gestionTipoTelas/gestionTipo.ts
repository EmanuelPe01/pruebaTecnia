import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ApiResponse, ColorTela, DetalleColores, DetalleTipos, TipoTela } from "src/app/Models";
import { TipoTelaService } from "src/app/Services/tipo-tela.service";
import Swal from "sweetalert2";

@Component({
    selector: 'gestionTiposTela',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;
                " (click)="parentModal.show()">
            <i class="fas fa-fill-drip"></i>
            Tipos
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gestionTiposTelas">Aministrar tipos</h1>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="cerrarModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive-xl">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">     
                                    <tr
                                        *ngFor="let tipoTela of tiposTela">
                                        <td>{{tipoTela.nb_tipo_tela}}</td>
                                        <td>
                                            <div class="row justify-content-center">
                                                <div class="col col-4 text-center">
                                                    <a class="btn btn-outline-dark" style="
                                                        --bs-btn-font-size: 1rem;
                                                        --bs-btn-padding-y: .4rem; 
                                                        --bs-btn-padding-x: .6rem;
                                                        --bs-btn-hover-bg: rgb(235, 33, 33);
                                                        --bs-btn-hover-border-color: rgb(235, 33, 33);
                                                        "
                                                        (click)="deleteColorTela(tipoTela.id)">
                                                        <i class="fa-solid fa-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <nuevoTipo 
                            (actualizarTipos)="getTipos()"
                        ></nuevoTipo>
                    </div> 
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class GestionTiposTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    @Input() tiposTela: TipoTela[] = []
    @Output() actualizarTipos = new EventEmitter<any>();
    @Output() actualizarInventario = new EventEmitter<any>();

    constructor(
        private tiposTelaService: TipoTelaService
    ) { }

    cerrarModal() {
        if (this.childModal) {
            this.childModal.hide()
            this.actualizarTipos.emit()
        }
    }

    getTipos() {
        this.tiposTelaService.getAllTiposTelas()
            .pipe().subscribe((data: ApiResponse<DetalleTipos>) => {
                this.tiposTela = data.detalle.telas
            })
    }

    deleteColorTela(cd_tipo: number) {
        Swal.fire({
            title: "¿Estas seguro?",
            text: `Esta acción eliminará todas las telas de este tipo`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#000",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.showLoadingMessage(true, 'Eliminando')
                this.tiposTelaService.deleteTipoTela(cd_tipo)
                    .pipe().subscribe((data: any) => {
                        this.showLoadingMessage(false, '')
                        setTimeout(() => { }, 100)
                        this.getTipos()
                        this.showMessageSucces(data.message)
                        this.actualizarInventario.emit()
                    })
            }
        });
    }

    showMessageSucces(message: string) {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    showErrorMessage(message: string) {
        Swal.fire({
            icon: 'error',
            title: message,
            confirmButtonColor: "#000",
            confirmButtonText: "Aceptar",
        })
    }

    showLoadingMessage(flag: boolean, title: string) {
        if (flag) {
            Swal.fire({
                title: title,
                didOpen: () => {
                    Swal.disableButtons()
                    Swal.showLoading(null)
                }
            })
        }
    }
}