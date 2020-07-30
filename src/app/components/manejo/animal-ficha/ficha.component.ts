import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { Animal } from 'src/app/models/animal';
import { CicloReproducao } from 'src/app/models';


@Component({
  selector: 'ficha-dialog',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Animal, private manejoService: ManejoService) {
    this.femea = data;
    this.menu = ['Ciclos de reprodução', 'Consumos', 'Doenças'];
    this.dataSourceCiclos = new MatTableDataSource<CicloReproducao>([]);
  }

  menu: string[];
  dataSourceCiclos: MatTableDataSource<CicloReproducao>;
  femea: Animal;

  ngOnInit() {
    this.obterFichaAnimal(this.femea.id);
  }

  async obterFichaAnimal(id: number) {

  }

  fechar(): void {
    this.dialogRef.close();
  }
}