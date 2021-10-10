// Librairies
const Discord = require('discord.js');
const fs = require('fs')
const express = require("express")
const bodyParser = require("body-parser")
const { check, validationResult } = require("express-validator")

// Variables systèmes
const webhook = new Discord.WebhookClient({id: 'ID', token: 'TOKEN'});
const debugWebhook = new Discord.WebhookClient({id: 'ID', token: 'TOKEN'});
const configuration = require("./json/config.json")
const webapp = express()

// Configuration EJS
webapp.set('views', './views')
webapp.set('view engine', 'ejs')

// Formulaire
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Initialisation Pages EJS
webapp.get('/', (req, res) => {
    res.render('submit')
})
webapp.post('/submit', urlencodedParser, [
    check("evalClasses", "La section \"Classes Concernées\" doit au moins contenir 2 caractères (pour au moins 1 classe) (ex. \"4B\" / \"4B,4C,4D\")")
        .exists()
        .isLength({min: 2})

], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()

        res.render('submit', {
            alert
        })
    }
    let who = "[Qui l'a signalé]"
    let evalSubject = "[Nom de la matière]"
    let evalName = "[Nom de l'évaluation]";
    let evalDesc = "[Description de l'évaluation]";
    let evalClasses = "[Classes concernées par l'évaluation]"
    let evalKeyPoints = "[Liste des points principaux à réviser]";
    let evalDate = "[Date de l'évaluation (JJ/MM/AAAA)"
    let evalType = "[Type d'évaluation (DM /DS)]"
    let evalDocs = ""
    let evalImg = ""

    if(req.body.evalDate) evalDate = req.body.evalDate
    if(req.body.who) who = req.body.who
    // if() evalSubject = req.body.evalSubject
    if(req.body.evalName) evalName = req.body.evalName
    if(req.body.evalDesc) evalDesc = req.body.evalDesc
    if(req.body.evalKeyPoints) evalKeyPoints = req.body.evalKeyPoints
    if(req.body.evalDocs) evalDocs = req.body.evalDocs
    if(req.body.evalClasses) evalClasses = req.body.evalClasses

    if(req.body.evalType === "DM") evalType = "Devoir Maison"
    if(req.body.evalType === "DS") evalType = "Devoir Surveillé"


    // console.log(evalDocs, evalDate, who, evalName, evalDesc, evalKeyPoints, evalType, evalClasses)


    // Détermine quelle matière est concernée
    if(req.body.evalSubject === "fr"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-france-64.png"
        evalSubject = "Français"
    }
    else if(req.body.evalSubject === "art"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-art-64.png"
        evalSubject = "Arts Plastiques"
    }
    else if(req.body.evalSubject === "svt"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-biology-64.png"
        evalSubject = "Sciences de la Vie et de la Terre"
    }
    else if(req.body.evalSubject === "chim"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-chemistry-47.png"
        evalSubject = "Chimie"
    }
    else if(req.body.evalSubject === "lce"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-drapeau-de-l'europe-48.png"
        evalSubject = "Langues et Cultures Européennes"
    }
    else if(req.body.evalSubject === "geo"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-geography-64.png"
        evalSubject = "Géographie"
    }
    else if(req.body.evalSubject === "ger"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-germany-64.png"
        evalSubject = "Allemand"
    }
    else if(req.body.evalSubject === "hist"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-history-64.png"
        evalSubject = "Histoire"
    }
    else if(req.body.evalSubject === "maths"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-maths-64.png"
        evalSubject = "Mathématiques"
    }
    else if(req.body.evalSubject === "music"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-music-64.png"
        evalSubject = "Education Musicale"
    }
    else if(req.body.evalSubject === "techno"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-ordinateur-48.png"
        evalSubject = "Technologie"
    }
    else if(req.body.evalSubject === "phy"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-physique-48.png"
        evalSubject = "Physique"
    }
    else if(req.body.evalSubject === "es"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-spain-64.png"
        evalSubject = "Espagnol"
    }
    else if(req.body.evalSubject === "eng"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-uk-flag-64.png"
        evalSubject = "Anglais"
    }
    else if(req.body.evalSubject === "emc"){
        evalImg = "https://raw.githubusercontent.com/Adloya/EvaluationsClgPierreDubois/main/src/img/icons8-morale-48.png"
        evalSubject = "Education Morale et Civique"
    }

    // Embeds d'évaluations
    const evalT1_Files_embed = new Discord.MessageEmbed()
        .setTitle(`Evaluation en __${evalSubject}__ : ${evalName}`)
        .setDescription(`${evalDesc}`)
        .addField("**__🗓️ - Date : __**", evalDate, true)
        .addField("**__🎓 - Classes : __**", evalClasses, true)
        .addField("**__📜 - Type : __**", evalType, true)
        .addField("**__✅ - Points à réviser : __**", evalKeyPoints, false)
        .addField("**__🔗 - Liens supplémentaires : __**", `
        🌐 - [Pronote (Pierre Dubois)](https://0530015d.index-education.net/pronote/eleve.html)
        📁 - [Fichiers Supplémentaires](${evalDocs})
    `, false)
        .setColor('RED')
        .setFooter("Evaluations Collège Pierre Dubois - Créé par Adloya#1873")
        .setAuthor("Evaluations Collège Pierre Dubois", "https://cdn.discordapp.com/attachments/870383856195371008/895353675139137556/unknown.png")
        .setThumbnail(evalImg)

    const evalT1_embed = new Discord.MessageEmbed()
        .setTitle(`Evaluation en ${evalSubject} : ${evalName}`)
        .setDescription(`${evalDesc}`)
        .addField("**__🗓️ - Date : __**", evalDate, true)
        .addField("**__🎓 - Classes : __**", evalClasses, true)
        .addField("**__📜 - Type : __**", evalType, true)
        .addField("**__✅ - Points à réviser : __**", evalKeyPoints, false)
        .addField("**__🔗 - Liens supplémentaires : __**", `
        🌐 - [Pronote (Pierre Dubois)](https://0530015d.index-education.net/pronote/eleve.html)
    `, false)
        .setColor('RED')
        .setFooter("Evaluations Collège Pierre Dubois - Créé par Adloya#1873")
        .setAuthor("Evaluations Collège Pierre Dubois", "https://cdn.discordapp.com/attachments/870383856195371008/895353675139137556/unknown.png")
        .setThumbnail(evalImg)

    if(evalDocs) webhook.send({embeds: [evalT1_Files_embed]});
    else if(!evalDocs) webhook.send({embeds: [evalT1_embed]});
})


// Démarrer les pages web
webapp.listen(configuration.port, () => console.info(`ℹ️ - Application web : [LISTENING] on port ${configuration.port}`))