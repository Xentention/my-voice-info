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

export function Landscape() {
  const { c } = useLang();
  const ls = c.landscape;
  if (!ls) return null;
  return (
    <Section id={ls.id} aria-labelledby={`${ls.id}-title`}>
      <SectionHead
        title={ls.title}
        intro={ls.intro}
        titleId={`${ls.id}-title`}
      />
      {/* gaps — swipeable on mobile only; a two-column grid from tablet up */}
      <CardRail gridFrom="md" gridTemplateColumns={{ md: "repeat(2, 1fr)" }}>
        {ls.gaps.map((gp, i) => {
          const isLast = i === ls.gaps.length - 1;
          return (
            <Card
              key={i}
              h={{ md: "100%" }}
              flexShrink={0}
              w={{ base: "86%", md: "auto" }}
              ml={{ base: i === 0 ? "7%" : 0, md: 0 }}
              mr={{ base: isLast ? "7%" : 0, md: 0 }}
              scrollSnapAlign="center"
            >
              <Flex align="center" gap={3} mb={4}>
                <StepBadge>{String(i + 1)}</StepBadge>
                <CardHeading>{gp.need}</CardHeading>
              </Flex>
              <Text color="muted" lineHeight={1.7}>
                {gp.body}
              </Text>
            </Card>
          );
        })}
      </CardRail>
    </Section>
  );
}
