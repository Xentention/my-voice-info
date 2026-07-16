# My Voice — Architecture

Last revised on 2026.06.22

## Contents

- [Philosophy](#philosophy)
- [The hierarchy](#the-hierarchy)
- [Implementation map](#implementation-map)
- [Books](#books)
- [Boards](#boards)
- [Tiles](#tiles)
- [Concepts](#concepts)
- [Chunks](#chunks)
- [Lemmas](#lemmas)
- [Phrases](#phrases)
- [Language features](#language-features)
- [The grammar pipeline](#the-grammar-pipeline)
- [Inflection generation](#inflection-generation)
- [Сoncept search](#concept-search)
- [Symbols and audio](#symbols-and-audio)
- [Custom user content](#custom-user-content)
- [Copy semantics](#copy-semantics)
- [OBF / OBZ round-trip](#obf--obz-round-trip)
- [User profile](#user-profile)
- [Sidebar](#sidebar)
- [Accessibility architecture](#accessibility-architecture)

---

## Philosophy

My Voice is created with a goal of broadening existing complex grammar solutions
to support [inflective languages](https://en.wikipedia.org/wiki/Fusional_language).
It is a free open-source project, designed to make communication easier
for those, whose first or second language features fusional morphology.

We also aim to make robust AAC accessible for those who cannot afford
many popular apps for financial or regional reasons.

**Our core values are:**

#### 1. Nihil de nobis, sine nobis:

"Nothing about us without us" -- we work with AAC users and SLPs
to assure the app is actually useful for nonverbal people, and is intuitive to work with.

#### 2. Joining the Community:

Many AAC apps already exist, and there're certain standards and
specifications we keep in mind to join an existing ecosystem instead of forcing to manually
transfer data. Among them are:

- [Open AAC list of app considerations.](https://www.openaac.org/considerations) However, we are not
  able to implement all of them from the get-go, and we ask for your understanding
- [Open Board Format Specification](https://docs.google.com/document/d/1Bnl5neOf9-y53yOAGjd8BzQ7jvAdLhcB6y9Zw7ITYbA/edit?tab=t.0#heading=h.qjx5cq562r4l) -- an import/export standard for communication boards, supported by most popular AAC apps

#### 3. Language-agnostic Structure:

Every artifact carries a language tag. Concepts are language-neutral; their realizations are
per-language. Adding a language and its grammar rules is a configuration,
though developing a language module is required for more advanced grammar support.

#### 4. Respecting Privacy:

The app does all its work on the device.
Optional downloads (symbol packs, language packs) are user-initiated and infrequent.
However, we will support an optional
Google/Apple account linking for cloud backups and device synchronization.

#### 5. Free and Open Source:

The repository will be published under `GPL-3.0-or-later`
once it reaches its beta-testing stage. It will both be available for free
on Google Play/AppStore <i>and</i> stay indifinetly accessible for downloading directly from GitHub.

---

## The hierarchy

```
Book
  └── Board[]           Each board belongs to a book.
        ├── StandardBoard    Full tile set + navigation block.
        └── PopupBoard       Restricted tile set, does not allow nested navigation tiles.
              └── Tile       Discriminated union on kind:
                    ├── ConceptTile   → Concept   (single inflectable word)
                    ├── ChunkTile     → Chunk     (2–3 concept composition)
                    ├── PhraseTile    → Phrase    (static spoken text; carries audio)
                    ├── FolderTile    full-screen nav → StandardBoard
                    ├── PopupTile     overlay → PopupBoard
                    └── ActionTile    grammar modifier or special key
```

**Concepts, chunks, and phrases.** These entities are global. They live in their own Dexie tables and are referenced by ID. Editing any of them affects every tile that references it across the app.

**Tiles.** Each tile carries its owning `boardId`, so a board owns its tiles by reference. Tiles are defined for every board separately, they can override default appearence and other preferences.

**Books are independent.** Boards and tiles are owned by a book. Copying within a book preserves concept, chunk, and phrase references; copying across books creates new board and tile IDs but concept, chunk, and phrase IDs remain unchanged.

---

## Implementation map

TBU

### Layer tree

```
src/
├── shared/
│   ├── model/
│   ├── lib/
│   ├── ui/
│   └── styles/
├── entities/
│   ├── tile/
│   ├── board/
│   └── book/
├── features/
│   ├── utterance-building/
│   ├── speaking/
│   ├── grammar/
│   ├── board-navigation/
│   ├── word-lookup/
│   ├── board-menu/
│   ├── board-edit/
│   └── keyboard/
├── widgets/
│   ├── board-grid/
│   ├── right-rail/
│   └── popup-board/
└── index.ts
```

**Import rule.** Dependencies flow downward only: `pages → widgets → features → entities → shared`. Cross-slice imports go through a slice's public barrel (`@my-voice/<layer>/<slice>`); files within a slice import each other relatively.

### Concept → slice

## Books

```typescript
interface Book {
  id: BookId;
  schemaVersion: number;
  name: LocalizedString;
  description?: LocalizedString;
  icon?: ImageRef;
  cover?: ImageRef;
  language: BCP47;
  source: BookSource;
  homeBoardId: StandardBoardId; // entry point
  boardIds: BoardId[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

interface BookSource {
  origin: "built-in" | "user-created" | "imported";
  importedFrom?: string;
  importedAt?: ISO8601;
  originalAuthor?: string;
  license?: string;
}
```

---

## Boards

Typed IDs enforce navigation constraints at compile time.

```typescript
type StandardBoardId = string & { readonly _brand: "StandardBoard" };
type PopupBoardId = string & { readonly _brand: "PopupBoard" };
type BoardId = StandardBoardId | PopupBoardId;
```

```typescript
interface Board {
  id: StandardBoardId | PopupBoardId;
  kind: "standard" | "popup";
  bookId: BookId;
  language: BCP47;
  fallbackLanguage?: BCP47;
  name: LocalizedString;
  description?: LocalizedString;
  icon?: ImageRef;
  grid: { rows: number; cols: number }; // 1–12 on each axis
  source: BoardSource;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

interface BoardSource {
  origin: "built-in" | "user-created" | "imported";
  author: string;
}
```

---

## Tiles

```typescript
interface TileAppearance {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  label: string;
  hidden?: boolean;
  presentation?: "symbol-only" | "text-only" | "text-top" | "text-bottom"; // overrides profile preference when set
  symbolOverride?: ImageRef;
}

interface TileBase {
  id: TileId;
  boardId: BoardId;
  position: { row: number; col: number };
  size?: { w: number; h: number };
  appearance?: TileAppearance;
}

interface ConceptTile extends TileBase {
  kind: "concept";
  conceptId: ConceptId;
  lockedForm?: string; // bypass inflection
  features?: LanguageFeatures;
}

interface ChunkTile extends TileBase {
  kind: "chunk";
  chunkId: ChunkId;
}

interface PhraseTile extends TileBase {
  kind: "phrase";
  phraseId: PhraseId;
}

interface FolderTile extends TileBase {
  kind: "folder";
  targetBoardId: StandardBoardId; // navigation target
}

interface PopupTile extends TileBase {
  kind: "popup";
  targetBoardId: PopupBoardId; // navigation target
}

interface ActionTile extends TileBase {
  kind: "action";
  action: ActionPayload;
}

type Tile =
  | ConceptTile
  | ChunkTile
  | PhraseTile
  | FolderTile
  | PopupTile
  | ActionTile;

type PopupTileContent = ConceptTile | ChunkTile | PhraseTile | ActionTile;
```

---

## Concepts

A concept is a single lemma in one language.

```typescript
interface Concept {
  id: ConceptId;
  type: "lemma";
  language: BCP47;
  pos: PartOfSpeech;
  lemma: Lemma;
  category: Category;
  imageRef?: ImageRef;
  searchIndex?: string[]; // lowercased for semantic search
  ttsCache?: string; // TTS key
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

type PartOfSpeech =
  | "NOUN" // noun
  | "VERB" // verb
  | "ADJ" // adjective
  | "ADV" // adverb
  | "PRON" // pronoun
  | "DET" // determiner
  | "ADP" // adposition
  | "CONJ" // conjunction
  | "INTJ" // interjection
  | "PART" // particle
  | "NUM" // numeral
  | "AUX" // auxiliary verb
  | "PROPN" // proper noun (eg names)
  | "X"; // other
```

**Colour resolution.** A tile's colour is its `Category`. `ConceptTile`/`ChunkTile`/`PhraseTile` read it from the resolved `Concept`/`Chunk`/`Phrase`. `FolderTile`/`PopupTile`/`ActionTile` carry no entity category — they take a per-`kind` default. A per-tile `appearance.backgroundColor`/`borderColor` always overrides the category colour.

---

## Chunks

A chunk is a 2–3 concept composition

```typescript
interface Chunk {
  id: ChunkId;
  language: BCP47;
  category: Category;
  imageRef?: ImageRef;
  components: ChunkComponent[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

interface ChunkComponent {
  conceptId: ConceptId; // references a Concept
  lockedForm?: string; // disables inflection
  featureOverrides?: LanguageFeatures;
}
```

---

## Lemmas

```typescript
interface Lemma {
  surface: string; // single word; whitespace rejected at construction, dashes and apostrophes are allowed
  searchAliases?: string[];
  category: Category;
  forms?: Record<string, LemmaForm>; // keyed by language-defined keys
  /** Language-specific morphological metadata */
  langData?: Record<string, unknown>;
}

interface LemmaForm {
  surface: string;
  pronunciation?: string;
}
```

---

## Phrases

A `PhraseTile` references a phrase by its `phraseId`. Phrases are spoken **without** adding thep to the utterance strip. They're also the only tile type that may carry an `audioRef`/user-uploaded audio (this restriction is due to inflections' support)

```typescript
interface Phrase {
  id: PhraseId;
  language: BCP47;
  surface: string; // displayed text
  fullText?: string; // full text
  pronunciation?: string;
  audioRef?: AudioRef; // user recording
  imageRef?: ImageRef;
  ttsCache?: string; // rendered from fullText ?? surface at creation
  createdAt: ISO8601;
  updatedAt: ISO8601;
}
```

Phrases are searched by their label and fulltext.

---

## Language features

Grammar features are defined per language module and carried opaquely through core interfaces.

```typescript
type LanguageFeatures = Record<string, string | number | boolean>;
```

**Feature priority.** The more specific and explicit, the higher priority it has:

1. 'Refine' stage output -- if applicable;
2. LockedForm-marked values;
3. Special grammar keys ('-s', '-ing', etc);
4. Rule-based autoinflection.

---

### V1 Examples

#### English features

```typescript
interface EnglishFeatures extends LanguageFeatures {
  tense?: "past" | "present" | "future"; // other modifiers (simple, perfect, continiuous, perfect continiuous)
  // are derived from context
  person?: 1 | 2 | 3; // I; we | you | she; he; it; they
  number?: "sg" | "pl";
  adj_form?: "comparative" | "superlative";
}
```

```typescript
type EnglishVerbFormKey =
  | "base" // eat
  | "past" // ate
  | "past_participle" // eaten
  | "present_participle" // eating
  | "present_3_sg"; // eats

type EnglishAuxFormKey =
  | "base" // be
  | "future" // are
  | "present_pl" // are
  | "present_1_sg" // am
  | "present_3_sg" // is
  | "past_pl" // were
  | "past_sg" // was
  | "past_participle" // been
  | "present_participle"; // being

type EnglishAdjFormKey =
  | "base" // big
  | "comparative" // bigger
  | "superlative"; // biggest

type EnglishNounFormKey =
  | "sg" // cat
  | "pl"; // cats

type EnglishFormKey =
  | EnglishVerbFormKey
  | EnglishAuxFormKey
  | EnglishAdjFormKey
  | EnglishNounFormKey;

// How it types Lemma.forms (which the spec declares Record<string, LemmaForm>):
type EnglishForms = Partial<Record<EnglishFormKey, LemmaForm>>;
```

---

#### Russian features

```typescript
interface RussianFeatures extends LanguageFeatures {
  tense?: "past" | "present" | "future" | "imperative";
  person?: 1 | 2 | 3;
  number?: "sg" | "pl";
  gender?: "m" | "f" | "n";
  adj_form?: "comparative";
}

type RussianVerbFormKey =
  | "present_1_sg" // говорю     (<I> talk)
  | "present_2_sg" // говоришь   (<you> talk)
  | "present_3_sg" // говорит    (<she> talks)
  | "present_1_pl" // говорим    (<we> talk)
  | "present_2_pl" // говорите   (<you> talk)
  | "present_3_pl" // говорят    (<they> talk)

  // past agrees in gender (sg)
  | "past_m" // говорил    (<he> talked)
  | "past_f" // говорила   (<she> talked)
  | "past_n" // говорило   (<it> talked)
  | "past_pl" // говорили  (<they> talked)
  | "base" // говорить     (to talk)
  | "imperative_sg" // говори     (talk)
  | "imperative_pl"; // говорите  (talk)

type RussianAuxFormKey =
  | "base" // есть (to be)
  | "future_1_sg" // буду       (<I> will)
  | "future_2_sg" // будешь     (<you> will)
  | "future_3_sg" // будет      (<she> will)
  | "future_1_pl" // будем      (<we> will)
  | "future_2_pl" // будете     (<you> will)
  | "future_3_pl" // будут      (<they> will)
  | "past_sg_m" // был          (<he> was)
  | "past_sg_f" // была         (<she> was)
  | "past_sg_n" // было         (<it> was)
  | "past_sg_pl" // были        (<they> were)
  | "imperative_sg" // будь     (be)
  | "imperative_pl"; // будьте  (be)

type RussianNounFormKey = "sg" | "pl"; // cases are skipped for rule-based inflections

type RussianAdjFormKey = "m" | "f" | "n" | "pl" | "comparative";
```

---

## The grammar pipeline

Each language ships as a `LanguageModule` in its own package.

```typescript
interface LanguageModule<F extends LanguageFeatures = LanguageFeatures> {
  readonly language: BCP47;
  readonly tier: Tier;
  readonly modelId: string;
  readonly modelVersion: string;

  defaultFeatures(): F;
  mergeFeatures(base: Partial<F>, override: Partial<F>): F;

  ready(): Promise<boolean>;
  generate(input: GecInput<F>): Promise<GecResult>;
  search(query: string, k: number): Promise<ConceptId[]>;
  analyze(surface: string): Promise<InflectionAnalysis>;
  dispose(): Promise<void>;
}

type Tier = 1 | 2 | 3;

interface GecInput<F extends LanguageFeatures = LanguageFeatures> {
  tokens: GecInputToken[];
}

interface GecInputToken {
  conceptId: ConceptId;
  lemma: string;
  pos: PartOfSpeech;
  features: F; // every token carries a set of associated features with it
  lockedForm?: string;
}
```

**Tiers:**

- **Tier 3** — concatenate only. Surface forms joined with spaces, first token capitalised.
- **Tier 2** — concatenate + inflect. Rule-based parser resolves form keys from context; emits forms from `Lemma.forms`.
- **Tier 1** — concatenate + inflect + refine. On-device tiny ONNX model corrects agreement edge cases and idiomatic phrasing.

```typescript
interface Tier {
  step: 1 | 2 | 3;
  name: "concat" | "inflect" | "refine";
}

interface GecResult {
  text: string; // joined utterance
  tier: Tier; // tier that produced this result
  degraded?: boolean; // true if a stage fell back to a lower tier
}
```

---

## Inflection generation

User-added vocabulary is analysed on-device at add time.

```typescript
interface InflectionAnalysis {
  pos: PartOfSpeech;
  forms: Record<string, string>;
  langData?: Record<string, unknown>;
}
```

Inflection values are recalculated on every change in the utterance.
It supports both look-ahead and look-behind to determine which rule should be applied.

---

## Concept search

```typescript
interface ConceptSearchResult {
  conceptId: ConceptId;
  score: number;
  matchedTerm: string;
}

function searchConcepts(
  query: string,
  options: { languages?: BCP47[]; k?: number },
): ConceptSearchResult[];
```

Search uses prefix-biased matching with Levenshtein ≤ 2 fuzzy fallback for queries 5+ characters.

---

## Symbols and audio

Shipped vocabulary uses the **ARASAAC** pictogram pack plus project-authored additions. Users may also upload their own images scoped per concept or per tile

```typescript
interface AudioRef {
  audioId: AudioId;
  filename?: string;
  mimeType: string;
  durationMs?: number;
}

interface ImageRef {
  imageId: string; // Dexie blob key (book covers, user photos)
  mimeType: string;
  width?: number;
  height?: number;
}
```

**TTS caching model:**

- `Concept.ttsCache` — rendered from `Lemma.surface` at concept creation. Plays on ConceptTile tap.
- `Phrase.ttsCache` — rendered from `fullText ?? surface` at phrase creation (skipped when `audioRef` is set). Invalidated on text change.
- Utterance speak — the full inflected sentence from the pipeline is fed to TTS live; it is not cached.

Recordings: AAC 64 kbps, mono, ≤ 1 min (~480 KB). Stored as Dexie blobs.

---

## Custom user content

Before any mutation to a concept or chunk referenced by more than one tile, the editor surfaces:

```typescript
interface ConceptMutationWarning {
  conceptId: ConceptId;
  affectedTiles: { boardId: BoardId; tileId: TileId }[];
  options: "edit-in-place" | "fork-to-new-concept";
}
```

Same interface applies to chunk and phrase mutation.

---

## Copy semantics

```typescript
type CopyScope = "same-book" | "cross-book";
type BoardIdMap = Map<BoardId, BoardId>;
```

- **Same-book:** new tile IDs; each copied tile's owning `boardId` is set to its destination board; `conceptId`, `chunkId`, `phraseId`, and `targetBoardId` references unchanged.
- **Cross-book:** new tile and board IDs; owning `boardId` set to the destination board, and `FolderTile.targetBoardId` / `PopupTile.targetBoardId` remapped through `boardIdMap`; `conceptId`, `chunkId`, and `phraseId` unchanged.

Concepts, chunks, and phrases are never created during a copy operation in either scope.

A full book duplicate pre-allocates IDs for all boards, builds `boardIdMap`, then copies each board in one pass. `PopupBoard`s follow the same rules as `StandardBoard`s.

---

## OBF / OBZ round-trip

Each `StandardBoard` and `PopupBoard` exports as an `.obf` file. Concepts, chunks, and audio export as archive assets. `words-<locale>.json` covers all referenced lemmas.

**Tile vendor extensions:**

```json
// ConceptTile
{
  "ext_my_voice_kind": "concept",
  "ext_my_voice_concept_id": "concept:UUID",
  "ext_my_voice_pos": "VERB",
  "ext_my_voice_locked_form": null,
  "ext_my_voice_features": null
}

// ChunkTile
{
  "ext_my_voice_kind": "chunk",
  "ext_my_voice_chunk_id": "chunk:UUID",
  "ext_my_voice_components": [
    { "conceptId": "concept:UUID",  "lockedForm": null },
    { "conceptId": "concept:UUID", "lockedForm": null }
  ]
}

// PhraseTile → Phrase
{
  "ext_my_voice_kind": "phrase",
  "ext_my_voice_has_audio": true
}
```

**Board vendor extensions:**

```json
// StandardBoard
{
  "ext_my_voice_kind": "standard",
  "ext_my_voice_navigation": { "sidebarVisibility": "always" }
}

// PopupBoard
{ "ext_my_voice_kind": "popup", "ext_my_voice_navigation": null }
```

```typescript
interface ImportResult {
  imported: Book;
  warnings: ImportWarning[];
  errors: ImportError[];
}
```

---

## User profile

```typescript
interface UserProfile {
  uiLanguage: BCP47;
  activeLanguage: BCP47;
  contentLanguages: BCP47[];
  gender?: "m" | "f";
  name?: string;
  birthday?: ISO8601;
  skinTone?: 1 | 2 | 3 | 4 | 5 | 6;
  presentation: "symbol-only" | "text-only" | "text-top" | "text-bottom";
  voicePrefs: Record<BCP47, VoicePref>;
  editPin: string;
}

interface VoicePref {
  voiceId: string;
  rate?: number;
  pitch?: number;
}
```

---

## Sidebar

| Button        | Iconify                                            | Action                                                                                                 |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Menu          | `material-symbols--menu-rounded`                   | Opens the app menu (settings, edit mode, etc). Shows a `material-symbols--lock` badge if locked by PIN |
| Books         | `icon-park-outline--bookshelf`                     | Opens the book library to switch books                                                                 |
| Home          | `material-symbols--home-outline-rounded`           | Jumps to the active book's `homeBoardId`.                                                              |
| Search boards | `material-symbols--category-search-rounded`        | Opens the lookup menu to search for boards/concepts/phrases.                                           |
| Stress board  | `material-symbols--e911-emergency-outline-rounded` | Jumps to the designated stress / emergency board.                                                      |
| Return        | `icon-park-outline--return`                        | Goes back to the previous board                                                                        |
| Alarm         | `material-symbols--notifications-active-rounded`   | Attention alarm.                                                                                       |
| Keyboard      | `material-symbols--keyboard-alt-outline-rounded`   | Opens the keyboard sheet.                                                                              |
| Whiteboard    | `material-symbols--draw-outline-rounded`           | Opens the whiteboard.                                                                                  |

---

## Accessibility architecture

V1 scope creates foundation for other input sources, even if targets touch first.

### Input abstraction

All input sources — touch, mouse, keyboard, switch, gaze — converge to one event type:

```typescript
interface ActivationEvent {
  source: "touch" | "mouse" | "keyboard" | "switch" | "gaze" | "joystick";
  type: "focus" | "press-start" | "press-end" | "tick" | "cancel";
  target: FocusableId;
  timestamp: number;
  heldMs?: number;
}
```

### Activation state machine

```
idle → focused(element)
         │
    press-start → arming-select(progress)
                        │
              tick past select threshold
                        │
                  arming-skip(progress)
                        │
               ┌────────┴────────┐
           press-end         press-end
               │                 │
       committed-select   committed-skip
               │                 │
        activate(element)  exitScope(scope)
               └────────┬────────┘
                      focused
```

```typescript
interface SwitchSettings {
  selectThresholdMs: number;
  skipThresholdMs: number;
  topLevelThresholdMs: number;
  autoScanRateMs: number;
  autoSkipAfterCycles: number;
}
```

### Scan regions

```
1. Main tile grid
2. Sentence strips
3. Sidebar
4. Breadcrumbs
```

**Main Tile Grid.**

1. Row-then-columns scanning;
2. Does not leave the region until promted.

**Sentence strips.**

1. Row-then-columns scanning (first selecting top or bottom strip, then elements are scanned left-to-right)

**Sidebar** and **Breadcrumbs** regions contain only a single row/column.

---
