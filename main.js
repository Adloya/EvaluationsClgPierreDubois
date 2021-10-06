// Librairies
const Discord = require('discord.js');

// Variables systèmes
const webhook = new Discord.WebhookClient({id: '895337798134009957', token: '4XOx7bRRenoqpGQRn4I1X-TghmATO-n8Ce_s3-NvQAk2QUsd0Gb_Kt16mRAKPorAWuoV'});
const debugWebhook = new Discord.WebhookClient({id: '895344885941559326', token: 'YdE20V--nXMS0jRSOfhtSW-aVJBgZnD3OPVFTjUvPOjeUr2rCCIeDV1wfs-7dOf2z6sC'});

// Variables
let evalSubject = "[Nom de la matière]"
let evalName = "[Nom de l'évaluation]";
let evalDesc = "[Description de l'évaluation]";
let evalKeyPoints = "[Liste des points principaux à réviser]";
let evalDate = "[Date de l'évaluation (JJ/MM/AAAA)"
let evalType = "[Type d'évaluation (DM /DS)]"
let evalDocs = "https://www.example.com/"

// Embeds d'évaluations
const evalT1_Files_embed = new Discord.MessageEmbed()
    .setTitle(`Evaluation en ${evalSubject} : ${evalName}`)
    .setDescription(`${evalDesc}`)
    .addField("**__Date de l'évaluation : __**", evalDate)
    .addField("**__Type d'évaluation : __**", evalType)
    .addField("**__Points principaux à réviser : __**", evalKeyPoints)
    .addField("**__🔗 - Liens supplémentaires : __**", `
        🌐 - [Pronote (Pierre Dubois)](https://0530015d.index-education.net/pronote/eleve.html)
        📁 - [Fichiers Supplémentaires](${evalDocs})
    `)
    .setColor('RED')
    .setFooter("Evaluations Collège Pierre Dubois - " + evalClass + " - Créé par Adloya#1873")
    .setAuthor("Evaluations Collège Pierre Dubois", "https://cdn.discordapp.com/attachments/870383856195371008/895353675139137556/unknown.png")
    // .setThumbnail("")

const evalT1_embed = new Discord.MessageEmbed()
    .setTitle(`Evaluation en ${evalSubject} : ${evalName}`)
    .setDescription(`${evalDesc}`)
    .addField("**__Date de l'évaluation : __**", evalDate)
    .addField("**__Type d'évaluation : __**", evalType)
    .addField("**__Points principaux à réviser : __**", evalKeyPoints)
    .addField("**__🔗 - Fichiers supplémentaires : __**", `
        🌐 - [Pronote (Pierre Dubois)](https://0530015d.index-education.net/pronote/eleve.html)
    `)
    .setColor('RED')
    .setFooter("Evaluations Collège Pierre Dubois - " + evalClass + " - Créé par Adloya#1873")
    .setAuthor("Evaluations Collège Pierre Dubois", "https://cdn.discordapp.com/attachments/870383856195371008/895353675139137556/unknown.png")
// .setThumbnail("")


// Envoi de l'embed
debugWebhook.send({embeds: [evalT1_embed]});