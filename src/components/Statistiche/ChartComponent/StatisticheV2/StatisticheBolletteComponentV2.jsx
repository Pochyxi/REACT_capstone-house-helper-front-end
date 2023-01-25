import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { getBolletteList } from "../../../../redux/actions/actions";

const StatisticheBolletteComponentV2 = () => {
    const user = useSelector ( state => state.user.user )
    const bolletteList = useSelector ( state => state.fetch.bollettaList )

    const dispatch = useDispatch ()

    useEffect ( () => {
        dispatch ( getBolletteList ( user.token , user.id ) )
        console.log ( statisticBolletteGenerator () )
    } , [] )

    const monthGenerator = (index) => {
        switch (index) {
            case 1:
                return "Gen"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "Mag"
            case 6:
                return "Giu"
            case 7:
                return "Lug"
            case 8:
                return "Ago"
            case 9:
                return "Set"
            case 10:
                return "Ott"
            case 11:
                return "Nov"
            case 12:
                return "Dic"
        }
    }

    const statisticBolletteGenerator = () => {
        //oggetto che conterrà tutte le informazioni processate
        // 1 array con 12 oggetti che conterranno le info mese per mese
        let obj = {
            arrOfDayDates : [] ,
            arrOfMonthDates : []
        }

        // opzionale da usare
        const handleObj = (key , value) => {
            obj = {
                ...obj ,
                [key] : value
            }
        }


        const parser = (number) => {
            if ( number < 10 ) return '0' + number
            else return number
        }

        // eseguo un ciclo pari a un numero passato tramite parametro
        for (let i = 0; i < 365; i++) {
            if ( i === 0 ) {
                let date = new Date ()
                let dateYear = date.getUTCFullYear () + '-'
                let dateMonth = date.getMonth () + 1
                let dateDay = date.getUTCDate ()
                obj.arrOfDayDates.push ( dateYear + parser ( parseInt ( dateMonth ) ) + '-' + parser ( dateDay ) )
            } else {
                let date = new Date ()
                const oneDayInMs = 86400000
                date.setMilliseconds ( date.getMilliseconds () - (oneDayInMs * i) )

                let dateYear = date.getUTCFullYear () + '-'
                let dateMonth = date.getMonth () + 1
                let dateDay = date.getUTCDate ()

                obj.arrOfDayDates.push ( dateYear + parser ( parseInt ( dateMonth ) ) + '-' + parser ( dateDay ) )
            }
        }

        // generatore di variabile che rappresenta un array di date di un certo mese
        // const dateOfMonthGenerator = (day , month , anno , date) => {
        //     obj['monthOf' + monthGenerator ( parseInt ( month[0] === '0' ? month[1] : month ) ) + anno] = []
        //     obj['monthOf' + monthGenerator ( parseInt ( month[0] === '0' ? month[1] : month ) ) + anno].push ( date )
        //
        //     return obj['monthOf' + monthGenerator ( parseInt ( month[0] === '0' ? month[1] : month ) ) + anno]
        // }

        // Cilo l'intera collezione di date giornaliere e determino il giorno, mese e anno
        for (let dateOf of obj.arrOfDayDates) {
            let matrice = dateOf.split ( "-" )
            let indexOfMatrice = obj.arrOfDayDates.indexOf ( dateOf )

            let giornoMatrice = matrice[2]
            let meseMatrice = matrice[1]
            let annoMatrice = matrice[0]

            // se la posizione dell'elemento è la prima allora crea un array e pusha dentro l'elemento
            if ( indexOfMatrice === 0 ) {
                obj.arrOfMonthDates.push ( [ dateOf ] )
            } else {
                // se no, si presuppone che non sia il primo e quindi che abbia un elemento che lo precede
                let dateOfPrecedente = obj.arrOfDayDates[indexOfMatrice - 1]
                let matricePrecedente = dateOfPrecedente.split ( "-" )
                let meseOfMatricePrecedente = matricePrecedente[1]


                // se il mese dell'elemento corrente è uguale al mese dell'elemento precedente
                // vuol dire che ci troviamo nello stesso mese e quindi continuiamo a pushare nella lista
                // precedentemente creata
                if ( meseMatrice === meseOfMatricePrecedente ) {
                    obj.arrOfMonthDates[obj.arrOfMonthDates.length -
                    1] = [ ...obj.arrOfMonthDates[obj.arrOfMonthDates.length - 1] , dateOf ]

                } else {
                    // se no ci troviamo in un nuovo mese e quindi creiamo un nuovo array per il mese corrente
                    obj.arrOfMonthDates.push ( [ dateOf ] )
                }
            }

        }

        // un oggetto contenente
        // ArrayOfDates = un array di 365 stringhe che rappresentano il conteggio dei giorni di un anno fa a partire
        // da oggi
        // ArrOfMonthDates = un array di array che rappresentano 13 mesi fa a partire da oggi, ogni array è una lista
        // di giorni sottoforma di stringhe che rappresentano il mese
        // Tutti i mesi dell'anno precedente partendo da oggi
        return obj
    }

    return (
        <div>

        </div>
    );
};

export default StatisticheBolletteComponentV2;