import { Children, useId, useRef, useState } from "react";
import {
  Box,
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  AspectRatio,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLang } from "../LangContext";

const INK = "#181613";

export function SkipLink() {
  const { lang } = useLang();
  return (
    <Link
      href="#main"
      position="absolute"
      left="50%"
      top={2}
      transform="translateX(-50%) translateY(-150%)"
      bg="ink"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      zIndex={2000}
      fontWeight={700}
      _focus={{ transform: "translateX(-50%) translateY(0)" }}
    >
      {lang === "ru" ? "К содержанию" : "Skip to content"}
    </Link>
  );
}

export function Section({
  id,
  maxW = "6xl",
  py = { base: 16, md: 24 },
  children,
  ...rest
}) {
  return (
    <Box as="section" id={id} py={py} scrollMarginTop={16} {...rest}>
      <Container maxW={maxW} px={{ base: 4, md: 6 }}>
        {children}
      </Container>
    </Box>
  );
}

export function Card({
  feature = false,
  interactive = false,
  muted = false,
  className,
  children,
  ...rest
}) {
  return (
    <Box
      className={["mv-hc-card", className].filter(Boolean).join(" ")}
      bg={muted ? "paper.100" : "white"}
      border="1px solid"
      borderColor="hair"
      borderRadius={feature ? "3xl" : "2xl"}
      p={feature ? { base: 7, md: 9 } : { base: 6, md: 7 }}
      boxShadow="card"
      transition={interactive ? "all 0.22s ease" : undefined}
      _hover={
        interactive
          ? {
              transform: "translateY(-3px)",
              borderColor: "brand.200",
              boxShadow: "cardHover",
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </Box>
  );
}

export function CardRail({
  children,
  gridTemplateColumns,
  gridTemplateRows,
  gridFrom = "lg",
}) {
  const { c } = useLang();
  const railRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);
  const isScrollable = useBreakpointValue({ base: true, [gridFrom]: false });

  function onScroll() {
    const el = railRef.current;
    if (!el) return;
    const kids = el.children;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0,
      bestD = Infinity;
    for (let i = 0; i < kids.length; i++) {
      const cmid = kids[i].offsetLeft + kids[i].offsetWidth / 2;
      const d = Math.abs(cmid - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    if (best !== active) setActive(best);
  }
  function goTo(i) {
    const el = railRef.current;
    if (!el || !el.children[i]) return;
    const k = el.children[i];
    el.scrollTo({
      left: k.offsetLeft - (el.clientWidth - k.offsetWidth) / 2,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Box
        ref={railRef}
        onScroll={onScroll}
        tabIndex={isScrollable ? 0 : undefined}
        role={isScrollable ? "group" : undefined}
        aria-roledescription={isScrollable ? "carousel" : undefined}
        aria-label={isScrollable ? c.a11y.cardRailLabel : undefined}
        display={{ base: "flex", [gridFrom]: "grid" }}
        overflowX={{ base: "auto", [gridFrom]: "visible" }}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        gap={{ base: 4, md: 6 }}
        alignItems={{ base: "stretch", [gridFrom]: "stretch" }}
        scrollSnapType={{ base: "x mandatory", [gridFrom]: "none" }}
        mx={{ base: -4, md: 0 }}
        px={0}
        pb={{ base: 1, [gridFrom]: 0 }}
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </Box>
      {count > 1 && (
        <HStack
          display={{ base: "flex", [gridFrom]: "none" }}
          justify="center"
          spacing={1}
          mt={6}
        >
          {Array.from({ length: count }, (_, i) => (
            <Box
              key={i}
              as="button"
              type="button"
              aria-label={`${c.a11y.goToCard} ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              minW="44px"
              h="44px"
              display="grid"
              placeItems="center"
              bg="transparent"
              border="none"
              cursor="pointer"
              p={0}
            >
              <Box
                h="8px"
                w={i === active ? "22px" : "8px"}
                borderRadius="full"
                bg={i === active ? "brand.500" : "hair"}
                transition="all 0.25s ease"
                pointerEvents="none"
              />
            </Box>
          ))}
        </HStack>
      )}
    </>
  );
}

export function StepBadge({ children }) {
  return (
    <Box
      className="mv-hc-badge"
      w={9}
      h={9}
      borderRadius="lg"
      bg="brand.50"
      color="brand.700"
      border="1px solid"
      borderColor="brand.100"
      display="grid"
      placeItems="center"
      fontWeight={800}
      flexShrink={0}
    >
      {children}
    </Box>
  );
}

export function CardHeading({ feature = false, mb, children, ...rest }) {
  return (
    <Heading
      as="h3"
      mb={mb}
      minW={0}
      fontSize={feature ? { base: "xl", lg: "3xl" } : { base: "xl", lg: "xl" }}
      {...rest}
    >
      {children}
    </Heading>
  );
}

export function SectionHead({
  title,
  titleId,
  intro,
  onDark,
  align = "flex-start",
  mb = 14,
}) {
  return (
    <VStack
      spacing={5}
      maxW="2xl"
      mx={align === "center" ? "auto" : 0}
      textAlign={align === "center" ? "center" : "left"}
      align={align}
      mb={mb}
    >
      <Heading
        as="h2"
        id={titleId}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color={onDark ? "white" : "ink"}
      >
        {title}
      </Heading>
      {intro && (
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={onDark ? "white" : "muted"}
          lineHeight={1.7}
        >
          {intro}
        </Text>
      )}
    </VStack>
  );
}

export function Accent() {
  return (
    <Box
      w={10}
      h="4px"
      borderRadius="full"
      bg="brand.500"
      mb={{ base: 5, md: 6 }}
      flexShrink={0}
    />
  );
}

/* A single pictogram tile (ARASAAC), used in the grammar worked example. */
export function GrammarTile({ tile }) {
  return (
    <VStack spacing={2} w={{ base: 16, md: 20 }}>
      <Box
        w="100%"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        border="1px solid"
        borderColor="hair"
        p={2}
      >
        <AspectRatio ratio={1}>
          <img
            src={`${import.meta.env.BASE_URL}assets/pictograms/${tile.pic}.png`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </AspectRatio>
      </Box>
      <Text fontWeight={700} fontSize="sm" color="ink" whiteSpace="nowrap">
        {tile.label}
      </Text>
    </VStack>
  );
}

export function BoardFrame({ eager }) {
  const { lang, c } = useLang();
  const img =
    import.meta.env.BASE_URL +
    (lang === "ru"
      ? "assets/board-preview-ru.png"
      : "assets/board-preview-en.png");
  const descId = useId();
  return (
    <Box
      role="img"
      aria-label={c.a11y.boardPreviewLabel}
      aria-describedby={descId}
      position="relative"
      w="100%"
      bg={INK}
      borderRadius={{ base: "26px", md: "34px" }}
      p={{ base: 2.5, md: "16px" }}
      border="1px solid"
      borderColor="#26282C"
      boxShadow="0 2px 0 rgba(255,255,255,0.06) inset, 0 20px 40px -26px rgba(11,13,16,0.42)"
    >
      {/* full description for screen readers*/}
      <Text as="span" id={descId} className="sr-only">
        {c.a11y.boardPreviewAlt}
      </Text>
      {/* front camera */}
      <Box
        aria-hidden="true"
        position="absolute"
        top={{ base: "6px", md: "8px" }}
        left="50%"
        transform="translateX(-50%)"
        w="6px"
        h="6px"
        borderRadius="full"
        bg="#34373C"
        boxShadow="0 0 0 2px rgba(0,0,0,0.4)"
      />
      <AspectRatio
        ratio={1133 / 744}
        borderRadius={{ base: "15px", md: "20px" }}
        overflow="hidden"
        bg="paper.50"
      >
        <img
          src={img}
          alt=""
          loading={eager ? "eager" : "lazy"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AspectRatio>
    </Box>
  );
}
