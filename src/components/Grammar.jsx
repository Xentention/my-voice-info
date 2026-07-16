import { Flex, Text } from "@chakra-ui/react";
import { useLang } from "../LangContext";
import {
  Section,
  SectionHead,
  Card,
  CardRail,
  StepBadge,
  CardHeading,
} from "./primitives";

/* How grammar is handled: the three-stage pipeline (Build · Inflect · Refine).
   The worked "tap → spoken sentence" example lives in the Capabilities feature card. */
export function GrammarStages() {
  const { c } = useLang();
  const g = c.grammar;
  return (
    <Section id={g.id}>
      <SectionHead title={g.title} intro={g.intro} />

      {/* three stages — swipeable on mobile, an equal three-column grid on desktop */}
      <CardRail gridTemplateColumns={{ lg: "repeat(3, 1fr)" }}>
        {g.stages.map((s, i) => {
          const isLast = i === g.stages.length - 1;
          return (
            <Card
              key={i}
              h={{ lg: "100%" }}
              flexShrink={0}
              w={{ base: "86%", lg: "auto" }}
              ml={{ base: i === 0 ? "7%" : 0, lg: 0 }}
              mr={{ base: isLast ? "7%" : 0, lg: 0 }}
              scrollSnapAlign="center"
            >
              <Flex align="center" gap={3} mb={4}>
                <StepBadge>{s.n}</StepBadge>
                <CardHeading>{s.name}</CardHeading>
              </Flex>
              <Text
                color="muted"
                lineHeight={1.7}
                whiteSpace="pre-line"
                overflowWrap="anywhere"
              >
                {s.body}
              </Text>
            </Card>
          );
        })}
      </CardRail>
    </Section>
  );
}
