import React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import styledNormalize from 'styled-normalize';
import theme from '../theme';
import { PrismicKeyText, PrismicImage } from '../prismic';
import SEO from './SEO';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    x-ms-format-detection: none;
    font-family: ${theme.fontFamilies.text};
  }

  body {
    padding: 10px 0;
    margin: 0;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fontFamilies.heading};
  }

  code, pre {
    font-family: ${theme.fontFamilies.code};
  }

  a {
    color: ${theme.colors.text};
    font-weight: bold;
    opacity: 1;
    transition: opacity .25s ease-in-out;

    &:hover {
      opacity: 0.75;
    }
  }

  div {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

interface LayoutProps {
  title?: PrismicKeyText;
  description?: PrismicKeyText;
  image?: PrismicImage;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({ title, description, image, children }) => (
  <>
    <SEO title={title} description={description} image={image} />
    <Helmet>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300|Roboto+Mono&amp;display=swap" rel="stylesheet" />
    </Helmet>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {children}
      </Wrapper>
    </ThemeProvider>
  </>
);

export default Layout;
