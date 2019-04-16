import { MatButtonModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';  
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSortModule} from '@angular/material/sort'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select'; 

@NgModule({
    imports: [
        MatButtonModule, 
        MatInputModule, 
        MatToolbarModule, 
        MatGridListModule, 
        MatListModule, 
        MatDialogModule, 
        MatTabsModule, 
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule, 
        MatInputModule,
        MatToolbarModule, 
        MatGridListModule, 
        MatListModule, 
        MatDialogModule, 
        MatTabsModule, 
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule
    ]
})

export class MaterialModule { }
