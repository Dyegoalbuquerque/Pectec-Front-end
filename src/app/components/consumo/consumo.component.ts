import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Consumo, Estoque, Subcategoria } from 'src/app/models';
import { EstoqueService } from '../../services';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { plainToClass } from "class-transformer";
import { ConsumoFormComponent } from '.';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'consumo-component',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})

export class ConsumoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private estoqueService: EstoqueService) {}
  
  consumos: Consumo[];
  colunasConsumos: string[] = ['data', 'descricao', 'quantidade', 'unidadeMedida', 'custo', 'editar'];
  dataSourceConsumos: MatTableDataSource<Consumo>;


  ngOnInit() {
    this.obterConsumos();
  }

  obterConsumos() {
    this.estoqueService.obterConsumos().subscribe(data => {
      this.dataSourceConsumos = new MatTableDataSource<Consumo>(data);
      this.dataSourceConsumos.paginator = this.paginator;
      this.dataSourceConsumos.data = plainToClass(Consumo, this.dataSourceConsumos.data.sort(Consumo.ordenar));
    });
  }

  abrirConsumoDialog(item: Consumo) {
    const dialogRef = this.dialog.open(ConsumoFormComponent, {
      width: '500px',
      height: '500px',
      data: item == undefined ? new Consumo(new Estoque(new Subcategoria())) : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterConsumos();
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConsumos.filter = filterValue.trim().toLowerCase();
  }
}