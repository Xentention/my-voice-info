# About My Voice

<p align="center">
  <a href="https://Xentention.github.io/my-voice-info/">
<img alt="My Voice Website" src="https://img.shields.io/badge/My_Voice-landing?style=for-the-badge&label=Visit%20Our%20Website&labelColor=%23FFFFFF&color=920000">
  </a>
</p>

- [Читать на русском](README.md)
- [Architecture](architecture.md)

My Voice is a free communication app for people who find spoken language difficult.
It works the way many other AAC apps work — select tiles, build a sentence,
let the device voice it -- with a few things that set it apart.

The main difference is being created with [fusional languages](https://en.wikipedia.org/wiki/Fusional_language) in mind,
while staying agnostic to simplify adding new languages with their own grammar structures.

Most AAC apps don't handle inflection well; they speak words as-is
and leave the listener to fill in the gaps. This, aided by prefixes- and -suffixes, works fine for lightly-inflected languages like English, but others may have dozens of forms required for grammatical agreement. One example is OpenAAC specification supporting up to 9 grammar forms -- yet most Slavic languages can have around 50, all used in everyday speech!

My Voice handles word agreement automatically, allowing more natural speech with less cognitive effort.

And we build it the way assistive technology should be built:
consulting AAC users and speech-language pathologists
so the app is genuinely useful, not just well-intentioned.

## Robust Vocabulary

My Voice comes with an extensive vocabulary that covers general everyday topics,
so you can start using it right away, and add new words when you need them.

## Concepts

**Books** are the top-level entities. They define an isolated set of boards, serving
as an independent vocabulary. It is possible to have several books on one device, and
switching between them takes only a few taps.

**Boards** are the grids of buttons, carrying the vocabulary. Copying a board into another book is possible; it creates an independent copy of the board and all its tiles (the underlying concepts stay shared),
staying on the middle ground between convenience and keeping data structure clean.

**Tiles** are the buttons on a board. Each tile may carry 1-3 words, a quick-fire
phrase, or a navigation step.

There's a special kind of tile called a **chunk**: a 2- or 3-word unit that
carries references to concepts. It allows creating shortcuts for frequently used
collocations while still supporting inflection.

**Phrases** are fixed tiles that always play the same audio.
They're played immediately and never added to the utterance strip, plus
they're the only type that can carry custom audio
(A restriction made neccessary by the inflection complexity).

**Folders** and **Popups** are navigation tiles.

## Adding New Words

Edit mode allows creating new concepts/words. To minimize mistakes, the user also needs to set its part of speech value (whether it's a verb, a noun, or something else). The app analyzes the newly added concept right on the device and generates the forms it'll need.

Sometimes words need to stay locked to a single form.
For those, you can disable inflection so it always bypasses the rule-based grammar stage.

## Customization

My Voice is highly customizable, letting users adjust colors, borders,
text size, and more, globally or per-tile.

In addition, My Voice supports flexible grid UI:

- every board may contain any number of rows and columns from 1x1 all the way to 12x12;
- every tile may be any size from 1x1 to 3x3, allowing advanced board configuration;
- a tile is not needed for now? Edit mode allows hiding IT without deleting anything from the board.

## Sharing with Other Apps

My Voice reads and writes the Open Board Format (OBF) and Open Board
Format Zip (OBZ) -- the standard files most modern AAC apps support.

So, if you've built up custom boards here, you can export them as OBZ and use them elsewhere, and vice versa.
The My-Voice-specific features (chunks, custom audio, grammar metadata)
travel with the file as extensions that other apps quietly ignore --
the boards still work, just without those extras.

Joining this shared ecosystem matters to us, so users data is never trapped with a single provider.

## Languages at Launch

The first release supports two content languages: **English** and **Russian**.
Adding more languages is a known pathway: translation, board
adaptation, and morphology data for languages that need it.

## How to Get Involved

The app is still in development, with the first release expected around 2027.

### Want to Help?

**Fill out the survey.**

About twelve minutes, anonymous, and the
answers directly shape what gets prioritized — your
perspective matters.

**Join the beta list.**

When the first testing builds are ready,
you will receive a closed beta invite.
