
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { AcompanhamentoMaterno } from 'src/app/models/acompanhamentoMaterno';
import { Animal } from 'src/app/models/animal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
    templateUrl: './acompanhamentoMaterno.component.html',
    styleUrls: ['./acompanhamentoMaterno.component.css']
})
export class AcompanhamentoMaternoComponent implements OnInit {


    constructor(public dialogRef: MatDialogRef<AcompanhamentoMaternoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AcompanhamentoMaterno, private notifications: NotificationsService,
        private manejoService: ManejoService) { }

    acompanhamento: AcompanhamentoMaterno;
    inceminacao: boolean;
    reprodutores: Animal[];
    situacoes = [];
    items = [];
    selected = [];

    ngOnInit() {
        this.obterReprodutores();
        this.obterSituacoes();
        this.acompanhamento = this.data;
        this.inceminacao = false;
    }

    mudarInceminacao(inceminacao) {
        this.inceminacao = !inceminacao;
    }

    obterReprodutores() {
        this.manejoService.obterReprodutores().subscribe(data => {console.log(data)
            this.reprodutores = data;
        });
    }

    obterSituacoes(){
      this.manejoService.obterSituacoes("Upl").subscribe(data => {
        this.situacoes = data;
      });
    }

    salvar(): void {
        if (this.validar(this.acompanhamento)) {
            
            if (this.acompanhamento.id > 0) {
                this.manejoService.atualizarAcompanhamento(this.acompanhamento).subscribe(data => {
                    this.acompanhamento = data;
                    this.mostrarMensagem("Salvo com sucesso", "Acompanhamento", NotificationType.Success);
                    this.fechar();
                }, err => {
                    this.fechar();
                    this.mostrarMensagem("Ocorreu um problema", "Acompanhamento", NotificationType.Error);
                });
            } else {
                this.manejoService.salvarAcompanhamento(this.acompanhamento).subscribe(data => {
                    this.acompanhamento = data;
                    this.mostrarMensagem("Salvo com sucesso", "Acompanhamento", NotificationType.Success);
                    this.fechar();
                }, err => {
                    this.fechar();
                    this.mostrarMensagem("Ocorreu um problema", "Acompanhamento", NotificationType.Error);
                });
            }

        } else {
            this.mostrarMensagem("Preencha os campos obrigatórios", "Acompanhamento", NotificationType.Alert);
        }
    }

    fechar(): void {
        this.dialogRef.close();
    }

    validar(item: AcompanhamentoMaterno): boolean {

        return item.dataFecundacao && (item.reprodutorId > 0 && !this.inceminacao ||
               item.reprodutorId == undefined && this.inceminacao) &&             
              (item.dataPartoReal && item.quantidadeFilhote && item.quantidadeFilhote > 0 && 
               item.quantidadeFilhoteVV >= 0 && item.quantidadeFilhoteMF >= 0 &&
               item.quantidadeFilhoteNM >= 0 && item.pesoFilhoteNascimento >= 0 &&
               item.quantidadeSexoM >= 0 && item.quantidadeSexoF >= 0 || 
               item.dataPartoReal == undefined);
    }

    mostrarMensagem(mensagem: string, action: string, tipo: NotificationType) {

        let animationTypes = ['fromRight', 'fromLeft', 'scale', 'rotate'];

        let config = {
            type: tipo,
            title: action,
            content: mensagem,
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
        };

        this.notifications.create(config.title, config.content, config.type, config);
    }
}


