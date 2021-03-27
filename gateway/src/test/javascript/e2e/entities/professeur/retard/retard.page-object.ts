import { element, by, ElementFinder } from 'protractor';

export class RetardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-retard div table .btn-danger'));
  title = element.all(by.css('jhi-retard div h2#page-heading span')).first();
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

export class RetardUpdatePage {
  pageTitle = element(by.id('jhi-retard-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  heureDebutInput = element(by.id('field_heureDebut'));
  heureFinInput = element(by.id('field_heureFin'));
  nombreHeureInput = element(by.id('field_nombreHeure'));
  dateRetardInput = element(by.id('field_dateRetard'));
  motifInput = element(by.id('field_motif'));

  professeurSelect = element(by.id('field_professeur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setHeureDebutInput(heureDebut: string): Promise<void> {
    await this.heureDebutInput.sendKeys(heureDebut);
  }

  async getHeureDebutInput(): Promise<string> {
    return await this.heureDebutInput.getAttribute('value');
  }

  async setHeureFinInput(heureFin: string): Promise<void> {
    await this.heureFinInput.sendKeys(heureFin);
  }

  async getHeureFinInput(): Promise<string> {
    return await this.heureFinInput.getAttribute('value');
  }

  async setNombreHeureInput(nombreHeure: string): Promise<void> {
    await this.nombreHeureInput.sendKeys(nombreHeure);
  }

  async getNombreHeureInput(): Promise<string> {
    return await this.nombreHeureInput.getAttribute('value');
  }

  async setDateRetardInput(dateRetard: string): Promise<void> {
    await this.dateRetardInput.sendKeys(dateRetard);
  }

  async getDateRetardInput(): Promise<string> {
    return await this.dateRetardInput.getAttribute('value');
  }

  async setMotifInput(motif: string): Promise<void> {
    await this.motifInput.sendKeys(motif);
  }

  async getMotifInput(): Promise<string> {
    return await this.motifInput.getAttribute('value');
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

export class RetardDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-retard-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-retard'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
