import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DiplomeComponentsPage, DiplomeDeleteDialog, DiplomeUpdatePage } from './diplome.page-object';

const expect = chai.expect;

describe('Diplome e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let diplomeComponentsPage: DiplomeComponentsPage;
  let diplomeUpdatePage: DiplomeUpdatePage;
  let diplomeDeleteDialog: DiplomeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Diplomes', async () => {
    await navBarPage.goToEntity('diplome');
    diplomeComponentsPage = new DiplomeComponentsPage();
    await browser.wait(ec.visibilityOf(diplomeComponentsPage.title), 5000);
    expect(await diplomeComponentsPage.getTitle()).to.eq('gatewayApp.professeurDiplome.home.title');
    await browser.wait(ec.or(ec.visibilityOf(diplomeComponentsPage.entities), ec.visibilityOf(diplomeComponentsPage.noResult)), 1000);
  });

  it('should load create Diplome page', async () => {
    await diplomeComponentsPage.clickOnCreateButton();
    diplomeUpdatePage = new DiplomeUpdatePage();
    expect(await diplomeUpdatePage.getPageTitle()).to.eq('gatewayApp.professeurDiplome.home.createOrEditLabel');
    await diplomeUpdatePage.cancel();
  });

  it('should create and save Diplomes', async () => {
    const nbButtonsBeforeCreate = await diplomeComponentsPage.countDeleteButtons();

    await diplomeComponentsPage.clickOnCreateButton();

    await promise.all([
      diplomeUpdatePage.setIntituleInput('intitule'),
      diplomeUpdatePage.setEcoleInput('ecole'),
      diplomeUpdatePage.setSpecialiteInput('specialite'),
      diplomeUpdatePage.setNiveauInput('niveau'),
      diplomeUpdatePage.setDateObtentionInput('2000-12-31'),
      diplomeUpdatePage.professeurSelectLastOption(),
    ]);

    expect(await diplomeUpdatePage.getIntituleInput()).to.eq('intitule', 'Expected Intitule value to be equals to intitule');
    expect(await diplomeUpdatePage.getEcoleInput()).to.eq('ecole', 'Expected Ecole value to be equals to ecole');
    expect(await diplomeUpdatePage.getSpecialiteInput()).to.eq('specialite', 'Expected Specialite value to be equals to specialite');
    expect(await diplomeUpdatePage.getNiveauInput()).to.eq('niveau', 'Expected Niveau value to be equals to niveau');
    expect(await diplomeUpdatePage.getDateObtentionInput()).to.eq('2000-12-31', 'Expected dateObtention value to be equals to 2000-12-31');

    await diplomeUpdatePage.save();
    expect(await diplomeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await diplomeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Diplome', async () => {
    const nbButtonsBeforeDelete = await diplomeComponentsPage.countDeleteButtons();
    await diplomeComponentsPage.clickOnLastDeleteButton();

    diplomeDeleteDialog = new DiplomeDeleteDialog();
    expect(await diplomeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.professeurDiplome.delete.question');
    await diplomeDeleteDialog.clickOnConfirmButton();

    expect(await diplomeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
