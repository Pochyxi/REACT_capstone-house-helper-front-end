import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { getBolletteList } from "../../../../redux/actions/actions";
import { Col , Row } from "react-bootstrap";
import ChartBolletteComponent from "../ChartBolletteComponent";
import Card from "@mui/material/Card";
import ChartBolletteComponentV2 from "./ChartBolletteComponentV2";

const StatisticheBolletteComponentV2 = () => {
    const user = useSelector ( state => state.user.user )
    const bolletteList = useSelector ( state => state.fetch.bollettaList )

    const dispatch = useDispatch ()

    useEffect ( () => {
        dispatch ( getBolletteList ( user.token , user.id ) )


    } , [] )

    useEffect ( () => {
        if ( bolletteList.length > 0 ) {
            console.log ( statisticBolletteGenerator () )
        }
    } , [ bolletteList ] )


    // in base al numero ritorna una stringa che rappresenta il mese (monthGenerator(5) = "Mag")
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
        // oggetto che conterrà tutte le informazioni processate
        let objOfDates = {
            // array contentente 365 giorni che fanno parte dell'anno precedente
            arrOfDayDates : [] ,
            arrayOfTabsDayDates : [] ,
            arrayOfObjDayDates : [] ,
            // array contenente 13 elementi che a loro volta sono degli array che rappresentano 13 mesi dell'anno
            // precedente, che contengono delle date del mese in questione
            arrOfMonthDates : [] ,
            arrayOfTabsMonthDates : [],
            // why not arrow function?!?!
            lol : function () {
                console.log ('whoaaaaaa' + this.arrOfDayDates)}
        }

        // opzionale da usare per la creazione delle variabili all'interno di objOfDates
        const handleObj = (key , value) => {
            objOfDates = {
                ...objOfDates ,
                [key] : value
            }
        }


        const parser = (number) => {
            if ( number < 10 ) return '0' + number
            else return number
        }

        // eseguo un ciclo pari a un numero passato tramite parametro
        for (let i = 0; i < 365; i++) {
            // se è il primo elemento
            if ( i === 0 ) {
                // la data di oggi
                let date = new Date ()
                // il numero che rappresenta l'anno
                let dateYear = date.getUTCFullYear () + '-'
                // il numero che rappresenta il mese
                let dateMonth = date.getMonth () + 1
                // il numero che rappresenta il giorno
                let dateDay = date.getUTCDate ()
                // inserisco la data nell'array dentro all'oggetto
                objOfDates.arrOfDayDates.push ( dateYear + parser ( parseInt ( dateMonth ) ) + '-' +
                    parser ( dateDay ) )

            } else {
                // se non è il primo elemento allora
                // prendiamo la data di oggi
                let date = new Date ()
                // un giorno calcolato in ms
                const oneDayInMs = 86400000
                // settiamo la data di oggi meno un giorno * i che rappresenta l'iteratore(quindi se siamo a 5
                // verrà settata una data di 5 giorni fa)
                date.setMilliseconds ( date.getMilliseconds () - (oneDayInMs * i) )

                // mi inizializzo i dati utili per creare la data
                let dateYear = date.getUTCFullYear () + '-'
                let dateMonth = date.getMonth () + 1
                let dateDay = date.getUTCDate ()

                // inserisco la data nell'array
                objOfDates.arrOfDayDates.push ( dateYear + parser ( parseInt ( dateMonth ) ) + '-' +
                    parser ( dateDay ) )
            }
        }

        // Ciclo l'intera collezione di date giornaliere e determino il mese
        for (let dateOf of objOfDates.arrOfDayDates.reverse ()) {
            // transformo la stringa in un array ("2022-01-01".split("-") = ["2022", "01", "01"])
            let matrice = dateOf.split ( "-" )
            // seleziono solo il mese
            let meseMatrice = matrice[1]
            // l'indice dell'elemento corrente
            let indexOfMatrice = objOfDates.arrOfDayDates.indexOf ( dateOf )

            // se la posizione dell'elemento è la prima
            if ( indexOfMatrice === 0 ) {
                // inserisco la data in un array che sarà contenuto dall'array arrOfMonthDates
                objOfDates.arrOfMonthDates.push ( [ dateOf ] )
            } else {
                // se no, si presuppone che non sia il primo e quindi che abbia un elemento che lo precede
                // la data che precede quella corrente
                let dateOfPrecedente = objOfDates.arrOfDayDates[indexOfMatrice - 1]
                // transformo la data in un array
                let matricePrecedente = dateOfPrecedente.split ( "-" )
                // seleziono solo il mese
                let meseOfMatricePrecedente = matricePrecedente[1]


                // se il mese dell'elemento corrente è uguale al mese dell'elemento precedente
                // vuol dire che ci troviamo nello stesso mese e quindi continuiamo a pushare nella lista
                if ( meseMatrice === meseOfMatricePrecedente ) {
                    // nell'array arrOfMonthDates, seleziono l'ultimo array e copio tutti i suoi elementi aggiungendo
                    // in coda l'ultima data corrispondente al mese in questione
                    objOfDates.arrOfMonthDates[objOfDates.arrOfMonthDates.length -
                    1] = [ ...objOfDates.arrOfMonthDates[objOfDates.arrOfMonthDates.length - 1] , dateOf ]

                } else {
                    // se no ci troviamo in un nuovo mese, di conseguenza
                    // dobbiamo aggiungere un nuovo array che rappresenterà il mese successivo
                    objOfDates.arrOfMonthDates.push ( [ dateOf ] )
                }
            }

        }

        for (let data of objOfDates.arrOfDayDates) {
            let arrayDiBoll = bolletteList.filter ( boll => boll.emissione === data )

            let totaleBollByDay = arrayDiBoll.length === 0 ? 0 :
                arrayDiBoll.reduce ( (acc , cval) => acc + cval.totale , 0 )

            objOfDates.arrayOfTabsDayDates.push ( totaleBollByDay )
        }

        for (let data of objOfDates.arrOfDayDates) {
            let arrayDiBoll = bolletteList.filter ( boll => boll.emissione === data )

            if ( arrayDiBoll.length === 0 ) {
                objOfDates.arrayOfObjDayDates.push ( [] )
            } else {
                objOfDates.arrayOfObjDayDates.push ( [ ...objOfDates.arrayOfObjDayDates[objOfDates.arrayOfObjDayDates.length -
                1] , ...arrayDiBoll ] )
            }
        }

        objOfDates.lol()

        // un oggetto contenente
        // ArrayOfDates = un array di 365 stringhe che rappresentano il conteggio dei giorni di un anno fa a partire
        // da oggi
        // ArrOfMonthDates = un array di array che rappresentano 13 mesi fa a partire da oggi, ogni array è una lista
        // di giorni sottoforma di stringhe che rappresentano il mese
        // Tutti i mesi dell'anno precedente partendo da oggi
        return objOfDates
    }

    return (
        <Row className={ 'text-center justify-content-center' }>
            <ChartBolletteComponentV2
                arrOfDayDates={ statisticBolletteGenerator ().arrOfDayDates }
                arrayOfTabsDayDates={ statisticBolletteGenerator ().arrayOfTabsDayDates }
                arrayOfObjDayDates={ statisticBolletteGenerator ().arrayOfObjDayDates }
            />
        </Row>

    );
};

export default StatisticheBolletteComponentV2;