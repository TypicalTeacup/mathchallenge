const express = require("express");
const app = express();
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath(__dirname + "/font.ttf", "impact");

const headerText = "Math challenge (99% fail):";

const canvasWidth = 550;
const canvasHeight = 200;

//registerFont("font.ttf", { family: "impact" });

app.get("/discordtest", (request, result) => {
    console.log(request.headers);
    result.redirect("/mathchallenge");
});

app.get("/mathchallenge", (request, result) => {
    const ua = request.headers["user-agent"];
    if (ua.includes("Discordbot")) {
        result.send();
        return;
    }
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");
    console.log(request.headers);
    console.log(request.baseUrl);

    //background =
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = `45px impact`;
    ctx.lineWidth = 2;
    ctx.fillStyle = `white`;
    const headerX = canvasWidth / 2 - ctx.measureText(headerText).width / 2;
    ctx.strokeText(headerText, headerX, 60);

    ctx.font = `90px impact`;
    ctx.lineWidth = 3;
    const num1 = Math.floor(Math.random() * 20) + 10;
    let dividers = [];
    for (let i = 2; i < num1; i++) {
        if (num1 % 1 == 0) dividers.push(i);
    }
    const num2 =
        dividers.length == 0
            ? 1
            : dividers[Math.floor(Math.random() * dividers.length)];
    const num3 = Math.floor(Math.random() * 30) + 1;
    const equation = `${num1} / ${num2} + ${num3}`;
    console.log(`equation: ${equation}`);

    const equationX = canvasWidth / 2 - ctx.measureText(equation).width / 2;
    ctx.strokeText(equation, equationX, 160);

    result
        .contentType("png")
        .set("Cache-Control", "no-store")
        .status(200)
        .send(canvas.toBuffer("image/png"));
});

app.listen(80, () => {
    console.log("math challenge is running");
});

module.exports = app;
