export const controlloPostitScadutiNonCompletati = (postit) => {
    let today = new Date();
    let postitScadenzaDate = new Date(postit.scadenza)

    return postitScadenzaDate.getTime () < today.getTime () && !postit.stato;
}