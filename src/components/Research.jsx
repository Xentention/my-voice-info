import { Box, VStack, Text, Button, Link } from "@chakra-ui/react";
import { useLang } from "../LangContext";
import { resolveHref } from "../links";
import { Section, SectionHead } from "./primitives";

export function Research() {
  const { c, cfg } = useLang();
  const r = c.research;
  return (
    <Section id={r.id} aria-labelledby={`${r.id}-title`}>
      <Box
        className="mv-hc-panel"
        position="relative"
        overflow="hidden"
        bg="brand.500"
        color="white"
        borderRadius="3xl"
        px={{ base: 8, md: 16 }}
        py={{ base: 12, md: 16 }}
        boxShadow="redPanel"
      >
        <VStack spacing={0} position="relative" zIndex={1}>
          <SectionHead
            title={r.title}
            intro={r.body}
            onDark
            align="center"
            mb={9}
            titleId={`${r.id}-title`}
          />
          <Button
            as={Link}
            href={resolveHref(r.cta.href, cfg)}
            isExternal
            size="lg"
            variant="onBrand"
            px={8}
          >
            {r.cta.label}
          </Button>
          <Text mt={5} fontSize="sm" color="white">
            {r.note}
          </Text>
        </VStack>
      </Box>
    </Section>
  );
}
