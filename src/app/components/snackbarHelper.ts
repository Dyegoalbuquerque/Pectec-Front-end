import {
    MatSnackBarConfig, MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material';

export class SnackbarHelper {

    constructor() { }

    private criarConfig() : MatSnackBarConfig<any> {
        let horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        let verticalPosition: MatSnackBarVerticalPosition = 'bottom';

        let config = new MatSnackBarConfig();
        config.verticalPosition = verticalPosition;
        config.horizontalPosition = horizontalPosition;

        return config;
    }

    criarConfigSuccess(time: number): MatSnackBarConfig<any> {

        let config = this.criarConfig();

        config.duration = time;
        config.panelClass = 'snackbar-success';

        return config;
    }

    criarConfigInfo(time: number) : MatSnackBarConfig<any> {

        let config = this.criarConfig();
        
        config.duration = time;
        config.panelClass = '';

        return config;
    }
}