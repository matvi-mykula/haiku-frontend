import React, { useEffect, useState } from 'react';

import { useColorScheme } from '@mantine/hooks';
import { ThemeSwitcher } from './ColorScheme';
import axios from 'axios';

import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Box,
  Footer,
} from '@mantine/core';
import { DailyFrontPage } from './FrontPage';

const MyAppShell = () => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [content, setContent] = useState('home');
  // console.log({ content });
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme, fontFamily: 'Monospace' }}
        withGlobalStyles
      >
        <AppShell
          styles={(theme) => ({
            Button: (theme: {
              colorScheme: string;
              colors: { dark: any[]; gray: any[] };
            }) => ({
              // Shared button styles are applied to all buttons
              root: { height: 42, padding: '0 30px', color: 'blue' },

              // These styles are applied only to buttons with outline variant
              outline: {
                // You can use any selectors inside (the same way as in createStyles function)
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              },
            }),
            main:
              theme.colorScheme === 'dark'
                ? {
                    /////define dark mode

                    backgroundColor: theme.colors.dark[7],
                  }
                : {
                    ////define light mode
                    backgroundColor: theme.colors.blue[1],
                  },
          })}
          // navbarOffsetBreakpoint="sm"
          // asideOffsetBreakpoint="sm"
          // navbar={
          //   <Navbar
          //     // style={{ background: theme.colorScheme.colors.blue[2] }}
          //     p="md"
          //     hiddenBreakpoint="sm"
          //     hidden={!opened}
          //     width={{ sm: 150, lg: 250 }}
          //   >
          //     <MyNav
          //       setOpened={setOpened}
          //       content={content}
          //       setContent={setContent}
          //     ></MyNav>
          //   </Navbar>
          // }
          header={
            <Header
              height={{ base: 50, md: 70 }}
              p="md"
            >
              <Box
                style={{
                  maxWidth: '90vw',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100vw',
                }}
              >
                <MediaQuery
                  largerThan="sm"
                  styles={{ display: 'none' }}
                >
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                  />
                </MediaQuery>
                <Text
                  fw={700}
                  style={{ fontSize: 'calc(15px + 0.390625vw)' }}
                >
                  Haiku better than News
                </Text>
                <Box>
                  <ThemeSwitcher></ThemeSwitcher>
                </Box>
              </Box>
            </Header>
          }
          footer={
            <Footer
              height={60}
              p="md"
            >
              There will be nav buttons here
            </Footer>
          }
        >
          <DailyFrontPage></DailyFrontPage>
          {/* <MyContent content={content}></MyContent> */}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export { MyAppShell };
