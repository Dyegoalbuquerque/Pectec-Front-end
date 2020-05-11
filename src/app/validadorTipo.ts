
export class ValidadorTipo {

    private static diferenteUndefinedDiferenteNull(valor: any): boolean {
        return valor != undefined && valor != null;
    }

    static stringValido(valor: string): boolean {
        let resultado = this.diferenteUndefinedDiferenteNull(valor) && 
                       !this.stringVazio(valor) &&
                       !this.stringComEspacosEmBranco(valor);
   
        return resultado;
    }

    static stringComEspacosEmBranco(valor: string): boolean {
        return this.diferenteUndefinedDiferenteNull(valor) && valor.replace(/\s/g, '') === '' ? true : false;
    }

    static stringVazio(valor: string): boolean {
        return valor === '';
    }

    static numberValido(valor: number): boolean {
        return this.diferenteUndefinedDiferenteNull(valor) && !this.numberIgualZero(valor);
    }

    static numberIgualZero(valor: number): boolean {
        return valor == 0;
    }

    static numberMaiorOuIgualZero(valor: number): boolean {
        return valor >= 0;
    }

    static booleanVerdadeiro(valor: boolean): boolean {
        return valor == true;
    }

    static booleanFalso(valor: boolean): boolean {
        return valor == false;
    }

    static dateValido(valor: string): boolean {
        var timestamp = Date.parse(valor);

        return isNaN(timestamp) == false;
    }
}