import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AnneeScolaireComponentsPage, AnneeScolaireDeleteDialog, AnneeScolaireUpdatePage } from './annee-scolaire.page-object';

const expect = chai.expect;

describe('AnneeScolaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let anneeScolaireComponentsPage: AnneeScolaireComponentsPage;
  let anneeScolaireUpdatePage: AnneeScolaireUpdatePage;
  let anneeScolaireDeleteDialog: AnneeScolaireDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AnneeScolaires', async () => {
    await navBarPage.goToEntity('annee-scolaire');
    anneeScolaireComponentsPage = new AnneeScolaireComponentsPage();
    await browser.wait(ec.visibilityOf(anneeScolaireComponentsPage.title), 5000);
    expect(await anneeScolaireComponentsPage.getTitle()).to.eq('gatewayApp.inscriptionAnneeScolaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(anneeScolaireComponentsPage.entities), ec.visibilityOf(anneeScolaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AnneeScolaire page', async () => {
    await anneeScolaireComponentsPage.clickOnCreateButton();
    anneeScolaireUpdatePage = new AnneeScolaireUpdatePage();
    expect(await anneeScolaireUpdatePage.getPageTitle()).to.eq('gatewayApp.inscriptionAnneeScolaire.home.createOrEditLabel');
    await anneeScolaireUpdatePage.cancel();
  });

  it('should create and save AnneeScolaires', async () => {
    const nbButtonsBeforeCreate = await anneeScolaireComponentsPage.countDeleteButtons();

    await anneeScolaireComponentsPage.clickOnCreateButton();

    await promise.all([
      anneeScolaireUpdatePage.setDateDebutInput('2000-12-31'),
      anneeScolaireUpdatePage.setDateFinInput('2000-12-31'),
      // anneeScolaireUpdatePage.eleveSelectLastOption(),
      // anneeScolaireUpdatePage.classeSelectLastOption(),
    ]);

    expect(await anneeScolaireUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await anneeScolaireUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');

    await anneeScolaireUpdatePage.save();
    expect(await anneeScolaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await anneeScolaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AnneeScolaire', async () => {
    const nbButtonsBeforeDelete = await anneeScolaireComponentsPage.countDeleteButtons();
    await anneeScolaireComponentsPage.clickOnLastDeleteButton();

    anneeScolaireDeleteDialog = new AnneeScolaireDeleteDialog();
    expect(await anneeScolaireDeleteDialog.getDialogTitle()).to.eq('gatewayApp.inscriptionAnneeScolaire.delete.question');
    await anneeScolaireDeleteDialog.clickOnConfirmButton();

    expect(await anneeScolaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
