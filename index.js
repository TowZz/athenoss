const Discord = require('discord.js');
const client = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapters = new FileSync('database.json');
const db = low(adapters);
 
db.defaults({ histoires : [], xp: []}).write()

var prefix = "/"

const fs = require('fs');

client.login("NTczMTQwODkyMTE1MDA5NTQ2.XMmhpw.d2wdijDZY5PnIHigEOGKMkOwalM");

client.on('message', message =>{
    if(message.content === "TwZz"){
        message.channel.sendMessage("TwZz la plus belle personne au monde qu'on peut avoir :heart:")
    }
});

client.on('message', message =>{
    if(message.content === "Goram"){
        message.channel.sendMessage("En avant Goram ! GORAM ! avec son gros ventre ! pouette pouette pouette !")
    }
});

client.on('message', message =>{
    if(message.content === "Miyako"){
        message.channel.sendMessage("C'est Moi ! La plus gentille Fille du monde :blush:");
    }
});


const warns = JSON.parse(fs.readFileSync('./warns.json'))

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

/*pf*/
client.on('message',message =>{
    if (message.content === "/pf"){
    message.channel.send('**Si vous voulez lancer une partie de pile ou face il suffit de faire la commande** __/pile__,** pour choisir Pile, ou la commande** __/face__, **pour choisir face :)**')
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
               .setColor('#0xd604cf')
               .addField(":arrow_down: Votre nombre d'XP :arrow_down: ",`Vous avez actuellement ${xpfinal[1]} xp`)
               .setFooter("Bien joué ! Continue comme sa :p")
            message.channel.send({embed : xp_embed})
        }
    }
})

/*Help*/
client.on("message", message => {
    if (message.content === "/help"){
        message.author.send({embed: {
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
                value: "```/youtube, /twitter, /xp, /pp```"
            },
            {
                name: "Jeu",
                value: "```/8ball {VotreQuestion}, /pf, /shifumi, /punch, /8ballRules```"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "©MiyakoBot™ 2019"
            }
          }
        });
    }
});

/*shifumi*/
client.on('message',message =>{
    if (message.content === "/shifumi"){
    message.channel.send('**Si vous voulez lancer une partie de shifumi, il suffit de faire la commande** __/ciseaux__,** pour choisir Ciseaux, la commande** __/feuille__, **pour choisir Feuille ou la commande** __/pierre__ **pour choisir Pierre :)**')
    }
});

/*HelpMsg*/
client.on('message',message =>{
    if (message.content === "/help"){
    message.channel.send('**La liste des commandes a été envoyer dans tes messages privés !** :regional_indicator_m::regional_indicator_p:')
    }
});

/*youtube*/
client.on('message',message =>{
    if (message.content === "/youtube"){
    message.channel.send('https://www.youtube.com/channel/UC4O3EQyEwMrDc8l3nTTG_Zw')
    }
});

/*PP*/
client.on('message', message => {
    if (message.content === '/pp') {
      message.reply(message.author.avatarURL);
    }
  });
  
/*twitter*/
client.on('message',message =>{
    if (message.content === "/twitter"){
    message.channel.send('https://twitter.com/ImNotNey')
    }
});
      
/*8ballRules*/
client.on('message',message =>{
    if (message.content === "/8ballRules"){
    message.channel.send('**Le but de ce jeu est de poser une question avec la commande /8ball {Votre Question}, et le bot vous répondera soit par "Oui", "Non", "Pas envie de répondre" ou par "Je sais pas"**')
    }
});

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
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
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
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
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
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
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
});

    function random(min, max) {
        min = Math.floor(0);
        max = Math.floor(21);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
   }
