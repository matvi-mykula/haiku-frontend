import { ActionIcon, useMantineColorScheme, Button } from '@mantine/core';

import { useColorScheme } from '@mantine/hooks';
import React from 'react';
import sun from 'sun.svg';

// import { SunIcon, MoonIcon } from '@modulz/radix-icons';

const ThemeSwitcher: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <img
          style={{
            backgroundColor: 'yellow',
            // color: 'navy',
            // width: 18,
            // height: 18,
          }}
          src="./sun.svg"
          alt="nothing here"
        ></img>
      ) : (
        <img
          style={{
            backgroundColor: 'navy',
            // color: 'yellow',
            // width: 18,
            // height: 18,
          }}
          src="./moon.svg"
          alt="nothing here"
        ></img>
      )}
    </ActionIcon>
  );
};

export { ThemeSwitcher };
