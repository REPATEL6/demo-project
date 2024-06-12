import { Routes } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AddnewtaskComponent } from './components/addnewtask/addnewtask.component';

export const routes: Routes = [
    {
        path: 'today', component: TodayComponent,
        children: [
            { path: 'addnewtask', component: AddnewtaskComponent }
        ]
    },

    {
        path: 'upcoming', component: UpcomingComponent,
        children: [
            { path: 'addnewtask', component: AddnewtaskComponent }
        ]
    }
];
