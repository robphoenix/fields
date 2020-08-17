import React from 'react';

import { Stack } from '../src/components/Stack';
import { Box } from '../src/components/Box';

export default {
  title: `Stack`,
  component: [Stack],
};

const spaces = [4, 8, 16, 20, 24, 32];

export const StackComponent = () => {
  const alignments = [`none`, `left`, `center`, `right`] as const;
  const style = {
    padding: `32px`,
    backgroundColor: `white`,
    border: `1px solid blue`,
  };
  return (
    <Box style={{ maxWidth: 600 }}>
      <Stack space={24}>
        <h3>Stack</h3>
        {spaces.map((space: number, i: number) => (
          <Stack key={space} space={4}>
            <h6>space: {`${spaces[i]}px`}</h6>
            <Box style={{ backgroundColor: `aliceblue` }}>
              <Stack as="ul" space={space}>
                <Box style={style} />
                <Box style={style} />
                <Box style={style} />
              </Stack>
            </Box>
          </Stack>
        ))}
        <h3>Stack Alignment</h3>
        {alignments.map(align => (
          <Stack key={align} space={4}>
            <h6>{align}</h6>
            <Box style={{ backgroundColor: `aliceblue` }}>
              <Stack space={16} align={align}>
                <Box
                  style={{ ...style, paddingLeft: `8px`, paddingRight: `8px` }}
                />
                <Box
                  style={{
                    ...style,
                    paddingLeft: `24px`,
                    paddingRight: `24px`,
                  }}
                />
                <Box
                  style={{
                    ...style,
                    paddingLeft: `40px`,
                    paddingRight: `40px`,
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
