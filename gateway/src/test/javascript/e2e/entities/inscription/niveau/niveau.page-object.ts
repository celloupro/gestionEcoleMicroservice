import { element, by, ElementFinder } from 'protractor';

export class NiveauComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-niveau div table .btn-danger'));
  title = element.all(by.css('jhi-niveau div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class NiveauUpdatePage {
  pageTitle = element(by.id('jhi-niveau-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  libelleInput = element(by.id('field_libelle'));
  optionInput = element(by.id('field_option'));
  capaciteClasseInput = element(by.id('field_capaciteClasse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setOptionInput(option: string): Promise<void> {
    await this.optionInput.sendKeys(option);
  }

  async getOptionInput(): Promise<string> {
    return await this.optionInput.getAttribute('value');
  }

  async setCapaciteClasseInput(capaciteClasse: string): Promise<void> {
    await this.capaciteClasseInput.sendKeys(capaciteClasse);
  }

  async getCapaciteClasseInput(): Promise<string> {
    return await this.capaciteClasseInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class NiveauDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-niveau-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-niveau'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
