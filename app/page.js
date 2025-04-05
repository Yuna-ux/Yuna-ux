'use client';

import React from 'react';

const Page = () => {
  const scripts = {
    1: `_G.HitboxVisible = false
        _G.BypassAntiCheatNotification = false
        _G.HideUserName = true
        _G.MusicThemeId = 18382734796

        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Death_glove_V4.lua"))();`,
    2: `_G.BypassAntiCheatNotification = false
        _G.HideUserName = true

        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Slap_aura.lua"))();`,
    3: `print("Script 3 executed!")`,
    4: `print("Script 4 executed!")`,
    5: `CustomTheme = 87540733242308
        DeathGlove = {
            HideClients = false,
            MuteClientSounds = false,
            HideFEScythe = false,
            ClientDeathTheme = true,
            ShowHitboxes = true,
        }
        loadstring(game:HttpGet('https://raw.githubusercontent.com/DonjoScripts/Public-Scripts/refs/heads/Slap-Battles/death%5B0.8%5D.lua'))();`,
    6: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"),true))();`,
    7: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/dex.lua"))();`,
    8: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/HTTPSPY_V2_.lua"))();`,
    9: `print("Script 9 executed!")`,
    10: `print("Script 10 executed!")`,
    11: `print("Script 11 executed!")`,
    12: `print("Script 12 executed!")`,
    13: `print("Script 13 executed!")`,
    14: `print("Script 14 executed!")`,
    15: `print("Script 15 executed!")`,
    16: `print("Script 16 executed!")`,
  };

  const copyText = (index) => {
    navigator.clipboard.writeText(scripts[index]).then(() => {
      alert(`Script ${index} copied to clipboard!`);
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="container">
      <h2>Copy Scripts</h2>
      <div className="btn-container">
        <button className="btn" onClick={() => copyText(1)}>Death Glove Script</button>
        <button className="btn" onClick={() => copyText(2)}>Slap Aura Script</button>
        <button className="btn" onClick={() => copyText(3)}>EdgeLord</button>
        <button className="btn" onClick={() => copyText(4)}>Funax Hub</button>
        <button className="btn" onClick={() => copyText(5)}>Donjo Death Glove</button>
        <button className="btn" onClick={() => copyText(6)}>Infinite Yield</button>
        <button className="btn" onClick={() => copyText(7)}>Dex</button>
        <button className="btn" onClick={() => copyText(8)}>Http Spy V2</button>
      </div>
      <h2>Yuna-ux Scripts!</h2>
    </div>
  );
};

export default Page;
