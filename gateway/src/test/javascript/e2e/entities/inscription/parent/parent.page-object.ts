import { element, by, ElementFinder } from 'protractor';

export class ParentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parent div table .btn-danger'));
  title = element.all(by.css('jhi-parent div h2#page-heading span')).first();
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

export class ParentUpdatePage {
  pageTitle = element(by.id('jhi-parent-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  sexeInput = element(by.id('field_sexe'));
  dateNaissanceInput = element(by.id('field_dateNaissance'));
  lieuNaissanceInput = element(by.id('field_lieuNaissance'));
  typeParenteInput = element(by.id('field_typeParente'));
  telInput = element(by.id('field_tel'));
  adresseInput = element(by.id('field_adresse'));
  numCarteIdentiteInput = element(by.id('field_numCarteIdentite'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setSexeInput(sexe: string): Promise<void> {
    await this.sexeInput.sendKeys(sexe);
  }

  async getSexeInput(): Promise<string> {
    return await this.sexeInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance: string): Promise<void> {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput(): Promise<string> {
    return await this.dateNaissanceInput.getAttribute('value');
  }

  async setLieuNaissanceInput(lieuNaissance: string): Promise<void> {
    await this.lieuNaissanceInput.sendKeys(lieuNaissance);
  }

  async getLieuNaissanceInput(): Promise<string> {
    return await this.lieuNaissanceInput.getAttribute('value');
  }

  async setTypeParenteInput(typeParente: string): Promise<void> {
    await this.typeParenteInput.sendKeys(typeParente);
  }

  async getTypeParenteInput(): Promise<string> {
    return await this.typeParenteInput.getAttribute('value');
  }

  async setTelInput(tel: string): Promise<void> {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput(): Promise<string> {
    return await this.telInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setNumCarteIdentiteInput(numCarteIdentite: string): Promise<void> {
    await this.numCarteIdentiteInput.sendKeys(numCarteIdentite);
  }

  async getNumCarteIdentiteInput(): Promise<string> {
    return await this.numCarteIdentiteInput.getAttribute('value');
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

export class ParentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
