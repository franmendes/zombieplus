import { expect } from "@playwright/test";

export class MoviesPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/admin/movies");
  }

  async isLoggedIn() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*admin/);
  }

  async create(title, overview, company, release_year) {
    await this.page.locator("a[href$='register']").click(); //$= termina com *=contem ^= começa com

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
  }
}
