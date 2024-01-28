'use client';

import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

// Context API를 사용해 SWR 설정
export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
