function updateColor() {
    fetch("https://www.thecolorapi.com/random")
        .then((response) => response.json())
        .then((data) => {
            const color = data.hex.value;
            document.querySelector("body").style.backgroundColor = color;
            document.querySelector("#color").style.backgroundColor = color;
            document.querySelector("#hex-value").innerHTML = color;
            document.querySelector("#rgb-value").innerHTML = data.rgb.value;
            document.querySelector("#hsl-value").innerHTML = data.hsl.value;
            document.querySelector("#color-name").innerHTML = data.name.value;
            document.querySelector("#hex-value").style.color =
                getContrastYIQ(color);
            document.querySelector("#rgb-value").style.color =
                getContrastYIQ(color);
            document.querySelector("#hsl-value").style.color =
                getContrastYIQ(color);
            document.querySelector("#color-name").style.color =
                getContrastYIQ(color);

        });
}

function getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
}

function copy_all() {
    // copy all of the color formats
    var hex = document.querySelector("#hex-value").innerText;
    var rgb = document.querySelector("#rgb-value").innerText;
    var hsl = document.querySelector("#hsl-value").innerText;

    var all = hex + "\n" + rgb + "\n" + hsl;

    navigator.clipboard.writeText(all);
    document.querySelector("#notification").style.display = "block";
    setTimeout(() => {
        document.querySelector("#notification").style.display = "none";
    }, 2000);
}

function copyText(element) {
    navigator.clipboard.writeText(element.innerText);
    document.querySelector("#notification").style.display = "block";
    setTimeout(() => {
        document.querySelector("#notification").style.display = "none";
    }, 2000);
}

document.querySelector("#hex-value").addEventListener("click", function () {
    copyText(this);
});

document.querySelector("#rgb-value").addEventListener("click", function () {
    copyText(this);
});

document.querySelector("#hsl-value").addEventListener("click", function () {
    copyText(this);
});

updateColor();

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        updateColor();
    }
};
