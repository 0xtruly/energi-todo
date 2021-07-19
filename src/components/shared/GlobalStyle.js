import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}
p {
    font-size: 13px;
    margin-top: 0;
    margin-bottom: 10px;
}
img {
    border-style: none;
}
a {
    text-decoration: none;
    color: #539bf5;
}
body {
    /* color: #57584e; */
    color: #adbac7;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    /* background: #ffffff; */
    background-color: #22272e;
    font-size: 14px;
    line-height: 1.5;
}
`;