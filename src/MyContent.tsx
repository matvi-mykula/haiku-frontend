import React, { useEffect, useState } from 'react';
import { DailyFrontPage } from './FrontPage';
// import { Login } from 'Login';
// import { Contact } from 'Contact';
// import { About } from 'About';
interface Props {
  content: string;
  setColor: Function;
  color: string;
}
interface User {
  user?: string;
  password?: string;
  isAdmin?: boolean;
}

const MyContent: React.FC<Props> = ({ content, setColor, color }) => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [user, setUser] = useState<User>({});

  switch (content) {
    // case 'home': {
    //   return <App></App>;
    // }
    // case 'about': {
    //   return <About></About>;
    // }
    case 'pop': {
      return (
        <DailyFrontPage
          url={'https://www.reddit.com/r/popular/top.json'}
          setColor={setColor}
          color={color}
        ></DailyFrontPage>
      );
    }
    case 'news': {
      return (
        <DailyFrontPage
          url={'https://www.reddit.com/r/news/top.json'}
          setColor={setColor}
          color={color}
        ></DailyFrontPage>
      );
    }
    // case 'movement': {
    //   console.log({ content });
    //   return <Blog category={'movement'}></Blog>;
    // }
    // case 'clothing': {
    //   return <Blog category={'clothes'}></Blog>;
    // }
    // case 'admin': {
    //   return (
    //     <Login
    //       isAdmin={isAdmin}
    //       setIsAdmin={setIsAdmin}
    //       user={user}
    //       setUser={setUser}
    //     ></Login>
    //   );
    // }
    default:
      return <p>hello from router</p>;
  }
};

export { MyContent };
