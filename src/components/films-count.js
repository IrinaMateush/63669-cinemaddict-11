export const createFilmsCountTemplate = () => {

  const count = Math.floor(Math.random() * 10000);

  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};
