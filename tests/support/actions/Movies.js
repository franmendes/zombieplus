import { expect } from "@playwright/test";

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/admin/movies");
  }

  async goForm() {
    await this.page.locator("a[href$='register']").click(); //$= termina com *=contem ^= começa com
  }

  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async create(title, overview, company, release_year, cover, featured) {
    await this.goForm();

    await this.page.locator("#title").fill(title); //#localizador por ID
    await this.page.locator("#overview").fill(overview);

    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: company })
      .click();

    await this.page.locator("#select_year .react-select__indicator").click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: release_year })
      .click();

    await this.page
      .locator("#cover")
      .setInputFiles("tests/support/fixtures" + cover);

    if (featured) {
      await this.page.locator(".featured .react-switch").click();
    }

    await this.submit();
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
