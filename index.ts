/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

const CutePrefixes = [
    "*ahem!*...", "*looks around nervously*...", "*fiddles with fingers*...",
    "*clears throat*...", "Umm...", "E-eto...", "*twiddles thumbs*...",
    "*takes a deep breath*...", "H-hewwo?", "U-uh...", "*pokes fingers together*",
    "Ano...", "あの...", "えっと...", "*shuffles feet*...", "*glances away*...",
    "*sweats nervously*", "*blinks slowly*", "*w-waves shyly*", "*tugs sleeve*...",
    "*gulps*", "*bites lip*", "*kicks pebble*", "*rubs arm*", "*twirls hair*...",
    "*hums softly*...", "*sneaks up*...", "*giggles softly*...", "*clutches teddy bear*...",
    "*peeks from behind*...", "*nibbles lip*...", "*taps foot*...", "*sniffs*...",
    "*wiggles toes*...", "*tilts head*...", "*frowns cutely*...", "*rubs eyes*...",
    "*hops in place*...", "*snickers lowly*...", "*hides face*...", "*flicks hair*...",
    "*scampers in*...", "*skips around*...", "*coffs cutely*..."
];

const CuteEmotes = [
    "*shy*", "*giggles*", "*blushes*", "*hides*", "UwU", "OwO", "^^",
    ">.<", ":3", "(≧∇≦)", "(⌒‿⌒)", "*nuzzles*", "*pokes*", "hehe~",
    "*tilts head*", "*sparkles*", "(ﾉ´ヮ´)ﾉ*:･ﾟ✧", "o(≧▽≦)o", "(〃ω〃)",
    "(/ω＼)", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡", "☆*:.｡.o(≧▽≦)o.｡.:*☆",
    "(´｡• ω •｡`)", "(づ｡◕‿‿◕｡)づ", "(*^▽^*)", "(⌒ω⌒)", "∑d(°∀°d)",
    "(っ˘ω˘ς)", "*purrs*", "*whimpers*", "*squeaks*", "*wiggles*", "*huggles*",
    "*snuggles*", "*flails*", "*nya~*", "*glomps*", "*puppy eyes*", "*hearts*",
    "*squee!*", "*smiles*", "*eyes sparkle*", "*zomg kawaii*", "*fawn eyes*",
    "*bounce*", "*cotton candy dreams*", "*soft chirp*", "*mew*", "*choo choo*",
    "*flutter*", "*smooch*", "*zitters*", "*gwee!*", "*pew pew*", "*play bows*"
];

const CuteEndings = [
    "*blushes furiously*", "UwU~", "OwO!", "*runs away*", "*hides behind you*",
    "teehee~", "^^;", "^-^", "(〃ω〃)", "rawr xD", "nya~", "*waves*",
    "uguu~", "...", "*looks away*", "*pouts*", "(*/ω＼*)", "(/▽＼*)｡o○♡",
    "☆", "★", "♪", "please be nice!", ">//<", "*fades into the shadows*",
    "*squeals*", "*sighs dreamily*", "*vanishes*", "*b-bye...*", "*floats away*",
    "*tiptoes away*", "*flutters eyelashes*...", "*splatters*...", "*dreamily hums*",
    "*sniffs goodbye*...", "*drifts off*...", "*murmurs softly*...", "*skips off*...",
    "*giggles and leaves*...", "*blinks and vanishes*...", "*shrinks cutely*..."
];

const CuteStutterChars = [
    "-", "..-", "-", "...-", "..", "~", "~~", "u-uhm...", "e-eh...", "a-ah...",
    "uh...uh...", "um...um...", "h-h-heart...", "t-tail...", "s-s-s-so...",
    "b-b-by...", "c-c-cute...", "m-m-aybe...", "w-w-wow...", "l-l-like..."
];

const CuteSuffixes = [
    "~", "~~", "ww~", "w", "nya", "uguu", "rawr", "(●'◡'●)", ">w<", "^w^",
    "pyo~n", "chu~", "~nya~~", "poyo~", "meow~", "rawr~", "sparkle~", "bunny~",
    "momo~", "twi~", "cutie~", "peach~", "kiki~", "bubu~"
];

const NormalStutterSuffixes = [
    "..", "~", "(. ❛ ᴗ ❛.)", "...", ". Uhm..", " err..", " uh...", " hmm...",
    " well...", " so...", " I-I mean...", " er...er...", " um...um...", " ah...ah..."
];

function CreateNormal(text: string): string {
    if (!text) return "";

    const parts = text.split(/(\s+|[.,!?;:~]+)/).filter(part => part);
    const processedParts: string[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        const isWord = trimmedPart && !/^[.,!?;:~]+$/.test(trimmedPart) && trimmedPart.length > 1;
        let processedPart = part;

        if (isWord) {
            // Apply prefix stutter
            if (Math.random() < 0.35) {
                const firstChar = part[0];
                const repetitions = Math.floor(Math.random() * 2) + 1;
                processedPart = (firstChar + "-").repeat(repetitions) + part;
            }
            // Apply suffix punctuation
            const targetPartForSuffix = processedPart;
            if (Math.random() < 0.25) {
                const suffix = NormalStutterSuffixes[Math.floor(Math.random() * NormalStutterSuffixes.length)];
                const match = targetPartForSuffix.match(/([.,!?;:~])$/);
                if (match) {
                    const punctuation = match[1];
                    const baseWord = targetPartForSuffix.slice(0, -punctuation.length);
                    processedPart = baseWord + suffix + punctuation;
                } else {
                    processedPart += suffix;
                }
            }
        }
        processedParts.push(processedPart);
    }
    return processedParts.join("");
}

function CreateCute(text: string): string {
    if (!text) return "";

    const processedParts: string[] = [];

    if (Math.random() < 0.45) {
        const prefix = CutePrefixes[Math.floor(Math.random() * CutePrefixes.length)];
        processedParts.push(prefix);
        if (!prefix.endsWith(" ")) {
            processedParts.push(" ");
        }
    }

    const parts = text.split(/(\s+|[.,!?;:~]+)/).filter(part => part);

    for (const part of parts) {
        const trimmedPart = part.trim();
        const isWord = trimmedPart && !/^[.,!?;:~]+$/.test(trimmedPart);
        let processedPart = part;

        if (isWord) {
            let wordModified = false;

            if (Math.random() < 0.33 && part.length > 0) {
                const firstChar = part[0];
                const stutterChar = CuteStutterChars[Math.floor(Math.random() * CuteStutterChars.length)];
                const repetitions = Math.floor(Math.random() * 2) + 1;
                processedPart = (firstChar + stutterChar).repeat(repetitions) + part;
                wordModified = true;
            }

            if (Math.random() < 0.25) {
                const suffix = CuteSuffixes[Math.floor(Math.random() * CuteSuffixes.length)];
                if (!CuteSuffixes.some(s => processedPart.endsWith(s))) {
                    const match = processedPart.match(/([.,!?;:~])$/);
                    if (match) {
                        const punctuation = match[1];
                        const baseWord = processedPart.slice(0, -punctuation.length);
                        processedPart = baseWord + suffix + punctuation;
                    } else {
                        processedPart += suffix;
                    }
                    wordModified = true;
                }
            }

            processedParts.push(processedPart);

            if (Math.random() < 0.22) {
                const lastPart = processedParts[processedParts.length - 1];
                if (lastPart && !/\s$/.test(lastPart)) {
                    processedParts.push(" ");
                }
                processedParts.push(CuteEmotes[Math.floor(Math.random() * CuteEmotes.length)]);
                if (Math.random() < 0.5) {
                    processedParts.push(" ");
                }
            }
        } else {
            processedParts.push(part);
        }
    }

    if (Math.random() < 0.65) {
        const lastPart = processedParts[processedParts.length - 1];
        if (lastPart && !/\s$/.test(lastPart)) {
            processedParts.push(" ");
        }
        processedParts.push(CuteEndings[Math.floor(Math.random() * CuteEndings.length)]);
    }

    return processedParts.join("");
}

export default definePlugin({
    name: "Catto Text",
    description: "cute ywwur twxt via slash commands~! *meow*",
    authors: [{ name: "Kukuri", id: 1358979462359941212n }],
    website: "https://kukuri.xyz",

    commands: [
        {
            name: "normal",
            description: "Apply normal cute text~",
            options: [
                {
                    name: "text",
                    description: "The text to transform",
                    type: 3,
                    required: true,
                },
            ],
            execute: (args: any[], ctx: any) => {
                try {
                    const textArg = args.find(arg => arg?.name === "text");
                    const inputText = textArg?.value as string | undefined;

                    if (!inputText) {
                        console.warn("[Kukuri] /normal: Input text not found in args.");
                        return { content: "Plwase prwvide text to transform~ *meow*", ephemeral: true };
                    }
                    const outputText = CreateNormal(inputText);
                    return { content: outputText, ephemeral: true };
                } catch (error) {
                    console.error("[Kukuri] Error executing /normal handler:", error);
                    return { content: "An errwr occurrwd prowcessing /normal~!", ephemeral: true };
                }
            },
        },
        {
            name: "cute",
            description: "Apply ultra cute pro max uwu text~!",
            options: [
                {
                    name: "text",
                    description: "The text to transform",
                    type: 3,
                    required: true,
                },
            ],
            execute: (args: any[], ctx: any) => {
                try {
                    const textArg = args.find(arg => arg?.name === "text");
                    const inputText = textArg?.value as string | undefined;

                    if (!inputText) {
                        console.warn("[Kukuri] /cute: Input text not found in args.");
                        return { content: "Plwease pwovide text to twansfowm~", ephemeral: true };
                    }
                    const outputText = CreateCute(inputText);
                    return { content: outputText, ephemeral: true };
                } catch (error) {
                    console.error("[Kukuri] Error executing /cute handler:", error);
                    return { content: "Sowwy, an ewwow occuwwed >.<", ephemeral: true };
                }
            },
        }
    ]
});
