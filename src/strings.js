export const strings = {
    tomorrowToast: "You've played today - see you tomorrow! 👋",
    endToast: (score) => `You got to level ${score}! 🥳`,
    howTo: {
        sequence: "Think Simon Says! When you click start, \
                    1 tile will flash, after it's flashed, \
                    click the same tile. Each round adds an \
                    additional tile to the sequence, and \
                    they have to be clicked in the correct order too.\
                     One incorrect click and game over!",

        number: "A number will appear on the screen \
                for 5 seconds, once the 5 seconds runs\
                out, enter the number into the guess box.\
                Each correct round will add 1 additonal \
                digit to the end. If you guess wrong once, game over!",

        word: "There is no time limit in this game,\
              all you have to do is remember if the \
              word on the screen has appeared in this\
              test before. If the word has appeared before \
              click “seen” if not, click “new”."
    }
}