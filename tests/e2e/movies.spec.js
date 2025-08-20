import { expect, test } from "@playwright/test";
import { Login } from "../support/actions/Login";
import { Toast } from "../support/actions/Components";
import { Movies } from "../support/actions/Movies";
import { executeSQL } from "../support/database";

const data = require("../support/fixtures/movies.json");

let login;
let toast;
let movies;

test.beforeEach(async ({ page }) => {
  login = new Login(page);
  toast = new Toast(page);
  movies = new Movies(page);

  await login.visit();
  await login.submit("admin@zombieplus.com", "pwd123");
  await login.isLoggedIn("Admin");
});

test("deve poder cadastrar um novo filme", async ({ page }) => {
  const movie = data.create;

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`);

  await movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  );

  await toast.containText("Cadastro realizado com sucesso!");
});

test("não deve cadastrar os campos obrigatórios não são preenchidos", async ({
  page,
}) => {
  await movies.goForm();
  await movies.submit();

  await movies.alertHaveText([
    "Por favor, informe o título.",
    "Por favor, informe a sinopse.",
    "Por favor, informe a empresa distribuidora.",
    "Por favor, informe o ano de lançamento.",
  ]);
});
