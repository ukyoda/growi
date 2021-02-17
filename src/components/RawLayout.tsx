import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  title: string,
  className?: string,
  children?: ReactNode,
}

const RawLayout = ({ children, title, className }: Props): JSX.Element => {

  const classNames: string[] = ['wrapper'];
  if (className != null) {
    classNames.push(className);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classNames.join(' ')}>
        {children}
      </div>
    </>
  );
};

export default RawLayout;
