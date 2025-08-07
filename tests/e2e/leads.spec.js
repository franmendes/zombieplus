// @ts-check
import { expect, test } from "@playwright/test";
import { Leads } from "../actions/Leads";
import { Toast } from "../actions/Components";
import { faker } from "@faker-js/faker";

let leads;
let toast;

test.beforeEach(async ({ page }) => {
  leads = new Leads(page);
  toast = new Toast(page);
  await leads.visit();
});

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await leads.openLeadModal();
  await leads.submitLeadForm(leadName, leadEmail);

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await toast.containText(message);
});

test("não deve cadastrar quando email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await leads.openLeadModal();
  await leads.submitLeadForm(leadName, leadEmail);

  await leads.visit();
  await leads.openLeadModal();
  await leads.submitLeadForm(leadName, leadEmail);

  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";

  await toast.containText(message);
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  await leads.openLeadModal();
  await leads.submitLeadForm("João da Silva", "joaosilva.com");

  await leads.alertHaveText("Email incorreto");
});

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  await leads.openLeadModal();
  await leads.submitLeadForm("", "joao@silva.com");

  await leads.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await leads.openLeadModal();
  await leads.submitLeadForm("João da Silva", "");

  await leads.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhum campo é preenchido", async ({
  page,
}) => {
  await leads.openLeadModal();
  await leads.submitLeadForm("", "");

  await leads.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
