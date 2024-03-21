const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const data = require('./data.json');
const levenshtein = require('fast-levenshtein');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const fuzzyScore = (str1, str2) => {
  // Convert to lowercase
  const str1Lower = str1.toLowerCase();
  const str2Lower = str2.toLowerCase();

  // remove all non-alphanumeric characters
  str1Lower.replace(/[^a-z0-9]/g, '');
  str2Lower.replace(/[^a-z0-9]/g, '');


  // Calculate Levenshtein distance
  return levenshtein.get(str1Lower, str2Lower);
}
  

const fuzzyMatch = (str1, str2) => {
  // Calculate the fuzzy score
  const score = fuzzyScore(str1, str2);

  // Return true if the score is less than or equal to 3
  return score <= 3;
};

const leastFuzziestMatch = (str, arr) => {
  // Sort the array based on the Levenshtein distance
  const sorted = arr.sort((a, b) => fuzzyScore(str, a) - fuzzyScore(str, b));

  // Return the first element in the sorted array
  return sorted[0];
}

const pattern = /{{(.+?)}}/g;

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (pattern.test(message.content)) {
    // get each match from regex
    const matches = message.content.match(pattern);

    console.log(matches);

    // extract the card name from each match
    const cardNames = matches.map(match => match.replace(/{{|}}/g, ''));

    console.log(cardNames);

    const prefixesToTrim = [
      'deck',
      'card',
      'tag',
      'pack'
    ]

    // Look through each cardNames, and check if it exists in the data.json file
    const foundCards = cardNames
      .map(card => prefixesToTrim.reduce((acc, prefix) => acc.replace(prefix, ''), card))
      .filter(card => data.find(d => fuzzyMatch(d.Name, card)))
      .slice(0, 5)
      .map(card => data.find(d => leastFuzziestMatch(card, data.map(d => d.Name)) === d.Name));

    if (foundCards.length === 0) {
      message.reply('Sorry, I couldn\'t find anything that matches your query.');
      return;
    }

    for(const card of foundCards) {
      if (card.Type === 'Joker') {
        message.reply(`${card.Name}: ${card.Effect}\nCost: ${card.Cost}\nRarity: ${card.Rarity}\n${card.Appearance} `);
      } else if (card.Type === 'Planet' || card.Type === 'Tarot' || card.Type === 'Voucher' || card.Type === 'Spectral' || card.Type === 'Tag' || card.Type === 'Pack') {
        message.reply(`${card.Name}: ${card.Effect}\n${card.Appearance} `);
      } else if (card.Type === 'Deck') {
        message.reply(`${card.Name}: ${card.Effect}\nUnlock Condition: ${card.Unlock}\n${card.Appearance} `);
      }
    }
  }
})

client.login(token);
