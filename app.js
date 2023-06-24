import express from 'express';
import {firebaseApp} from "./firebase.js";
import {getFirestore, collection, getDocs, getDoc, setDoc, doc, addDoc, updateDoc} from "firebase/firestore";
import axios from "axios";
import * as cheerio from "cheerio";
import {parse} from "nodemon/lib/cli/index.js";

const app = express();
const port = 3000;

const db = getFirestore(firebaseApp);

app.get('/', (req, res) => {
    res.send('Hello gb');

    // const docRef = collection(db, "pumpers");
    //
    // getDocs(docRef).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()["ist"]["opet"]}`);
    //     });
    // }).catch((error) => {
    //     console.log("error", error);
    // })

})

app.get('/po', (req, res) => {

    const opetUrl = "https://www.opet.com.tr/akaryakit-fiyatlari";
    const poUrl = "https://www.petrolofisi.com.tr/akaryakit-fiyatlari/istanbul-akaryakit-fiyatlari";


    const fuelDocRef = doc(db, 'pumpers/REEE58Lt2UA0YigDnbAH/istanbul/benzin');
    const dieselDocRef = doc(db, 'pumpers/REEE58Lt2UA0YigDnbAH/istanbul/motorin');


    // getDoc(docRef).then((docSnapshot) => {
    //     if (docSnapshot.exists()) {
    //         console.log("Document data:", docSnapshot.data());
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.error("Error getting document: ", error);
    // });

    let benzinData = {};
    let dieselData = {};

    axios(poUrl).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const tableTrItems = $(".fuel-items table tbody tr");

        tableTrItems.each(function (i, elem) {
            let district = $(this).find("td:nth-child(1)").text();
            let fuelPrice = $(this).find("td:nth-child(2)").text();
            let dieselPrice = $(this).find("td:nth-child(3)").text();

            district = district.toLocaleLowerCase();

            //console.log(fuelType + " " + fuelPrice + " " + dieselPrice);

            benzinData[district] = parseFloat(fuelPrice.replace("TL/LT", "").trim().toLowerCase());
            dieselData[district] = parseFloat(dieselPrice.replace("TL/LT", "").trim().toLowerCase());
        })

        console.log(" benzinData: ", benzinData);
        console.log(" dieselData: ", dieselData);

        updateDoc(fuelDocRef, benzinData).then((docRef) => {
            console.log("benzinData Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error benzinData adding document: ", error);
        });

        updateDoc(dieselDocRef, dieselData).then((docRef) => {
            console.log("dieselData Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error dieselData adding document: ", error);
        });

    }).catch((error) => {
        console.log("error", error);
    });


    res.send('OPET');
})


app.listen(port, () => {
    console.log("uygulama çalışıyor");
})