import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { Animal } from 'src/app/models/animal';
import { CicloReproducao } from 'src/app/models';
import { AnimalComportamento } from '../animal/animalComportamento';

@Component({
  selector: 'ficha-dialog',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Animal, private manejoService: ManejoService) {
    this.animal = data;
    this.menu = ['Ciclos de reprodução', 'Consumos', 'Doenças'];  
    this.colunasCiclos = ['status', 'reprodutor', 'fecundacao', 'parto', 'desmame', 'vv', 'nm', 
                          'morto', 'pln', 'pld', 'doado', 'adotado', 'desmamado'];
    this.dataSourceCiclos = new MatTableDataSource<CicloReproducao>([]);
    this.animalComportamento = new AnimalComportamento();
  }
  animalComportamento: AnimalComportamento;
  colunasCiclos: string[];
  menu: string[];
  dataSourceCiclos: MatTableDataSource<CicloReproducao>;
  animal: Animal;
  ciclosReproducao: CicloReproducao[];

  ngOnInit() {
    this.obterFichaAnimal(this.animal.id);
  }

  async obterFichaAnimal(id: number) {
    try {
      this.animal = await this.manejoService.obterFichaAnimal(id);
      this.dataSourceCiclos = new MatTableDataSource<CicloReproducao>(this.animal.ciclos);
    } catch (e) {
      console.error(e);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}