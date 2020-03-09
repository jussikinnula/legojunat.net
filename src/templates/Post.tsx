import { graphql } from 'gatsby';
import React from 'react';
import { oc } from 'ts-optchain';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { Theme } from '../theme';
import Layout from '../components/Layout';
import { PrismicDocumentBase, PrismicDocumentByUid, PrismicKeyText, PrismicImage, PrismicRichText } from '../prismic';
import { QueryComponent } from '../common';

const Wrapper = styled.div<{ theme: Theme }>``;

const Title = styled.h1<{ theme: Theme }>``;

const Text = styled.div``;

export const query = graphql`
  query PostQuery($uid: String!) {
    prismic {
      post(uid: $uid, lang: "fi") {
        _linkType
        __typename
        _meta {
          tags
          type
          uid
        }
        title
        text
        image
        video {
          ... on PRISMIC__FileLink {
            _linkType
            name
            url
            size
          }
        }
      }
    }
  }
`;

interface PostProps {
  data: PrismicDocumentByUid<{
    page: {
      title: PrismicKeyText;
      text?: PrismicKeyText;
      image?: PrismicImage;
      video?: any;
    };
  }>;
}

const Post: QueryComponent<PostProps> = props => {
  const page = oc(props).data.prismic.page();
  const title = oc(page).title();
  const text = oc(page).text();
  const image = oc(page).image();

  return (
    <Layout title={title} image={image}>
      <Wrapper>
        <Title>{title}</Title>
        <Text>{RichText.render(text)}</Text>
      </Wrapper>
    </Layout>
  );
};

Post.query = query;

export default Post;
