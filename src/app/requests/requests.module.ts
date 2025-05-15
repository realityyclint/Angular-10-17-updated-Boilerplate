import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsRoutingModule } from '../requests-routing.module';

import { AddEditComponent } from './add-edit.component';
import { ListComponent } from './list.component';

@NgModule({
    declarations: [
        AddEditComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RequestsRoutingModule
    ]
})
export class RequestsModule { }
