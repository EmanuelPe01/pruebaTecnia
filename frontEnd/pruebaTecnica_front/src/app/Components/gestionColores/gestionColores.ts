import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ApiResponse, ColorTela, DetalleColores } from "src/app/Models";
import { ColorTelaService } from "src/app/Services/color-tela.service";
import Swal from "sweetalert2";

@Component({
    selector: 'gestionColoresTela',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;
                " (click)="parentModal.show()">
            <i class="fas fa-fill-drip"></i>
            Colores
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gestionColoresTelas">Aministrar colores</h1>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="cerrarModal()">
                            <span aria-hidden="true" class="visually-hidden">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive-xl">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Color</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">     
                                    <tr
                                        *ngFor="let colorTela of coloresTela">
                                        <td>{{colorTela.nb_color_tela}}</td>
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
                                                        (click)="deleteColorTela(colorTela.id)">
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
                        <nuevoColor 
                            (actualizarColores)="getColores()"
                        ></nuevoColor>
                    </div> 
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class GestionColoresTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    @Input() coloresTela: ColorTela[] = []
    @Output() actualizarColores = new EventEmitter<any>();
    @Output() actualizarInventario = new EventEmitter<any>();

    constructor(
        private coloresTelaService: ColorTelaService
    ) { }

    cerrarModal() {
        if (this.childModal) {
            this.childModal.hide()
            this.actualizarColores.emit()
        }
    }

    getColores() {
        this.coloresTelaService.getAllColores()
            .pipe().subscribe((data: ApiResponse<DetalleColores>) => {
                this.coloresTela = data.detalle.colores
            })
    }

    deleteColorTela(cd_color: number) {
        Swal.fire({
            title: "¿Estas seguro?",
            text: `Esta acción eliminará todas las telas de este color`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#000",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.showLoadingMessage(true, 'Eliminando')
                this.coloresTelaService.deleteColorTela(cd_color)
                    .pipe().subscribe((data: any) => {
                        this.showLoadingMessage(false, '')
                        setTimeout(() => { }, 100)
                        this.getColores()
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