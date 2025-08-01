import { expect } from "@playwright/test";

export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(
      this.page.getByTestId("modal").getByRole("heading")
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);

    await this.page
      .getByTestId("modal")
      .getByRole("button", { name: /fila/ })
      .click();
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
