import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ApiResponse, ColorTela, DetalleColores, DetalleTipos, RolloTela, TipoTela } from "src/app/Models";
import { TelasService } from "src/app/Services/telas.service";
import Swal from "sweetalert2";

@Component({
    selector: 'editarTela',
    template: `
        <div class="modal fade" id="editarTela" tabindex="-1" aria-labelledby="editarTelaLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <form [formGroup]="formRegistro" (ngSubmit)="saveTela()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editarTelas">Editar {{rolloTela?.tipo_tela?.nb_tipo_tela}} {{rolloTela?.color?.nb_color_tela}}</h1>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col col-12">
                                    <div class="row justify-content-center">
                                        <div class="col col-5 m-2">
                                            <div class="input-container">
                                                <label class="label" for="cantidad-tela">Cantidad (metros)</label>
                                                <input required="required" [min]="0" step="0.5" type="number" id="cantidad-tela" formControlName="cantidad">
                                                <div class="underline"></div>
                                            </div>
                                            <div *ngIf="formRegistro.get('cantidad')?.hasError('required') && formRegistro.get('cantidad')?.touched;">
                                                <p class="errorText">Campo requerido*</p>
                                            </div>
                                        </div>
                                        <div class="col col-5 m-2">
                                            <div class="input-container">
                                                <label class="label" for="precio-tela">Precio x Metro (MXN)</label>
                                                <input required="required" [min]="0" step="0.5" type="number" id="precio-tela" formControlName="precio">
                                                <div class="underline"></div>
                                            </div>
                                            <div *ngIf="formRegistro.get('precio')?.hasError('required') && formRegistro.get('precio')?.touched;">
                                                <p class="errorText">Campo requerido*</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>         
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-dark" style="
                                        --bs-btn-font-size: 1rem;
                                        --bs-btn-padding-y: .4rem; 
                                        --bs-btn-padding-x: .6rem;
                                        text-decoration: none;
                                    "data-bs-dismiss="modal" (click)="limpiarForm()">
                                    Cancelar
                            </button>
                            <button class="btn btn-outline-success" style="
                                --bs-btn-font-size: 1rem;
                                --bs-btn-padding-y: .4rem; 
                                --bs-btn-padding-x: .6rem;
                                text-decoration: none;
                            ">Aceptar
                            </button>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    `,
    styleUrls: ['./style.css']
})

export class EditarTelaComponent implements OnChanges {
    @Input() rolloTela: RolloTela | undefined
    @Output() actualizarInventario = new EventEmitter<any>();
    formRegistro: FormGroup


    constructor(
        private _form: FormBuilder,
        private telasService: TelasService
    ) {
        this.formRegistro = this._form.group({
            cantidad: [null, [Validators.required, Validators.min(0.1)]],
            precio: [null, [Validators.required, Validators.min(0.1)]],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["rolloTela"] && changes["rolloTela"].currentValue) {
            this.rolloTela = changes["rolloTela"].currentValue
            this.formRegistro.patchValue({
                cantidad: this.rolloTela?.cantidad,
                precio: this.rolloTela?.precio
            })
        }
    }

    saveTela() {
        if (this.formRegistro.valid && this.rolloTela) {
            const datosForm = this.formRegistro.value;
            this.telasService.updateRolloTela(datosForm, this.rolloTela?.id).
                pipe().subscribe((data: any) => {
                    if (data.code == 409 || data.code == 500 || data.code == 400) {
                        this.showErrorMessage(data.message)
                    } else {
                        setTimeout(() => { }, 100)
                        this.showMessageSucces(data.message)
                        this.actualizarInventario.emit();
                    }
                })
        }
    }

    limpiarForm() {
        this.formRegistro.reset()
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