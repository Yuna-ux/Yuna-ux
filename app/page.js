'use client';

import React from 'react';

const Page = () => {
  const scripts = {
    1: `--[[
            Slap Battles Hub And Universal Hub
            Made By @Yuna-ux On Y O U T U B E
        ]]
        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/Funax_Hub-Slap-Battles.lua"))();`,
    2: `getfenv().ConfigDeathglove = {
              HitboxVisible = false,
              HideUserName = true,
              MusicThemeId = 18382734796
        }

        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Death_glove_V4.lua"))();`,
    3: ``,
    4: `loadstring(game:HttpGet("https://raw.githubusercontent.com/fizzyscripting/Slap-Battles/refs/heads/main/DualityOBF"))()`,
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
    8: `if not game:IsLoaded() then
            game.Loaded:Wait()
        end
        _G.NightMode = false
        loadstring(game:HttpGet("https://github.com/kizzysigma/nan/raw/refs/heads/main/CrystalizedOBFS"))()`,
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
    const script = scripts[index];
    navigator.clipboard.writeText(script).then(() => {
      setCopyMessage(`Script ${index} copied to clipboard!`);
      setTimeout(() => setCopyMessage(''), 3000); // Clear message after 3 seconds
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="container">
      <h2>Copy Scripts</h2>
      <div className="button-container">
        {Object.keys(scripts).map((key) => (
          scripts[key] ? (
            <button
              key={key}
              className="btn"
              onClick={() => copyText(key)}
            >
              Script {key}
            </button>
          ) : null
        ))}
      </div>
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default Page;
