import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ColorTelaService } from "src/app/Services/color-tela.service";
import Swal from "sweetalert2";

@Component({
    selector: 'nuevoColor',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;" 
            (click)="childModal.show()">
            <i class="fa-regular fa-plus"></i>
            Agregar color de tela
        </button>
        <div class="modal fade" bsModal #childModal="bs-modal" role="dialog" id="nuevoUnidadMedida" tabindex="-1" aria-labelledby="nuevoColorTela"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="-webkit-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4); -moz-box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4);
                    box-shadow: 9px 10px 59px 67px rgba(0,0,0,0.4);">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="nuevoColorTela">Agregar color de tela</h1>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="childModal.hide()">
                        <span aria-hidden="true" class="visually-hidden">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="textInputWrapper">
                            <input placeholder="Nombre del color" type="text" class="textInput"
                                [(ngModel)]="nb_colorTela">
                        </div>
                        <div *ngIf="llenarCampos">
                            <p class="fs-6 text-start m-3" style="color: red;">*Especifica el color de tela</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-dark" style="text-decoration: none;" 
                        data-bs-toggle="modal" data-bs-target="#gestionColoresTelas" (click)="childModal.hide()">
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

export class NuevoColorTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    nb_colorTela: string = ''
    llenarCampos = false
    @Output() actualizarColores = new EventEmitter<any>();

    constructor(
        private colorTelaService: ColorTelaService
    ) { }

    createColor() {
        if (this.nb_colorTela) {
            if (this.childModal) this.childModal.hide()
            this.showLoadingMessage(true, 'Guardando')
            const nb_color_tela = {
                'nb_color_tela': this.nb_colorTela
            }

            this.colorTelaService.createColorTela(nb_color_tela)
                .pipe().subscribe((data: any) => {
                    this.showLoadingMessage(false, '')
                    if(data.code == 400){
                        this.showErrorMessage('El color ya existe')
                    } else {
                        this.nb_colorTela = ''
                        setTimeout(() => { }, 100)
                        this.showMessageSucces(data.message)
                        this.actualizarColores.emit();
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