// @ts-check
import { test } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { Toast } from "../pages/Components";
import { faker } from "@faker-js/faker";

let landingPage;
let toast;
test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
  await landingPage.visit();
});

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(name, email);

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await toast.haveText(message);
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("João da Silva", "joaosilva.com");

  await landingPage.alertHaveText("Email incorreto");
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "joao@silva.com");

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("João da Silva", "");

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({
  page,
}) => {
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");

  await landingPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
