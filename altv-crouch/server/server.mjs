import * as alt from 'alt-server'; 

alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
    alt.emitClient('crouch::playerEnteredVehicle')
});