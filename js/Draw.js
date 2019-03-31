class Draw {
    constructor() {
        this.options = ['img/monster_blue.jpg', 'img/monster_orange.jpg', 'img/monster_yellow.jpg'];
        let _result = this.drawResult();
        this.getDrawResult = () => _result;
    }

    drawResult() {
        let colors = [];
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            const color = this.options[index];
            colors.push(color);
        }
        return colors;
    }
};