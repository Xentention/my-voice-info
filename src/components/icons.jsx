import { Box } from "@chakra-ui/react";

export function MaterialSymbol({
  name,
  fill = 0,
  weight = 400,
  grade = 0,
  opsz = 24,
  ...props
}) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      fontFamily="'Material Symbols Rounded'"
      lineHeight={1}
      display="inline-block"
      whiteSpace="nowrap"
      userSelect="none"
      sx={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opsz}`,
      }}
      {...props}
    >
      {name}
    </Box>
  );
}

export function MaterialIcons({ name, ...props }) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      className={`mdi mdi-${name}`}
      display="inline-block"
      lineHeight={1}
      {...props}
    />
  );
}

export function FlagIcon({ code, size = 24 }) {
  const c = code === "ru" ? "ru" : "us";
  const cid = `mvflag-${c}`;

  if (c === "ru") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 512 512"
      >
        <mask id="SVGuywqVbel">
          <circle cx="256" cy="256" r="256" fill="#fff" />
        </mask>
        <g mask="url(#SVGuywqVbel)">
          <path fill="#0052b4" d="M512 170v172l-256 32L0 342V170l256-32z" />
          <path fill="#eee" d="M512 0v170H0V0Z" />
          <path fill="#d80027" d="M512 342v170H0V342Z" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <mask id="SVGuywqVbel">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#SVGuywqVbel)">
        <path
          fill="#eee"
          d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z"
        />
        <path
          fill="#d80027"
          d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"
        />
        <path fill="#0052b4" d="M0 0h256v256H0Z" />
        <path
          fill="#eee"
          d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z"
        />
      </g>
    </svg>
  );
}

export function ContrastIcon({ on = false, ...props }) {
  const iconSize = `calc(${props.size} * 0.8)`;
  return (
    <Box
      className="mv-hc-mark"
      w={props.size}
      h={props.size}
      borderRadius="lg"
      display="grid"
      placeItems="center"
      flexShrink={0}
    >
      {on ? (
        <MaterialIcons
          name="eye-off"
          fill="currentColor"
          fontSize={iconSize}
          aria-hidden="true"
        />
      ) : (
        <MaterialIcons
          name="eye"
          fill="currentColor"
          fontSize={iconSize}
          aria-hidden="true"
        />
      )}
    </Box>
  );
}

export function Logo({
  size,
  markBg = "brand.500",
  markColor = "white",
  ...rest
}) {
  const iconSize = `calc(${size} * 0.6)`;

  return (
    <Box
      className="mv-hc-mark"
      w={size}
      h={size}
      borderRadius="lg"
      bg={markBg}
      color={markColor}
      display="grid"
      placeItems="center"
      flexShrink={0}
    >
      <MaterialSymbol name="volume_up" fill={1} fontSize={iconSize} />
    </Box>
  );
}
