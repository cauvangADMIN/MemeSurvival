/**
 * Game Characters Configuration
 * This file stores character information for the game
 */

// Define the available characters with their properties
const gameCharacters = {
  // Character 1
  ganyu: {
    name: "Ganyu",
    description: "The secretary auuuuuuuuuuuuuud of the qilin, an illuminated beast, flows within her veins.",
    skill: "Frostflake Arrow - Deals Cryo DMG to dddddddd enemies upon bloom.",
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 2
  raiden: {
    name: "Raiden Shogun",
    description: "The Electro Archon of Inazuma. Embodies eternity and wields the Musou Isshin.",
    skill: "Secret Art: Musou Shinsetsu - Slashes with Electro-infused blade.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 3
  hutao: {
    name: "Hu Tao",
    description: "The 77th Director of the Wangsheng Funeral Parlor. Cheerful yet mysterious.",
    skill: "Guide to Afterlife - Converts HP into Pyro ATK bonus.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 4
  keqing: {
    name: "Keqing",
    description: "The Yuheng of the Liyue Qixing, a decisive and lightning-fast swordswoman.",
    skill: "Starward Sword - Teleports and deals Electro DMG in area.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 5
  ayaka: {
    name: "Kamisato Ayaka",
    description: "The elegant daughter of the Kamisato Clan, known for her graceful swordsmanship.",
    skill: "Kamisato Art: Soumetsu - Creates a snowstorm that continuously deals Cryo DMG.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 6
  yoimiya: {
    name: "Yoimiya",
    description: "Owner of Naganohara Fireworks, the Queen of the Summer Festival.",
    skill: "Niwabi Fire-Dance - Converts normal attacks to Pyro-infused arrows.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 7
  nahida: {
    name: "Nahida",
    description: "The Dendro Archon of Sumeru, the God of Wisdom in a small body.",
    skill: "All Schemes to Know - Releases karmic bonds to deal Dendro DMG.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  },
  // Character 8
  wanderer: {
    name: "Wanderer",
    description: "A mysterious man with a troubled past who roams the skies freely.",
    skill: "Hanega: Song of the Wind - Allows him to hover and deal Anemo DMG.",
    comingSoon: true,
    images: {
      run1: "assets/images/character-run-1.webp",
      run2: "assets/images/character-run-2.webp"
    }
  }
};

// Function to save the selected character to localStorage
function saveSelectedCharacter(characterId) {
  if (gameCharacters[characterId]) {
    localStorage.setItem('selectedCharacter', characterId);
    return true;
  }
  return false;
}

// Function to get the selected character from localStorage
function getSelectedCharacter() {
  const characterId = localStorage.getItem('selectedCharacter');
  return gameCharacters[characterId] || gameCharacters.ganyu; // Default to ganyu if none selected
}

// Export functions and data for use in other files
window.GameCharacters = {
  characters: gameCharacters,
  saveSelected: saveSelectedCharacter,
  getSelected: getSelectedCharacter
};