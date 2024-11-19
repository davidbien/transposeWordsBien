# transposewordsbien README

A simple extension to transpose words in a line of text.

## Features

The intent is to more or less simulate the "Edit.WordTranspose" functionality of Visual Studio Not-Code (i.e. 2019, 2022, etc.)
It operates a bit differently than Edit.WordTranspose:
- The selection plus any surrounding whitespace and punctuation are accumulated. The words on either side of this middle space are juxtaposed with one another.
- If the cursor is at the beginning or end of a line then nothing happens - it is a no-op.
- On the other hand VS2022 will juxtapose the two words following the cursor and preserve the whitespace and punctuation is between the following two words
    and will wrap the line if necessary.
  
## Extension Settings

No settings currently.

