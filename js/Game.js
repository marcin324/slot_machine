class Game {
    constructor(startMoney) {
        this.stats = new Statistics();
        this.wallet = new Wallet(startMoney);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.boards = [...document.querySelectorAll('img.color')];
        this.inputBid = document.getElementById('bid');
        this.spanWallet = document.querySelector('span.wallet');
        this.spanResult = document.querySelector('span.result');
        this.spanGames = document.querySelector('span.number');
        this.spanWins = document.querySelector('span.win');
        this.spanLosses = document.querySelector('span.loss');
        this.render();
    }

    render(colors = ['img/green_square.jpg', 'img/green_square.jpg', 'img/green_square.jpg'], money = this.wallet.getWalletValue(), result = '', stats = [0, 0, 0], bid = 0, wonMoney = 0) {
        this.boards.forEach((board, index) => {
            board.src = colors[index];
        });

        this.spanWallet.textContent = `${money}$`;

        if (bid === 0) return alert(`Wpisz stawkę i losuj. Trzy jednakowe obrazki lub trzy różne obrazki oznaczają Twoją wygraną. W przypadku wygranej Twoje środki są powiększane o trzykrotność postawionej sumy. W przypadku przegranej środki są pomniejszane o postawioną sumę.`);

        if (result) {
            result = `Wygrałeś ${wonMoney}$.`
        } else if (!result && result !== '') {
            result = `Przegrałeś ${bid}$.`
        }

        this.spanResult.textContent = result;

        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];

        this.inputBid.value = '';
    }

    startGame() {
        if (this.inputBid.value < 1) {
            this.inputBid.value = '';
            return alert('Stawka gry musi wynosić co najmniej 1$.');
        }

        const bid = Math.floor(this.inputBid.value);

        if (!this.wallet.checkCanPlay(bid)) {
            this.inputBid.value = '';
            return alert('Masz za mało środków lub podano nieprawidłową wartość.');
        }

        this.draw = new Draw();

        const colors = this.draw.getDrawResult();

        const win = Result.checkWinner(colors);

        const wonMoney = Result.moneyWinInGame(win, bid);

        if (win) {
            this.wallet.changeWallet(wonMoney);
        } else if (!win) {
            this.wallet.changeWallet(bid, '-');
        }

        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney);
    }
};