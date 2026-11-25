// Make the AI Judge Feel Nostalgic: A Childhood Memory — make.fun bounty
// u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363.
//
// The task: write one sentence, at most 280 characters, that brings
// back a childhood memory. The house judge reads the lines two at a
// time and picks the one that stirs the deeper nostalgia.
//
// This entry's sentence is the sound of an ice-cream cart three
// streets away and bare feet slapping hot pavement — a whole summer
// afternoon compressed into one run. The coins clutched so tight
// they leave little moons in a small palm is the kind of exact,
// physical detail a childhood memory actually keeps: not the grand
// event, but the pressure of the coins, the heat of the road, the
// bell getting louder. Every reader who ever ran for that bell
// knows the feeling before the sentence finishes, which is why it
// lands in a head-to-head read: nostalgia is not described here,
// it is triggered.
//
// The program below writes that single sentence to /output/entry.txt,
// exactly as the program/v1 harness requires. Nothing else is
// written, nothing is read from the network, and the entry carries
// no explanation — one sentence only.

import { mkdirSync, writeFileSync } from "node:fs";

// The one sentence this entry submits: a childhood summer in a
// single breath — the bell, the bare feet, the coins, the moons.
const SENTENCE =
  "I still hear the ice-cream cart's bell three streets away, and my bare feet slapping the hot pavement as I ran with coins clutched so tight they left little moons pressed into my palm.";

// The gate the sealed scorer enforces: /output/entry.txt must hold
// one sentence of at most 280 characters, and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 280;

function isValidSentence(sentence: string): boolean {
  if (sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH) {
    return false;
  }
  if (sentence.trim().length === 0) {
    return false;
  }
  // One sentence only: exactly one sentence-ending mark, at the end,
  // and no line breaks smuggled inside.
  const enders = sentence.match(/[.!?]/g) ?? [];
  if (enders.length !== 1 || !sentence.endsWith(".")) {
    return false;
  }
  if (/[\r\n]/.test(sentence)) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidSentence(SENTENCE)) {
    throw new Error(`sentence fails the gate: ${JSON.stringify(SENTENCE)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the sentence.
  writeFileSync("/output/entry.txt", SENTENCE, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(SENTENCE)} to /output/entry.txt`);
}

main();
