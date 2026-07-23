import { Box, Flex, VStack, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { useLang } from "../LangContext";
import {
  Section,
  SectionHead,
  Card,
  CardRail,
  Accent,
  CardHeading,
  GrammarTile,
} from "./primitives";
import { InflectionExample } from "./InflectionExample";

export function Capabilities() {
  const { c } = useLang();
  const cap = c.capabilities;
  const feature = cap.items[0];
  const g = c.grammar;
  const rest = cap.items.slice(1);

  const featureCard = (
    <Card
      key="f"
      feature
      display="flex"
      flexDirection="column"
      h={{ lg: "100%" }}
      flexShrink={0}
      w={{ base: "86%", lg: "auto" }}
      ml={{ base: "7%", lg: 0 }}
      scrollSnapAlign="center"
      gridColumn={{ lg: "1" }}
      gridRow={{ lg: "1 / span 2" }}
    >
      <Accent />
      <CardHeading feature mb={{ base: 2.5, md: 3.5 }}>
        {feature.title}
      </CardHeading>
      <Text
        color="muted"
        lineHeight={1.7}
        fontSize={{ base: "inherit", lg: "lg" }}
        mb={6}
      >
        {feature.body}
      </Text>
      <Box flex={1} minH={2} />
      {/* inflection example — the feature card's live visual (tap → spoken sentence) */}
      <InflectionExample g={g} display={{ base: "none", lg: "block" }} />{" "}
      {/* desktop, nested */}
    </Card>
  );

  const cards = [featureCard].concat(
    rest.map((it, i) => {
      const isLast = i === rest.length - 1;
      const column = 1 + (i % 2);
      return (
        <Card
          key={i}
          display="flex"
          flexDirection="column"
          h={{ lg: "100%" }}
          flexShrink={0}
          w={{ base: "86%", lg: "auto" }}
          mr={{ base: isLast ? "7%" : 0, lg: 0 }}
          scrollSnapAlign="center"
          gridColumn={{ lg: { column } }}
        >
          <Accent />
          <CardHeading mb={2.5}>{it.title}</CardHeading>
          <Text color="muted" lineHeight={1.7}>
            {it.body}
          </Text>
        </Card>
      );
    }),
  );

  return (
    <Section id={cap.id} aria-labelledby={`${cap.id}-title`}>
      <SectionHead title={cap.title} titleId={`${cap.id}-title`} />
      {/* base: horizontal-scroll carousel (one card per screen). lg: bento. */}
      <InflectionExample
        g={g}
        display={{ base: "block", lg: "none" }}
        mb={{ base: 16, md: 24 }}
      />{" "}
      {/* mobile, standalone */}
      <CardRail
        display={{ base: "block", lg: "grid" }}
        gridTemplateColumns={{ lg: "1.4fr 1fr 1fr" }}
        gridTemplateRows={{ lg: "repeat(2, 1fr)" }}
        gap={{ lg: 6 }}
      >
        {cards}
      </CardRail>
    </Section>
  );
}
