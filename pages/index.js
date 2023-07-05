import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from "next/link";
import Layout, {siteTitle} from "../components/layout";
import {getSortedPostsData} from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {props: {allPostsData}}
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain
        </p>
        <p>
          Dis discere honestatis interpretaris vituperata posidonium ad definitionem. Signiferumque justo cum facilisi sumo signiferumque molestie signiferumque sapientem congue. Cubilia tractatos euismod perpetua ius equidem conceptam ante inceptos ocurreret. Posidonium dissentiunt mutat graece id antiopam perpetua salutatus tempus novum. Cetero invenire habitasse posidonium arcu erat regione. Nonumy dico mel laoreet contentiones regione.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
