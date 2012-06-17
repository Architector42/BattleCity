function PowerUp(eventManager) {
  Sprite.call(this, eventManager);
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
  
  this._w = Globals.UNIT_SIZE;
  this._h = Globals.UNIT_SIZE;
  
  this._type = PowerUp.Type.GRENADE;
  this._blinkTimer = new BlinkTimer(7);
  this._value = 500;
}

PowerUp.subclass(Sprite);

PowerUp.Event = {};
PowerUp.Event.DESTROYED = 'PowerUp.Event.DESTROYED';

PowerUp.Type = {};
PowerUp.Type.GRENADE = 'grenade';
PowerUp.Type.HELMET = 'helmet';
PowerUp.Type.SHOVEL = 'shovel';
PowerUp.Type.STAR = 'star';
PowerUp.Type.TANK = 'tank';
PowerUp.Type.TIMER = 'timer';

PowerUp.prototype.setType = function (type) {
  this._type = type;
};

PowerUp.prototype.getType = function () {
  return this._type;
};

PowerUp.prototype.setValue = function (value) {
  this._value = value;
};

PowerUp.prototype.getValue = function () {
  return this._value;
};

PowerUp.prototype.draw = function (ctx) {
  if (this._blinkTimer.isVisible()) {
    ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
  }
};

PowerUp.prototype.updateHook = function () {
  this._blinkTimer.update();
};

PowerUp.prototype.getImage = function () {
  return 'powerup_' + this._type;
};

PowerUp.prototype.notify = function (event) {
  if (this._collidedWithPlayer(event)) {
    this.destroy();
  }
};

PowerUp.prototype.destroyHook = function () {
  this._eventManager.fireEvent({'name': PowerUp.Event.DESTROYED, 'powerUp': this});
};

PowerUp.prototype._collidedWithPlayer = function (event) {
  if (event.name != CollisionDetector.Event.COLLISION) {
    return false;
  }
  if (!(event.initiator instanceof Tank)) {
    return false;
  }
  if (!event.initiator.isPlayer()) {
    return false;
  }
  if (event.sprite !== this) {
    return false;
  }
  return true;
};
