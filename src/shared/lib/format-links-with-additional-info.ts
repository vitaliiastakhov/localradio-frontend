import { LinkProps } from 'next/link';
import {
  releaseLinksAdditionalData,
  socialsAdditionalData,
} from '@/entities/archive/ui/cards/release-card/release-links-additional-data';
import type {
  ComponentLinksToSocialsLinksToSocials,
  ComponentReleaseLinksLinks,
} from '@/shared/api/graphql/__generated__/schema.graphql';

type AdditionalData =
  | keyof typeof socialsAdditionalData
  | keyof typeof releaseLinksAdditionalData;

interface LinksWithColors {
  color?: string | undefined;
  icon?: JSX.Element | undefined;
  title?: string | undefined;
  type: AdditionalData;
  href: LinkProps['href'];
}

interface FormatLinksWithColors {
  variant: 'release' | 'socials';
  links?:
    | ComponentReleaseLinksLinks
    | ComponentLinksToSocialsLinksToSocials
    | null;
}

export const formatLinksWithAdditionalInfo = ({
  variant,
  links,
}: FormatLinksWithColors) => {
  const linksArray =
    links &&
    Object.entries(links).filter((link) =>
      link[1]?.startsWith('https' || 'http')
    );

  const additionalData: any =
    variant === 'socials' ? socialsAdditionalData : releaseLinksAdditionalData;

  const linksWithColors = linksArray?.map((link) => {
    const type = link[0] as AdditionalData;
    return {
      type,
      href: link[1],
      ...additionalData[type],
    };
  });

  return linksWithColors as LinksWithColors[] | undefined;
};
