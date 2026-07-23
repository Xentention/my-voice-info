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
      className="mv-material-symbol"
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

export function FormIcon({ size = 24, ...props }) {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M6.5 20.5q-1.45 0-2.475-1.025T3 17q0-.725.275-1.362T4.05 14.5q-.5-.475-.775-1.125T3 12t.275-1.362T4.05 9.5q-.5-.475-.775-1.125T3 7q0-1.425 1.025-2.463T6.5 3.5q.725 0 1.363.287T9 4.576q.475-.5 1.125-.788T11.5 3.5h6q1.425 0 2.463 1.038T21 7q0 .725-.288 1.375T19.926 9.5q.575.575.85 1.313T21 12t-.225 1.188t-.85 1.312q.575.575.85 1.313T21 17q0 1.425-1.038 2.463T17.5 20.5h-6q-.725 0-1.375-.275T9 19.45q-.5.5-1.137.775T6.5 20.5m0-2q.625 0 1.063-.437T8 17t-.437-1.062T6.5 15.5t-1.062.438T5 17t.438 1.063T6.5 18.5m0-5q.625 0 1.063-.437T8 12t-.437-1.062T6.5 10.5t-1.062.438T5 12t.438 1.063T6.5 13.5m0-5q.625 0 1.063-.437T8 7t-.437-1.062T6.5 5.5t-1.062.438T5 7t.438 1.063T6.5 8.5m5 5h6q.625 0 1.063-.437T19 12t-.437-1.062T17.5 10.5h-6q-.625 0-1.062.438T10 12t.438 1.063T11.5 13.5m0 5h6q.625 0 1.063-.437T19 17t-.437-1.062T17.5 15.5h-6q-.625 0-1.062.438T10 17t.438 1.063T11.5 18.5m0-10h6q.625 0 1.063-.437T19 7t-.437-1.062T17.5 5.5h-6q-.625 0-1.062.438T10 7t.438 1.063T11.5 8.5" />
    </Box>
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
