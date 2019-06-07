const Discord = require('discord.js');
const client = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapters = new FileSync('database.json');
const db = low(adapters);

let prefix = "/"
 
db.defaults({ histoires : [], xp: []}).write()

const fs = require('fs');

client.login("NTc1NDQzMDIyODE3MjYzNjE3.XNIBMg.oaLbe_9_UrNSAuN1_2StMRBX67o");

client.commande = new Discord.Collection();

fs.readdir("./Commandes/",(error, f) =>{
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouver !");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);
    
    client.commande.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/",(error, f) =>{
    if(error) console.log(error);
    console.log(`${f.length} event en chargement`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event =f.split(".")[0];
   
    client.on(event, events.bind(null, client));
    });
});

client.on('message', message =>{
    if(message.content === "TwZz"){
        message.channel.sendMessage('Mon createur :heart:');
    }
});

client.on('message', message =>{
    if(message.content === "Athénos"){
        message.channel.sendMessage("C'est moi ! Athénos");
    }
});

client.on('message', message =>{
    if(message.content === "Banane"){
        message.channel.sendMessage("! BANANAAA ! :banana:");
    }
});

client.on('message', message =>{
    if(message.content === "banane"){
        message.channel.sendMessage("! BANANAAA ! :banana:");
    }
});

client.on('message', message =>{
    if(message.content === "Ney"){
        message.channel.sendMessage('Ney est une personne genial avec qui on rigole souvent :heart:');
    }
});

/*youtube*/
client.on('message',message =>{
    if (message.content === "/youtube"){
    message.channel.send('https://www.youtube.com/channel/UCKv-65vo6gd5arq1GttGaYA')
    }
});

/*twitter*/
client.on('message',message =>{
    if (message.content === "/twitter"){
    message.channel.send('https://twitter.com/TwZzOfficiel')
    }
});

/*rules*/
client.on('message',message =>{
    if (message.content === "/rules"){
    message.channel.send('Voici les régles du serveur ^^ https://cdn.discordapp.com/attachments/575447270758285337/583238455882940416/Rules.png')
    }
});

client.on('message',message =>{
if (message.content === "/info"){
let icon = message.guild.iconURL;
    let embed = new Discord.RichEmbed() // or Discord.MessageEmbed
        .setDescription('Server Info')
        .setColor('RANDOM')
        .setThumbnail(icon)
        .addField('Nom du serveur', message.guild.name)
        .addField('Crée le', message.guild.createdAt)
        .addField('Vous avez rejoins le serveur le', message.member.joinedAt)
        .addField('Nombre de membre sur le serveur:', message.guild.memberCount);

    // Send embed
    message.channel.send(embed);
   }
});

client.on('message',message =>{
    if (message.content === "/slots"){
let slots = ["🍎", "🍌", "🍓", "🍈"];
let result1 = Math.floor((Math.random() * slots.length));
let result2 = Math.floor((Math.random() * slots.length));
let result3 = Math.floor((Math.random() * slots.length));
let name = message.author.displayName;
let icon = message.author.displayAvatarURL;

if (slots[result1] === slots[result2] && slots[result3]) {
    let wEmbed = new Discord.RichEmbed() // Remember to use MessageEmbed if you use master
        .setFooter('Game Slots', icon)
        .setTitle(':slot_machine: Slots :slot_machine:')
        .addField('Resultat:', slots[result1] + slots[result2] + slots[result3], true)
        .setColor(0xF4E842)
    message.channel.send(wEmbed);

} else {

    let lEmbed = new Discord.RichEmbed()
        .setFooter('Game Slots', icon)
        .setTitle(':slot_machine: Slots :slot_machine:')
        .addField('Resultat:', slots[result1] + slots[result2] + slots[result3], true)
        .setColor(0xF4E842)
    message.channel.send(lEmbed);
}
}
})

/*PP*/
client.on('message', message => {
    if (message.content === '/pp') {
      message.reply(message.author.avatarURL);
    }
  });

/*Help*/
client.on("message", message => {
    if (message.content === "/help"){
        message.channel.send({embed: {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "Commandes du Bot",
            fields: [{
                name: "Modération",
                value: "```/kick, /ban, /clear, /mute, /unmute, /warn, /unwarn, /warnlist```"
            },
            {
                name: "Personaliser",
                value: "```/youtube, /twitter, /prefix, /cat, /dog, /staff, /rules, /xp, /pp```"
            },
            {
                name: "Jeu",
                value: "```/8ball {VotreQuestion}, /pf, /shifumi, /punch, /8ballRules```"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "©AthénosBot™ 2019"
            }
          }
        });
    }
});

/*Staff*/
client.on("message", message => {
    if (message.content === "/staff"){
        message.channel.send({embed: {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "Staff du serveur",
            fields: [{
                name: "Admin",
                value: "```TwZz, Ney```"
            },
            {
                name: "Super Modérateur",
                value: "```Goram, KittyPool```"
            },
            {
                name: "Modérateur",
                value: "```Kwayn, Flowz, Blue_Lxrd, Niiro```"
            },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "©AthénosBot™ 2019"
            }
          }
        });
    }
});

/*pf*/
client.on('message',message =>{
    if (message.content === "/pf"){
    message.channel.send('**Si vous voulez lancer une partie de pile ou face il suffit de faire la commande** __/pile__,** pour choisir Pile, ou la commande** __/face__, **pour choisir face :)**')
    }
});

/*shifumi*/
client.on('message',message =>{
    if (message.content === "/shifumi"){
    message.channel.send('**Si vous voulez lancer une partie de shifumi, il suffit de faire la commande** __/ciseaux__,** pour choisir Ciseaux, la commande** __/feuille__, **pour choisir Feuille ou la commande** __/pierre__ **pour choisir Pierre :)**')
    }
});

/*8ballRules*/
client.on('message',message =>{
    if (message.content === "/8ballRules"){
    message.channel.send('**Le but de ce jeu est de poser une question avec la commande /8ball {Votre Question}, et le bot vous répondera soit par "Oui", "Non", "Pas envie de répondre" ou par "Je sais pas"**')
    }
});


/*XP*/
client.on('message', message => {
   
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
               .setTitle(`Nombre d'XP de : ${message.author.username}`)
               .setColor('#0xADD8E6')
               .addField(":arrow_down: Votre nombre d'XP :arrow_down: ",`Vous avez actuellement ${xpfinal[1]} xp`)
               .setFooter("Bien joué ! Continue comme ça :p")
            message.channel.send({embed : xp_embed})
        }
    }
})

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglasses: ")
       member.kick()
       message.channel.send("**"+member.user.username + '** a bien été kick du serveur ! :white_check_mark:')
    }
});
 
/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglasses:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a bien été banni ! :white_check_mark:')
    }
});

//clear
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send("```Un clear a été effectuée```")
    }
 });
 client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 })
 client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    //Muted
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre:x:")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre:x:")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a bien été mute ! :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a bien été mute !:white_check_mark:')
            })
        }
    }
    
    //warns
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre:x:")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
    }  
    
    //infraction
    if (args[0].toLowerCase() === prefix + "warnlist") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)
    }
 
    //unmute
    if(args[0].toLowerCase() === prefix + "unmute"){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }

    //unwarn
    if(args[0].toLowerCase() === prefix + "unwarn"){
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unwarn ce membre.")
        if(!warns[member.id]|| !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
        warns[member.id].shift()
        fs.writeFileSync('./warns.json',JSON.stringify(warns))
        message.channel.send("Le dernier warn de " +member+ " a été retiré :white_check_mark:")
    
    }

    if(args[0].toLowerCase() === prefix + "8ball"){
        random();
    
        if (randnum == 21){
            console.log(randnum);
        }
    
        if (randnum == 1){
            message.reply(":8ball:Ma réponse est **Oui** :white_check_mark:")
            console.log(randnum);
        }

        if (randnum == 2){
            message.reply(":8ball:Ma réponse est **Non** :x:")
            console.log(randnum);
        }

        if (randnum == 3){
            message.reply(":8ball:Ma réponse est **Je sais pas**")
            console.log(randnum);
        }

        if (randnum == 4){
            message.reply(":8ball:**Pas envie de répondre x/**")
            console.log(randnum);
        }

        if (randnum == 5){
            message.reply(":8ball:Ma réponse est **Oui** :white_check_mark:")
            console.log(randnum);
        }

        if (randnum == 6){
            message.reply(":8ball:Ma réponse est **Non** :x:")
            console.log(randnum);
        }

        if (randnum == 7){
            message.reply(":8ball:Ma réponse est **Je sais pas**")
            console.log(randnum);
        }

        if (randnum == 8){
            message.reply(":8ball:**Pas envie de répondre x/**")
            console.log(randnum);
        }

        if (randnum == 9){
            message.reply(":8ball:Ma réponse est **Oui** :white_check_mark:")
            console.log(randnum);
        }

        if (randnum == 10){
            message.reply(":8ball:Ma réponse est **Non** :x:")
            console.log(randnum);
        }

        if (randnum == 11){
            message.reply(":8ball:Ma réponse est **Je sais pas**")
            console.log(randnum);
        }

        if (randnum == 12){
            message.reply(":8ball:**Pas envie de répondre x/**")
            console.log(randnum);
        }

        if (randnum == 13){
            message.reply(":8ball:Ma réponse est **Oui** :white_check_mark:")
            console.log(randnum);
        }

        if (randnum == 14){
            message.reply(":8ball:Ma réponse est **Non** :x:")
            console.log(randnum);
        }

        if (randnum == 15){
            message.reply(":8ball:Ma réponse est **Je sais pas**")
            console.log(randnum);
        }

        if (randnum == 16){
            message.reply(":8ball:**Pas envie de répondre x/**")
            console.log(randnum);
        }

        if (randnum == 17){
            message.reply(":8ball:Ma réponse est **Oui** :white_check_mark:")
            console.log(randnum);
        }

        if (randnum == 18){
            message.reply(":8ball:Ma réponse est **Non** :x:")
            console.log(randnum);
        }

        if (randnum == 19){
            message.reply(":8ball:Ma réponse est **Je sais pas**")
            console.log(randnum);
        }

        if (randnum == 20){
            message.reply(":8ball:**Pas envie de répondre x/**")
            console.log(randnum);
        }
    }

if(args[0].toLowerCase() === prefix + "cat"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("https://media.mnn.com/assets/images/2018/07/cat_sleeping.jpg.653x0_q80_crop-smart.jpg")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtHaJPFAeyuFVsncUsJKuvdmddFprR7hlyvNxpTtVttJb6K50h");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=animal-cat-cute-45201.jpg&fm=jpg")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1Op_5CsglrCX2IhmIiKIQwklmLBr34lU8dfp5eBd21SxkBAWoA")
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGDlQ7nqPcSDOgEuO9JnDePsrdw95FmI3rHP_8C-6hr4psP2YE5A")
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSr19iyfvCOaJq2-nw_yoxNyZtSc1I5Sh3y6RG-RgAAuAvQaMl")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzx3MTlE_QszCoK0I7jiv8eIKKC_E0qFDoDh7_mbtLr6ebMpmQA")
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3ebmZP4CVjYlkVzazlEXYgbVXNavvE9pxrBQsGj1fRyGgPW7pg")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTIlP1nDNYZPwiVMKHmvyCVgdsZ6yAH-Yk9W9kExI2W5ovOq4UQ")
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHn1TD58rGZT0ZOHfrm7GNMXKE3spmnK5sy4glwLtJnBJGR5woBw")
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGaYZtoI27tVcjMWwfFEh42BeZpClbspMKNfq47o1K6tTJVOIdg")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sgZWjSAxlX-LaEYfxkB8NaQ8q0LBB_Ahq30LEq1yXdCG3PzA")
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfW1sx8L6JnjexjoXaV3-HGHQBN97IC3FFiPXFCvttMMtcFyrR")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2cHRl5TzxAK9M-Jqf2mH3xZTJdedze05dCvbC3yar3NIAqslV")
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_o1jjVR8PendluxAIW-O2utpvclufaoPAu8wSuaxmVqT_2vaJ")
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBVImz0C7Z8UkEyrHok6x9HrhCIe1A_aKxLgo1XEQqnOUD0Fb")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0qDqrnneer1_CdESiy0-ZkWbpt0UQQlunfebJLd28SmEL1tBZQ")
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21gOKYJCm3hXWtLcPwXBpc0RdZlS4rn_f6M_rwx7OcVKnnID1Kg")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKsqfMbA_S3JIU7E8hDwMMrQO2-7UWEix1vdbou--EQrKjwx8")
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUg4yuoSiqVoj8iAEFNB1MjGaPpxE6m4FmHyu1L7A8fmjXoRApg")
        console.log(randnum);
    }
   }

   if(args[0].toLowerCase() === prefix + "dog"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64xmz4nVkZ5fesj-mDQj4T8eBHMNR6fpeNQjFIHXH6vqLFJJqPg")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSndJydjQf4P_9kABakXnxQG3t4hEPYJTPNL5VhiVKdqf7gRnSH");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQP5a3sXXmcqlaCM-UtIHQlUhImretscqGVY6HrBg-SK01eUSP")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzv3R-5bT6OWHygYaFjMq3UXFJmcT6d6RfnQrVg0nKdLrEVceqw")
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBb5GLAJInCymnj6HXFAXc3UrXJsbRTjwXLeCERvtP23CSm4erFw")
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQ0HFBMRXSp6HzUx11htPGoBqHg_iIiqRrLzTEyMx2znTJrY4")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4VP71Qlo7uZmxkvl6zJZ-ra7qm6pEo5jahx4_9Cx1VNtAUI1ng")
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6_WNcoIAIv5_L_Hcw4Z5R8AJJsOZf5sqYQy_UQXLpjIreV3Ow0g")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSZEBmbE5b3KQ8T5rVZpUQ5wRYB7lrsmoDXkvO4InBhqbn6SgmA")
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSdAlGXS-gLJZ19e6RgDV5vmtfFcHhiXp7WHDaAmAjzXa9VEoczQ")
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrOVWiyfM0G6XEA1tbmB0pVR32No7-28HKD5GdbdJA8Xw7SzGE4w")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply(" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzv3R-5bT6OWHygYaFjMq3UXFJmcT6d6RfnQrVg0nKdLrEVceqw")
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ClUOlILg9yawGavwaZ-Rw6TbEmTIUJmElxDEJjEb7vING94o")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpTbioRACfAaOXb-Ju6xMSsUigiWJqhRlS9IC-udr-uAl8YV8bQ")
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpYM4h6ed8u6xim5SVh3j8JJhMh9BIp-PtsBmgzekjt0mJs9R")
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8X9-TPoOlXWEffuoGsNOE9orPreCeIK2wt2RnpX8hrG4zps7Y")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1pa5xgnOGvrXl0vuWiHgknYEoleqi2syBomMF2t12uv8R47nxw")
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6nFIZCnZhv8Ms_hHkj4tiXOT0XgR14g7eWMrwOxVT7PBamPxAA")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFSOSHswKnVfVXwmxfY7nniOrgIuiZbKmPWCWxaNKf-2xWA1aBuw")
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrJyP5i1RUKaXli8_ft21zolVYs3sBsk3zfWUNUhV_uvhq7OSsw")
        console.log(randnum);
    }
   }

if(args[0].toLowerCase() === prefix + "pile"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum); 
    }

    if (randnum == 19){
        message.reply("**GG**, C'était pile :)")
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }
   }

if(args[0].toLowerCase() === prefix + "face"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("**Dommage**, C'était face, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("**GG**, C'était face :)")
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("**Dommage**, C'était pile, retente ta chance la prochaine fois ^^ :)")
        console.log(randnum);
    }
   }

   if(args[0].toLowerCase() === prefix + "ciseaux"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Ciseaux` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Pierre` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Ciseaux`, __Moi__ `Feuille` **Bien joué !**");
        console.log(randnum);
    }
  }

  if(args[0].toLowerCase() === prefix + "feuille"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **");
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**");
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Feuille` **égalité ! On rejoue ?! ^^ **")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Ciseaux` **Retente ta chance ^^ **");
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("**__SHI..FU.MI !__**  __Vous __`Feuille`, __Moi__ `Pierre` **Bien joué !**");
        console.log(randnum);
    }
  }

    if(args[0].toLowerCase() === prefix + "pierre"){
        random();
    
        if (randnum == 21){
            console.log(randnum);
        }
    
        if (randnum == 1){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ Ciseaux` **Bien joué !**")
            console.log(randnum);
        }
    
        if (randnum == 2){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 3){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 4){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**");
            console.log(randnum);
        }
    
        if (randnum == 5){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 6){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 7){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**");
            console.log(randnum);
        }
    
        if (randnum == 8){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 9){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 10){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 11){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**")
            console.log(randnum);
        }
    
        if (randnum == 12){
            message.reply("**__SHI..FU.MI !__**  __Vous __``Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 13){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 14){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**");
            console.log(randnum);
        }
    
        if (randnum == 15){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 16){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 17){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**");
            console.log(randnum);
        }
    
        if (randnum == 18){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Pierre` **égalité ! On rejoue ?! ^^ **")
            console.log(randnum);
        }
    
        if (randnum == 19){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Feuille` **Retente ta chance ^^ **");
            console.log(randnum);
        }
    
        if (randnum == 20){
            message.reply("**__SHI..FU.MI !__**  __Vous __`Pierre`, __Moi__ `Ciseaux` **Bien joué !**");
            console.log(randnum);
        }
    }    

if(args[0].toLowerCase() === prefix + "punch"){
    random();

    if (randnum == 21){
        console.log(randnum);
    }

    if (randnum == 1){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585192135058259968/tenor.gif")
        console.log(randnum);
    }

    if (randnum == 2){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585192609052491786/s67FgN.gif");
        console.log(randnum);
    }

    if (randnum == 3){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585193051215888394/df1563824f8cd88343fcc3c08fa0fa8b2dc88402r1-320-180_hq.gif")
        console.log(randnum);
    }

    if (randnum == 4){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585192135058259970/RevolvingAnchoredIbadanmalimbe-max-1mb.gif");
        console.log(randnum);
    }

    if (randnum == 5){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585193534387126292/AmusingHastyCranefly-max-1mb.gif");
        console.log(randnum);
    }

    if (randnum == 6){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585193726847090730/image0.gif")
        console.log(randnum);
    }

    if (randnum == 7){
        message.reply("https://giphy.com/gifs/punch-etMAXqRmKxqOA");
        console.log(randnum);
    }

    if (randnum == 8){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585194376880455703/giphy.gif")
        console.log(randnum);
    }

    if (randnum == 9){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585194730468671592/GrandKlutzyGermanshepherd-size_restricted.gif");
        console.log(randnum);
    }

    if (randnum == 10){
        message.reply("https://cdn.discordapp.com/attachments/561319499513724929/585195167875596298/MellowTatteredDeer-size_restricted.gif");
        console.log(randnum);
    }

    if (randnum == 11){
        message.reply("https://giphy.com/gifs/angry-loki-smash-FjOsaw9z4BhrW")
        console.log(randnum);
    }

    if (randnum == 12){
        message.reply("https://giphy.com/gifs/warnerarchive-classic-film-key-largo-3o7GVEcfO2Gk2tv9SM");
        console.log(randnum);
    }

    if (randnum == 13){
        message.reply("https://giphy.com/gifs/smack-dynasty-catfight-b2q4CmcZeZPEI")
        console.log(randnum);
    }

    if (randnum == 14){
        message.reply("https://giphy.com/gifs/vi2ciYHi5u0FO");
        console.log(randnum);
    }

    if (randnum == 15){
        message.reply("https://giphy.com/gifs/abcnetwork-episode-2-abc-l0MYthTiOGtg1zsT6");
        console.log(randnum);
    }

    if (randnum == 16){
        message.reply("https://giphy.com/gifs/cheezburger-animation-epic-iWEIxgPiAq58c")
        console.log(randnum);
    }

    if (randnum == 17){
        message.reply("https://giphy.com/gifs/angry-punch-adventure-time-ay4LVDTq2he4U");
        console.log(randnum);
    }

    if (randnum == 18){
        message.reply("https://giphy.com/gifs/fight-lord-boros-6DHk0gKBVQEr6")
        console.log(randnum);
    }

    if (randnum == 19){
        message.reply("https://giphy.com/gifs/punch-genos-incinerate-o2TqK6vEzhp96");
        console.log(randnum);
    }

    if (randnum == 20){
        message.reply("https://giphy.com/gifs/naruto-shippuden-MlTMwvO9ZiWwU");
        console.log(randnum);
    }
   }
});



    function random(min, max) {
        min = Math.floor(0);
        max = Math.floor(21);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
}
