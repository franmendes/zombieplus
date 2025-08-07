import { test, expect } from "@playwright/test";
import { Login } from "../actions/Login";
import { Toast } from "../actions/Components";
import { Movies } from "../actions/Movies";

let login;
let toast;
let movies;

test.beforeEach(async ({ page }) => {
  login = new Login(page);
  toast = new Toast(page);
  movies = new Movies(page);

  await login.visit();
});

test("deve logar como administrador", async ({ page }) => {
  await login.submit("admin@zombieplus.com", "pwd123");
  await login.isLoggedIn();
});

test("não deve logar com senha incorreta", async ({ page }) => {
  await login.submit("admin@zombieplus.com", "abc123");

  const message =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";

  await toast.containText(message);
});

test("não deve logar quando o email inválido", async ({ page }) => {
  await login.submit("www.zombieplus.com.br", "abc123");
  await login.alertHaveText("Email incorreto");
});

test("não deve logar quando o email não é preenchido", async ({ page }) => {
  await login.submit("", "abc123");
  await login.alertHaveText("Campo obrigatório");
});

test("não deve logar quando o password não é preenchido", async ({ page }) => {
  await login.submit("admin@zombieplus.com", "");
  await login.alertHaveText("Campo obrigatório");
});

test("não deve logar quando nenhum campo é preenchido", async ({ page }) => {
  await login.submit("", "");
  await login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
