import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { useLang } from "../LangContext";
import { resolveHref } from "../links";
import { MaterialSymbol, Logo, MaterialIcons, FlagIcon } from "./icons";

export function Header() {
  const { lang, c, cfg } = useLang();
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="rgba(16,19,25,0.94)"
      backdropFilter="saturate(160%) blur(10px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Flex h={{ base: 16, md: 20 }} align="center" gap={6}>
          {/* wordmark */}
          <Link
            href="#main"
            display="flex"
            alignItems="center"
            gap={2.5}
            _hover={{ textDecoration: "none" }}
          >
            <Logo size="50px" />
            <Text
              fontWeight={800}
              fontSize="lg"
              whiteSpace="nowrap"
              color="white"
            >
              {c.brand}
            </Text>
          </Link>

          {/* nav */}
          <HStack
            as="nav"
            aria-label={
              lang === "ru" ? "Навигационная панель" : "Navigation panel"
            }
            spacing={1}
            ml={2}
            display={{ base: "none", lg: "flex" }}
          >
            {c.nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                px={3}
                py={2}
                borderRadius="md"
                fontWeight={600}
                fontSize="sm"
                color="paper.200"
                _hover={{
                  color: "white",
                  bg: "whiteAlpha.200",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </HStack>

          <Box flex={1} />

          {/* actions */}
          <HStack spacing={{ base: 2, md: 2.5 }}>
            {/* round flag language toggle */}
            <Link
              href={c.nav.langHref}
              aria-label={c.nav.langLabel}
              hrefLang={lang === "ru" ? "en" : "ru"}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={9}
              h={9}
              borderRadius="full"
              overflow="hidden"
              flexShrink={0}
            >
              <FlagIcon code={c.nav.langFlag} size={32} />
            </Link>
            <Link
              href={cfg.githubUrl}
              isExternal
              aria-label={c.nav.githubLabel}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={9}
              h={9}
              borderRadius="full"
              color="white"
              flexShrink={0}
            >
              <MaterialIcons name="github" fontSize={40} />
            </Link>
            <Button
              as={Link}
              gap={2}
              href={`mailto:${cfg.email}`}
              size="sm"
              variant="solid"
              w="150px"
              h={9}
              display={{ base: "none", sm: "inline-flex" }}
            >
              {<MaterialIcons name="email" color="white" fontSize={20} />}
              {
                <Text color="white" maxW="md" lineHeight={1.6}>
                  {c.nav.emailLabel}
                </Text>
              }
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
