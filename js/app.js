$(document).ready(function() {

    // funkcija za izvlacenja loto brojeva
    function brojevi() {
        var lotoNiz = [];
        var temp;
        for (var i = 0; lotoNiz.length < 7; i++) {
            temp = Math.floor(Math.random() * 39) + 1;
            if (lotoNiz.indexOf(temp) === -1) {
                lotoNiz.push(temp);
            }
        }
        lotoNiz.sort();
        return lotoNiz;
    }

    // Definisanje HTML elemenata
    var container = $("<div class='container'>");
    var loto_col = $("<div class='loto-col'>");
    var header;
    var num_cont;
    var lotoBrojeviIzvuceni = $("<h3>");
    var message = $("<h3>");
    var btn = $("<button id=>");
    var num = [];
    var col = [];

    // Petlja za pravljenje Loto 10 kolona
    for (var j = 1; j < 11; j++) {

        // Petlja za pravljenje loto brojeva
        for (var i = 1; i < 40; i++) {
            // pravljenje niza p elemenata
            num.push("<p class='num-conteiner'><span>" + i + "</span></p>");
        }
        // pravljenje hedera svake kolone
        header = $("<div class='header'>" + j + "</div>");

        //Pravljenje loto kolona
        num_cont = $("<div class='num-cont num-cont-" + j + "'>");

        // dodavanje HTML elemenata u petlji
        num_cont.append(header);
        num_cont.append(num);
        loto_col.append(num_cont);
        num = [];

    }


    container.append(loto_col);

    $('body').append(container);

    //Klik na span i obelezavanje odabranog broja u loto koloni

    $('span').on('click', function() {

        var str;
        var matches;

        str = $(this).parent().parent().prop('outerHTML');
        matches = (str.match(/span-selected/g) || []).length;
        if (matches < 7) {
            $(this).toggleClass('span-selected');

        } else if ($(this).attr("class") === "span-selected") {
            $(this).removeClass('span-selected');
        } else {
            alert("Obelezili ste sedam brojeva");
        }
    });

    $('#loto').click(function() {
        var arr = {};
        var subArr = [];
        var obelenezLoto = {};
        var lotoBrojevi;
        var j = 0;

        for (var i = 1; i < 11; i++) {
            $(".num-cont-" + i + " span.span-selected").each(function() {
                subArr.push(this.innerHTML);
            })
            arr[i] = subArr;
            subArr = [];
        }
        var test = 0;
        for (var i = 1; i < 11; i++) {
            if ((arr[i].length != 7) && (arr[i].length != 0)) {
                alert("Molimo vas upisite sedam brojeva u kolonu br: " + i);
                test++;
            } else if (arr[i].length === 7) {
                obelenezLoto[j] = arr[i];
                j++;
            }
        }
        if (test === 0) {
            //    funkcija za izvlacenje brojeva
            lotoBrojevi = brojevi();
        }

        // Funkcija za sortiranje izvucenih loto brojeva
        lotoBrojevi = lotoBrojevi.sort(function(a, b) {
            return a - b;
        });
        lotoBrojevi = lotoBrojevi.toString();
        var dobitak = false;
        // Petlja za uporedjivanje unetih loto kombinacija sa izvucenim brojevima
        for (var i = 0; i < Object.keys(obelenezLoto).length; i++) {
            if (obelenezLoto[i].toString() === lotoBrojevi) {
                dobitak = true;
            }
        }
        if (dobitak === true) {

            lotoBrojeviIzvuceni.text("Izvuceni loto brojevi su: " + lotoBrojevi);
            $(container).append(lotoBrojeviIzvuceni);
            message.text("CESTITAMO");
            $(container).append(message);

        } else if (Object.keys(obelenezLoto).length > 0) {
            lotoBrojeviIzvuceni.text("Izvuceni loto brojevi su: " + lotoBrojevi);
            $(container).append(lotoBrojeviIzvuceni);
            message.text("Vise srece drugi put");
            $(container).append(message);
        } else {
            alert("Popunite bar jednu kolonu");
        }
    });
});
