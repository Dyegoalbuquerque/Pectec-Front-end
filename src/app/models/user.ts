export class User {

    constructor(login?: string, senha?: string) {
        this.login = login;
        this.senha = senha;
    }

    id: number;
    login: string;
    senha: string;
    firstName: string;
    lastName: string;
    token?: string;
}