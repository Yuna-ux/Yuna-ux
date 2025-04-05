'use client';

import React from 'react';

const Page = () => {
  const scripts = {
    1: {
      name: "Funax Hub",
      code: `--[[
            Slap Battles Hub And Universal Hub
            Made By @Yuna-ux On Y O U T U B E
        ]]
        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/Funax_Hub-Slap-Battles.lua"))();`,
    },
    2: {
      name: "Death Custom Glove V4 Script",
      code: `getfenv().ConfigDeathglove = {
              HitboxVisible = false,
              HideUserName = true,
              MusicThemeId = 18382734796
        }

        loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/Death_glove_V4.lua"))();`,
    },
    3: {
      name: "Script 3",
      code: ``,
    },
    4: {
      name: "Duality Custom Glove Script",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/fizzyscripting/Slap-Battles/refs/heads/main/DualityOBF"))()`,
    },
    5: {
      name: "Death Custom Glove Script Mojjos",
      code: `CustomTheme = 87540733242308
        DeathGlove = {
            HideClients = false,
            MuteClientSounds = false,
            HideFEScythe = false,
            ClientDeathTheme = true,
            ShowHitboxes = true,
        }
        loadstring(game:HttpGet('https://raw.githubusercontent.com/DonjoScripts/Public-Scripts/refs/heads/Slap-Battles/death%5B0.8%5D.lua'))();`,
    },
    6: {
      name: "Infinite Yield",
      code: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"),true))();`,
    },
    7: {
      name: "Http Spy V2",
      code: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/Yuna-ux/Slap-battles/refs/heads/main/HTTPSPY_V2_.lua"))();`,
    },
    8: {
      name: "Crystalized Custom Glove Script",
      code: `
        if not game:IsLoaded() then
            game.Loaded:Wait()
        end
        _G.NightMode = false
        loadstring(game:HttpGet("https://github.com/kizzysigma/nan/raw/refs/heads/main/CrystalizedOBFS"))()`,
    },
    9: {
      name: "Grapple Super Chasher Script",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/DonjoScripts/Public-Scripts/refs/heads/Slap-Battles/SuperCrasher!!!Uwa!SoLag%3Askull%3ADontAskWhyISTheLinkSoLongLol%2CILikeItAlsoRememeberYouHaveToEquipGrappleToUseThisScript%3E-%3C")());`,
    },
    10: {
      name: "Mace Mastery Abuser Script",
      code: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/DonjoScripts/Public-Scripts/refs/heads/Slap-Battles/Mace-Mastery.lua"), true))();`,
    },
    11: {
      name: "Killstreak Farm Script",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/IncognitoScripts/SlapBattles/refs/heads/main/KillstreakFarm"))();`,                        
    },
    12: {
      name: "Fling All Script",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/Fe_Fling_ALL_Script.lua"))();`,
    },
    13: {
      name: "Octo~Spy - Remote Event Spy",
      code: `loadstring("https://raw.githubusercontent.com/InfernusScripts/Octo-Spy/refs/heads/main/Main.lua")();`,
    },
    14: {
      name: "Unc Checker GUI Version",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/UNChecker_GUI_Version.lua"))();`,
    },
    15: {
      name: "Super Ring Parts V6 Script",
      code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Yuna-ux/Other-scripts/refs/heads/main/Super_Ring_Parts_V6.lua"))();`,
    },
    16: {
      name: "Rael Hub - Brookhaven Script",
      code: `loadstring(game:HttpGet(("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"), true))();`,
    },
  };

  const copyText = (index) => {
    const script = scripts[index];
    navigator.clipboard.writeText(script.code).then(() => {
      setCopyMessage(`Script "${script.name}" copied to clipboard!`);
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
          scripts[key].code ? (
            <button
              key={key}
              className="btn"
              onClick={() => copyText(key)}
            >
              {scripts[key].name}
            </button>
          ) : null
        ))}
      </div>
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default Page;
