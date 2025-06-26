import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { TipoTelaService } from "src/app/Services/tipo-tela.service";
import Swal from "sweetalert2";

@Component({
    selector: 'nuevoTipo',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;" 
            (click)="childModal.show()">
            <i class="fa-regular fa-plus"></i>
            Agregar tipo de tela
        </button>
        <div class="modal fade" bsModal #childModal="bs-modal" role="dialog" id="nuevoUnidadMedida" tabindex="-1" aria-labelledby="nuevoColorTela"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="-webkit-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4); -moz-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4);
                    box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4);">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="nuevoColorTela">Agregar tipo de tela</h1>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="childModal.hide()">
                        <span aria-hidden="true" class="visually-hidden">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="textInputWrapper">
                            <input placeholder="Nombre del tipo de tela" type="text" class="textInput"
                                [(ngModel)]="nb_tipoTela">
                        </div>
                        <div *ngIf="llenarCampos">
                            <p class="fs-6 text-start m-3" style="color: red;">*Especifica el tipo de tela</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-dark" style="text-decoration: none;" 
                        data-bs-toggle="modal" data-bs-target="#gestionTiposTelas" (click)="childModal.hide()">
                            Cancelar
                        </button>
                        <button type="button" class="btn btn-outline-success" style="
                            --bs-btn-font-size: 1rem;
                            --bs-btn-padding-y: .4rem; 
                            --bs-btn-padding-x: .6rem;
                            text-decoration: none;
                        " (click)="createColor()">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class NuevoTipoTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    nb_tipoTela: string = ''
    @Output() actualizarTipos = new EventEmitter<any>();
    llenarCampos = false

    constructor(
        private tipoTelaService: TipoTelaService
    ) { }

    createColor() {
        if (this.nb_tipoTela) {
            if (this.childModal) this.childModal.hide()
            this.showLoadingMessage(true, 'Guardando')
            const nb_tipo_tela = {
                'nb_tipo_tela': this.nb_tipoTela
            }

            this.tipoTelaService.createTipoTela(nb_tipo_tela)
                .pipe().subscribe((data: any) => {
                    this.showLoadingMessage(false, '')
                    if(data.code == 400){
                        this.showErrorMessage('El tipo de tela ya existe')
                    } else {
                        this.nb_tipoTela = ''
                        setTimeout(() => { }, 100)
                        this.showMessageSucces(data.message)
                        this.actualizarTipos.emit();
                        this.llenarCampos = false
                    }
                })
        } else {
            this.llenarCampos = true
        }
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