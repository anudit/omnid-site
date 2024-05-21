import localFont from "next/font/local";

export const ddin = localFont({
    src: [
        {
            path: './d-din/D-DIN-Bold.otf',
            weight: '400',
            style: 'bold',
        },
        {
            path: './d-din/D-DIN.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './d-din/D-DIN.otf',
            weight: '400',
            style: 'italic',
        },
    ],
})