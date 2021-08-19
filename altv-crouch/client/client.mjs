/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives'; 

const player = alt.Player.local;

let crouch = false; 
let hotkey = 87; // Key : W 

native.requestClipSet("MOVE_M@TOUGH_GUY@");
native.requestClipSet("move_ped_crouched");
native.requestClipSet("move_ped_crouched_strafing");

alt.on('keydown', (key) => {
    if(key === hotkey && !player.vehicle){
        if(!crouch){
            native.setPedUsingActionMode(player.scriptID, false, -1, 'DEFAULT_ACTION');
            crouch = true; 
        }else{
            native.setPedUsingActionMode(player.scriptID, false, -1, 'DEFAULT_ACTION');
            
            native.setPedMovementClipset(player.scriptID, "MOVE_M@TOUGH_GUY@", 0.25);
            alt.setTimeout(() => {
                native.resetPedMovementClipset(player.scriptID, 0);
                native.resetPedStrafeClipset(player.scriptID, 0);
            }, 200);
            crouch = false; 
        }
    }
});

alt.setInterval(() => {
    if(crouch){
        native.setPedMovementClipset(player.scriptID, "move_ped_crouched", 0.25);
        native.disableControlAction(0,22,true); //Jump
        native.setPedUsingActionMode(player.scriptID, false, -1, 'DEFAULT_ACTION');

        if(native.isAimCamActive()){
            native.setPedStrafeClipset(player.scriptID, "move_ped_crouched_strafing");
            native.setPedUsingActionMode(player.scriptID, false, -1, 'DEFAULT_ACTION');
        }
    }else{
        native.resetPedMovementClipset(player.scriptID, 0);
        native.resetPedStrafeClipset(player.scriptID, 0);
    }
}, 10)
