// Librairies
const Discord = require('discord.js')
const fs = require('fs')
const express = require('express')
const { check, validationResult } = require('express-validator')

// Variables systèmes
const webhook = new Discord.WebhookClient({ id: 'ID', token: 'TOKEN' })
const debugWebhook = new Discord.WebhookClient({ id: 'ID', token: 'TOKEN' })
const evaluations = require('./json/evaluations.json')
const configuration = require('./json/config.json')
const webapp = express()
const evaluationSubjects = {
    fr: {
        name = 'Français',
        img = imgHost('france', 64)
    },
    art: {
        name = 'Arts Plastiques',
        img = imgHost('art', 64)
    },
    svt: {
        name = 'Sciences de la Vie et de la Terre',
        img = imgHost('biology', 64)
    },
    chim: {
        name = 'Chimie',
        img = imgHost('chemistry', 47)
    },
    lce: {
        name = 'Langues et Cultures Européennes',
        img = imgHost("drapeau-de-l'europe", 48)
    },
    geo: {
        name = 'Géographie',
        img = imgHost('geography', 64)
    },
    ger: {
        name = 'Allemand',
        img = imgHost('germany', 64)
    },
    hist: {
        name = 'Histoire',
        img = imgHost('history', 64)
    },
    maths: {
        name = 'Mathématiques',
        img = imgHost('maths', 64)
    },
    music: {
        name = 'Education Musicale',
        img = imgHost('music', 64)
    },
    techno: {
        name = 'Technologie',
        img = imgHost('ordinateur', 48)
    },
    phy: {
        name = 'Physique',
        img = imgHost('physique', 48)
    },
    es: {
        name = 'Espagnol',
        img = imgHost('spain', 64)
    },
    eng: {
        name = 'Anglais',
        img = imgHost('uk-flag', 64)
    },
    emc: {
        name = 'Education Morale et Civique',
        img = imgHost('morale', 48)
    },
}


webapp.set('views', './views')
webapp.set('view engine', 'ejs')
webapp.use(express.urlencoded({ extended: false }))

/**
 * Enregistre les évaluations au format JSON.
 */
function SaveEvals() {
    fs.writeFile(
        './json/evaluations.json',
        JSON.stringify(evaluations, null, 4),
        (err) => {
            if (err) {
                console.log(`❌ | Erreur : ${err}`)
            }
        }
    )
}

/**
 * Création de l'URL de l'image de la matière de l'évaluation.
 * @param {string} type Matière de l'évaluation
 * @param {number} size Taille de l'image
 * @returns string
 */
function imgHost(type, size) {
    return `https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-${type}-${size}.png`
}

// Initialisation Pages EJS
webapp.get('/', (req, res) => {
    res.render('home')
})

webapp.post('/register', (req, res) => {
    let evaluation = {
        who: "[Qui l'a signalé]",
        evalSubject: '[Nom de la matière]',
        evalName: "[Nom de l'évaluation]",
        evalDesc: "[Description de l'évaluation]",
        evalKeyPoints: '[Liste des points principaux à réviser]',
        evalDate: "[Date de l'évaluation (JJ/MM/AAAA)",
        evalType: "[Type d'évaluation (DM /DS)]",
        evalDocs: 'https://www.example.com/',
        evalImg:
            'https://tabagisme.unisante.ch/wp-content/uploads/2019/09/test.jpg',
    }

    res.json(req.body)

    evaluation = {
        evalDate,
        who,
        evalName,
        evalDesc,
        evalKeyPoints,
        evalType,
        evalDocs,
        evalSubject,
    } = req.body

    // Détermine quelle matière est concernée
    const {name, img} = evaluationSubjects[evaluation.evalSubject]

    const parentEmbed = new Discord.MessageEmbed()
        .setTitle(`Evaluation en __${evalSubject}__ : ${name}`)
        .setDescription(evalDesc)
        .addField("**__🗓️ - Date de l'évaluation : __**", evalDate)
        .addField("**__📜 - Type d'évaluation : __**", evalType)
        .addField('**__✅ - Points principaux à réviser : __**', evalKeyPoints)
        .addField(
            '**__🔗 - Liens supplémentaires : __**',
            `
    🌐 - [Pronote (Pierre Dubois)](https://0530015d.index-education.net/pronote/eleve.html)
    📁 - [Fichiers Supplémentaires](${evalDocs})
    `
        )
        .setColor('RED')
        .setFooter('Evaluations Collège Pierre Dubois - Créé par Adloya#1873')
        .setAuthor(
            'Evaluations Collège Pierre Dubois',
            'https://cdn.discordapp.com/attachments/870383856195371008/895353675139137556/unknown.png'
        )
        .setThumbnail(img)

    webhook.send({ embeds: [parentEmbed] })
})

// Démarrer les pages web
webapp.listen(configuration.port, () =>
    console.info(
        `ℹ️ - Application web : [LISTENING] on port ${configuration.port}`
    )
)
