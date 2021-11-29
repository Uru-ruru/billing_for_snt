let price;
let minus;
let litera = "";
let k = 0, i, j;

const N = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
    "", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
    "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
    "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
    "тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч",
    "миллионов", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов",
    "миллиардов", "миллиард", "миллиарда", "миллиарда", "миллиарда", "миллиардов", "миллиардов", "миллиардов", "миллиардов", "миллиардов"];
const M = new Array(10);
for (j = 0; j < 10; ++j)
    M[j] = new Array(N.length);
for (i = 0; i < N.length; i++)
    for (j = 0; j < 10; j++)
        M[j][i] = N[k++]
const R = ["рублей", "рубль", "рубля", "рубля", "рубля", "рублей", "рублей", "рублей", "рублей", "рублей"];
const K = ["копеек", "копейка", "копейки", "копейки", "копейки", "копеек", "копеек", "копеек", "копеек", "копеек"];

function num2str(money) {
    let rub = "";
    let kop = "";
    money = money.toString().replace(",", ".");
    if (isNaN(money)) {
        return
    }
    if (money.substr(0, 1) === "-") {
        money = money.substr(1);
        minus = "минус "
    } else minus = "";
    money = Math.round(money * 100) / 100 + "";
    if (money.indexOf(".") !== -1) {
        rub = money.substr(0, money.indexOf("."));
        kop = money.substr(money.indexOf(".") + 1);
        if (kop.length === 1) kop += "0";
    } else rub = money;
    if (rub.length > 12) {
        return
    }

    let ru = propis(price = rub, R);
    let ko = propis(price = kop, K);
    let res;
    if (ko !== "") {
        res = ru + " " + ko;
    } else {
        res = ru;
    }
    if (ru === "Ноль " + R[0] && ko !== "") {
        res = ko;
    }
    if (parseInt(kop, 10) === 0) {
        res += " ноль " + K[0]
    }
    return (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
}

function propis(price, D) {
    litera = "";
    let sotny;
    let desatky;
    let edinicy;
    for (i = 0; i < price.length; i += 3) {
        sotny = desatky = edinicy = "";
        if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
            edinicy = " " + M[n(i + 1, 1)][1] + " " + M[0][i / 3 + 3];
            if (i === 0) {
                edinicy += D[0];
            }
        } else {
            edinicy = M[n(i + 1, 1)][0];
            if (edinicy === "один" && (i === 3 || D === K)) {
                edinicy = "одна"
            }
            if (edinicy === "два" && (i === 3 || D === K)) {
                edinicy = "две"
            }
            if (i === 0 && edinicy !== "") {

            } else {
                edinicy += " " + M[n(i + 1, 1)][i / 3 + 3];
            }
            if (edinicy === " ") {
                edinicy = ""
            } else {
                if (edinicy === " " + M[n(i + 1, 1)][i / 3 + 3]) {

                } else {
                    edinicy = " " + edinicy;
                }
            }
            if (i === 0) {
                edinicy += " " + D[n(i + 1, 1)]
            }
            if ((desatky = M[n(i + 2, 1)][2]) !== "") {
                desatky = " " + desatky;
            }
        }
        if ((sotny = M[n(i + 3, 1)][3]) !== "") {
            sotny = " " + sotny;
        }

        if (price.substr(price.length - i - 3, 3) === "000" && edinicy === " " + M[0][i / 3 + 3]) edinicy = "";
        litera = sotny + desatky + edinicy + litera;
    }
    if (litera === " " + R[0]) return "ноль" + litera;
    else return litera.substr(1);
}

function n(start, len) {
    if (start > price.length) return 0;
    else return Number(price.substr(price.length - start, len));
}

export default num2str;
