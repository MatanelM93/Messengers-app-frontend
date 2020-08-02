import { NgModule } from '@angular/core';


/* Angular material modules */
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'; 
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    imports:[
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule
    ],
    exports:[
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule
    ],
    providers:[]
})


export class AngularMaterialModule { }