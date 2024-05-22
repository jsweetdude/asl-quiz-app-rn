const defaultWordData = [
  { term: "hello", multiplier: 3, category: "greetings", hint: "" },
  { term: "good morning", multiplier: 3, category: "greetings", hint: "" },
  { term: "good afternoon", multiplier: 3, category: "greetings", hint: "" },
  { term: "good evening", multiplier: 3, category: "greetings", hint: "" },
  { term: "good night", multiplier: 3, category: "greetings", hint: "" },
  { term: "i/me", multiplier: 3, category: "pronouns", hint: "" },
  { term: "you", multiplier: 3, category: "pronouns", hint: "" },
  { term: "he/she/it", multiplier: 3, category: "pronouns", hint: "" },
  { term: "they/them", multiplier: 3, category: "pronouns", hint: "" },
  { term: "we/us", multiplier: 3, category: "pronouns", hint: "" },
  { term: "my/mine", multiplier: 3, category: "pronouns", hint: "" },
  { term: "his/hers/its", multiplier: 3, category: "pronouns", hint: "" },
  { term: "theirs", multiplier: 3, category: "pronouns", hint: "" },
  { term: "our/ours", multiplier: 3, category: "pronouns", hint: "" },
  { term: "two-of-us/them", multiplier: 3, category: "pronouns", hint: "" },
  { term: "three-of-us/them", multiplier: 3, category: "pronouns", hint: "" },
  { term: "four-of-us/them", multiplier: 3, category: "pronouns", hint: "" },
  { term: "five-of-us/them", multiplier: 3, category: "pronouns", hint: "" },
  { term: "who", multiplier: 3, category: "questions", hint: "" },
  { term: "what", multiplier: 3, category: "questions", hint: "" },
  { term: "where", multiplier: 3, category: "questions", hint: "" },
  { term: "when", multiplier: 3, category: "questions", hint: "" },
  { term: "which", multiplier: 3, category: "questions", hint: "" },
  { term: "why", multiplier: 3, category: "questions", hint: "" },
  { term: "how", multiplier: 3, category: "questions", hint: "" },
  { term: "how many", multiplier: 3, category: "questions", hint: "" },
  { term: "how-many", multiplier: 3, category: "questions", hint: "" },
  { term: "yes", multiplier: 3, category: "questions", hint: "" },
  { term: "no", multiplier: 3, category: "questions", hint: "" },
  { term: "understand", multiplier: 3, category: "verbs", hint: "" },
  { term: "don't understand", multiplier: 3, category: "verbs", hint: "" },
  { term: "like", multiplier: 3, category: "verbs", hint: "" },
  { term: "don't like", multiplier: 3, category: "verbs", hint: "" },
  { term: "want", multiplier: 3, category: "verbs", hint: "" },
  { term: "don't want", multiplier: 3, category: "verbs", hint: "" },
  { term: "can", multiplier: 3, category: "verbs", hint: "" },
  { term: "can't", multiplier: 3, category: "verbs", hint: "" },
  { term: "know", multiplier: 3, category: "verbs", hint: "" },
  { term: "don't know", multiplier: 3, category: "verbs", hint: "" },
  { term: "have-to (once af-fo)", multiplier: 3, category: "verbs", hint: "" },
  { term: "must (once lip press)", multiplier: 3, category: "verbs", hint: "" },
  { term: "should (repeat, oo)", multiplier: 3, category: "verbs", hint: "" },
  { term: "need (repeat, eee)", multiplier: 3, category: "verbs", hint: "" },
  { term: "family", multiplier: 3, category: "family", hint: "" },
  { term: "grandfather", multiplier: 3, category: "family", hint: "" },
  { term: "grandmother", multiplier: 3, category: "family", hint: "" },
  { term: "dad", multiplier: 3, category: "family", hint: "" },
  { term: "mom", multiplier: 3, category: "family", hint: "" },
  { term: "son", multiplier: 3, category: "family", hint: "" },
  { term: "daughter", multiplier: 3, category: "family", hint: "" },
  { term: "baby", multiplier: 3, category: "family", hint: "" },
  { term: "dog", multiplier: 3, category: "animals", hint: "" },
  { term: "cat", multiplier: 3, category: "animals", hint: "" },
  { term: "have", multiplier: 3, category: "verbs", hint: "" },
  { term: "none", multiplier: 3, category: "numbers", hint: "" },
  { term: "colors", multiplier: 3, category: "colors", hint: "" },
  { term: "yellow", multiplier: 3, category: "colors", hint: "" },
  { term: "black", multiplier: 3, category: "colors", hint: "" },
  { term: "white", multiplier: 3, category: "colors", hint: "" },
  { term: "blue", multiplier: 3, category: "colors", hint: "" },
  { term: "gray", multiplier: 3, category: "colors", hint: "" },
  { term: "pink", multiplier: 3, category: "colors", hint: "" },
  { term: "purple", multiplier: 3, category: "colors", hint: "" },
  { term: "green", multiplier: 3, category: "colors", hint: "" },
  { term: "brown", multiplier: 3, category: "colors", hint: "" },
  { term: "orange", multiplier: 3, category: "colors", hint: "" },
  { term: "red", multiplier: 3, category: "colors", hint: "" },
  { term: "sunday", multiplier: 3, category: "time", hint: "" },
  { term: "monday", multiplier: 3, category: "time", hint: "" },
  { term: "tuesday", multiplier: 3, category: "time", hint: "" },
  { term: "wednesday", multiplier: 3, category: "time", hint: "" },
  { term: "thursday", multiplier: 3, category: "time", hint: "" },
  { term: "friday", multiplier: 3, category: "time", hint: "" },
  { term: "saturday", multiplier: 3, category: "time", hint: "" },
  {
    term: "every-sunday (all days)",
    multiplier: 3,
    category: "time",
    hint: "",
  },
  {
    term: "calendar (1st-9th twist inward)",
    multiplier: 3,
    category: "time",
    hint: "",
  },
  { term: "day (1 - 9)", multiplier: 3, category: "time", hint: "" },
  { term: "week", multiplier: 3, category: "time", hint: "" },
  { term: "last week", multiplier: 3, category: "time", hint: "" },
  { term: "next week", multiplier: 3, category: "time", hint: "" },
  { term: "every two weeks", multiplier: 3, category: "time", hint: "" },
  { term: "weekend", multiplier: 3, category: "time", hint: "" },
  { term: "every weekend", multiplier: 3, category: "time", hint: "" },
  { term: "month", multiplier: 3, category: "time", hint: "" },
  { term: "last month", multiplier: 3, category: "time", hint: "" },
  { term: "next month", multiplier: 3, category: "time", hint: "" },
  { term: "month (1 - 9)", multiplier: 3, category: "time", hint: "" },
  { term: "this year", multiplier: 3, category: "time", hint: "" },
  { term: "last year", multiplier: 3, category: "time", hint: "" },
  { term: "next year", multiplier: 3, category: "time", hint: "" },
  { term: "year (1 - 5)", multiplier: 3, category: "time", hint: "" },
  { term: "ago", multiplier: 3, category: "time", hint: "" },
  { term: "later", multiplier: 3, category: "time", hint: "" },
  { term: "past", multiplier: 3, category: "time", hint: "" },
  { term: "now", multiplier: 3, category: "time", hint: "" },
  { term: "future", multiplier: 3, category: "time", hint: "" },
  { term: "time", multiplier: 3, category: "time", hint: "" },
  { term: "hour (1 - 9)", multiplier: 3, category: "time", hint: "" },
  { term: "minute (1 - 9)", multiplier: 3, category: "time", hint: "" },
  { term: "time (1 - 9)", multiplier: 3, category: "time", hint: "" },
  { term: "opinions", multiplier: 3, category: "opinions", hint: "" },
  { term: "good", multiplier: 3, category: "opinions", hint: "" },
  { term: "bad", multiplier: 3, category: "opinions", hint: "" },
  {
    term: "champ (deaf slap for “top or best”)",
    multiplier: 3,
    category: "fun words",
    hint: "",
  },
  { term: "kissfist (love)", multiplier: 3, category: "opinions", hint: "" },
  {
    term: "love/like it (not in a romantic way)",
    multiplier: 3,
    category: "opinions",
    hint: "",
  },
  { term: "fun", multiplier: 3, category: "opinions", hint: "" },
  { term: "like", multiplier: 3, category: "opinions", hint: "" },
  { term: "don't like", multiplier: 3, category: "opinions", hint: "" },
  { term: "enjoy", multiplier: 3, category: "opinions", hint: "" },
  { term: "ok-ok", multiplier: 3, category: "opinions", hint: "" },
  { term: "so-so", multiplier: 3, category: "opinions", hint: "" },
  { term: "boring", multiplier: 3, category: "opinions", hint: "" },
  { term: "detest/hate", multiplier: 3, category: "opinions", hint: "" },
  { term: "tough", multiplier: 3, category: "adjectives", hint: "" },
  { term: "confident", multiplier: 3, category: "adjectives", hint: "" },
  { term: "nervous", multiplier: 3, category: "adjectives", hint: "" },
  {
    term: "chicken (teasing)",
    multiplier: 3,
    category: "adjectives",
    hint: "",
  },
  { term: "sports", multiplier: 3, category: "sports", hint: "" },
  { term: "basketball", multiplier: 3, category: "sports", hint: "" },
  { term: "football", multiplier: 3, category: "sports", hint: "" },
  { term: "baseball", multiplier: 3, category: "sports", hint: "" },
  { term: "game", multiplier: 3, category: "sports", hint: "" },
  { term: "golf", multiplier: 3, category: "sports", hint: "" },
  { term: "hockey", multiplier: 3, category: "sports", hint: "" },
  { term: "soccer", multiplier: 3, category: "sports", hint: "" },
  { term: "volleyball", multiplier: 3, category: "sports", hint: "" },
  { term: "tennis", multiplier: 3, category: "sports", hint: "" },
  { term: "swimming", multiplier: 3, category: "sports", hint: "" },
  { term: "track and field", multiplier: 3, category: "sports", hint: "" },
  { term: "team", multiplier: 3, category: "sports", hint: "" },
  { term: "player", multiplier: 3, category: "sports", hint: "" },
  { term: "athlete", multiplier: 3, category: "sports", hint: "" },
  {
    term: "olympic - summer/winter",
    multiplier: 3,
    category: "sports",
    hint: "",
  },
  {
    term: "special olympics (2x)",
    multiplier: 3,
    category: "sports",
    hint: "",
  },
  { term: "deaf-olympics", multiplier: 3, category: "sports", hint: "" },
  { term: "coach", multiplier: 3, category: "sports", hint: "" },
  { term: "assistant coach", multiplier: 3, category: "sports", hint: "" },
  { term: "tired", multiplier: 3, category: "adjectives", hint: "" },
  {
    term: "worn-out/exhausted",
    multiplier: 3,
    category: "adjectives",
    hint: "",
  },
  { term: "rest", multiplier: 3, category: "verbs", hint: "" },
  { term: "win", multiplier: 3, category: "sports", hint: "" },
  { term: "lose", multiplier: 3, category: "sports", hint: "" },
  {
    term: "wear/use（two ways）",
    multiplier: 3,
    category: "clothing",
    hint: "",
  },
  { term: "shirt", multiplier: 3, category: "clothing", hint: "" },
  { term: "t-shirt", multiplier: 3, category: "clothing", hint: "" },
  { term: "bowtie", multiplier: 3, category: "clothing", hint: "" },
  { term: "long-sleeves", multiplier: 3, category: "clothing", hint: "" },
  { term: "short-sleeves", multiplier: 3, category: "clothing", hint: "" },
  { term: "buttons", multiplier: 3, category: "clothing", hint: "" },
  { term: "pants", multiplier: 3, category: "clothing", hint: "" },
  { term: "belt", multiplier: 3, category: "clothing", hint: "" },
  { term: "shorts", multiplier: 3, category: "clothing", hint: "" },
  { term: "heels", multiplier: 3, category: "clothing", hint: "" },
  { term: "gym shorts", multiplier: 3, category: "clothing", hint: "" },
  { term: "tank top", multiplier: 3, category: "clothing", hint: "" },
  {
    term: "leggings (fingerspell)",
    multiplier: 3,
    category: "clothing",
    hint: "",
  },
  { term: "dress", multiplier: 3, category: "clothing", hint: "" },
  { term: "skirt (expands)", multiplier: 3, category: "clothing", hint: "" },
  { term: "sweater", multiplier: 3, category: "clothing", hint: "" },
  { term: "hoodie", multiplier: 3, category: "clothing", hint: "" },
  { term: "suit", multiplier: 3, category: "clothing", hint: "" },
  { term: "tie", multiplier: 3, category: "clothing", hint: "" },
  { term: "vest", multiplier: 3, category: "clothing", hint: "" },
  { term: "sneakers (gym)", multiplier: 3, category: "clothing", hint: "" },
  { term: "flip flop", multiplier: 3, category: "clothing", hint: "" },
  { term: "socks", multiplier: 3, category: "clothing", hint: "" },
  { term: "jacket/coat", multiplier: 3, category: "clothing", hint: "" },
  { term: "scarf", multiplier: 3, category: "clothing", hint: "" },
  { term: "gloves", multiplier: 3, category: "clothing", hint: "" },
  { term: "winter-hat", multiplier: 3, category: "clothing", hint: "" },
  { term: "hat", multiplier: 3, category: "clothing", hint: "" },
  { term: "cap (flip cap on)", multiplier: 3, category: "clothing", hint: "" },
  { term: "umbrella", multiplier: 3, category: "clothing", hint: "" },
  { term: "raincoat", multiplier: 3, category: "clothing", hint: "" },
  {
    term: "bathing suit (swim +wear)",
    multiplier: 3,
    category: "clothing",
    hint: "",
  },
  { term: "swim shorts", multiplier: 3, category: "clothing", hint: "" },
  { term: "pajamas (pj)", multiplier: 3, category: "clothing", hint: "" },
  { term: "slippers", multiplier: 3, category: "clothing", hint: "" },
  {
    term: "glasses, sunglasses",
    multiplier: 3,
    category: "clothing",
    hint: "",
  },
  {
    term: "size: xs, s, m, l, xl (shiver letters)",
    multiplier: 3,
    category: "clothing",
    hint: "",
  },
  { term: "new", multiplier: 3, category: "adjectives", hint: "" },
  { term: "old", multiplier: 3, category: "adjectives", hint: "" },
  { term: "clean", multiplier: 3, category: "adjectives", hint: "" },
  { term: "dirty", multiplier: 3, category: "adjectives", hint: "" },
  { term: "shop/ buy", multiplier: 3, category: "verbs", hint: "" },
  { term: "cotton", multiplier: 3, category: "clothing", hint: "" },
  { term: "denim (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "linen (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "silk (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "leather (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "suede (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "polo (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "velvet (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "wool (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "polyester (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "bra (fs)", multiplier: 3, category: "clothing", hint: "" },
  { term: "0", multiplier: 3, category: "numbers", hint: "" },
  { term: "1", multiplier: 3, category: "numbers", hint: "" },
  { term: "2", multiplier: 3, category: "numbers", hint: "" },
  { term: "3", multiplier: 3, category: "numbers", hint: "" },
  { term: "4", multiplier: 3, category: "numbers", hint: "" },
  { term: "5", multiplier: 3, category: "numbers", hint: "" },
  { term: "6", multiplier: 3, category: "numbers", hint: "" },
  { term: "7", multiplier: 3, category: "numbers", hint: "" },
  { term: "8", multiplier: 3, category: "numbers", hint: "" },
  { term: "9", multiplier: 3, category: "numbers", hint: "" },
  { term: "10", multiplier: 3, category: "numbers", hint: "" },
  { term: "11", multiplier: 3, category: "numbers", hint: "" },
  { term: "12", multiplier: 3, category: "numbers", hint: "" },
  { term: "13", multiplier: 3, category: "numbers", hint: "" },
  { term: "14", multiplier: 3, category: "numbers", hint: "" },
  { term: "15", multiplier: 3, category: "numbers", hint: "" },
  { term: "16", multiplier: 3, category: "numbers", hint: "" },
  { term: "17", multiplier: 3, category: "numbers", hint: "" },
  { term: "18", multiplier: 3, category: "numbers", hint: "" },
  { term: "19", multiplier: 3, category: "numbers", hint: "" },
  { term: "20", multiplier: 3, category: "numbers", hint: "" },
  { term: "21", multiplier: 3, category: "numbers", hint: "" },
  { term: "22", multiplier: 3, category: "numbers", hint: "" },
  { term: "23", multiplier: 3, category: "numbers", hint: "" },
  { term: "24", multiplier: 3, category: "numbers", hint: "" },
  { term: "25", multiplier: 3, category: "numbers", hint: "" },
  { term: "26", multiplier: 3, category: "numbers", hint: "" },
  { term: "27", multiplier: 3, category: "numbers", hint: "" },
  { term: "28", multiplier: 3, category: "numbers", hint: "" },
  { term: "29", multiplier: 3, category: "numbers", hint: "" },
  { term: "30", multiplier: 3, category: "numbers", hint: "" },
  { term: "shovel", multiplier: 3, category: "tools", hint: "" },
  { term: "snowplow", multiplier: 3, category: "tools", hint: "" },
  { term: "fall", multiplier: 3, category: "weather", hint: "" },
  { term: "leaves", multiplier: 3, category: "nature", hint: "" },
  { term: "rake", multiplier: 3, category: "tools", hint: "" },
  { term: "plant", multiplier: 3, category: "nature", hint: "" },
  { term: "to plant", multiplier: 3, category: "nature", hint: "" },
  { term: "grow", multiplier: 3, category: "nature", hint: "" },
  { term: "seed", multiplier: 3, category: "nature", hint: "" },
  { term: "inside", multiplier: 3, category: "location", hint: "" },
  { term: "outside", multiplier: 3, category: "location", hint: "" },
  { term: "fast", multiplier: 3, category: "movement", hint: "" },
  { term: "strange", multiplier: 3, category: "adjectives", hint: "" },
  { term: "odd", multiplier: 3, category: "adjectives", hint: "" },
  { term: "weird", multiplier: 3, category: "adjectives", hint: "" },
  { term: "warning", multiplier: 3, category: "safety", hint: "" },
  { term: "careful", multiplier: 3, category: "safety", hint: "" },
  { term: "always", multiplier: 3, category: "adverbs", hint: "" },
  { term: "often", multiplier: 3, category: "adverbs", hint: "" },
  { term: "sometimes", multiplier: 3, category: "adverbs", hint: "" },
  { term: "never", multiplier: 3, category: "adverbs", hint: "" },
  { term: "weather", multiplier: 3, category: "weather", hint: "" },
  { term: "forecast", multiplier: 3, category: "weather", hint: "" },
  { term: "look like", multiplier: 3, category: "appearance", hint: "" },
  { term: "sun", multiplier: 3, category: "nature", hint: "" },
  { term: "moon", multiplier: 3, category: "nature", hint: "" },
  { term: "rain", multiplier: 3, category: "weather", hint: "" },
  { term: "heavy rain", multiplier: 3, category: "weather", hint: "" },
  { term: "snow", multiplier: 3, category: "weather", hint: "" },
  { term: "heavy snow", multiplier: 3, category: "weather", hint: "" },
  { term: "windy", multiplier: 3, category: "weather", hint: "" },
  { term: "very windy", multiplier: 3, category: "weather", hint: "" },
  { term: "cloudy", multiplier: 3, category: "weather", hint: "" },
  { term: "lighting", multiplier: 3, category: "weather", hint: "" },
  { term: "thunder", multiplier: 3, category: "weather", hint: "" },
  { term: "tornado", multiplier: 3, category: "weather", hint: "" },
  { term: "hurricane", multiplier: 3, category: "weather", hint: "" },
  { term: "flood", multiplier: 3, category: "weather", hint: "" },
  { term: "earthquake", multiplier: 3, category: "weather", hint: "" },
  { term: "earth", multiplier: 3, category: "nature", hint: "" },
  { term: "ice", multiplier: 3, category: "weather", hint: "" },
  { term: "icy", multiplier: 3, category: "weather", hint: "" },
  { term: "freeze", multiplier: 3, category: "weather", hint: "" },
  { term: "fall down", multiplier: 3, category: "movement", hint: "" },
  { term: "hail", multiplier: 3, category: "weather", hint: "" },
  { term: "fire", multiplier: 3, category: "nature", hint: "" },
  { term: "rainbow", multiplier: 3, category: "weather", hint: "" },
  { term: "dark", multiplier: 3, category: "appearance", hint: "" },
  { term: "bright", multiplier: 3, category: "appearance", hint: "" },
  { term: "light", multiplier: 3, category: "appearance", hint: "" },
  { term: "seasons", multiplier: 3, category: "weather", hint: "" },
  { term: "spring", multiplier: 3, category: "weather", hint: "" },
  { term: "summer", multiplier: 3, category: "weather", hint: "" },
  { term: "autumn", multiplier: 3, category: "weather", hint: "" },
  { term: "winter", multiplier: 3, category: "weather", hint: "" },
  { term: "temperature", multiplier: 3, category: "weather", hint: "" },
  { term: "rising", multiplier: 3, category: "movement", hint: "" },
  { term: "falling", multiplier: 3, category: "movement", hint: "" },
  { term: "hot", multiplier: 3, category: "weather", hint: "" },
  { term: "cold", multiplier: 3, category: "weather", hint: "" },
  { term: "warm", multiplier: 3, category: "weather", hint: "" },
  { term: "cool", multiplier: 3, category: "weather", hint: "" },
  { term: "drought", multiplier: 3, category: "weather", hint: "" },
  { term: "dry", multiplier: 3, category: "weather", hint: "" },
  { term: "wet", multiplier: 3, category: "weather", hint: "" },
  { term: "humid", multiplier: 3, category: "weather", hint: "" },
  { term: "mountain", multiplier: 3, category: "nature", hint: "" },
  { term: "beach", multiplier: 3, category: "nature", hint: "" },
  { term: "island", multiplier: 3, category: "nature", hint: "" },
  { term: "desert", multiplier: 3, category: "nature", hint: "" },
];

export default defaultWordData;
