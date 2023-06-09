(function () {
  if (typeof UnblockMe === "undefined") {
    window.UnblockMe = {};
  };
  var that;
  var Game = UnblockMe.Game = function () {
    this.blocks = [];
    this.addBlocks();
  };

  $("#restart").click(function(){
    window.location.reload();
  });

  // constants for one level
  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.BORDER = 10;

  Game.BLOCK_VALUES = [
    {
      width: 100,
      height: 300,
      pos:[200,0],
    },
    {
      width: 300,
      height: 100,
      pos: [300,0],
    },
    {
      width: 100,
      height: 200,
      pos: [0,300],
    },
    {
      width: 200,
      height: 100,
      pos: [200,300],
    },
    {
      width: 100,
      height: 200,
      pos: [400,400],
    },
    {
      width: 100,
      height: 300,
      pos: [500,300],
    },
    {
      width: 300,
      height: 100,
      pos: [0,500],
    }
  ];

  Game.TARGET_BLOCK_VALUE = {
    width: 200,
    height: 100,
    pos: [0,200],
    color: "#D50000",
  };

  Game.EXIT_POS = [600, 200]

  Game.prototype.addBlocks = function () {
    var that = this;

    // add normal blocks
    Game.BLOCK_VALUES.forEach(function (blockOption) {
      blockOption["game"] = that;
      that.blocks.push(new UnblockMe.Block(blockOption));
    });

    // add target block
    this.targetBlock = new UnblockMe.Block(Game.TARGET_BLOCK_VALUE);
    this.targetBlock.game = this;
    this.blocks.push(this.targetBlock);
  };

  Game.prototype.draw = function (ctx) {
    // clear and draw the big sqaure area
    var dimXw
    ctx.clearRect(0, 0, Game.DIM_X + Game.BORDER * 2,
       Game.DIM_Y  + Game.BORDER * 2);
    ctx.fillStyle = "#BFA160";
    ctx.fillRect(0, 0, Game.DIM_X + Game.BORDER * 2,
      Game.DIM_Y  + Game.BORDER * 2);
    ctx.lineWidth = Game.BORDER;
    ctx.strokeStyle="gray";
    ctx.strokeRect(0, 0, Game.DIM_X + Game.BORDER * 2,
      Game.DIM_Y  + Game.BORDER * 2);

    // draw every block
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw(ctx);
    };

    // draw exit
    ctx.beginPath();
    ctx.moveTo(Game.EXIT_POS[0] + Game.BORDER * 2,
      Game.EXIT_POS[1] + Game.BORDER);
    ctx.lineTo(Game.EXIT_POS[0] + Game.BORDER * 2,
      Game.EXIT_POS[1] + Game.BORDER + 100);
    ctx.lineWidth= Game.BORDER + 1;
    ctx.strokeStyle="white";
    ctx.stroke();
  };

  Game.prototype.isWon = function () {
    // compare top-right pos of target block and exit pos
    if (this.targetBlock.pos[0] + 200 === Game.EXIT_POS[0] &&
        this.targetBlock.pos[1] === Game.EXIT_POS[1]) {
      return true;
    } else {
      return false;
    };
  };

  Game.prototype.checkWon = function() {
    if (this.isWon()) {
        clearTimeout(t);
        $("#send-score").show();
    };
  };

})();

