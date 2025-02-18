export class TeamData {
    constructor(
        public city: string,
        public name: string,
        public wikipediaLogoUrl: string,
    ) {}
}

export const teamStringTodataMap: { [key: string]: TeamData } = {
    "LAD": {
        city: "Los Angeles",
        name: "Dodgers",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Los_Angeles_Dodgers_Logo.svg"
    },
    "CIN": {
        city: "Cincinnati",
        name: "Reds",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Cincinnati_Reds_Logo.svg"
    },
    "TOR": {
        city: "Toronto",
        name: "Blue Jays",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Toronto_Blue_Jay_Primary_Logo.svg"
    },
    "PIT": {
        city: "Pittsburgh",
        name: "Pirates",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/81/Pittsburgh_Pirates_logo_2014.svg"
    },
    "KC": {
        city: "Kansas City",
        name: "Royals",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Kansas_City_Royals_Primary_Logo.svg"
    },
    "NL": {
        city: "National League",
        name: "All Stars",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/MLB_National_League_logo.svg"
    },
    "CHC": {
        city: "Chicago",
        name: "Cubs",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Chicago_Cubs_logo.svg"
    },
    "CLE": {
        city: "Cleveland",
        name: "Guardians",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/Guardians_winged_%22G%22.svg"
    },
    "TB": {
        city: "Tampa Bay",
        name: "Rays",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Tampa_Bay_Rays_Logo.svg"
    },
    "PHI": {
        city: "Philadelphia",
        name: "Phillies",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f0/Philadelphia_Phillies_%282019%29_logo.svg"
    },
    "SEA": {
        city: "Seattle",
        name: "Mariners",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Seattle_Mariners_logo_%28low_res%29.svg"
    },
    "ARI": {
        city: "Arizona",
        name: "Diamondbacks",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Arizona_Diamondbacks_logo_teal.svg"
    },
    "SF": {
        city: "San Francisco",
        name: "Giants",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/58/San_Francisco_Giants_Logo.svg"
    },
    "CHW": {
        city: "Chicago",
        name: "White Sox",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Chicago_White_Sox.svg"
    },
    "DET": {
        city: "Detroit",
        name: "Tigers",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Detroit_Tigers_logo.svg"
    },
    "NYM": {
        city: "New York",
        name: "Mets",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7b/New_York_Mets.svg"
    },
    "BAL": {
        city: "Baltimore",
        name: "Orioles",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Baltimore_Orioles_Script.svg"
    },
    "MIN": {
        city: "Minnesota",
        name: "Twins",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Minnesota_Twins_wordmark_logo_%282023_rebrand%29.svg"
    },
    "LAA": {
        city: "Los Angeles",
        name: "Angels",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Los_Angeles_Angels_curved_wordmark.svg"
    },
    "MIA": {
        city: "Miami",
        name: "Marlins",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Marlins_team_logo.svg/800px-Marlins_team_logo.svg.png"
    },
    "COL": {
        city: "Colorado",
        name: "Rockies",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c0/Colorado_Rockies_full_logo.svg"
    },
    "ATH": {
        city: "Sacramento",
        name: "Athletics",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Athletics_logo.svg"
    },
    "BOS": {
        city: "Boston",
        name: "Red Sox",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg"
    },
    "ATL": {
        city: "Atlanta",
        name: "Braves",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f2/Atlanta_Braves.svg"
    },
    "AL": {
        city: "American League",
        name: "All Stars",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/54/American_League_logo.svg"
    },
    "TEX": {
        city: "Texas",
        name: "Rangers",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/4/41/Texas_Rangers.svg"
    },
    "NYY": {
        city: "New York",
        name: "Yankees",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/New_York_Yankees_Primary_Logo.svg"
    },
    "HOU": {
        city: "Houston",
        name: "Astros",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Houston-Astros-Logo.svg"
    },
    "STL": {
        city: "St. Louis",
        name: "Cardinals",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/9/9d/St._Louis_Cardinals_logo.svg"
    },
    "MIL": {
        city: "Milwaukee",
        name: "Brewers",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b8/Milwaukee_Brewers_logo.svg"
    },
    "SD": {
        city: "San Diego",
        name: "Padres",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/SD_Logo_Brown.svg"
    },
    "WSH": {
        city: "Washington",
        name: "Nationals",
        wikipediaLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Washington_Nationals_logo.svg"
    }
};