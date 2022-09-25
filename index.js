const Discord = require("discord.js")
const { Permissions } = require('discord.js');
const Canvas = require('canvas')
const fs = require('fs');
const config = require('./config/config');
const prefix = config.prefix
let datestartbot = new Date()
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});


const activities = config.activities
Client.on("ready", () => {
    Client.user.setActivity(config.activities)
    console.log("Discord bot started");
});


fs.appendFile('blueskinBot.log', `\n\n${datestartbot} Starting bot-----------------------------------------------------------------------------------------------------`, function (err) {
    if (err) throw err
    console.log('Variable "datestartbot" writed in "blueskinBot.log"');
});


Client.on("guildMemberAdd", async newmember => {
    var canvas = Canvas.createCanvas(1920, 1080)
    ctx = canvas.getContext("2d")

    var background = await Canvas.loadImage("./background.jpg")
    ctx.drawImage(background, 0, 0, 1920, 1080)

    ctx.font = "130px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("BIENVENUE", 960, 750)

    ctx.font = "130px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(newmember.user.tag, 960, 925)

    var avatar = await Canvas.loadImage(newmember.user.displayAvatarURL({ format: "png", size: 1024 }))
    ctx.drawImage(avatar, 780, 200, 350, 350);

    var attachement = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")


    const embednewmember = new Discord.MessageEmbed()
        .setTitle(`Bienvenue ` + newmember.displayName)
        .setColor('#31E4A6')
        .setTimestamp()
        .setDescription("Bienvenue sur le serveur discord de la communauté de la chaine YouTube blueskin8, j'espère que tu passeras un bon moment ici !!")
        .setFooter({ text: "Par blueskinBot", iconURL: "http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png" })
        .setImage('attachment://welcome.png');

    Client.channels.cache.find(channel => channel.name === "bienvenue").send({ embeds: [embednewmember], files: [attachement] });

    let timetoaction = setTimeout(action, 100);
    function action() {
        newmember.roles.remove("929422888124153856");
        // newmember.kick()
    }
});

const createEmbed = (title, description) => {
    new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('#31E4A6')
}

//LOG SYSTEM ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Client.on('channelCreate', channelcr => {
    if (channelcr.isVoice()) {
        fs.appendFile('blueskinBot.log', `\n${new Date()} : un channel vocal à été créer, nom : "${channelcr.name}", id : "${channelcr.id}" par "${channelcr.parentId}"`, function (err) { if (err) throw err })
    }
    if (channelcr.isText()) {
        fs.appendFile('blueskinBot.log', `\n${new Date()} : un channel textuel à été créer, nom : "${channelcr.name}", id : "${channelcr.id}" par "${channelcr.client.user.tag}"`, function (err) { if (err) throw err })
    }
    if (channelcr.isThread()) {
        fs.appendFile('blueskinBot.log', `\n${new Date()} : un thread à été créer, nom : "${channelcr.name}", id : "${channelcr.id}" par "${channelcr.parentId}"`, function (err) { if (err) throw err })
    }
})

Client.on('channelDelete', channeldel => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un channel à été supprimé, nom : "${channeldel.name}", id : "${channeldel.id}"`, function (err) { if (err) throw err })
})

Client.on('channelUpdate', (channelold, channelnew) => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un channel à été modifié, id : "${channelnew.id}", ancien nom : "${channelold.name}", nouveau nom : "${channelnew.name}"`, function (err) { if (err) throw err })
})

Client.on('guildBanAdd', banni => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un utilisateur à été banni, id : "${banni.user.id}", pseudo : "${banni.user.tag}"`, function (err) { if (err) throw err })
})

Client.on('guildBanRemove', debanni => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un utilisateur à été débanni, id : "${debanni.user.id}", pseudo : "${debanni.user.tag}"`, function (err) { if (err) throw err })
})

Client.on('guildMemberAdd', membernew => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : il y a un nouvel utilisateur sur le discord, nom : "${membernew.user.tag}", id : "${membernew.user.id}"`, function (err) { if (err) throw err })
})

Client.on('guildMemberRemove', memberrem => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un utilisateur est parti du discord, nom : "${memberrem.user.tag}", id : "${memberrem.user.id}"`, function (err) { if (err) throw err })
})

Client.on('guildMemberUpdate', (memberold, membernew) => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : un utilisateur à été modifié, avant : "${memberold}", maintenant : "${membernew}"`, function (err) { if (err) throw err })
})

Client.on('guildUpdate', (guildold, guildnew) => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : la guild à été modifié, avant : "${guildold}", maintenant : "${guildnew}"`, function (err) { if (err) throw err })
})

Client.on('messageReactionAdd', (messagereact, userreact) => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : "${userreact.tag}" à ajouté l'émoji "${messagereact.emoji.name}"`, function (err) { if (err) throw err })
})

Client.on('messageReactionRemove', (messagereactrem, userreactrem) => {
    fs.appendFile('blueskinBot.log', `\n${new Date()} : "${userreactrem.tag}" à retiré l'émoji "${messagereactrem.emoji.name}"`, function (err) { if (err) throw err })
})

Client.on('messageReactionRemoveAll', (msgreactremall, reactremall) => {
    console.log(reactremall[0])
    // fs.appendFile('blueskinBot.log', `\n${new Date()} : tous les émojis, "${reactremall}" du message, contenu : "${msgreactremall}", id : "${msgreactremall.id}"`, function (err) { if (err) throw err })
})


//Le code commence ici -----------------------------------------------------------------------------------------------------------------------------------------------------------
//Le code commence ici -----------------------------------------------------------------------------------------------------------------------------------------------------------
//Le code commence ici -----------------------------------------------------------------------------------------------------------------------------------------------------------
//Le code commence ici -----------------------------------------------------------------------------------------------------------------------------------------------------------
//Le code commence ici -----------------------------------------------------------------------------------------------------------------------------------------------------------


Client.on("messageCreate", async message => {

    checkAbuse(message)
    function checkAbuse(message) {
        const abuse = [config.mdp, "pd"];
        const messageContent = message.content;
        const isInterdit = abuse.some((element) => messageContent.indexOf(element) !== -1);

        if (isInterdit) return message.delete()
    }

    //Action log message -----------------------------------------------------------------------------------------------------------------------------------------------------

    if (message) {
        if (message.attachments.size > 0) {
            let salonlog = message.channel.name
            let dateaction = new Date()
            let useraction = message.author.tag
            fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à envoyé dans le salon "#${salonlog}" une image`, function (err) {
                if (err) throw err;
            });
        } else {
            let contenumessage = message.content
            let salonlog = message.channel.name
            let dateaction = new Date()
            let useraction = message.author.tag
            fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à envoyé dans le salon "#${salonlog}" le message : ${contenumessage}`, function (err) {
                if (err) throw err;
            });
        }
    }



    if (message.author.bot) return;

    //Commande test embed ---------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "embed")) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        message.channel.send("voici un embed test")
        const embed = new Discord.MessageEmbed()
            .setThumbnail("http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png")
            .setColor("#17E3FF")

        // .setAuthor("blueskinBot par blueskin8", "http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png");

        message.channel.send({ embeds: [embed] });
    }

    //Commande achievement --------------------------------------------------------------------------------------------------------------------------------------------------


    if (message.content.startsWith(prefix + "achievement") || (message.content.startsWith(prefix + 'acvm'))) {
        if (!message.member.permissions.has(Permissions.FLAGS.ATTACH_FILES)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : achievement`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {


            const argsachievementfake = message.content.split(' ')
            const argsachievement = argsachievementfake.slice(2).join('+')
            message.delete()
            if (argsachievement === "" || argsachievement === "undefined") { return message.channel.send("Veuillez préciser le message de l'achievement !") }

            let argsacvmicon2 = message.content.trim().split(/ +/g);
            let argsacvmicon = argsacvmicon2[1]

            let icon = "1";

            if (argsacvmicon === "grassblock") { icon = "1" }
            if (argsacvmicon === "diamond") { icon = "2" }
            if (argsacvmicon === "diamondsword") { icon = "3" }
            if (argsacvmicon === "creeper") { icon = "4" }
            if (argsacvmicon === "pig") { icon = "5" }
            if (argsacvmicon === "tnt") { icon = "6" }
            if (argsacvmicon === "cookie") { icon = "7" }
            if (argsacvmicon === "hearth") { icon = "8" }
            if (argsacvmicon === "bed") { icon = "9" }
            if (argsacvmicon === "cake") { icon = "10" }
            if (argsacvmicon === "sign") { icon = "11" }
            if (argsacvmicon === "rail") { icon = "12" }
            if (argsacvmicon === "craft") { icon = "13" }
            if (argsacvmicon === "redstone") { icon = "14" }
            if (argsacvmicon === "fire") { icon = "15" }
            if (argsacvmicon === "cobweb") { icon = "16" }
            if (argsacvmicon === "chest") { icon = "17" }
            if (argsacvmicon === "furnace") { icon = "18" }
            if (argsacvmicon === "book") { icon = "19" }
            if (argsacvmicon === "stone") { icon = "20" }
            if (argsacvmicon === "planks") { icon = "21" }
            if (argsacvmicon === "iron") { icon = "22" }
            if (argsacvmicon === "gold") { icon = "23" }
            if (argsacvmicon === "oakdoor") { icon = "24" }
            if (argsacvmicon === "irondoor") { icon = "25" }
            if (argsacvmicon === "chestplate") { icon = "26" }
            if (argsacvmicon === "flint") { icon = "27" }
            if (argsacvmicon === "waterpotion") { icon = "28" }
            if (argsacvmicon === "potion") { icon = "29" }
            if (argsacvmicon === "creeperegg") { icon = "30" }

            message.channel.send({ content: `https://minecraftskinstealer.com/achievement/${icon}/Achievement+Get%21/${argsachievement}` })
        }
    }


    //Commande nick ----------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "nick")) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Veuillez mentionner un utilisateur !').setDescription('Cette commande s\'utilise : /-rat @unjoueur').setColor('#31E4A6')] }).then(message => { setTimeout(() => message.delete(), 5000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : nick`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            if (message.mentions.members.first()) {
                message.delete()
                let membernick = message.mentions.members.first()
                const newpseudo = message.content.split(" ")
                const pseudonick = newpseudo.slice(2).join(" ")
                let nickpseudo = pseudonick
                try {
                    membernick.setNickname(`${nickpseudo}`)
                } catch { message.channel.send('Cet utilisateur est trop puissant, je ne peux pas le nickname !') }
                message.channel.send(`Son pseudo à été modifié en ${nickpseudo} !`)

            } else {
                message.delete()
                message.channel.send("Veuillez preciser un membre à renommer !")
            }


        }
    }

    /*    //Commande rat -------------------------------
    
        if (message.content.startsWith(prefix + 'rat')) {
            const user = message.mentions.members.first()
            if (!user) return message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Veuillez mentionner un utilisateur !').setDescription('Cette commande s\'utilise : /-rat @unjoueur').setColor('#31E4A6')] }).then(message => { setTimeout(() => message.delete(), 5000) })
            var canvas = Canvas.createCanvas(1920, 1080)
            ctx = canvas.getContext("2d")
            var background = await Canvas.loadImage("http://ekladata.com/OPF9yW9TKXIH3C80s7qxOV3A4rE.jpg")
            ctx.drawImage(background, 0, 0, 1920, 1080)
            ctx.font = "170px Impact"
            ctx.strokeStyle = "rgba(0,0,0,100px)"
            ctx.fillStyle = "#ffffff"
            ctx.textAlign = "center"
            ctx.strokeText(user.displayName.toUpperCase(), 960, 550);
            ctx.strokeText("t'es vraiment un BIG RAT !!", 960, 740);
            //  ctx.fillText(user.displayName.toUpperCase(), 960, 550)
            //  ctx.fillText("t'es vraiment un BIG RAT !!", 960, 740)
            var attachementrat = new Discord.MessageAttachment(canvas.toBuffer(), "rat.png")
            const embednewmember = new Discord.MessageEmbed()
                .setTitle(user.displayName + " t'es vraiment un BIG RAT !!")
                .setColor('#31E4A6')
                .setTimestamp()
                .setFooter({ text: "Par blueskinBot", iconURL: "http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png" })
                .setImage('attachment://rat.png');
            message.channel.send({ embeds: [embednewmember], files: [attachementrat] });
        }
    
        */



    //Commande ban ----------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "ban")) {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateAction = new Date()
        let userAction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateAction} --- : ${userAction} à éxécuter la commande : ban`, function (err) {
            if (err) throw err;
            console.log('Nouvelle action, voir blueskinBot.log pour plus d\'information !');
        });
        let timeToAction = setTimeout(action, 1);
        function action() {

            if (message.mentions.members.first()) {
                message.delete()
                const argsBanReason = message.content.split(" ")
                const reasonBan = argsBanReason.slice(2).join(" ")
                if (!message.mentions.members.first().bannable) { return message.channel.send("Cet utilisateur est trop puissant, je ne peux pas le ban !") }
                let memberBan = message.mentions.members.first()
                memberBan.ban({ reason: `${reasonBan}` });
                message.channel.send(`${memberBan} à été banni(e) de ce serveur discord !\nRaison : ${reasonBan}`)
            } else {
                message.delete()
                message.channel.send("Veuillez préciser un membre à bannir !")
            }
        }
    }


    //Commande mute ----------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "mute")) {
        if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : mute`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete()
            let membercommandauthor = message.author.id
            let membercommand = Client.users.cache.get(membercommandauthor);


            if (message.mentions.members.first()) {
                let targetmute = message.mentions.members.first()
                let rolemuted = message.guild.roles.cache.find(r => r.name === "Muted");
                targetmute.roles.add(rolemuted);
                message.channel.send(`${targetmute} à été mute avec succès !`)
            } else {
                message.channel.send("Veuillez préciser un utilisateur à mute !")
            }
        }
    }

    //Commande unmute ----------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "unmute")) {
        if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS && Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : unmute`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete()
            if (message.mentions.members.first()) {
                let targetunmute = message.mentions.members.first()
                targetunmute.roles.remove("929422888124153856");
                message.channel.send(`${targetunmute} à été unmute avec succès !`)
            } else {
                message.channel.send("Veuillez préciser un utilisateur à unmute !")
            }
        }
    }

    //Commande slowmod -------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "slowmod")) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        message.delete()
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : slowmod`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            let modslow = message.content.trim().split(/ +/g);
            let slowmod = modslow[1]
            if (slowmod === "false") {
                message.channel.setRateLimitPerUser("0")
                message.channel.send("Le slowmod à été désactivé !")
            } else {
                if (slowmod > 21600) {
                    message.channel.send("Veuillez entrer un nombre de secondes entre 0 et 21600 !")
                } else {
                    if (isNaN(slowmod) === true) {
                        message.channel.send("Veuillez entrer un nombre de secondes entre 0 et 21600 !")
                    } else {
                        message.channel.setRateLimitPerUser(slowmod)
                        message.channel.send(`Le slowmod à été activé avec ${slowmod} secondes !`)
                    }
                }
            }
        }
    }

    //Commande kick ---------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "kick")) {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : kick`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {

            if (message.mentions.members.first()) {
                message.delete()
                const argskickreason = message.content.split(" ")
                const reasonkick = argskickreason.slice(2).join(" ")
                if (!message.mentions.members.first().kickable) { return message.channel.send("Cet utilisateur est trop puissant, je ne peux pas le kick !") }
                let memberkick = message.mentions.members.first()
                memberkick.kick({ reason: `${reasonkick}` });
                message.channel.send(`${memberkick} à été kick de ce serveur discord !\nRaison : ${reasonkick}`)
            } else {
                message.delete()
                message.channel.send("Veuillez préciser un membre à kick !")
            }
        }
    }


    //Commande hebimages -------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content === prefix + "hebimages") {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : hebimages`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete();
            message.channel.send("http://blueskinbot.eklablog.com/stock-gallery255564").then(message => { setTimeout(() => message.delete(), 2000) })
        }
    }

    //Commande clear -----------------------------------------------------------------------------------------------------------------------------------------------


    if (message.content.startsWith(prefix + "clear")) {
        let dateaction = new Date()
        let useraction = message.author.tag
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : clear`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete();

            let argsclear = message.content.trim().split(/ +/g);

            if (argsclear[1]) {
                if (!isNaN(argsclear[1]) && argsclear[1] >= 1 && argsclear[1] <= 100) {


                    message.channel.bulkDelete(argsclear[1]).then(
                        message.channel.send(`Vous avez supprimer ${argsclear[1]} messages(s).`).then(message => { setTimeout(() => message.delete(), 2000) })
                    )
                }

                else {
                    message.channel.send("Veuillez indiquer un nombre entre 1 et 100").then(message => { setTimeout(() => message.delete(), 2000) })
                }
            }
            else {
                message.channel.send("Veuillez indiquer un nombre de messages à supprimer").then(message => { setTimeout(() => message.delete(), 2000) })
            }

        }
    }


    //Commande fondmcall -------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content === prefix + "fondmc all") {
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : fondmcall`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            let fondmcallbutton = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setStyle("LINK")
                    .setLabel('Clique ici')
                    .setURL("http://blueskinbot.eklablog.com/fond-mc-all-gallery255576")
                )
            message.delete()
            message.channel.send({ content: "Tous les fonds MC", components: [fondmcallbutton] }).then(message => { setTimeout(() => message.delete(), 5000) })
        }
    }

    //Commande fondmc ----------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content === prefix + "fondmc") {
        if (!message.member.permissions.has(Permissions.FLAGS.ATTACH_FILES)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : fondmc`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete()

            const linkimage = [
                "http://ekladata.com/fiDOmm3nrIjzI2crsUGQ94k5znI.jpg",
                "http://ekladata.com/s-bLHuo4w-PggWKlqenY3RKHxAY.png",
                "http://ekladata.com/duOV1yipYdlaVf7rTWH5-EXjAes.png",
                "http://ekladata.com/D4rV7iddAJAFecN2IMxA-1JwaIw.jpg",
                "http://ekladata.com/sBVo5_8VEamDZ1fD5UAgF7SsRLo.png",
                "http://ekladata.com/8BDQd-U_7m9bj-zITlrAWCxTmFA.png",
                "http://ekladata.com/JEDW2gB6KDwHOO1jUEaUG1N6bj8.png",
                "http://ekladata.com/8_-sOBjI9QikDEAeQG0I1C-AJIw.jpg",
                "http://ekladata.com/na536c065VIYyXh-hzU4PmmqINM.png",
                "http://ekladata.com/Ikaq-zVsSgM9rMtfm6q7WI6sD_o.jpg",
                "http://ekladata.com/YTQxFwoIoJlkfJXT_2-D86QEyLg.jpg",
                "http://ekladata.com/n6qwu-Afe8sWmnHlYHWTAPrCa6Q.png",
                "http://ekladata.com/tTkKDMZBWooZIY_RFkG3BXLT8AU.jpg",
                "http://ekladata.com/fJPYRk8NdoI_oB7hzrzzOKY1cUA.jpg",
                "http://ekladata.com/b06S5sta6DO6cq7LXfZ5vAgZvxE.jpg",
                "http://ekladata.com/rbZdeX-KD4JeoXuk09vxCd5esoc.png",
                "http://ekladata.com/V4BCXuaVckZ3lnXHJ_H7dbKy52o.jpg",
                "http://ekladata.com/-KKJ4_41Bppi-uv-vMN-qZuStcA.jpg",
                "http://ekladata.com/JOKduWoYakBhNbBSJT35Qy_p4wI.png",
                "http://ekladata.com/QeZoRIjjwNNBwL1kCtVwjGpFZhE.jpg",
                "http://ekladata.com/kBeOfiDSMqODh55jlWI0H3e4LcU.jpg",
                "http://ekladata.com/b1pbLMNI73mmofTe3bNJP5Qywvg.png",
                "http://ekladata.com/lPCJMitKNx2X8_pJMYgwunFG5zI.jpg",
                "http://ekladata.com/GGK0bfmyY5ypOKUMSLUHyrRpcEA.png"
            ]

            let rndnumbermc = Math.floor(Math.random() * (linkimage.length))
            console.log(linkimage.length)
            message.channel.send(linkimage[rndnumbermc])

        }
    }

    //Commande userinfo -----------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "userinfo")) {

        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : userinfo`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete();

            if (message.mentions.members.first()) {
                if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
                const embedusermention = new Discord.MessageEmbed()
                    .setFooter({ text: 'Par blueskinBot', iconURL: 'http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png' })
                    .setTimestamp()
                    .setThumbnail(message.mentions.members.first().displayAvatarURL())
                    .setColor("42DE7F")
                    .setTitle('**__Ses informations discord sont :__**\n \n  ')
                    .addFields(
                        { name: '**Son tag discord :**', value: `${message.mentions.members.first().user.tag}`, inline: false },
                        { name: '**Il a créer son compte le : **', value: `${message.mentions.members.first().user.createdAt.toLocaleString()}`, inline: false },
                        { name: '**Il a rejoint le serveur le :**', value: `${message.mentions.members.first().joinedAt.toLocaleString()}`, inline: false },
                        { name: '**Ses rôles sont :**', value: `${message.mentions.members.first().roles.cache.map(role => role.name).join(',  ')}`, inline: false },
                        { name: '**Son ID :**', value: `${message.mentions.members.first().id}`, inline: false },
                    )
                message.channel.send({ embeds: [embedusermention] })

            } else {
                const embeduser = new Discord.MessageEmbed()
                    .setFooter({ text: 'Par blueskinBot', iconURL: 'http://ekladata.com/0f6mVgs3StPbxIQwCnLoUt0s7v0.png' })
                    .setTimestamp()
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor("42DE7F")
                    .setTitle('**__Vos informations discord sont :__**\n \n  ')
                    .addFields(
                        { name: '**Ton tag discord :**', value: `${message.author.tag}`, inline: false },
                        { name: '**Tu as créé ton compte le :**', value: `${message.member.user.createdAt.toLocaleString()}`, inline: false },
                        { name: '**Tu as rejoint le serveur le :**', value: `${message.member.joinedAt.toLocaleString()}`, inline: false },
                        { name: '**Tes rôles sont :**', value: `${message.member.roles.cache.map(role => role.name).join(',  ')}`, inline: false },
                        { name: '**Ton ID :**', value: `${message.member.id}`, inline: false },
                    )
                message.channel.send({ embeds: [embeduser] })
            }
        }
    }

    //spam ------------------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "spam")) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : spam`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {

            const spamquoi = message.content.split(" ")
            const quoispam = spamquoi.slice(1).join(" ")
            function spam() { message.channel.send(quoispam); message.channel.send(quoispam) }
            function spam2() { spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); spam(); }
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
            spam2()
        }
    }

    //Command de test -------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith("^test")) {
        
    }

    //Gestionner VOCAL -----------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "vocal")) {
        message.delete();
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message}`).then(message => { setTimeout(() => message.delete(), 2000) });
        let argsVocal = message.content.trim().split(/ +/g);
        let mentionVocal = message.mentions.members.first();

        if (argsVocal[1] === "disconnect") {
            if (argsVocal[2] === "everyone") {
            }
        }
    }


    //Gestionner * ---------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "admin") || message.content.startsWith(prefix + "*")) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`Tu n'as pas la permission d'executer la commande : ${message.content.split(config.mdp).join('')}`).then(message => { setTimeout(() => message.delete(), 2000) })
        let argsadmin = message.content.trim().split(/ +/g)

        if (!argsadmin[1]) return message.channel.send('Veuillez preciser un mot de passe !').then(message => { setTimeout(() => message.delete(), 2000) })
        if (argsadmin[1] === config.mdp) {
            if (!argsadmin[2]) return message.channel.send('Veuillez preciser une catégorie du gestionnaire * !').then(message => { setTimeout(() => message.delete(), 2000) })
            if (argsadmin[2] === "log") {
                if (!argsadmin[3]) return message.channel.send('Veuillez preciser une catégorie du gestionnaire log !').then(message => { setTimeout(() => message.delete(), 2000) })
                if (argsadmin[3] === "clear") {
                    fs.unlink('blueskinBot.log', (err) => {
                        if (err) throw err;
                        console.log(`${message.author.tag} à executé la commande clearlog et les logs ont été supprimés !`)
                        message.channel.send('Tous les logs ont été supprimés !').then(message => { setTimeout(() => message.delete(), 2000) })
                    })
                }
                else if (argsadmin[3] === "get") {
                    var logfile = new Discord.MessageAttachment("./blueskinBot.log")
                    message.channel.send({ files: [logfile] }).then(message => { setTimeout(() => message.delete(), 2000) })
                } else { message.channel.send("Cette caégorie n'existe pas").then(message => { setTimeout(() => message.delete(), 2000) }) }
            }
            else if (argsadmin[2] === "bot") {
                if (!argsadmin[3]) return message.channel.send('Veuillez preciser une catégorie du gestionnaire bot !').then(message => { setTimeout(() => message.delete(), 2000) })
                if (argsadmin[3] === "stop") {
                    message.channel.send('**Le bot se relancera si il a été lancé avec pm2 !**')
                    const commandelancéestop = message.author.username;
                    message.channel.send("**__Toutes interactions avec le bot seront impossables après l'arret de celui ci !__**").then(message => { setTimeout(() => message.delete(), 700) })
                    console.log(`${commandelancéestop} à éxécuté la commande /-stop`)
                    let time = setTimeout(waitstop, 1000);
                    function waitstop() {
                        message.channel.send("blueskinBot va s'éteindre dans 5s").then(message => { setTimeout(() => message.delete(), 700) })
                        console.log("blueskinBot va s'éteindre dans 5s");
                        let time = setTimeout(waitstop5, 1000);
                        function waitstop5() {
                            message.channel.send("blueskinBot va s'éteindre dans 4s").then(message => { setTimeout(() => message.delete(), 700) })
                            console.log("blueskinBot va s'éteindre dans 4s");
                            let time = setTimeout(waitstop4, 1000);
                            function waitstop4() {
                                message.channel.send("blueskinBot va s'éteindre dans 3s").then(message => { setTimeout(() => message.delete(), 700) })
                                console.log("blueskinBot va s'éteindre dans 3s");
                                let time = setTimeout(waitstop3, 1000);
                                function waitstop3() {
                                    message.channel.send("blueskinBot va s'éteindre dans 2s").then(message => { setTimeout(() => message.delete(), 700) })
                                    console.log("blueskinBot va s'éteindre dans 2s");
                                    let time = setTimeout(waitstop2, 1000);
                                    function waitstop2() {
                                        message.channel.send("blueskinBot va s'éteindre dans 1s").then(message => { setTimeout(() => message.delete(), 700) })
                                        console.log("blueskinBot va s'éteindre dans 1s")
                                        let time = setTimeout(waitstop, 1000);
                                        function waitstop() {
                                            let dateaction = new Date()
                                            fs.appendFile('blueskinBot.log', `\n${dateaction} --- : blueskinBot s'est éteint !`, function (err) {
                                                if (err) throw err;
                                            });
                                            let timetoaction2 = setTimeout(action, 1);
                                            function action() {
                                                message.channel.send("**blueskinBot s'est éteint !**")
                                                console.log("blueskinBot s'est éteint !");
                                                let time = setTimeout(stopbot, 1000);
                                                function stopbot() {
                                                    message.channel.send(ce_message_arrete_le_bot);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (argsadmin[3] === "instop") {
                    message.channel.send("**blueskinBot s'est éteint !**");
                    let time = setTimeout(stopbot, 500);
                    function stopbot() {
                        message.channel.send(ce_message_arrete_le_bot);
                    }
                }
                else if (argsadmin[3] === "test") {
                    console.log(`${message.author.username} à executé la commande test et la connexion Bot - Discord est opérationnelle`);
                    message.channel.send(`**La connexion Bot - Discord est opérationnelle**`).then(message => { setTimeout(() => message.delete(), 5000) })
                } else { message.channel.send("Cette caégorie n'existe pas").then(message => { setTimeout(() => message.delete(), 2000) }) }
            } else { message.channel.send("Cette caégorie n'existe pas").then(message => { setTimeout(() => message.delete(), 2000) }) }
        } else { message.channel.send('Mauvais mot de passe !').then(message => { setTimeout(() => message.delete(), 2000) }) }
    }


    //Commande help ---------------------------------------------------------------------------------------------------------------------------------------------------------
    if (message.content === prefix + "help") {
        let dateaction = new Date()
        let useraction = message.author.tag
        fs.appendFile('blueskinBot.log', `\n${dateaction} --- : ${useraction} à éxécuter la commande : help`, function (err) {
            if (err) throw err;
            console.log('New action, see blueskinBot.log file to view this new action');
        });
        let timetoaction = setTimeout(action, 1);
        function action() {
            message.delete();
            let helpbutton = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setStyle("LINK")
                    .setLabel("blueskinBot help")
                    .setURL("http://blueskinbot.eklablog.com/l-aide-help-c33147858")
                )
            message.channel.send({ content: "**blueskinBot help**", components: [helpbutton] }).then(message => { setTimeout(() => message.delete(), 5000) })
        }
    }
});

Client.login(config.token);