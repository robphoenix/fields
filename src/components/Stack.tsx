/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import assert from 'assert';
import { Box } from './Box';

// TODO: these could prob be hooks?
export const getHorizontalAlignment = (align?: HorizontalAlign) => {
  const alignments: {
    none: string;
    left: string;
    center: string;
    right: string;
  } = {
    none: `stretch`,
    left: `flex-start`,
    center: `center`,
    right: `flex-end`,
  };
  if (align === null || align === undefined) return ``;
  return alignments[align];
};

export const getNegativeMargin = (space?: number) => {
  if (space === null || space === undefined) return;
  return space * -1;
};

export type HorizontalAlign = `left` | `right` | `center` | `none`;
export type StackProps = {
  as?: React.ElementType;
  space?: number;
  align?: HorizontalAlign;
  //   dividers?: boolean | `strong`;
};

export const Stack: React.FC<StackProps> = props => {
  const {
    space = 0,
    align = `none`,
    as = `div`,
    // dividers = false,
    children,
  } = props;
  const validStackComponents = [`div`, `ol`, `ul`] as Array<
    React.ElementType<any>
  >;
  assert(validStackComponents.includes(as), `Invalid Stack component: ${as}`);

  const isList = as === `ol` || as === `ul`;
  const alignItems = getHorizontalAlignment(align);
  const marginTop = getNegativeMargin(space);

  return (
    <Box
      as={as}
      css={{
        display: `flex`,
        padding: 0,
        margin: 0,
        listStyle: `none`,
        flexDirection: `column`,
        width: `100%`,
        '&:before': {
          content: "''",
          display: `block`,
          marginTop,
        },
      }}
    >
      {React.Children.map(React.Children.toArray(children), child => {
        return (
          <Box
            as={isList ? `li` : `div`}
            css={{
              display: `flex`,
              flexDirection: `column`,
              paddingTop: space,
              alignItems,
            }}
          >
            {/* {dividers && index > 0 ? (
              <Box css={{ width: `100%`, pb: space }}>
                <Divider strong={dividers === `strong`} />
              </Box>
            ) : null} */}
            {child}
          </Box>
        );
      })}
    </Box>
  );
};

// export type DividerProps = {
//   strong?: boolean;
// };

// export const Divider: React.FC<DividerProps> = props => {
//   const { strong = false } = props;
//   return (
//     <Box
//       css={{
//         position: `relative`,
//       }}
//     >
//       <Box
//         css={{
//           position: `absolute`,
//           width: `100%`,
//           height: `1px`,
//           bg: strong ? `text` : `border`,
//         }}
//       />
//     </Box>
//   );
// };
