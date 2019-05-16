import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksegmentsPage } from './tasksegments';

@NgModule({
  declarations: [
    TasksegmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(TasksegmentsPage),
  ],
})
export class TasksegmentsPageModule {}
