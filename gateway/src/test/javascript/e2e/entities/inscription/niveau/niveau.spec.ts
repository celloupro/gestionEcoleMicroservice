import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NiveauComponentsPage, NiveauDeleteDialog, NiveauUpdatePage } from './niveau.page-object';

const expect = chai.expect;

describe('Niveau e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let niveauComponentsPage: NiveauComponentsPage;
  let niveauUpdatePage: NiveauUpdatePage;
  let niveauDeleteDialog: NiveauDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Niveaus', async () => {
    await navBarPage.goToEntity('niveau');
    niveauComponentsPage = new NiveauComponentsPage();
    await browser.wait(ec.visibilityOf(niveauComponentsPage.title), 5000);
    expect(await niveauComponentsPage.getTitle()).to.eq('gatewayApp.inscriptionNiveau.home.title');
    await browser.wait(ec.or(ec.visibilityOf(niveauComponentsPage.entities), ec.visibilityOf(niveauComponentsPage.noResult)), 1000);
  });

  it('should load create Niveau page', async () => {
    await niveauComponentsPage.clickOnCreateButton();
    niveauUpdatePage = new NiveauUpdatePage();
    expect(await niveauUpdatePage.getPageTitle()).to.eq('gatewayApp.inscriptionNiveau.home.createOrEditLabel');
    await niveauUpdatePage.cancel();
  });

  it('should create and save Niveaus', async () => {
    const nbButtonsBeforeCreate = await niveauComponentsPage.countDeleteButtons();

    await niveauComponentsPage.clickOnCreateButton();

    await promise.all([
      niveauUpdatePage.setLibelleInput('libelle'),
      niveauUpdatePage.setOptionInput('option'),
      niveauUpdatePage.setCapaciteClasseInput('5'),
    ]);

    expect(await niveauUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await niveauUpdatePage.getOptionInput()).to.eq('option', 'Expected Option value to be equals to option');
    expect(await niveauUpdatePage.getCapaciteClasseInput()).to.eq('5', 'Expected capaciteClasse value to be equals to 5');

    await niveauUpdatePage.save();
    expect(await niveauUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await niveauComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Niveau', async () => {
    const nbButtonsBeforeDelete = await niveauComponentsPage.countDeleteButtons();
    await niveauComponentsPage.clickOnLastDeleteButton();

    niveauDeleteDialog = new NiveauDeleteDialog();
    expect(await niveauDeleteDialog.getDialogTitle()).to.eq('gatewayApp.inscriptionNiveau.delete.question');
    await niveauDeleteDialog.clickOnConfirmButton();

    expect(await niveauComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
