function BrickWall(eventManager) {
  Wall.call(this, eventManager);
  
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
  
  this._hitLeft = false;
  this._hitRight = false;
  this._hitTop = false;
  this._hitBottom = false;
}

BrickWall.subclass(Wall);

BrickWall.prototype.getClassName = function () {
  return 'BrickWall';
};

BrickWall.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.COLLISION && event.initiator instanceof Bullet && event.sprite === this) {
    this.hitByBullet(event.initiator);
  }
};

BrickWall.prototype.hitByBullet = function (bullet) {
  if (bullet.getDirection() == Sprite.Direction.RIGHT) {
    this.hitLeft();
  }
  else if (bullet.getDirection() == Sprite.Direction.LEFT) {
    this.hitRight();
  }
  else if (bullet.getDirection() == Sprite.Direction.DOWN) {
    this.hitTop();
  }
  else if (bullet.getDirection() == Sprite.Direction.UP) {
    this.hitBottom();
  }
};

BrickWall.prototype.hitLeft = function () {
  if (this._hitLeft || this._hitRight) {
    this.destroy();
    return;
  }
  this._hitLeft = true;
};

BrickWall.prototype.isHitLeft = function () {
  return this._hitLeft;
};

BrickWall.prototype.hitRight = function () {
  if (this._hitRight || this._hitLeft) {
    this.destroy();
    return;
  }
  this._hitRight = true;
};

BrickWall.prototype.isHitRight = function () {
  return this._hitRight;
};

BrickWall.prototype.hitTop = function () {
  if (this._hitTop || this._hitBottom) {
    this.destroy();
    return;
  }
  this._hitTop = true;
};


BrickWall.prototype.isHitTop = function () {
  return this._hitTop;
};

BrickWall.prototype.hitBottom = function () {
  if (this._hitBottom || this._hitTop) {
    this.destroy();
    return;
  }
  this._hitBottom = true;
};

BrickWall.prototype.isHitBottom = function () {
  return this._hitBottom;
};

BrickWall.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('wall_brick'), this._x, this._y);
  this._hideDestroyedAreas(ctx);
};

BrickWall.prototype._hideDestroyedAreas = function (ctx) {
  ctx.fillStyle = "black";
  
  if (this._hitTop) {
    ctx.fillRect(this._x, this._y, this._w, this._h / 2);
  }
  if (this._hitBottom) {
    ctx.fillRect(this._x, this._y + this._h / 2, this._w, this._h / 2);
  }
  if (this._hitLeft) {
    ctx.fillRect(this._x, this._y, this._w / 2, this._h);
  }
  if (this._hitRight) {
    ctx.fillRect(this._x + this._w / 2, this._y, this._w / 2, this._h);
  }
};
