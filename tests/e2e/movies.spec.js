import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Components";
import { MoviesPage } from "../pages/MoviesPage";

const data = require("../support/fixtures/movies.json");

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
  const movie = data.create;
  await moviesPage.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );

  const message = "UhullCadastro realizado com sucesso!";

  await toast.haveText(message);
});
