import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Components";
import { MoviesPage } from "../pages/MoviesPage";

let loginPage;
let toast;
let moviesPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  toast = new Toast(page);
  moviesPage = new MoviesPage(page);

  await loginPage.visit();
});

test("deve logar como administrador", async ({ page }) => {
  await loginPage.submit("admin@zombieplus.com", "pwd123");
  await moviesPage.isLoggedIn();
});

test("não deve logar com senha incorreta", async ({ page }) => {
  await loginPage.submit("admin@zombieplus.com", "abc123");

  const message =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";

  await toast.containText(message);
});

test("não deve logar quando o email inválido", async ({ page }) => {
  await loginPage.submit("www.zombieplus.com.br", "abc123");
  await loginPage.alertHaveText("Email incorreto");
});

test("não deve logar quando o email não é preenchido", async ({ page }) => {
  await loginPage.submit("", "abc123");
  await loginPage.alertHaveText("Campo obrigatório");
});

test("não deve logar quando o password não é preenchido", async ({ page }) => {
  await loginPage.submit("admin@zombieplus.com", "");
  await loginPage.alertHaveText("Campo obrigatório");
});

test("não deve logar quando nenhum campo é preenchido", async ({ page }) => {
  await loginPage.submit("", "");
  await loginPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
