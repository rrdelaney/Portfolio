import React from 'react';
import { Client } from '@notionhq/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

type Unwrap<P> = P extends Promise<infer T>
  ? T
  : P extends Array<infer T>
  ? T
  : never;
type Content = Unwrap<ReturnType<Client['blocks']['children']['list']>>;
type Block = Unwrap<Content['results']>;

interface PostProps {
  title: string;
  content: Content;
}

function Block(props: { block: Block }) {
  return <div>{props.block.id}</div>;
}

function Post(props: PostProps) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>

      <h1>{props.title}</h1>

      {props.content.results.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const db = await notion.databases.query({
    database_id: '4b4b8f0af7e74ecc8f7bad148e05698b',
  });

  const pageIds: string[] = [];
  for (const page of db.results) {
    const name = page.properties.Name;
    if (name.type !== 'title') continue;

    const plainTextName = name.title
      .map((text) => text.plain_text.toLowerCase().replaceAll(' ', '-'))
      .join('-');

    pageIds.push(`${plainTextName}-${page.id}`);
  }

  return { paths: pageIds.map((id) => `/posts/${id}`), fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const pageId = (params!.post as string).match(
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
  )?.[0]!;

  const [page, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);

  let pageTitle = '';
  if (page.properties.Name.type === 'title') {
    pageTitle = page.properties.Name.title
      .map((text) => text.plain_text)
      .join(' ');
  }

  return { props: { title: pageTitle, content: blocks } };
};

export default Post;
