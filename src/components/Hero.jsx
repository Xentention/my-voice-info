import {
  Box,
  Container,
  Grid,
  VStack,
  Stack,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { useLang } from "../LangContext";
import { resolveHref } from "../links";
import { MaterialIcons } from "./icons";
import { BoardFrame, Accent } from "./primitives";

export function Hero() {
  const { c, cfg } = useLang();
  const h = c.hero;
  return (
    <Box
      as="section"
      aria-labelledby="hero-title"
      position="relative"
      overflow="hidden"
      pt={{ base: 14, md: 20 }}
      pb={{ base: 16, md: 24 }}
    >
      <Container
        maxW="7xl"
        px={{ base: 4, md: 6 }}
        position="relative"
        zIndex={1}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "0.92fr 1.08fr" }}
          gap={{ base: 12, lg: 14 }}
          alignItems="center"
        >
          {/* copy */}
          <VStack align="flex-start" spacing={0} textAlign="left">
            <Heading
              as="h1"
              id="hero-title"
              className="mv-rise"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              mb={2}
              style={{ animationDelay: "0.05s" }}
            >
              {h.title}
            </Heading>
            <Accent />
            <Text
              className="mv-rise"
              textTransform="uppercase"
              letterSpacing="0.14em"
              fontSize="xs"
              fontWeight={800}
              color="brand.600"
              mt={-3}
              mb={{ base: 5, md: 6 }}
              style={{ animationDelay: "0s" }}
            >
              {h.releaseNote}
            </Text>
            <Text
              className="mv-rise"
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              maxW="md"
              mb={{ base: 5, md: 6 }}
              lineHeight={1.6}
              style={{ animationDelay: "0.1s" }}
            >
              {h.lead}
            </Text>
            <Stack
              className="mv-rise"
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              justify="flex-start"
              mt={9}
              w="fit-content"
              maxW="100%"
              style={{ animationDelay: "0.15s" }}
            >
              <Button
                as={Link}
                href={resolveHref(h.ctaPrimary.href, cfg)}
                size="lg"
                minW="2xs"
                w="inherit"
                maxW="inherit"
                variant="solid"
                px={8}
              >
                {h.ctaPrimary.label}
              </Button>
              <Button
                as={Link}
                href={resolveHref(h.ctaSecondary.href, cfg)}
                isExternal
                size="lg"
                minW="2xs"
                w="inherit"
                maxW="inherit"
                variant="outline"
                px={8}
                bg="white"
                leftIcon={<MaterialIcons name="github" fontSize="30px" />}
              >
                {h.ctaSecondary.label}
              </Button>
            </Stack>
          </VStack>

          <Box
            className="mv-rise"
            style={{ animationDelay: "0.12s" }}
            w="100%"
            mx="auto"
          >
            <BoardFrame eager />
            <Text fontSize="xs" color="muted" textAlign="center" mt={3}>
              {h.prototypeNote}
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
