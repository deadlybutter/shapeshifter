var ships = {};

this.createNewShip = function(id) {
  var ship = {
    id: id,
    loc: {
      pos: {
        x: 0,
        y: 0,
        z: 0
      },
      rot: {
        x: 0,
        y: 0,
        z: 0
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      }
    }
  }
  ships[id] = ship;

  return ship;
}

this.deleteShip = function(id) {
  ships[id] = {};
  delete ships[id];
}

this.getShips = function() {
  return ships;
}

this.updateShip = function(ship) {
  if (ship == undefined || ship.id == undefined || ships[ship.id] == undefined) {
    return;
  }
  ships[ship.id] = ship;
}
