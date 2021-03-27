import { element, by, ElementFinder } from 'protractor';

export class DiplomeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-diplome div table .btn-danger'));
  title = element.all(by.css('jhi-diplome div h2#page-heading span')).first();
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

export class DiplomeUpdatePage {
  pageTitle = element(by.id('jhi-diplome-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  intituleInput = element(by.id('field_intitule'));
  ecoleInput = element(by.id('field_ecole'));
  specialiteInput = element(by.id('field_specialite'));
  niveauInput = element(by.id('field_niveau'));
  dateObtentionInput = element(by.id('field_dateObtention'));

  professeurSelect = element(by.id('field_professeur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule: string): Promise<void> {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput(): Promise<string> {
    return await this.intituleInput.getAttribute('value');
  }

  async setEcoleInput(ecole: string): Promise<void> {
    await this.ecoleInput.sendKeys(ecole);
  }

  async getEcoleInput(): Promise<string> {
    return await this.ecoleInput.getAttribute('value');
  }

  async setSpecialiteInput(specialite: string): Promise<void> {
    await this.specialiteInput.sendKeys(specialite);
  }

  async getSpecialiteInput(): Promise<string> {
    return await this.specialiteInput.getAttribute('value');
  }

  async setNiveauInput(niveau: string): Promise<void> {
    await this.niveauInput.sendKeys(niveau);
  }

  async getNiveauInput(): Promise<string> {
    return await this.niveauInput.getAttribute('value');
  }

  async setDateObtentionInput(dateObtention: string): Promise<void> {
    await this.dateObtentionInput.sendKeys(dateObtention);
  }

  async getDateObtentionInput(): Promise<string> {
    return await this.dateObtentionInput.getAttribute('value');
  }

  async professeurSelectLastOption(): Promise<void> {
    await this.professeurSelect.all(by.tagName('option')).last().click();
  }

  async professeurSelectOption(option: string): Promise<void> {
    await this.professeurSelect.sendKeys(option);
  }

  getProfesseurSelect(): ElementFinder {
    return this.professeurSelect;
  }

  async getProfesseurSelectedOption(): Promise<string> {
    return await this.professeurSelect.element(by.css('option:checked')).getText();
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

export class DiplomeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-diplome-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-diplome'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
