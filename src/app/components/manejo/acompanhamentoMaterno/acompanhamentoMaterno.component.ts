
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { AcompanhamentoMaterno } from 'src/app/models/acompanhamentoMaterno';
import { Animal } from 'src/app/models/animal';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { plainToClass } from "class-transformer";
import { Situacao } from 'src/app/models';

@Component({
    templateUrl: './acompanhamentoMaterno.component.html',
    styleUrls: ['./acompanhamentoMaterno.component.css']
})
export class AcompanhamentoMaternoComponent implements OnInit {


    constructor(public dialogRef: MatDialogRef<AcompanhamentoMaternoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AcompanhamentoMaterno, private notifications: NotificationsService,
        private manejoService: ManejoService) { }

    acompanhamento: AcompanhamentoMaterno;
    reprodutores: Animal[];
    situacoes = [];
    items = [];
    selected = [];

    ngOnInit() {
        this.obterReprodutores();
        this.obterSituacoes();
        this.acompanhamento = this.data;
        this.acompanhamento.inceminacao = false;
    }

    mudarInceminacao(inceminacao) {
        this.acompanhamento.inceminacao = !inceminacao;
    }

    obterReprodutores() {
        this.manejoService.obterReprodutores().subscribe(data => {
            this.reprodutores = plainToClass(Animal, data);
        });
    }

    obterSituacoes(){
      this.manejoService.obterSituacoes("Upl").subscribe(data => {
        this.situacoes = plainToClass(Situacao, data);
      });
    }

    salvar(): void {
        if (this.acompanhamento.eValido()) {
            
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


