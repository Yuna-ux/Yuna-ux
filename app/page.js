'use client';

import React from 'react';

const Page = () => {
  const scripts = {
    1: `getfenv().ConfigDeathglove = {
             HitboxVisible = false,
             HideUserName = true,
             MusicThemeId = 18382734796
         }

        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Death_glove_V4.lua"))();`,
    2: `getfenv().SlapAuraConfig = {
              Cooldown = 0.2,
              HideUserName = true
        }
        
        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Slap_aura.lua"))()`,
    3: ``,
    4: ``,
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
    7: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/HTTPSPY_V2_.lua"))();`,
    8: ``,
    9: ``,
    10: ``,
    11: ``,
    12: ``,
    13: ``,
    14: ``,
    15: ``,
    16: ``,
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
        <button className="btn" onClick={() => copyText(7)}>Http Spy V2</button>
      </div>
      <h2>Yuna-ux Scripts!</h2>
    </div>
  );
};

export default Page;
