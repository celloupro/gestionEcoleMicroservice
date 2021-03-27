import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProfesseurComponentsPage, ProfesseurDeleteDialog, ProfesseurUpdatePage } from './professeur.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Professeur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professeurComponentsPage: ProfesseurComponentsPage;
  let professeurUpdatePage: ProfesseurUpdatePage;
  let professeurDeleteDialog: ProfesseurDeleteDialog;
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

  it('should load Professeurs', async () => {
    await navBarPage.goToEntity('professeur');
    professeurComponentsPage = new ProfesseurComponentsPage();
    await browser.wait(ec.visibilityOf(professeurComponentsPage.title), 5000);
    expect(await professeurComponentsPage.getTitle()).to.eq('gatewayApp.professeurProfesseur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(professeurComponentsPage.entities), ec.visibilityOf(professeurComponentsPage.noResult)), 1000);
  });

  it('should load create Professeur page', async () => {
    await professeurComponentsPage.clickOnCreateButton();
    professeurUpdatePage = new ProfesseurUpdatePage();
    expect(await professeurUpdatePage.getPageTitle()).to.eq('gatewayApp.professeurProfesseur.home.createOrEditLabel');
    await professeurUpdatePage.cancel();
  });

  it('should create and save Professeurs', async () => {
    const nbButtonsBeforeCreate = await professeurComponentsPage.countDeleteButtons();

    await professeurComponentsPage.clickOnCreateButton();

    await promise.all([
      professeurUpdatePage.setPhotoInput(absolutePath),
      professeurUpdatePage.setNomInput('nom'),
      professeurUpdatePage.setPrenomInput('prenom'),
      professeurUpdatePage.sexeSelectLastOption(),
      professeurUpdatePage.setDateNaissanceInput('2000-12-31'),
      professeurUpdatePage.setLieuNaissanceInput('lieuNaissance'),
      professeurUpdatePage.setTelInput('tel'),
      professeurUpdatePage.setAdresseInput('adresse'),
    ]);

    expect(await professeurUpdatePage.getPhotoInput()).to.endsWith(
      fileNameToUpload,
      'Expected Photo value to be end with ' + fileNameToUpload
    );
    expect(await professeurUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await professeurUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await professeurUpdatePage.getDateNaissanceInput()).to.eq(
      '2000-12-31',
      'Expected dateNaissance value to be equals to 2000-12-31'
    );
    expect(await professeurUpdatePage.getLieuNaissanceInput()).to.eq(
      'lieuNaissance',
      'Expected LieuNaissance value to be equals to lieuNaissance'
    );
    expect(await professeurUpdatePage.getTelInput()).to.eq('tel', 'Expected Tel value to be equals to tel');
    expect(await professeurUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');

    await professeurUpdatePage.save();
    expect(await professeurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await professeurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Professeur', async () => {
    const nbButtonsBeforeDelete = await professeurComponentsPage.countDeleteButtons();
    await professeurComponentsPage.clickOnLastDeleteButton();

    professeurDeleteDialog = new ProfesseurDeleteDialog();
    expect(await professeurDeleteDialog.getDialogTitle()).to.eq('gatewayApp.professeurProfesseur.delete.question');
    await professeurDeleteDialog.clickOnConfirmButton();

    expect(await professeurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
