const { Client, Collection } = require('discord.js');
const fs = require('fs');
const help = require('./commands/Utility/help');
const { token } = require('./config');
const keepAlive = require('./server');
keepAlive();

const client = new Client({
	partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER']
});
client.commands = new Collection();

client.help = {};
client.adminHelp = {};

const importAllFiles = (dir, dirName) => {
	fs.readdir(dir, (err, files) => {
		if (err) {
			console.log(err);
			return;
		}
		files.forEach(file => {
			if (file.endsWith('.js')) {
				const props = require(`${dir}${file}`);
				console.log(`Successfully loaded ${props.name}`);
				if (dirName !== 'Owner') {
					if (!props.admin) {
						if (!client.help[dirName]) client.help[dirName] = [];
						client.help[dirName].push(props.name);
					}
					if (!client.adminHelp[dirName]) client.adminHelp[dirName] = [];
					client.adminHelp[dirName].push(props.name);
				}

				client.commands.set(props.name, props);
				props.aliases.forEach(alias => {
					client.commands.set(alias, props);
				});
			} else if (fs.lstatSync(`${dir}${file}/`).isDirectory()) {
				importAllFiles(`${dir}${file}/`, file);
			}
		});
	});
};

importAllFiles('./commands/', 'commands');

fs.readdir('./events/', (err, files) => {
	if (err) {
		console.error();
		return;
	}
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const evt = require(`./events/${file}`);
		const evtName = file.split('.')[0];
		console.log(`Event: ${evtName} loaded!`);
		client.on(evtName, (...args) => evt(client, ...args));
	});
});

client.login(token);