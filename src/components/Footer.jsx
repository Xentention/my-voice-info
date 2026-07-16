import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Stack,
  Heading,
  Text,
  Button,
  Link,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { useLang } from "../LangContext";
import { resolveHref } from "../links";
import { ArasaacCredit } from "./credits";
import { MaterialSymbol, MaterialIcons, FlagIcon, Logo } from "./icons";

export function Footer() {
  const { c, cfg } = useLang();
  const f = c.footer;
  return (
    <Box
      as="footer"
      id="contact"
      bg="ink"
      color="paper.100"
      pt={{ base: 16, md: 20 }}
      pb={10}
      scrollMarginTop={16}
    >
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={12}
          alignItems="start"
        >
          <VStack align="flex-start" spacing={5}>
            <Flex align="center" gap={3}>
              <Logo size="40px" />
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
              >
                {f.title}
              </Heading>
            </Flex>
            <Text
              color="paper.200"
              maxW="md"
              lineHeight={1.6}
              whiteSpace="pre-line"
            >
              {f.body}
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              pt={1}
              w={{ base: "100%", sm: "auto" }}
            >
              <Button
                as={Link}
                gap={2}
                href={`mailto:${cfg.email}`}
                variant="outline"
                size="md"
                color="white"
                borderWidth="1px"
                borderColor="whiteAlpha.400"
                bg="transparent"
                _hover={{
                  textDecoration: "none",
                  bg: "whiteAlpha.200",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                }}
              >
                {
                  <MaterialIcons
                    name="email"
                    color="paper.200"
                    fontSize="20px"
                  />
                }
                {
                  <Text color="paper.200" maxW="md" lineHeight={1.6}>
                    {f.emailLabel}
                  </Text>
                }
              </Button>
            </Stack>
          </VStack>
        </SimpleGrid>
        <Divider my={10} borderColor="whiteAlpha.300" />
        <ArasaacCredit mb={5} />
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          align={{ base: "flex-start", md: "center" }}
          gap={3}
          color="paper.200"
          fontSize="sm"
        >
          <Text
            minW={0}
          >{`© ${new Date().getFullYear()} ${c.brand}.${f.rights ? ` ${f.rights}` : ""}`}</Text>
          <Text fontSize="xs" opacity={0.7} minW={0}>
            {f.license}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
