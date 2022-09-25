    //Commande ban ----------------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.startsWith(prefix + "ban")) {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return

            if (message.mentions.members.first()) {
                message.delete()
                const argsbanreason = message.content.split(" ")
                const reasonban = argsbanreason.slice(2).join(" ")
                if (!message.mentions.members.first().bannable) { return message.channel.send("Cet utilisateur est trop puissant, je ne peux pas le ban !") }
                let memberban = message.mentions.members.first()
                memberban.ban({ reason: `${reasonban}` });
                message.channel.send(`${memberban} à été banni(e) de ce serveur discord !`)
            } else {
                message.delete()
                message.channel.send("Veuillez préciser un membre à bannir !")
            }
        }
