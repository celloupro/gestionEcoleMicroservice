import { element, by, ElementFinder } from 'protractor';

export class AbscenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-abscence div table .btn-danger'));
  title = element.all(by.css('jhi-abscence div h2#page-heading span')).first();
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

export class AbscenceUpdatePage {
  pageTitle = element(by.id('jhi-abscence-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  heureDebutInput = element(by.id('field_heureDebut'));
  heureFinInput = element(by.id('field_heureFin'));
  nombreHeureInput = element(by.id('field_nombreHeure'));
  dateAbsenceInput = element(by.id('field_dateAbsence'));
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

  async setDateAbsenceInput(dateAbsence: string): Promise<void> {
    await this.dateAbsenceInput.sendKeys(dateAbsence);
  }

  async getDateAbsenceInput(): Promise<string> {
    return await this.dateAbsenceInput.getAttribute('value');
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

export class AbscenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-abscence-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-abscence'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
