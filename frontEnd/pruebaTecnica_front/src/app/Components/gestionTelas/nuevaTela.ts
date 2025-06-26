import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ApiResponse, ColorTela, DetalleColores, DetalleTipos, TipoTela } from "src/app/Models";
import { TelasService } from "src/app/Services/telas.service";
import Swal from "sweetalert2";

@Component({
    selector: 'nuevaTela',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;
                " (click)="parentModal.show()">
            <i class="fas fa-box-open"></i>
            Ingresar tela al inventario
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-dialog-centered">
                <form [formGroup]="formRegistro" (ngSubmit)="saveTela()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="nuevaTelas">Agregar tela al inventario</h1>
                            <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="cerrarModal()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col col-12 m-2">
                                    <div class="input-container">
                                        <label class="label" for="tipoTela">Tipo de tela</label>
                                        <select id="tipoTela" class="select-estatus"
                                            formControlName="cd_tipo_tela">
                                            <option selected style="color: darkgrey;">Selecciona un tipo de tela</option>
                                            <option *ngFor="let tela of tiposTela"
                                                [value]="tela.id">
                                                {{tela.nb_tipo_tela}}</option>
                                        </select>
                                        <div class="underline"></div>
                                    </div>
                                    <div *ngIf="formRegistro.get('cd_tipo_tela')?.hasError('required') && formRegistro.get('cd_tipo_tela')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                                <div class="col col-12 m-2">
                                    <div class="input-container">
                                        <label class="label" for="colorTela">Color de tela</label>
                                        <select id="colorTela" class="select-estatus"
                                            formControlName="cd_color">
                                            <option selected style="color: darkgrey;">Selecciona un color de tela</option>
                                            <option *ngFor="let color of coloresTela"
                                                [value]="color.id">
                                                {{color.nb_color_tela}}</option>
                                        </select>
                                        <div class="underline"></div>
                                    </div>
                                    <div *ngIf="formRegistro.get('cd_color')?.hasError('required') && formRegistro.get('cd_color')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                                <div class="col col-12 m-2">
                                    <div class="input-container">
                                        <label class="label" for="cantidad-tela">Cantidad (metros)</label>
                                        <input required="required" [min]="1" type="number" id="cantidad-tela" formControlName="cantidad">
                                        <div class="underline"></div>
                                    </div>
                                    <div *ngIf="formRegistro.get('cantidad')?.hasError('required') && formRegistro.get('cantidad')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
                                    </div>
                                </div>
                                <div class="col col-12">
                                    <div class="textInputWrapper">
                                        <input 
                                            required="required"
                                            placeholder="Fecha de ingreso" 
                                            [type] = "inputFecha"  
                                            class="textInput" 
                                            formControlName="fecha_ingreso"
                                            (focus)="onFocus()"
                                            (blur)="onBlur()"
                                        >
                                    </div> 
                                    <div *ngIf="formRegistro.get('fecha_ingreso')?.hasError('required') && formRegistro.get('fecha_ingreso')?.touched;">
                                        <p class="errorText">Campo requerido*</p>
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
                                    " (click)="limpiarForm()">
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

export class NuevaTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    @Input() coloresTela: ColorTela[] = []
    @Input() tiposTela: TipoTela[] = []
    @Output() actualizarInventario = new EventEmitter<any>();
    formRegistro: FormGroup
    inputFecha: string = ''

    constructor(
        private _form: FormBuilder,
        private telasService: TelasService
    ) {
        this.formRegistro = this._form.group({
            cd_tipo_tela: ['', [Validators.required]],
            cd_color: ['', [Validators.required]],
            cantidad: ['', [Validators.required]],
            fecha_ingreso: ['', [Validators.required]],
        });
    }


    saveTela() {
        if (this.formRegistro.valid) {
            const datosForm = this.formRegistro.value;
            this.telasService.createRolloTela(datosForm).
                pipe().subscribe((data: any) => {
                    if (data.code == 409 || data.code == 500 || data.code == 400) {
                        this.showErrorMessage(data.message)
                    } else {
                        this.formRegistro.reset()
                        setTimeout(() => { }, 100)
                        this.showMessageSucces(data.message)
                        this.actualizarInventario.emit();
                    }
                })
        }
    }

    onBlur() {
        const fecha = this.formRegistro.get('fecha_nacimiento')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
    }

    cerrarModal() {
        if (this.childModal) {
            this.childModal.hide()
            this.formRegistro.reset()
        }
    }

    limpiarForm() {
        if (this.childModal) {
            this.childModal.hide()
            this.formRegistro.reset()
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