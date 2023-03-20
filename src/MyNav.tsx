import React, { useEffect, useState } from 'react';
// import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, AppShell, Navbar, Header, Affix, Flex } from '@mantine/core';
import { Stack, Box } from '@mantine/core';
import './App.css';

interface Props {
  setContent: Function;
  setLoaded: Function;
  content: string;
}

const MyNav: React.FC<Props> = ({ setContent, setLoaded, content }) => {
  // useEffect(() => {
  //   // document.getElementById('pop')
  //   console.log('useffect');
  //   const buttons = [
  //     document.getElementById('pop') as HTMLInputElement,
  //     document.getElementById('news') as HTMLInputElement,
  //   ];
  //   //remove all styling
  //   for (let i = 0; i < buttons.length; i++) {
  //     if (buttons[i].classList) {
  //       buttons[i].style.boxShadow = '';
  //     }
  //     console.log('class removed');
  //   }
  //   let active;
  //   if (content) {
  //     active = document.getElementById(content) as HTMLElement;
  //     console.log({ active });
  //   }
  //   active.style.boxShadow = 'inset 0px 0px 5px #888';
  //   console.log(active?.classList);
  // }, [content]);

  return (
    <div>
      <Flex gap="sm">
        <Button
          id="pop"
          //should style this globally
          onClick={() => {
            setContent('pop');
            setLoaded(false);
          }}
        >
          Popular
        </Button>
        <Button
          id="news"
          // color="gray"
          // radius="xl"
          // size="md"
          // compact
          // uppercase
          onClick={() => {
            setContent('news');
            setLoaded(false);
            console.log('news');
          }}
        >
          News
        </Button>
        {/* <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => {
            setContent('contact');
            setOpened(false);
          }}
        >
          Contact
        </Button>

        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => {
            setContent('coding');
            setOpened(false);
          }}
        >
          Portfolio
        </Button> */}

        {/* <Affix></Affix>
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          style={{
            position: 'absolute',
            bottom: '0px',
          }}
          onClick={() => {
            setContent('admin');
            setOpened(false);
          }}
          variant="subtle"
        ></Button> */}
      </Flex>{' '}
    </div>
  );
};

export { MyNav };
