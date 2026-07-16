import { Box, Flex, VStack, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { Section, Card, GrammarTile } from "./primitives";
import { MaterialSymbol, MaterialIcons } from "./icons";

export function InflectionExample({ g, ...rest }) {
  return (
    <Card
      display="flex"
      flexDirection="column"
      muted
      feature
      h={{ base: "auto", lg: "auto" }}
      w={{ base: "auto", lg: "auto" }}
      ml={{ base: "7%", lg: 0 }}
      {...rest}
    >
      <VStack spacing={4} align="stretch">
        <VStack spacing={3} align="stretch">
          <Text
            textTransform="uppercase"
            letterSpacing="0.14em"
            fontSize="xs"
            fontWeight={800}
            color="brand.600"
            whiteSpace="nowrap"
          >
            {g.tapLabel}
          </Text>
          <Wrap spacing={3} justify="center">
            {g.tiles.map((t, i) => (
              <WrapItem key={i}>
                <GrammarTile tile={t} />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
        <Box
          alignSelf="center"
          color="brand.500"
          fontSize="2xl"
          fontWeight={800}
          lineHeight={1}
          mt={{ base: 4, md: 5 }}
          transform="rotate(90deg)"
        >
          {
            <MaterialSymbol
              name="arrow_forward"
              grade={1}
              fill={1}
              fontSize="inherit"
            />
          }
        </Box>
        <VStack align="stretch" spacing={2}>
          <Text
            textTransform="uppercase"
            letterSpacing="0.14em"
            fontSize="xs"
            fontWeight={800}
            color="brand.600"
            whiteSpace="nowrap"
          >
            {g.speakLabel}
          </Text>
          <Flex
            gap={3}
            bg="white"
            border="1px solid"
            borderColor="hair"
            borderRadius="xl"
            px={{ base: 4, md: 5 }}
            py={{ base: 3, md: 4 }}
          >
            {
              <Box
                fontWeight={800}
                flexShrink={0}
                px={2.5}
                py={1}
                whiteSpace="nowrap"
                borderRadius="md"
                align="start"
              >
                {
                  <Flex
                    align="center"
                    justify="center"
                    w="fit-content"
                    px={3}
                    py={1}
                    borderRadius="9999px"
                    bg="ink"
                    color="white"
                    fontSize="xs"
                    fontWeight={700}
                    lineHeight={1}
                    gap={1.5}
                  >
                    <MaterialIcons
                      name="clock-outline"
                      color="white"
                      fontSize={20}
                    />
                    <Text as="span">{g.tenseInfo}</Text>
                  </Flex>
                }
                {
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight={700}
                    color="ink"
                    mr={{ base: 4, md: 5 }}
                    py="I"
                    minW={0}
                    mt={2}
                  >
                    {g.outputs}
                  </Text>
                }
              </Box>
            }
          </Flex>
        </VStack>
      </VStack>
    </Card>
  );
}
