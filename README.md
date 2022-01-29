# What To Do After Downloading This Project
1. Open this folder in a command prompt.
2. Run `yarn install`.
3. It is recommended to open this folder with [Visual Studio Code](https://code.visualstudio.com).

<br/>

# Creating A New Data Pack

## Configure The Data Pack
1. In `src/~game/data-packs`, create a new folder.
2. The name of the folder should not have spaces. (Eg: icebreaking-event)
3. Create a file called `config.ts`, or you can copy from the `demo` folder.
4. Set the `deckSize` based on how many cards you want to have in the game.
5. The `deckSize` should be an even number since the voices come in pairs.

## Customize Back Image of The Cards
1. In `src/~game/data-packs`, create a new folder called `card-image`.
2. Or, you can also copy from the `demo` folder.
3. The image should have a ratio of `5:7`.
4. It is best if the image has a size of 500 x 700 pixels.
5. The image must be named `image.png`.
6. You may save the source file alongside `image.png` to make it easy to return and edit the image when needed, it will not affect the game whatsoever.

## Customizing Game Data

### Part 1: Basic Structure
1. In `src/~game/data-packs`, create a new folder called `card-data`.
2. In `card-data` create as many folders as you see fit. 
3. The folder names should follow this pattern `pair-01`, `pair-02`... `pair-99`
4. Note that the maximum folders allowed is 99, anything above 99 will be ignored. Attempting to name the folder as `pair-001`... `pair-099` will not work. Besides, who needs that many cards to play?
5. Also note that if you set your `deckSize` to 12, for example, then it is expected that you will have 6 pairs of card data.

## Part 2: Text Data
1. In `src/~game/data-packs/(custom-name)/card-data/pair-(num)`, create a file called `data.ts`, or copy from the `demo` folder and edit it.
2. Fill in the English and Japanese names of the voice actor, as well as the title and character names in card `a` and card `b`.

### Part 3: Voice Actor Image
1. Find a photo of the voice actor and name it as `figure.png` and put it in `src/~game/data-packs/(custom-name)/card-data/pair-(num)`.
2. The image should have a ratio of `3:4`.
3. The recommended image size is 600 × 800 pixels.

### Part 4: A/B Data
1. Create a folders `a` and `b` in `src/~game/data-packs/(custom-name)/card-data/pair-(num)`.
2. Place the the voice sample in each folder and name them as `sound.mp3`.
3. Place the photo of the fictional characters in each folder and name them as `sprite.png`. The photo should be square, recommended size is 200 × 200 pixels.

<br/>

# How To Run
1. Go to `src/~game/setup.ts` and change the value of `loadFrom` to the name of the folder of the data pack that you have created.
2. Open this folder in a command prompt.
3. Run `yarn start` and go to http://localhost:3000.
4. To quit, return to the command prompt and press Ctrl + C
