const { SodiumPlus } = require("sodium-plus");

async function randomNum() {
    // Select a backend automatically
    let sodium = await SodiumPlus.auto();
 
    let num = await sodium.randombytes_uniform(256);
    return num
}

/** @type {async (n: number) => number[]} */
async function binRandomNums(n) {
    /** @type {number[]} */
    let bins = Array(16).fill(0);
    for (let i = 0; i < n; ++i) {
        const n = await randomNum();
        const q = Math.trunc(n/16);
        bins[q] += 1;
    }
    return bins;
}

const express = require("express");
const cors = require("cors");
const app = express();

let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

app.get("/:n", cors(corsOptions), async (req, res) => {
    const n = Number.parseInt(req.params.n);
    const bins = await binRandomNums(n);
    res.status(200).json({ bins });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Sodium server listening on port", PORT);
});
