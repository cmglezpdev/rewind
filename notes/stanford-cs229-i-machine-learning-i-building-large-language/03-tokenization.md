# Tokenization

## Why subword tokens exist

- Whole-word vocabularies struggle with typos and unseen words. Splitting on spaces also fails for languages such as Thai, which do not separate words that way. [`11:07`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=667) [`11:24`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=684)
- Character-level input avoids those vocabulary problems but lengthens sequences. Standard transformer attention has quadratic sequence-length cost, so long sequences are expensive. [`11:39`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=699) [`11:55`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=715)
- Subword tokenization gives common character sequences their own IDs. The lecture offers roughly 3–4 letters per token as an intuition, rather than a rule for every language or tokenizer. [`12:19`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=739)

## Byte pair encoding example

1. Train the tokenizer on a text corpus before training the language model. Start the illustrated algorithm with a token for each character. [`12:35`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=755) [`12:52`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=772)
2. Count adjacent token pairs and merge the most frequent pair into a new token. In the example, `t` plus `o` occurs three times and becomes `to`. [`12:52`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=772) [`13:15`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=795)
3. Repeat merges to form longer common sequences, including `tok`, `toke`, and `token`. The demonstrated tokenizer splits `tokenizer` into `token` and `izer`. [`13:15`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=795) [`13:28`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=808) [`13:51`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=831) [`14:06`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=846)
4. Retain smaller tokens so unfamiliar spellings and typos can still be represented. [`15:22`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=922) [`15:36`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=936)

## Practical consequences

- Pre-tokenization can restrict merges across spaces and punctuation boundaries to reduce tokenizer training work. The lecturer describes this as an efficiency choice with language-specific assumptions. [`14:27`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=867) [`14:45`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=885) [`15:03`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=903)
- A token has one ID even when its text has multiple meanings. For "bank," the transformer uses context to distinguish meanings; the tokenizer does not assign separate IDs for each sense. [`16:00`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=960) [`16:18`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=978) [`16:34`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=994)
- The lecturer describes encoding as choosing the largest applicable token. Treat this as the lecture's intuition for using learned pieces, not a full implementation specification for every tokenizer. [`16:49`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1009) [`17:11`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1031)
- Token boundaries can obstruct arithmetic: `327` might be one token, hiding its individual digits from the input representation. The lecturer also points to code indentation as a case where tokenization choices matter. [`18:07`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1087) [`18:24`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1104) [`18:42`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1122)
- Character or byte input could remove some tokenizer complications, but the lecture frames efficient processing of the resulting long sequences as an unresolved architectural challenge. [`17:27`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1047) [`17:46`](https://www.youtube.com/watch?v=9vM4p9NN0Ts&t=1066)
