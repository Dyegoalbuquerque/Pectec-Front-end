import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ManejoService } from '../../services/manejo.service';
import { Animal } from 'src/app/models/animal';


@Component({
    selector: 'ficha-dialog',
    templateUrl: './ficha.component.html',
    styleUrls: ['./ficha.component.css']
  })
  export class FichaComponent implements OnInit {
  
    constructor( public dialogRef: MatDialogRef<FichaComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: Animal,  private _snackBar: MatSnackBar,
                private manejoService: ManejoService) {}
  
    displayedColumns: string[] = ['valor', 'juros', 'vencimento'];
    //dataSource : MatTableDataSource<Parcela>;
    femea: Animal;
  
    ngOnInit() {
      this.femea = this.data;
      //this.dataSource = new MatTableDataSource<Parcela>([]);
    }
  
    fechar(): void {
      this.dialogRef.close();
    }
  
    mostrarMensagem(mensagem: string, action: string) {
      this._snackBar.open(mensagem, action, {
        duration: 2000,
      });
    }
  }