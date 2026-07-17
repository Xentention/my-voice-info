import { HStack, Box, Text, Link } from "@chakra-ui/react";

/* Required CC BY-NC-SA attribution for the ARASAAC pictogram resources used throughout the board*/
export function ArasaacCredit({ ...rest }) {
  return (
    <HStack
      as={Link}
      href="https://aulaabierta.arasaac.org/"
      isExternal
      spacing={2}
      align="flex-start"
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="lg"
      px={2.5}
      py={1.5}
      maxW="100%"
      _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
      {...rest}
    >
      <Box
        as="img"
        src={`${import.meta.env.BASE_URL}assets/pictograms/35071.png`}
        alt="ARASAAC"
        w="30px"
        h="30px"
        mt="2px"
        flexShrink={0}
        borderRadius="sm"
      />
      <Text fontSize="xs" lineHeight={1.4} opacity={0.75} minW={0}>
        The resources used are the property of the Government of Aragon and have
        been created by the ARASAAC team for the ARASAAC Open Classroom
        (https://aulaabierta.arasaac.org/) that distributes them under a
        Creative Commons license (BY-NC-SA).
      </Text>
    </HStack>
  );
}
