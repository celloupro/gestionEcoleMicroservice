import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { RetardComponentsPage, RetardDeleteDialog, RetardUpdatePage } from './retard.page-object';

const expect = chai.expect;

describe('Retard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let retardComponentsPage: RetardComponentsPage;
  let retardUpdatePage: RetardUpdatePage;
  let retardDeleteDialog: RetardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Retards', async () => {
    await navBarPage.goToEntity('retard');
    retardComponentsPage = new RetardComponentsPage();
    await browser.wait(ec.visibilityOf(retardComponentsPage.title), 5000);
    expect(await retardComponentsPage.getTitle()).to.eq('gatewayApp.professeurRetard.home.title');
    await browser.wait(ec.or(ec.visibilityOf(retardComponentsPage.entities), ec.visibilityOf(retardComponentsPage.noResult)), 1000);
  });

  it('should load create Retard page', async () => {
    await retardComponentsPage.clickOnCreateButton();
    retardUpdatePage = new RetardUpdatePage();
    expect(await retardUpdatePage.getPageTitle()).to.eq('gatewayApp.professeurRetard.home.createOrEditLabel');
    await retardUpdatePage.cancel();
  });

  it('should create and save Retards', async () => {
    const nbButtonsBeforeCreate = await retardComponentsPage.countDeleteButtons();

    await retardComponentsPage.clickOnCreateButton();

    await promise.all([
      retardUpdatePage.setHeureDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      retardUpdatePage.setHeureFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      retardUpdatePage.setNombreHeureInput('PT12S'),
      retardUpdatePage.setDateRetardInput('2000-12-31'),
      retardUpdatePage.setMotifInput('motif'),
      retardUpdatePage.professeurSelectLastOption(),
    ]);

    expect(await retardUpdatePage.getHeureDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected heureDebut value to be equals to 2000-12-31'
    );
    expect(await retardUpdatePage.getHeureFinInput()).to.contain('2001-01-01T02:30', 'Expected heureFin value to be equals to 2000-12-31');
    expect(await retardUpdatePage.getNombreHeureInput()).to.contain('12', 'Expected nombreHeure value to be equals to 12');
    expect(await retardUpdatePage.getDateRetardInput()).to.eq('2000-12-31', 'Expected dateRetard value to be equals to 2000-12-31');
    expect(await retardUpdatePage.getMotifInput()).to.eq('motif', 'Expected Motif value to be equals to motif');

    await retardUpdatePage.save();
    expect(await retardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await retardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Retard', async () => {
    const nbButtonsBeforeDelete = await retardComponentsPage.countDeleteButtons();
    await retardComponentsPage.clickOnLastDeleteButton();

    retardDeleteDialog = new RetardDeleteDialog();
    expect(await retardDeleteDialog.getDialogTitle()).to.eq('gatewayApp.professeurRetard.delete.question');
    await retardDeleteDialog.clickOnConfirmButton();

    expect(await retardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
