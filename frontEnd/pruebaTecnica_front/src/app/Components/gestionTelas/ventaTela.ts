import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ApiResponse, ColorTela, DetalleColores, DetalleTipos, RolloTela, TipoTela } from "src/app/Models";
import { TelasService } from "src/app/Services/telas.service";
import Swal from "sweetalert2";

@Component({
    selector: 'ventaTela',
    template: `
        <button class="btn btn-outline-dark" style="text-decoration: none;
                " (click)="parentModal.show()">
            <i class="fa-solid fa-cash-register"></i>
            Realizar venta
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-dialog-centered">
                <form [formGroup]="formRegistro" (ngSubmit)="saveVenta()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="ventaTelas">Realizar inventario</h1>
                            <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="cerrarModal()">
                                <span aria-hidden="true" class="visually-hidden">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col col-12 m-2">
                                    <div class="row">
                                        <div class="col col-8">
                                            <div class="input-container">
                                                <label class="label pb-5" for="colorTela">Telas</label>
                                                <select id="colorTela" class="select-estatus"
                                                    (change)="obtenerPrecio($event)"
                                                    formControlName="cd_rollo_tela">
                                                    <option selected style="color: darkgrey;">Selecciona una tela</option>
                                                    <option *ngFor="let rolloTela of rollosTela"
                                                        [value]="rolloTela.id">
                                                        {{rolloTela.tipo_tela.nb_tipo_tela}} {{rolloTela.color.nb_color_tela}}</option>
                                                </select>
                                                <div class="underline"></div>
                                            </div>
                                            <div *ngIf="formRegistro.get('cd_rollo_tela')?.hasError('required') && formRegistro.get('cd_rollo_tela')?.touched;">
                                                <p class="errorText">Campo requerido*</p>
                                            </div>
                                        </div>
                                        <div class="col col-4">
                                            <div class="input-container">
                                                <label class="label" for="metros-tela">Metros disponibles</label>
                                                <input required="required" [min]="0" step="0.5" type="number" id="metros-tela" formControlName="metros" readonly>
                                                <div class="underline"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-12">
                                    <div class="row justify-content-center">
                                        <div class="col col-5 m-2">
                                            <div class="input-container">
                                                <label class="label" for="cantidad-tela">Cantidad (metros)</label>
                                                <input (change)="calcularTotal($event)" required="required" [min]="0" step="0.5" type="number" id="cantidad-tela" formControlName="cantidad_vendida">
                                                <div class="underline"></div>
                                            </div>
                                            <div *ngIf="formRegistro.get('cantidad_vendida')?.hasError('required') && formRegistro.get('cantidad_vendida')?.touched;">
                                                <p class="errorText">Campo requerido*</p>
                                            </div>
                                        </div>
                                        <div class="col col-5 m-2">
                                            <div class="input-container">
                                                <label class="label" for="precio-tela">Total de venta</label>
                                                <input required="required" [min]="0" step="0.5" type="number" id="precio-tela" formControlName="total_venta" readonly>
                                                <div class="underline"></div>
                                            </div>
                                            <div *ngIf="formRegistro.get('total_venta')?.hasError('required') && formRegistro.get('total_venta')?.touched;">
                                                <p class="errorText">Campo requerido*</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                                <div class="col col-12">
                                    <div class="textInputWrapper">
                                        <input 
                                            required="required"
                                            placeholder="Fecha de venta" 
                                            [type] = "inputFecha"  
                                            class="textInput" 
                                            formControlName="fecha_venta"                                            
                                            (focus)="onFocus()"
                                            (blur)="onBlur()"
                                        >
                                    </div> 
                                    <div *ngIf="formRegistro.get('fecha_venta')?.hasError('required') && formRegistro.get('fecha_venta')?.touched;">
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

export class VentaTelaComponent {
    @ViewChild('parentModal', { static: false }) childModal?: ModalDirective;
    @Input() rollosTela: RolloTela[] = []
    @Output() actualizarInventario = new EventEmitter<any>();
    precioUnitario: number | undefined
    cantidadVendida: number = 0
    formRegistro: FormGroup
    inputFecha: string = ''

    constructor(
        private _form: FormBuilder,
        private telasService: TelasService
    ) {
        this.formRegistro = this._form.group({
            cd_rollo_tela: ['', [Validators.required]],
            cantidad_vendida: [null, [Validators.required, Validators.min(0.1)]],
            total_venta: ['', [Validators.required]],
            fecha_venta: ['', [Validators.required]],
            metros: [{ value: null, disabled: true }],
        });
        this.getFechaHoy()
    }


    saveVenta() {
        if (this.formRegistro.valid) {
            const datosForm = this.formRegistro.value;
            this.telasService.storeVenta(datosForm).
                pipe().subscribe((data: any) => {
                    if (data.code == 409 || data.code == 500 || data.code == 400) {
                        this.showErrorMessage(data.message)
                        console.log(data)
                    } else {
                        this.formRegistro.reset()
                        setTimeout(() => { }, 100)
                        this.showMessageSucces(data.message)
                        this.actualizarInventario.emit();
                    }
                })
        }
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

    getFechaHoy(): string {
        return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    }

    obtenerPrecio(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const rolloId = Number(selectElement.value);
        this.precioUnitario = this.rollosTela.find(rollosTela => rollosTela.id == rolloId)?.precio;
        
        this.formRegistro.patchValue({
            metros: this.rollosTela.find(rollosTela => rollosTela.id == rolloId)?.cantidad
        })
        
        if(this.precioUnitario && this.cantidadVendida){
            this.formRegistro.patchValue({
                total_venta: Math.round((this.precioUnitario * this.cantidadVendida + Number.EPSILON) * 100) / 100,
            })
        }
    }

    calcularTotal(event: any) {
        this.cantidadVendida = Number(event.target.value);
        if(this.precioUnitario && this.cantidadVendida){
            this.formRegistro.patchValue({
                total_venta: Math.round((this.precioUnitario * this.cantidadVendida + Number.EPSILON) * 100) / 100,
            })
        }
    }

    onBlur() {
        const fecha = this.formRegistro.get('fecha_venta')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
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