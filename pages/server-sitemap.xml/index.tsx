import type { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { ArchiveApi } from '@/entities/archive/api';
import { client } from '@/shared/api/apollo/apollo-client';
import { SITE_URL } from '@/shared/config/environment';

interface CommonAttributes {
  name: string;
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mixes = await ArchiveApi.fetchMixes({ limit: -1 });
  const {
    data: { guests },
  } = await client.query({
    query: ArchiveApi.GuestsDocument,
    variables: { limit: -1 },
  });
  const {
    data: { shows },
  } = await client.query({
    query: ArchiveApi.ShowsDocument,
    variables: { limit: -1 },
  });
  const {
    data: { releases },
  } = await client.query({
    query: ArchiveApi.ReleasesDocument,
    variables: { limit: -1 },
  });
  const {
    data: { genres },
  } = await client.query({
    query: ArchiveApi.GenresDocument,
  });
  const {
    data: { moods },
  } = await client.query({
    query: ArchiveApi.MoodsDocument,
  });

  const {
    data: { events },
  } = await client.query({
    query: ArchiveApi.EventsDocument,
    variables: { limit: -1 },
  });

  const getSitemap = (
    elems: { attributes: Pick<CommonAttributes, 'slug'> }[] | any,
    s: string
  ): ISitemapField[] => {
    return elems.map(
      ({ attributes }: { attributes: Pick<CommonAttributes, 'slug'> }) => ({
        loc: `${SITE_URL}/${s}/` + attributes.slug,
        lastmod: new Date().toISOString(),
      })
    );
  };

  const archiveMixesSitemap = getSitemap(mixes, 'archive');
  const archiveResidentsSitemap = getSitemap(guests, 'archive/residents');
  const archiveShowsSitemap = getSitemap(shows, 'archive/shows');
  const genresShowsSitemap = getSitemap(genres, 'archive/genres');
  const moodsShowsSitemap = getSitemap(moods, 'archive/mood');
  const releasesSitemap = getSitemap(releases, 'releases');
  const eventsSitemap = getSitemap(events, 'events');

  const fields = [
    ...archiveMixesSitemap,
    ...archiveResidentsSitemap,
    ...archiveShowsSitemap,
    ...genresShowsSitemap,
    ...moodsShowsSitemap,
    ...releasesSitemap,
    ...eventsSitemap,
  ];
  const sitemap = await getServerSideSitemapLegacy(context, fields);

  return sitemap;
};

export default function Site() {}
