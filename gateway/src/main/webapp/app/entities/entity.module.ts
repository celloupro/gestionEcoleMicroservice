import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'eleve',
        loadChildren: () => import('./inscription/eleve/eleve.module').then(m => m.InscriptionEleveModule),
      },
      {
        path: 'parent',
        loadChildren: () => import('./inscription/parent/parent.module').then(m => m.InscriptionParentModule),
      },
      {
        path: 'classe',
        loadChildren: () => import('./inscription/classe/classe.module').then(m => m.InscriptionClasseModule),
      },
      {
        path: 'niveau',
        loadChildren: () => import('./inscription/niveau/niveau.module').then(m => m.InscriptionNiveauModule),
      },
      {
        path: 'annee-scolaire',
        loadChildren: () => import('./inscription/annee-scolaire/annee-scolaire.module').then(m => m.InscriptionAnneeScolaireModule),
      },
      {
        path: 'professeur',
        loadChildren: () => import('./professeur/professeur/professeur.module').then(m => m.ProfesseurProfesseurModule),
      },
      {
        path: 'diplome',
        loadChildren: () => import('./professeur/diplome/diplome.module').then(m => m.ProfesseurDiplomeModule),
      },
      {
        path: 'retard',
        loadChildren: () => import('./professeur/retard/retard.module').then(m => m.ProfesseurRetardModule),
      },
      {
        path: 'abscence',
        loadChildren: () => import('./professeur/abscence/abscence.module').then(m => m.ProfesseurAbscenceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
