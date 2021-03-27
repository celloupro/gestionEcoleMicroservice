import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AbscenceComponentsPage, AbscenceDeleteDialog, AbscenceUpdatePage } from './abscence.page-object';

const expect = chai.expect;

describe('Abscence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let abscenceComponentsPage: AbscenceComponentsPage;
  let abscenceUpdatePage: AbscenceUpdatePage;
  let abscenceDeleteDialog: AbscenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Abscences', async () => {
    await navBarPage.goToEntity('abscence');
    abscenceComponentsPage = new AbscenceComponentsPage();
    await browser.wait(ec.visibilityOf(abscenceComponentsPage.title), 5000);
    expect(await abscenceComponentsPage.getTitle()).to.eq('gatewayApp.professeurAbscence.home.title');
    await browser.wait(ec.or(ec.visibilityOf(abscenceComponentsPage.entities), ec.visibilityOf(abscenceComponentsPage.noResult)), 1000);
  });

  it('should load create Abscence page', async () => {
    await abscenceComponentsPage.clickOnCreateButton();
    abscenceUpdatePage = new AbscenceUpdatePage();
    expect(await abscenceUpdatePage.getPageTitle()).to.eq('gatewayApp.professeurAbscence.home.createOrEditLabel');
    await abscenceUpdatePage.cancel();
  });

  it('should create and save Abscences', async () => {
    const nbButtonsBeforeCreate = await abscenceComponentsPage.countDeleteButtons();

    await abscenceComponentsPage.clickOnCreateButton();

    await promise.all([
      abscenceUpdatePage.setHeureDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      abscenceUpdatePage.setHeureFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      abscenceUpdatePage.setNombreHeureInput('PT12S'),
      abscenceUpdatePage.setDateAbsenceInput('2000-12-31'),
      abscenceUpdatePage.setMotifInput('motif'),
      abscenceUpdatePage.professeurSelectLastOption(),
    ]);

    expect(await abscenceUpdatePage.getHeureDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected heureDebut value to be equals to 2000-12-31'
    );
    expect(await abscenceUpdatePage.getHeureFinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected heureFin value to be equals to 2000-12-31'
    );
    expect(await abscenceUpdatePage.getNombreHeureInput()).to.contain('12', 'Expected nombreHeure value to be equals to 12');
    expect(await abscenceUpdatePage.getDateAbsenceInput()).to.eq('2000-12-31', 'Expected dateAbsence value to be equals to 2000-12-31');
    expect(await abscenceUpdatePage.getMotifInput()).to.eq('motif', 'Expected Motif value to be equals to motif');

    await abscenceUpdatePage.save();
    expect(await abscenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await abscenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Abscence', async () => {
    const nbButtonsBeforeDelete = await abscenceComponentsPage.countDeleteButtons();
    await abscenceComponentsPage.clickOnLastDeleteButton();

    abscenceDeleteDialog = new AbscenceDeleteDialog();
    expect(await abscenceDeleteDialog.getDialogTitle()).to.eq('gatewayApp.professeurAbscence.delete.question');
    await abscenceDeleteDialog.clickOnConfirmButton();

    expect(await abscenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
