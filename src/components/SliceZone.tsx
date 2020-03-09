import React from 'react';
import { PrismicSlice } from '../prismic';
import HeadingAndText from '../slices/HeadingAndText';

interface SliceZoneProps {
  slices?: PrismicSlice<any>[];
}

export default class SliceZone extends React.Component<SliceZoneProps> {
  public renderSlice = (slice: PrismicSlice<any>, index: number) => {
    const { type, primary } = slice;
    const key = `slice-${type}-${index}`;
    switch (type) {
      case 'heading_and_text': {
        return <HeadingAndText key={key} {...primary} />;
      }
      default:
        throw new Error(`Cannot handle slice type: "${type}"`);
    }
  }

  public render() {
    const { slices } = this.props;

    if (!slices) {
      return null;
    }

    return (
      <React.Fragment>
        {slices.map(this.renderSlice)}
      </React.Fragment>
    );
  }
}
