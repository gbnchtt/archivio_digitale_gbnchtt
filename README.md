SUPSI 2025  
Corso d’interaction design, CV429 
Docenti: A. Gysin, G. Profeta  

Elaborato 1: Me, Myself & AI  

# archivio digitale gbnchtt
Autore: Giorgia Bianchetti 
[archivio digitale gbnchtt] <br> (https://gbnchtt.github.io/archivio_digitale_gbnchtt/)


## Introduzione e tema
Questo progetto nasce per esplorare e mettere in luce i temi ricorrenti nel mio archivio fotografico personale, attraverso una rappresentazione visiva interattiva. L’utente può immediatamente capire quali soggetti (architettura, animali, cibo, mare, ecc.) compaiono con maggiore frequenza e, selezionando una categoria, indagare come si distribuiscono nel tempo (ore del giorno). L’obiettivo è riflettere sul mio “sguardo” e sui pattern di comportamento dietro la produzione di immagini.


## Riferimenti progettuali
Il mio progetto riprende da “Rue Studio” lo sfondo neutro e il carosello orizzontale di anteprime, con tipografia essenziale ai margini, per mantenere il focus sulle immagini.
L’approccio minimal elimina ogni elemento superfluo, garantendo uno sguardo pulito e senza distrazioni.

![IMG_0910](https://github.com/user-attachments/assets/cadd6fab-9346-412f-a180-0e788fa1ae6f)


## Design dell’interfaccia e modalità di interazione
L’interfaccia si presenta con uno stile minimale e pulito, privo di elementi superflui, per mettere le immagini al centro dell’attenzione. Grazie a una griglia essenziale, tipografia discreta e spaziature bilanciate, l’utente può esplorare le categorie fotografiche in modo immediato, senza distrazioni, concentrandosi unicamente sul contenuto visuale.
Pagina principale
Header minimale (“archivio digitale gbnchtt”) e descrizione sintetica.
Griglia di anteprime per ciascuna categoria, con numero di scatti in alto.

Vista categoria
Sidebar a sinistra con elenco categorie e conteggi, la categoria attiva è evidenziata in verde.
Occupando la porzione principale della pagina, una griglia di immagini mostra tutte le foto appartenenti alla categoria.

Filtro temporale
Barra oraria orizzontale (0–23), ciascuna ora è un bucket di foto: selezionando un’ora (es. 10:00) si riduce ulteriormente il dataset, mostrando solo le immagini scattate in quell’intervallo.
Sotto la griglia, un’etichetta testuale indica il numero di foto nel filtro orario (“91 foto scattate alle 10:00”).

Dettaglio immagine
Lightbox modale che ingrandisce la foto selezionata, con sfondo semitrasparente per non distrarre dall’immagine stessa.
Chiusura con “×” in alto a destra.


## Tecnologia usata
Il progetto è stato realizzato utilizzando HTML per la struttura dei contenuti, CSS per definire lo stile dell’interfaccia e garantire un design pulito e responsive, e JavaScript per gestire l’interattività: dal filtro orario alle griglie dinamiche fino al lightbox di dettaglio.

Un esempio di come viene sfruttata la potenza delle WebGL texture per caricare le anteprime in modo efficiente:

const image = new Image();
image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image
    );
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
};
image.src = url;


## Target e contesto d’uso
Sed enim ut sem viverra aliquet eget sit. Iaculis at erat pellentesque adipiscing commodo. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Ipsum faucibus vitae aliquet nec ullamcorper sit. Tempus quam pellentesque nec nam aliquam sem et tortor. Turpis egestas sed tempus urna et pharetra pharetra massa. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel.

[<img src="doc/munari.jpg" width="300" alt="Supplemento al dizionario italiano">]()
