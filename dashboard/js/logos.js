const espnCodeOverrides = { WAS: "wsh"};

function getLogoUrl(team) {
    const code = (espnCodeOverrides[team] || team).toLowerCase();
    return `https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png`;
}