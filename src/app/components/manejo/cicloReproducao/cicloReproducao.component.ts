
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { Animal } from 'src/app/models/animal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
    templateUrl: './cicloReproducao.component.html',
    styleUrls: ['./cicloReproducao.component.css']
})
export class CicloReproducaoComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<CicloReproducaoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CicloReproducao, private notifications: NotificationsService,
        private manejoService: ManejoService) {
        this.acompanhamento = this.data;
        this.acompanhamento.inceminacao = false;
    }

    acompanhamento: CicloReproducao;
    reprodutores: Animal[];
    situacoes = [];
    items = [];
    selected = [];

    ngOnInit() {
        this.obterReprodutores();
        this.obterSituacoes();
    }

    mudarInceminacao(inceminacao) {
        this.acompanhamento.inceminacao = !inceminacao;
    }

    async obterReprodutores() {
        this.reprodutores = await this.manejoService.obterReprodutores();
    }

    async obterSituacoes() {
        this.situacoes = await this.manejoService.obterSituacoes("Upl");
    }

    async salvar() {
        try {
            if (this.acompanhamento.eValido()) {

                if (this.acompanhamento.id > 0) {
                    this.acompanhamento = await this.manejoService.atualizarAcompanhamento(this.acompanhamento);
                    this.mostrarMensagem("Salvo com sucesso", "Acompanhamento", NotificationType.Success);
                    this.fechar();
                } else {
                    this.acompanhamento = await this.manejoService.salvarAcompanhamento(this.acompanhamento);
                    this.mostrarMensagem("Salvo com sucesso", "Acompanhamento", NotificationType.Success);
                    this.fechar();
                }

            } else {
                this.mostrarMensagem("Preencha os campos obrigatórios", "Acompanhamento", NotificationType.Alert);
            }

        } catch (e) {
            console.error(e);
            this.fechar();
            this.mostrarMensagem("Ocorreu um problema", "Acompanhamento", NotificationType.Error);

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


