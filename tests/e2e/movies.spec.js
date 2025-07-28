import { expect, test } from "@playwright/test";
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
  await loginPage.submit("admin@zombieplus.com", "pwd123");
  await moviesPage.isLoggedIn();
});

test("deve poder cadastrar um novo filme", async ({ page }) => {
  await moviesPage.create("O Último Filme", "sinopse", "Netflix", "1980");
});
