import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TeamComponent} from './teams/team.component';
import { UserComponent} from './users/user.component';
import { ProjectComponent} from './projects/project.component';
import { EnvironmentComponent} from './environments/environment.component';
import { EnvironmentInstancesComponent } from './environment-instances/environment-instances.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'mydash', component: DashboardComponent},  
    {path: 'teams', component: TeamComponent},  
    {path: 'users', component: UserComponent }, 
    {path: 'projects', component: ProjectComponent },
    {path: 'environments', component: EnvironmentComponent },   
    {path: 'envinstances', component: EnvironmentInstancesComponent },                        
    {path: 'sample', component: SampleDemoComponent},
    {path: 'forms', component: FormsDemoComponent},
    {path: 'data', component: DataDemoComponent},
    {path: 'panels', component: PanelsDemoComponent},
    {path: 'overlays', component: OverlaysDemoComponent},
    {path: 'menus', component: MenusDemoComponent},
    {path: 'messages', component: MessagesDemoComponent},
    {path: 'misc', component: MiscDemoComponent},
    {path: 'empty', component: EmptyDemoComponent},
    {path: 'charts', component: ChartsDemoComponent},
    {path: 'file', component: FileDemoComponent},
    {path: 'utils', component: UtilsDemoComponent},
    {path: 'documentation', component: DocumentationComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
