import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Components";
import { MoviesPage } from "../pages/MoviesPage";
import { executeSQL } from "../support/database";

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

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`);

  await moviesPage.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );

  await toast.containText("Cadastro realizado com sucesso!");
});
