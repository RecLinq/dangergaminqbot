const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const { Player } = require("discord-music-player");
const player = new Player(client, settings.youtubeapi)
var muzikcalankisi;
var prefix = settings.prefix;
client.player = player;

var oynuyorkisimlari = [
    "twitch.tv/dangergaminq",
    "dlive.tv/dangergaminq",
    "!komutlar | Dangergaminq",
    "Developed by RecLinq"
]
var selamcevaplari = [
    "Aleyküm Selam Güzel Kardeşim :zap:",
    "Aleyküm Selam :zap:",
    "Aleyküm Selam Mümin Kardeşim :zap:"
]
client.on('ready', () => {
    console.log("Bot Çalışmaya Başladı..")
    setInterval(function() {
        var random = Math.floor(Math.random() * (oynuyorkisimlari.length));
        client.user.setActivity(oynuyorkisimlari[random], { type: 'PLAYING' });
    }, 4000);
});

client.on("message", message => {
    console.log(" " + message.channel.name + " Kanalından " + message.author.tag + " Kişisinden Gelen Mesaj = " + message.content)

    if (!message.guild) return;
    if (message.author.bot) return;




    var cevaprandom = Math.floor(Math.random() * (selamcevaplari.length));
    if (message.content.toLowerCase() === "sa") {
        message.reply(selamcevaplari[cevaprandom])
    }




    if (!message.content.startsWith(prefix)) return;

    if (message.content.toLowerCase === prefix + "yayinaktif") {
        if (message.channel.name === "yayinduyuru") {
            if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
                {
                    message.channel.send("@everyone Yayındayız buyrun.. || https://dlive.tv/dangergaminq -- https://www.twitch.tv/dangergaminq");
                    message.delete();
                }
            } else {
                message.reply("Bu komutu kullanmak için yeterli yetkin yok.")
                message.delete();
            }
        }
        if (message.channel.name != "yayinduyuru") {
            message.delete();
        }

    }






    if (message.content.startsWith(prefix + "oynat")) {
        var muzik = message.content.slice(6)
        muzikcalankisi = message.guild.member(message.author);
        if (message.member.voice.channel === "müzik deneme") {
            if (client.player.isPlaying(message.guild.id) === false) {
                client.player.play(message.member.voice.channel, muzik, message.member.user.tag)
                message.reply("Oynatılmaya başlanıyor")
            } else {
                client.player.addToQueue(message.guild.id, muzik);
                message.reply("Oynatma sırasına eklendi")
            }
        } else {
            message.reply("Lütfen müzik odasındayken müzik açmaya çalışın.")
        }
    }


    if (message.content.toLowerCase() === prefix + "skip") {
        if (client.player.isPlaying(message.guild.id) === false) {
            message.reply("Çalan bir şarkı bulunmamakta.")
        } else if (muzikcalankisi === message.guild.member(message.author)) {
            client.player.skip(message.guild.id);
            message.reply("Başarıyla şarkı geçildi..")
        } else {
            message.reply("Bakıyorumda şarkıyı sen açmamışsın :stuck_out_tongue_winking_eye:")
        }
    }


    if (message.content.toLowerCase() === prefix + "stop") {
        if (client.player.isPlaying(message.guild.id) === false) {
            message.reply("Çalan bir şarkı bulunmamakta.")
        } else if (muzikcalankisi === message.guild.member(message.author)) {
            client.player.stop(message.guild.id)
            message.reply("Şarkı durduruldu.")
        } else {
            message.reply("Bakıyorumda şarkıyı sen açmamışsın :stuck_out_tongue_winking_eye:")
        }
    }


    if (message.content.toLowerCase() === prefix + "pause") {
        if (client.player.isPlaying(message.guild.id) === false) {
            message.reply("Çalan bir şarkı bulunmamakta.")
        } else if (muzikcalankisi === message.guild.member(message.author)) {
            client.player.pause(message.guild.id);
            message.reply("Şarkı duraklatıldı.")
        } else {
            message.reply("Bakıyorumda şarkıyı sen açmamışsın :stuck_out_tongue_winking_eye:")
        }
    }


    if (message.content.toLowerCase() === prefix + "resume") {
        if (client.player.isPlaying(message.guild.id) === false) {
            message.reply("Çalan bir şarkı bulunmamakta.")
        } else if (muzikcalankisi === message.guild.member(message.author)) {
            client.player.resume(message.guild.id);
            message.reply("Şarkı Devam ediyor...")
        } else {
            message.reply("Bakıyorumda şarkıyı sen açmamışsın :stuck_out_tongue_winking_eye:")
        }
    }






    if (message.content.startsWith(prefix + "sil")) {
        var silineceksayi = message.content.slice(4)
        if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            if (silineceksayi < 1) {
                message.reply("Lütfen 1'den büyük bir sayı girin..");
                return;
            }
            if (silineceksayi > 100) {
                message.reply("Lütfen 100'den küçük bir sayı girin..")
                return;
            }
            message.delete();
            message.channel.bulkDelete(silineceksayi);
            message.channel.send(`Kanaldan ${silineceksayi} tane mesaj sildim :broom: \nMesajları Silen Yetkili: ${message.author.username}`)
        } else {
            message.delete()
            message.reply("Sil Komudunu kullanmak için yeterli yetkin yok")
        }

    }






    if (message.content.startsWith('!kick')) {
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .kick('atıldın.')
                        .then(() => {
                            message.reply(`Kişi Başarıyla Atıldı ${user.username}\nYetkili: ${message.author.username}`);
                        })
                        .catch(err => {
                            message.reply('Üyeyi atamadım :( ');
                            console.error(err);
                        });
                }
            } else {
                message.reply("Bir kullanıcı etiketlemedin.");
            }
        } else message.reply("Üyeyi atmak için yetkin yok.")
    }


    if (message.content.startsWith('!ban')) {
        if (message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .ban({
                            reason: 'Banlandın :)',
                        })
                        .then(() => {
                            message.reply(`Kişi Başarıyla Banlandı. ${user.tag}\nYetkili: ${message.author.username}`);
                        })
                        .catch(err => {
                            message.reply('Kişiyi banlıyamadım :( ');
                            console.error(err);
                        });
                }
            } else {
                message.reply("Bir kullanıcı etiketlemedin.");
            }
        } else message.reply("Üyeyi banlamak için yetkin yok.")
    }









    if (message.content.toLowerCase() === prefix + "twitch") {
        message.reply("https://www.twitch.tv/dangergaminq - Kanka Burdayız..");
        message.delete();
    }
    if (message.content.toLowerCase() === prefix + "dlive") {
        message.reply("https://dlive.tv/dangergaminq - Kanka Burdayız..");
        message.delete();
    }
    if (message.content.toLowerCase() === prefix + "youtube") {
        message.reply("https://www.youtube.com/dangergaminq - Kanka Burdayız..")
        message.delete();
    }
    if (message.content.toLowerCase() === prefix + "instagram") {
        message.reply("https://www.instagram.com/dangergaminq - Kanka Burdayız..")
        message.delete();
    }






    if (message.content.toLowerCase() === prefix + "donanım") {
        message.delete();
        const embed = new MessageEmbed()
            .setTitle("Donanım")
            .setColor(0xff0000)
            .setDescription(`
                        • Ekran Kartı Nvidia Gtx 1070 8GB
                        • Ram 16 GB Ram
                        • İşlemci Intel(R) Core(TM) i5-8400 CPU @ 2.80GHz`);
        message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + "sosyalmedya") {
        message.delete();
        const embed = new MessageEmbed()
            .setTitle("Sosyal Medya")
            .setColor(0xff0000)
            .setDescription(`
                        • !Twitch ile Twitch Kanalımı Öğrenebilirsiniz.
                        • !Dlive ile Dlive Kanalımı Öğrenebilirsiniz.
                        • !Youtube ile Youtube Kanalımı Öğrenebilirsiniz.
                        • !İnstagram ile İnstagram Kanalımı Öğrenebilirsiniz.`);
        message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + "muzikkomutlari") {
        message.delete();
        const embed = new MessageEmbed()
            .setTitle("Müzik Komutları")
            .setColor(0xff0000)
            .setDescription(`
                        • !oynat (müzik adı veya youtube linki)ile müzik kanalında müzik açabilirsiniz.
                        • !skip ile Mevcut Çalan Şarkıyı Geçebilirsiniz.
                        • !stop ile Mevcut Çalan Şarkıyı Durdurabilirsiniz.
                        • !pause ile Mevcut Çalan Şarkıyı Duraklatabilirsiniz.
                        • !resume ile Mevcut Duraklatılan Şarkıyı Devam Ettirebilirsiniz.`);
        message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + "moderasyon") {
        message.delete();
        const embed = new MessageEmbed()
            .setTitle("Moderasyon Komutları")
            .setColor(0xff0000)
            .setDescription(`
                        • !yayinaktif ile Yayın Duyurusu Geçebilirsiniz.
                        • !sil (1-100 arası) Kanaldaki Mesajları Silebilirsiniz.
                        • !kick (Atılacak kişi) ile Birini Sunucudan Atabilirsiniz.
                        • !ban (Yasaklanılacak kişi) ile Birini Sunucudan Yasaklayabilirsiniz.`);
        message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + "komutlar") {
        message.delete();
        const embed = new MessageEmbed()
            .setTitle("Bot Komutları")
            .setColor(0xff0000)
            .setDescription(`
                        • !muzikkomutlari ile Komutları Öğrenebilirsiniz.
                        • !sosyalmedya ile Sosyal Medya Hesaplarımı Öğrenebilirsiniz.
                        • !moderasyon ile İlgili Komutları Öğrenebilirsiniz.
                        • !donanım ile Bilgisayar Parçalarımı Öğrenebilirsiniz.`);
        message.channel.send(embed);
    }
})

// Token
client.login(settings.token)