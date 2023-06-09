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
  Flex,
} from '@mantine/core';
import { DailyFrontPage } from './FrontPage';
import { MyContent } from './MyContent';
import { MyNav } from './MyNav';

const MyAppShell = () => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [content, setContent] = useState('pop');
  const [loaded, setLoaded] = useState(false);
  const [color, setColor] = useState('rgb(70,70,70)');

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
            buttonPressed: {
              backgroundColor: '#000080',
              boxShadow: 'inset 0px 0px 5px #888',
            },
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
              height={90}
              p="md"
            >
              <Flex
                mih={50}
                // bg="rgba(0, 0, 0, .3)"
                // gap="lg"
                // justify="center"
                direction="row"
                align="center"
                justify="center"
                wrap="nowrap"
              >
                <Text
                  fw={700}
                  style={{
                    fontSize: 'calc(15px + 1vw)',
                    alignSelf: 'center',
                    justifySelf: 'center',
                  }}
                >
                  Collective Subconcious News
                </Text>
              </Flex>
            </Header>
          }
          footer={
            <Footer
              height={60}
              p="md"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <MyNav
                setContent={setContent}
                setLoaded={setLoaded}
                content={content}
              ></MyNav>{' '}
              <Box style={{ marginLeft: 'auto' }}>
                <ThemeSwitcher></ThemeSwitcher>
              </Box>
            </Footer>
          }
        >
          {/* <DailyFrontPage ></DailyFrontPage> */}
          <Box>
            <MyContent
              color={color}
              content={content}
              setColor={setColor}
            ></MyContent>
          </Box>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export { MyAppShell };
