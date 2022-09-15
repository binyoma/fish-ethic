export const getFish = id => {
  return fetch(
    `https://hubeau.eaufrance.fr/api/v1/etat_piscicole/observations?size=20&code_commune=45153&code_operation=81773`,
  ).then(response => response.json());
};
