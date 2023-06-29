import { ComponentLinksToSocialsLinksToSocials } from '@/shared/api/graphql/__generated__/schema.graphql';
import { formatLinksWithAdditionalInfo } from '@/shared/lib/format-links-with-additional-info';
import { Button } from '../button/button';

interface SocialsLinksListProps {
  socials: ComponentLinksToSocialsLinksToSocials;
}

export const SocialsList = ({ socials }: SocialsLinksListProps) => {
  const links = formatLinksWithAdditionalInfo({
    links: socials,
    variant: 'socials',
  });

  return (
    <ul className='flex items-center gap-2'>
      {links?.map(
        (link) =>
          link.icon && (
            <li key={link.type}>
              <Button
                colorVariant='primary'
                variant='clear'
                className='p-0 hover:fill-primary '
                sizeVariant='extra-small'
                href={link.href}
              >
                {link.icon}
              </Button>
            </li>
          )
      )}
    </ul>
  );
};

// type EnumerableComponentFactory = <I>(config: {
//   // or Container: FC<{ children: JSX.Element[] }>;
//   Container: FC<PropsWithChildren<object>>;
//   Item: ComponentType<I>;
// }) => FC<{ items: I[] }>;

// const Enumerable: EnumerableComponentFactory =
//   ({ Container, Item }) =>
//   ({ items }) =>
//     (
//       <Container>
//         {items.map((props, index) => (
//           <Item key={index} {...props} />
//         ))}
//       </Container>
//     );

// const UnorderedList = Enumerable({
//   Container: ({ children }) => <ul>{children}</ul>,
//   Item: ({ title }: { title: string }) => <li>{title}</li>,
// });

// const result = <UnorderedList items={[{ title: 'Something' }]} />;
