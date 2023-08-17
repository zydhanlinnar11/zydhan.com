'use client'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useFormatter, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next-intl/link'
import { ProjectMetadata } from '@/types/ProjectMetadata'
import { dateFormatting } from '@/config/common'

const ProjectsPage = ({ metadatas }: { metadatas: ProjectMetadata[] }) => {
  const t = useTranslations('ProjectsPage')
  const format = useFormatter()

  return (
    <>
      <Flex direction={'column'} rowGap={2}>
        <Heading as={'h1'} fontSize={{ base: '3xl', md: '4xl' }}>
          {t('title')}
        </Heading>
        <Text fontWeight={'semibold'}>{t('subtitle')}</Text>
      </Flex>
      <Grid
        as={'ul'}
        listStyleType={'none'}
        templateColumns={{
          base: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(3, 1fr)',
        }}
        paddingY={16}
        gap={4}
      >
        {metadatas.map((metadata) => (
          <li key={metadata.slug}>
            <Link href={`/projects/${metadata.slug}`}>
              <Card
                variant={'outline'}
                overflow={'hidden'}
                transition={'transform 0.2s ease-in-out'}
                _hover={{
                  transform: 'scale(1.05)',
                }}
                as={'article'}
              >
                <CardHeader
                  p={0}
                  position={'relative'}
                  height={'192px'}
                  aria-hidden
                >
                  <Image
                    src={metadata.thumbnail}
                    alt={metadata.title}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 30em) 100vw, (max-width: 48em) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </CardHeader>
                <CardBody display={'flex'} flexDir={'column'} rowGap={1}>
                  <Heading as={'h1'} fontSize={'xl'} fontWeight={'bold'}>
                    {metadata.title}
                  </Heading>
                  <Text>{metadata.subtitle}</Text>
                </CardBody>
                <CardFooter>
                  <Text>{`${format.dateTime(
                    new Date(metadata.startDate),
                    dateFormatting
                  )} - ${format.dateTime(
                    new Date(metadata.endDate),
                    dateFormatting
                  )}`}</Text>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </Grid>
    </>
  )
}

export default ProjectsPage
