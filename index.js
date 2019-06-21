const Discord = require('discord.js'),
    { Client } = require('discord.js'),
    { translate } = require("google-translate-api-browser"),
    config = require('./config.json'),
    token = config.token,
    prefix = config.prefix,
    client = new Client();

client.on('ready', () => {
    console.log('Running!');
});

client.on('message', message => {
    var args = message.content.slice(prefix.length).trim().split(' ');
    var cmd = args.shift().toLowerCase();
    switch (cmd) {
        case 'help':
            message.reply("[Help] Commands Avaiable: ``translate [help], langs [help], help``");
            break;
        case 'translate':
            if (!args[0] || args[0] == 'help') return message.reply('[Help] Usage: **' + prefix + 'translate [LanguageToGo] [Sentence]**')
            let to = 'en';
            let toL = 'English';
            let sentence = message.content.split(" ").slice(prefix.length).join(" ");
            for (i = 0; i < Object.keys(langs).length; i++) {
                if (Object.keys(langs)[i] == args[0]) {
                    to = args[0];
                    toL = langs[Object.keys(langs)[i]];
                    sentence = message.content.split(" ").slice(prefix.length + 1).join(" ");
                }
            }
            translate(sentence, {
                to: to
            }).then(res => {
                //res.from.language.iso
                from = langs[res.from.language.iso];
                const embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setAuthor('EMF - Translator Bot', 'https://cdn.discordapp.com/avatars/391670479003451392/4f2f66ceaff4736662d3b94e6c70743a.jpg?size=2048')
                    .setDescription('This is a bot to translate, because zeedy is dumb and dont know properly english')
                    .setThumbnail('https://images-na.ssl-images-amazon.com/images/I/41Jq18y8bKL._SY355_.png')
                    .addField('» You can\'t flex on EMF', '» Original Text: **' + sentence + '**\n\n» From: **' + from + '**\n» To: **' + toL + '**\n» Result - **' + res.text + '**', false)
                    .setTimestamp()
                    .setFooter('Coded by Zeedy', 'https://cdn.discordapp.com/avatars/391670479003451392/4f2f66ceaff4736662d3b94e6c70743a.jpg?size=2048');

                message.channel.send(embed);
            }).catch(err => {
                throw err;
            });
            break;
        case 'langs':
            if (args[0] == 'help') return message.reply('[Help] Usage: **' + prefix + 'langs [Page]**')
            let page = 1;
            if (!isNaN(args[0])) return message.reply('the page should be a number!');
            if (args[0]) page = args[0];
            let mathF = Math.floor(Object.keys(langs).length / 10)
            let mathC = Math.ceil(Object.keys(langs).length / 10);
            let total = Object.keys(langs).length;
            let list = [];
            if (args[0] >= mathC) args[0] = mathC;
            for (i = (mathF * page) - 10; i < (mathF * page); i++) {
                if (Object.keys(langs)[i]) list.push("\n[" + (i + 1) + "] » " + langs[Object.keys(langs)[i]] + ' - ' + Object.keys(langs)[i]);
            }
            var footer = ("Page: " + page + "/" + mathC + " > Languages: " + total)
            let msg = ("```js\n" + "Position | Name\n\n" + list + "\n\n" + footer + "```");
            message.channel.send(msg);
            break;
    }
})


client.login(token);

// languages

var langs = {
    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};