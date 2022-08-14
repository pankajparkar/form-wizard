import { Routes } from "@angular/router";
import { UserWizardComponent } from "./components/user-wizard/user-wizard.component";
import { FormWizardService } from "./services/form-wizard.service";
import { UserDetailsWizard } from "./models/user-details-wizard.model";

export const routes: Routes = [
    {
        path: 'user/wizard',
        component: UserWizardComponent,
        providers: [
            FormWizardService<UserDetailsWizard>,
        ],
    },
    // wild card route
    {
        path: '**',
        redirectTo: 'user/wizard',
    }
];
