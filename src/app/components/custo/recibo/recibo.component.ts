
import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'recibo-dialog',
    templateUrl: 'recibo.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ReciboComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ReciboComponent>,
        @Inject(MAT_DIALOG_DATA) public data: number) { }

    caminho: string;

    ngOnInit() {
        this.caminho = `assets/documentos/${this.data}.jpeg`;
    }

    definirIcones() {
   }

    fechar(): void {
        this.dialogRef.close();
    }
}