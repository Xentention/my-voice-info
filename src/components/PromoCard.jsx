import { Box, Container, Flex, Text, Button, Link } from "@chakra-ui/react";
import { useLang } from "../LangContext";
import { resolveHref } from "../links";
import { MaterialIcons } from "./icons";
import { Card } from "./primitives";

export function PromoCard() {
  const { lang, c, cfg } = useLang();
  if (lang !== "ru") return null;
  const p = c.promo;
  if (!p) return null;
  return (
    <Box
      as="section"
      aria-label={p.badge}
      pt={{ base: 4, md: 6 }}
      pb={{ base: 2, md: 4 }}
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Card
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          gap={{ base: 4, md: 6 }}
          p={{ base: 5, md: 6 }}
        >
          <Flex
            flex={1}
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 3, md: 5 }}
            direction={{ base: "column", md: "row" }}
          >
            <MaterialIcons name="microsoft-windows" fontSize="50px" />
            <Box>
              <Text
                fontSize="2xs"
                fontWeight={800}
                textTransform="uppercase"
                letterSpacing="0.14em"
                color="brand.600"
                mb={1}
              >
                {p.badge}
              </Text>
              <Text color="ink" fontWeight={600} lineHeight={1.5}>
                {p.text}
              </Text>
            </Box>
          </Flex>
          <Button
            as={Link}
            href={resolveHref(p.href, cfg)}
            isExternal={resolveHref(p.href, cfg) !== "#"}
            size="md"
            variant="outline"
            flexShrink={0}
          >
            {p.cta}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
