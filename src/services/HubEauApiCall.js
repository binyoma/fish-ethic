export const getStations= async (fish,departement,debut, fin) =>{
    try {
        return await fetch(
            `https://hubeau.eaufrance.fr/api/v0/etat_piscicole/lieux_peche?format=geojson&code_espece_poisson=${fish}&code_departement=${departement}&mois_debut=${debut}&mois_fin=${fin}`
        ).then(res => {
            return res.json();
          });
    } catch (error) {
        console.log(error.message);
    }
}