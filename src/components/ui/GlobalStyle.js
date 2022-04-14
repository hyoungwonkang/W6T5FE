import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../../index.css';

const GlobalStyle = createGlobalStyle`
    ${reset};
    html{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'midiumG';
    };
`;

export default GlobalStyle;
