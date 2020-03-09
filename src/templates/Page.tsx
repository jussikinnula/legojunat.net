import { graphql } from 'gatsby';
import React from 'react';
import { oc } from 'ts-optchain';
import styled from 'styled-components';
import { down, up } from 'styled-breakpoints';
import { Theme } from '../theme';
import Layout from '../components/Layout';
import { PrismicDocumentByUid, PrismicKeyText, PrismicImage, PrismicFileLink } from '../prismic';
import { HeadingAndTextSlice } from '../slices/HeadingAndText';
import { QueryComponent } from '../common';
import SliceZone from '../components/SliceZone';

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Image = styled.img`
  display: none;

  ${down('md')} {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Video = styled.video`
  display: none;

  ${up('lg')} {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div<{ theme: Theme }>`
  position: fixed;
  top: initial;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: calc(100% - 40px);
  padding: 20px;
  border-radius: 10px;
`;

export const query = graphql`
  query PageQuery($uid: String!) {
    prismic {
      page(uid: $uid, lang: "fi") {
        _linkType
        __typename
        _meta {
          tags
          type
          uid
        }
        title
        description
        image
        video {
          ... on PRISMIC__FileLink {
            _linkType
            name
            url
            size
          }
        }
        body {
          __typename
          ... on PRISMIC_PageBodyHeading_and_text {
            type
            primary {
              heading
              text
            }
          }
        }
      }
    }
  }
`;

type PageSlice = HeadingAndTextSlice;

interface PageProps {
  data: PrismicDocumentByUid<{
    page: {
      title: PrismicKeyText;
      description?: PrismicKeyText;
      image?: PrismicImage;
      video?: PrismicFileLink;
      body: PageSlice[];
    };
  }>;
}

const Page: QueryComponent<PageProps> = props => {
  const page = oc(props).data.prismic.page();
  const title = oc(page).title();
  const description = oc(page).description();
  const image = oc(page).image();
  const video = oc(page).video();
  const slices = oc(page).body();

  return (
    <Layout title={title} description={description} image={image}>
      <VideoWrapper>
        {image && <Image src={image.url} alt={image.alt} />}
        {/* tslint:disable-next-line:jsx-no-multiline-js */}
        {video && (
          <Video autoPlay={true} muted={true} loop={true} playsinline={true}>
            <source src={video.url} type={`video/${video.url.substr(-3)}`} />
          </Video>
        )}
      </VideoWrapper>
      <Content>
        <SliceZone slices={slices} />
      </Content>
    </Layout>
  );
};

Page.query = query;

export default Page;
