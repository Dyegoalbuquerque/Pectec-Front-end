
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
 
@Component({
  selector: 'ciclo-simular-dialog',
  templateUrl: 'ciclo.resumo.component.html',
})
export class CicloResumoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloResumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CicloReproducao) {
    this.ciclo = this.data;
  }

  ciclo: CicloReproducao;
  ciclofilhos: any[];

  ngOnInit() {}

  fechar(): void {
    this.dialogRef.close();
  }
}