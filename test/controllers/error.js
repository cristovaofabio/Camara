exports.getPageNotFound = (req, res, next) => {
  res.status(404).render("404", {
    docTitle: "Página não encontrada",
    path: "/404",
  });
};
