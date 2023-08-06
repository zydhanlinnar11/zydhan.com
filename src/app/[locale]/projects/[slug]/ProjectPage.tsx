'use client'

import TableOfContent from '@/components/TableOfContent'
import { dateFormatting } from '@/config/common'
import { ProjectMetadata } from '@/types/ProjectMetadata'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { useFormatter, useTranslations } from 'next-intl'
import Image from 'next/image'
import { ReactNode } from 'react'
import { FiGlobe } from 'react-icons/fi'

const ProjectPage = ({
  children,
  metadata,
}: {
  children: ReactNode
  metadata: ProjectMetadata
}) => {
  const format = useFormatter()
  const t = useTranslations('ProjectPage.type')

  return (
    <Flex>
      <Stack as={'article'} direction={'column'} divider={<StackDivider />}>
        <Box>
          <Box
            position={'relative'}
            height={{ base: '240px', md: '360px' }}
            rounded={'lg'}
            overflow={'hidden'}
          >
            <Image
              src={`/${metadata.slug}.jpg`}
              alt={metadata.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 48em) calc(100vw - 64px), (max-width: 1024px) calc(100vw - 304px), 720px"
            />
          </Box>
          <Heading
            as={'h1'}
            fontSize={{ base: '3xl', md: '4xl' }}
            mt={{ base: 4, md: 6 }}
          >
            {metadata.title}
          </Heading>
          <Text as={'small'}>{metadata.subtitle}</Text>
          <Flex mt={4} gap={2}>
            <HStack>
              <Icon as={FiGlobe} />
              <Text as={'small'}>{t(metadata.appType)}</Text>
            </HStack>
            •
            <HStack>
              <CalendarIcon />
              <Text as={'small'}>{`${format.dateTime(
                new Date(metadata.startDate),
                dateFormatting
              )} - ${format.dateTime(
                new Date(metadata.endDate),
                dateFormatting
              )}`}</Text>
            </HStack>
          </Flex>
        </Box>
        <Prose id="project-content">{children}</Prose>
      </Stack>
      <TableOfContent contentId="project-content" />
    </Flex>
  )
}

export default ProjectPage
