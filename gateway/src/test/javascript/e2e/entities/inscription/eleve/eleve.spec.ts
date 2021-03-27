import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EleveComponentsPage, EleveDeleteDialog, EleveUpdatePage } from './eleve.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Eleve e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eleveComponentsPage: EleveComponentsPage;
  let eleveUpdatePage: EleveUpdatePage;
  let eleveDeleteDialog: EleveDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Eleves', async () => {
    await navBarPage.goToEntity('eleve');
    eleveComponentsPage = new EleveComponentsPage();
    await browser.wait(ec.visibilityOf(eleveComponentsPage.title), 5000);
    expect(await eleveComponentsPage.getTitle()).to.eq('gatewayApp.inscriptionEleve.home.title');
    await browser.wait(ec.or(ec.visibilityOf(eleveComponentsPage.entities), ec.visibilityOf(eleveComponentsPage.noResult)), 1000);
  });

  it('should load create Eleve page', async () => {
    await eleveComponentsPage.clickOnCreateButton();
    eleveUpdatePage = new EleveUpdatePage();
    expect(await eleveUpdatePage.getPageTitle()).to.eq('gatewayApp.inscriptionEleve.home.createOrEditLabel');
    await eleveUpdatePage.cancel();
  });

  it('should create and save Eleves', async () => {
    const nbButtonsBeforeCreate = await eleveComponentsPage.countDeleteButtons();

    await eleveComponentsPage.clickOnCreateButton();

    await promise.all([
      eleveUpdatePage.setPhotoInput(absolutePath),
      eleveUpdatePage.setNomInput('nom'),
      eleveUpdatePage.setPrenomInput('prenom'),
      eleveUpdatePage.setSexeInput('sexe'),
      eleveUpdatePage.setDateNaissanceInput('2000-12-31'),
      eleveUpdatePage.setLieuNaissanceInput('lieuNaissance'),
      eleveUpdatePage.setMatriculeInput('matricule'),
      eleveUpdatePage.setAdresseInput('adresse'),
      // eleveUpdatePage.parentSelectLastOption(),
      // eleveUpdatePage.classeSelectLastOption(),
    ]);

    expect(await eleveUpdatePage.getPhotoInput()).to.endsWith(fileNameToUpload, 'Expected Photo value to be end with ' + fileNameToUpload);
    expect(await eleveUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await eleveUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await eleveUpdatePage.getSexeInput()).to.eq('sexe', 'Expected Sexe value to be equals to sexe');
    expect(await eleveUpdatePage.getDateNaissanceInput()).to.eq('2000-12-31', 'Expected dateNaissance value to be equals to 2000-12-31');
    expect(await eleveUpdatePage.getLieuNaissanceInput()).to.eq(
      'lieuNaissance',
      'Expected LieuNaissance value to be equals to lieuNaissance'
    );
    expect(await eleveUpdatePage.getMatriculeInput()).to.eq('matricule', 'Expected Matricule value to be equals to matricule');
    expect(await eleveUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');

    await eleveUpdatePage.save();
    expect(await eleveUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eleveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Eleve', async () => {
    const nbButtonsBeforeDelete = await eleveComponentsPage.countDeleteButtons();
    await eleveComponentsPage.clickOnLastDeleteButton();

    eleveDeleteDialog = new EleveDeleteDialog();
    expect(await eleveDeleteDialog.getDialogTitle()).to.eq('gatewayApp.inscriptionEleve.delete.question');
    await eleveDeleteDialog.clickOnConfirmButton();

    expect(await eleveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
