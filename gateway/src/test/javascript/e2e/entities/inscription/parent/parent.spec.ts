import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ParentComponentsPage, ParentDeleteDialog, ParentUpdatePage } from './parent.page-object';

const expect = chai.expect;

describe('Parent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parentComponentsPage: ParentComponentsPage;
  let parentUpdatePage: ParentUpdatePage;
  let parentDeleteDialog: ParentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parents', async () => {
    await navBarPage.goToEntity('parent');
    parentComponentsPage = new ParentComponentsPage();
    await browser.wait(ec.visibilityOf(parentComponentsPage.title), 5000);
    expect(await parentComponentsPage.getTitle()).to.eq('gatewayApp.inscriptionParent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(parentComponentsPage.entities), ec.visibilityOf(parentComponentsPage.noResult)), 1000);
  });

  it('should load create Parent page', async () => {
    await parentComponentsPage.clickOnCreateButton();
    parentUpdatePage = new ParentUpdatePage();
    expect(await parentUpdatePage.getPageTitle()).to.eq('gatewayApp.inscriptionParent.home.createOrEditLabel');
    await parentUpdatePage.cancel();
  });

  it('should create and save Parents', async () => {
    const nbButtonsBeforeCreate = await parentComponentsPage.countDeleteButtons();

    await parentComponentsPage.clickOnCreateButton();

    await promise.all([
      parentUpdatePage.setNomInput('nom'),
      parentUpdatePage.setPrenomInput('prenom'),
      parentUpdatePage.setSexeInput('sexe'),
      parentUpdatePage.setDateNaissanceInput('2000-12-31'),
      parentUpdatePage.setLieuNaissanceInput('lieuNaissance'),
      parentUpdatePage.setTypeParenteInput('typeParente'),
      parentUpdatePage.setTelInput('tel'),
      parentUpdatePage.setAdresseInput('adresse'),
      parentUpdatePage.setNumCarteIdentiteInput('numCarteIdentite'),
    ]);

    expect(await parentUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await parentUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await parentUpdatePage.getSexeInput()).to.eq('sexe', 'Expected Sexe value to be equals to sexe');
    expect(await parentUpdatePage.getDateNaissanceInput()).to.eq('2000-12-31', 'Expected dateNaissance value to be equals to 2000-12-31');
    expect(await parentUpdatePage.getLieuNaissanceInput()).to.eq(
      'lieuNaissance',
      'Expected LieuNaissance value to be equals to lieuNaissance'
    );
    expect(await parentUpdatePage.getTypeParenteInput()).to.eq('typeParente', 'Expected TypeParente value to be equals to typeParente');
    expect(await parentUpdatePage.getTelInput()).to.eq('tel', 'Expected Tel value to be equals to tel');
    expect(await parentUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');
    expect(await parentUpdatePage.getNumCarteIdentiteInput()).to.eq(
      'numCarteIdentite',
      'Expected NumCarteIdentite value to be equals to numCarteIdentite'
    );

    await parentUpdatePage.save();
    expect(await parentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parent', async () => {
    const nbButtonsBeforeDelete = await parentComponentsPage.countDeleteButtons();
    await parentComponentsPage.clickOnLastDeleteButton();

    parentDeleteDialog = new ParentDeleteDialog();
    expect(await parentDeleteDialog.getDialogTitle()).to.eq('gatewayApp.inscriptionParent.delete.question');
    await parentDeleteDialog.clickOnConfirmButton();

    expect(await parentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
