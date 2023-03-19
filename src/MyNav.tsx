import React, { useState } from 'react';
// import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, AppShell, Navbar, Header, Affix, Flex } from '@mantine/core';
import { Stack, Box } from '@mantine/core';

interface Props {
  setContent: Function;
  setLoaded: Function;
}

const MyNav: React.FC<Props> = ({ setContent, setLoaded }) => {
  return (
    <div>
      <Flex gap="sm">
        <Button
          //should style this globally
          onClick={() => {
            setContent('pop');
            setLoaded(false);
          }}
        >
          Popular
        </Button>
        <Button
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
