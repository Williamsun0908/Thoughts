export const config = {
        loader: { load: ["[tex]/html", "[tex]/amscd"] },
        tex: {
            packages: { "[+]": ["html"], "[+]": ['amscd'] },
            inlineMath: [
            ["$", "$"],
            ],
            displayMath: [
            ["$$", "$$"],
            ]
        }
    };